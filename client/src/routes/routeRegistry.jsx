import Layout from '../components/c1-layout/Layout';
import HomePage from '../pages/HomePage';
import ListPage from '../pages/ListPage';
import CartPage from '../pages/CartPage';
import CheckoutPage from '../pages/CheckoutPage';
import DetailPage from '../pages/DetailPage';
import PaymentPage from '../pages/PaymentPage';
import ConfirmationPage from '../pages/ConfirmationPage';
import LoginPage from '../pages/LoginPage';
import RegisterPage from '../pages/RegisterPage';
import AdminOrdersPage from '../pages/AdminOrdersPage';

export const routes = [
  { path: '/', element: <Layout><HomePage /></Layout> },
  { path: '/products', element: <Layout><ListPage /></Layout> },
  { path: '/cart', element: <Layout><CartPage /></Layout> },
  { path: '/checkout', element: <Layout><CheckoutPage /></Layout> },
  { path: '/products/:id', element: <Layout><DetailPage /></Layout> },
  { path: '/payment', element: <Layout><PaymentPage /></Layout> },
  { path: '/confirmation/:orderId', element: <Layout><ConfirmationPage /></Layout> },
  { path: '/login', element: <Layout><LoginPage /></Layout> },
  { path: '/register', element: <Layout><RegisterPage /></Layout> },
  { path: '/admin/orders', element: <Layout><AdminOrdersPage /></Layout> },
];
