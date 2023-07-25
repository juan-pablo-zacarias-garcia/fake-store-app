import { BrowserRouter, Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import { CartProvider } from "./provider/CartProvider";
import Login from "./pages/Login";
import Auth from "./hoc/Auth";
import Protected from "./pages/auth/Protected";
import NewProduct from "./pages/auth/NewProduct";
import EditProduct from "./pages/auth/EditProduct";
import DetalleProducto from "./pages/DetalleProducto";

function App() {
  return (
    <CartProvider>
      <BrowserRouter>
        <main className="min-h-screen flex flex-col">
          <NavBar />
          <Routes>
            <Route path="/" exact element={<Home />} />
            <Route path="/carrito" exact element={<Cart />} />
            <Route path="/login" exact element={<Login />} />
            <Route path="/detalle-producto" exact element={<DetalleProducto />} />
          </Routes>
            <Routes>
              <Route path="/protected" exact element={<Auth><Protected /></Auth>} />
              <Route path="/nuevo-producto" exact element={<Auth><NewProduct /></Auth>} />
              <Route path="/edita-producto/:id" exact element={<Auth><EditProduct /></Auth>} />
            </Routes>
        </main>
      </BrowserRouter>
    </CartProvider>
  );
}

export default App;