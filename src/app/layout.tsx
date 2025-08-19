export const metadata = {
  title: 'Beehiiv Poll',
  description: 'Zero-friction email poll for Beehiiv'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body style={{ margin: 0, background: '#000', color: '#fff', fontFamily: 'Helvetica, Arial, sans-serif' }}>{children}</body>
    </html>
  );
}


