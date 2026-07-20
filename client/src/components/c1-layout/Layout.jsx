import Header from './Header';

export default function Layout({ children }) {
  return (
    <div style={styles.wrapper}>
      <Header />
      <main style={styles.main}>
        <div style={styles.container}>
          {children}
        </div>
      </main>
      <footer style={styles.footer}>
        <p style={styles.footerText}>CeylonCart &copy; 2026 &mdash; Locally made, globally loved.</p>
      </footer>
    </div>
  );
}

const styles = {
  wrapper: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
    backgroundColor: '#f9fbf9',
  },
  main: {
    flex: '1 0 auto',
    width: '100%',
    boxSizing: 'border-box',
  },
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '2rem 1.5rem',
    boxSizing: 'border-box',
    width: '100%',
  },
  footer: {
    backgroundColor: '#1a472a',
    color: '#ffffff',
    padding: '1.5rem 1rem',
    textAlign: 'center',
    marginTop: 'auto',
    borderTop: '1px solid rgba(255, 255, 255, 0.1)',
  },
  footerText: {
    margin: 0,
    fontSize: '0.9rem',
    opacity: 0.9,
    letterSpacing: '0.3px',
    fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  },
};

