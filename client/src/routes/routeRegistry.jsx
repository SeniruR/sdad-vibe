import Layout from '../components/c1-layout/Layout';
import HomePage from '../pages/HomePage';
// import ListPage from '../pages/ListPage';       // SLOT C2 — Person 2
// import CreatePage from '../pages/CreatePage';   // SLOT C3 — Person 3
// import DetailPage from '../pages/DetailPage';   // SLOT C4 — Person 4

/**
 * Each person adds their route in their SLOT only.
 * Expected merge conflict: keep all 4 route objects.
 */
export const routes = [
  // SLOT C1 — Person 1
  {
    path: '/',
    element: (
      <Layout>
        <HomePage />
      </Layout>
    ),
  },

  // SLOT C2 — Person 2
  // { path: '/list', element: <Layout><ListPage /></Layout> },

  // SLOT C3 — Person 3
  // { path: '/create', element: <Layout><CreatePage /></Layout> },

  // SLOT C4 — Person 4
  // { path: '/detail/:id', element: <Layout><DetailPage /></Layout> },
];
