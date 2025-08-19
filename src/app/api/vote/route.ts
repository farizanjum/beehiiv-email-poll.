// KV imported dynamically in handler to avoid env errors during import
import { NextRequest, NextResponse } from 'next/server';
import crypto from 'node:crypto';

export const runtime = 'nodejs';

type Choice = 'breakdowns' | 'tactical' | 'both';

const VALID_CHOICES: ReadonlySet<string> = new Set(['breakdowns', 'tactical', 'both']);

function buildRedirectUrl(base: URL, params: Record<string, string | undefined>) {
  const url = new URL('/thanks', base);
  Object.entries(params).forEach(([k, v]) => {
    if (v) url.searchParams.set(k, v);
  });
  return url.toString();
}

function sha256Hex(input: string): string {
  const hash = crypto.createHash('sha256');
  hash.update(input);
  return hash.digest('hex');
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const choice = (searchParams.get('choice') || '').toLowerCase() as Choice | '';
  const emailRaw = searchParams.get('e');

  if (!VALID_CHOICES.has(choice)) {
    const redirectUrl = buildRedirectUrl(new URL(request.url), {
      status: 'bad',
      choice: choice || undefined
    });
    return NextResponse.redirect(redirectUrl, 302);
  }

  try {
    // Early check for KV env to avoid throwing noisy runtime error
    if (!process.env.KV_REST_API_URL || !process.env.KV_REST_API_TOKEN) {
      const redirectUrl = buildRedirectUrl(new URL(request.url), {
        status: 'bad',
        choice
      });
      return NextResponse.redirect(redirectUrl, 302);
    }
    const { kv } = await import('@vercel/kv');
    const counterKey = `poll:count:${choice}`;

    if (emailRaw && emailRaw.trim().length > 0) {
      const email = emailRaw.trim().toLowerCase();
      const emailHash = sha256Hex(email);
      const votedKey = `poll:voted:${emailHash}`;

      const already = await kv.get<string | number | null>(votedKey);
      if (already) {
        const redirectUrl = buildRedirectUrl(new URL(request.url), {
          status: 'dup',
          choice
        });
        return NextResponse.redirect(redirectUrl, 302);
      }

      await kv.set(votedKey, 1, { ex: 60 * 60 * 24 * 365 });
      await kv.incr(counterKey);

      const redirectUrl = buildRedirectUrl(new URL(request.url), {
        status: 'ok',
        choice
      });
      return NextResponse.redirect(redirectUrl, 302);
    }

    await kv.incr(counterKey);
    const redirectUrl = buildRedirectUrl(new URL(request.url), {
      status: 'ok',
      choice
    });
    return NextResponse.redirect(redirectUrl, 302);
  } catch (err) {
    const redirectUrl = buildRedirectUrl(new URL(request.url), {
      status: 'bad',
      choice
    });
    return NextResponse.redirect(redirectUrl, 302);
  }
}


