export const metadata = {
  title: 'Pantry Tracker',
  description: 'Track your pantry items',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body style={{ margin: 0, backgroundColor: '#000' }}>{children}</body>
    </html>
  )
}
