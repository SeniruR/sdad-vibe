// Person 1 (C1) — replace with real Header
export default function Header() {
  return (
    <header style={styles.header}>
      <h1 style={styles.title}>VIBECODING App</h1>
      <nav style={styles.nav}>
        <a href="/" style={styles.link}>Home</a>
        <a href="/list" style={styles.link}>List</a>
        <a href="/create" style={styles.link}>Create</a>
      </nav>
    </header>
  );
}

const styles = {
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '1rem 2rem',
    backgroundColor: '#1a1a2e',
    color: '#fff',
  },
  title: { margin: 0, fontSize: '1.25rem' },
  nav: { display: 'flex', gap: '1rem' },
  link: { color: '#eee', textDecoration: 'none' },
};
