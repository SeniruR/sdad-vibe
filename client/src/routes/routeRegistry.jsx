import Layout from '../components/c1-layout/Layout';
import HomePage from '../pages/HomePage';
// import ListPage from '../pages/ListPage';             // SLOT C2 — Person 2
import CartPage from '../pages/CartPage';             // SLOT C3 — Person 3
import CheckoutPage from '../pages/CheckoutPage';     // SLOT C3 — Person 3
// import DetailPage from '../pages/DetailPage';         // SLOT C4 — Person 4
// import PaymentPage from '../pages/PaymentPage';       // SLOT C4 — Person 4
// import ConfirmationPage from '../pages/ConfirmationPage'; // SLOT C4 — Person 4

/**
 * CeylonCart routes — each person adds their SLOT only.
 * Expected merge conflict: keep all route objects.
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

  // SLOT C2 — Person 2 (FR1)
  // { path: '/products', element: <Layout><ListPage /></Layout> },

  // SLOT C3 — Person 3 (FR3, FR4)
  { path: '/cart', element: <Layout><CartPage /></Layout> },
  { path: '/checkout', element: <Layout><CheckoutPage /></Layout> },

  // SLOT C4 — Person 4 (FR2, FR5, FR6)
  // { path: '/products/:id', element: <Layout><DetailPage /></Layout> },
  // { path: '/payment', element: <Layout><PaymentPage /></Layout> },
  // { path: '/confirmation/:orderId', element: <Layout><ConfirmationPage /></Layout> },
];
