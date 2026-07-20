import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import { routes } from './routes/routeRegistry.jsx';
import './App.css';

function App() {
  return (
    <CartProvider>
      <BrowserRouter>
        <Routes>
          {routes.map((route) => (
            <Route key={route.path} path={route.path} element={route.element} />
          ))}
        </Routes>
      </BrowserRouter>
    </CartProvider>
  );
}

export default App;
