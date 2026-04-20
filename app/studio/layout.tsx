export default function StudioLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div
      style={{
        height: '100vh',
        width: '100vw',
        overflow: 'auto',
      }}
    >
      {children}
    </div>
  )
}
