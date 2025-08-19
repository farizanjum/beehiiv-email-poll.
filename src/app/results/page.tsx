// KV is imported dynamically below to avoid throwing when env vars are missing in local dev

function pct(numerator: number, denominator: number): number {
  if (denominator <= 0) return 0;
  return Math.round((numerator / denominator) * 100);
}

const wrapper: React.CSSProperties = {
  minHeight: '100vh',
  background: '#000',
  color: '#fff',
  fontFamily: 'Helvetica, Arial, sans-serif'
};

const container: React.CSSProperties = {
  maxWidth: 720,
  margin: '0 auto',
  padding: 24
};

const barBg: React.CSSProperties = {
  width: '100%',
  background: '#222',
  height: 16,
  borderRadius: 8,
  overflow: 'hidden'
};

const barFillBase: React.CSSProperties = {
  height: '100%',
  background: '#fff'
};

export const revalidate = 0; // always show live values

export default async function ResultsPage() {
  let kvUnavailable = false;
  let breakdownsCount: number | null = 0;
  let tacticalCount: number | null = 0;
  let bothCount: number | null = 0;

  try {
    if (!process.env.KV_REST_API_URL || !process.env.KV_REST_API_TOKEN) {
      throw new Error('KV not configured');
    }
    const { kv } = await import('@vercel/kv');
    const counts = (await kv.mget([
      'poll:count:breakdowns',
      'poll:count:tactical',
      'poll:count:both'
    ])) as Array<number | null>;
    [breakdownsCount, tacticalCount, bothCount] = counts;
  } catch {
    kvUnavailable = true;
  }

  const b = Number(breakdownsCount || 0);
  const t = Number(tacticalCount || 0);
  const a = Number(bothCount || 0);
  const total = b + t + a;

  const rows: { label: string; key: string; count: number }[] = [
    { label: 'Company Breakdowns', key: 'breakdowns', count: b },
    { label: 'Tactical Tuesday', key: 'tactical', count: t },
    { label: 'Both / Alternate Weekly', key: 'both', count: a }
  ];

  return (
    <main style={wrapper}>
      <div style={container}>
        <h1 style={{ marginTop: 0 }}>Live Results</h1>
        {kvUnavailable ? (
          <p style={{ background: '#111', padding: 12, borderRadius: 6 }}>
            Storage not configured. Add <code>KV_REST_API_URL</code> and <code>KV_REST_API_TOKEN</code>
            to your environment (Vercel KV integration), then reload.
          </p>
        ) : null}
        <p style={{ opacity: 0.8 }}>Total votes: {total}</p>
        <div style={{ display: 'grid', gap: 16 }}>
          {rows.map((row) => {
            const percentage = pct(row.count, total);
            return (
              <div key={row.key}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                  <span>{row.label}</span>
                  <span>
                    {row.count} ({percentage}%)
                  </span>
                </div>
                <div style={barBg}>
                  <div style={{ ...barFillBase, width: `${percentage}%` }} />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </main>
  );
}


