import Link from 'next/link';

type Props = {
  searchParams: {
    status?: 'ok' | 'dup' | 'bad';
    choice?: 'breakdowns' | 'tactical' | 'both';
  };
};

const container: React.CSSProperties = {
  minHeight: '100vh',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  background: '#000',
  color: '#fff',
  fontFamily: 'Helvetica, Arial, sans-serif'
};

const card: React.CSSProperties = {
  maxWidth: 560,
  padding: 24,
  textAlign: 'center'
};

export default function ThanksPage({ searchParams }: Props) {
  const status = searchParams.status ?? 'ok';
  const choice = searchParams.choice;

  let heading = 'Vote recorded';
  let sub = choice ? `You chose “${choice}”.` : undefined;

  if (status === 'dup') {
    heading = 'You already voted';
  } else if (status === 'bad') {
    heading = 'Invalid vote';
    sub = 'Please use the buttons in the email to vote.';
  }

  return (
    <main style={container}>
      <div style={card}>
        <h1 style={{ margin: 0, marginBottom: 8 }}>{heading}</h1>
        {sub ? <p style={{ marginTop: 0 }}>{sub}</p> : null}
        <p>
          <Link href="/results" style={{ color: '#fff', textDecoration: 'underline' }}>
            View live results
          </Link>
        </p>
      </div>
    </main>
  );
}


