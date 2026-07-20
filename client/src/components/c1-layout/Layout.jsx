import Header from './Header';

export default function Layout({ children }) {
  return (
    <div style={styles.wrapper}>
      <Header />
      <main style={styles.main}>{children}</main>
    </div>
  );
}

const styles = {
  wrapper: { minHeight: '100vh', backgroundColor: '#f5f5f5' },
  main: { padding: '2rem', maxWidth: '960px', margin: '0 auto' },
};
