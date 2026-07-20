export default function Layout({ children }) {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <header style={{ padding: '1rem 2rem', background: '#1f2937', color: '#fff' }}>
        CeylonCart
      </header>
      <main style={{ flex: 1, padding: '1rem 2rem' }}>{children}</main>
      <footer style={{ padding: '1rem 2rem', background: '#f3f4f6', color: '#4b5563' }}>
        © 2026 CeylonCart
      </footer>
    </div>
  );
}
