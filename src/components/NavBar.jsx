import { onAuthStateChanged, signOut } from "firebase/auth";
import { Link } from "react-router-dom";
import { auth } from "..";
import { useEffect, useState } from "react";
import { useCartContext } from "../provider/CartProvider";

const NavBar = () => {
  const { state } = useCartContext();


  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);
  return (
    <nav className="h-20 w-full bg-black p-4 flex justify-between text-white items-center">
      <Link to="/">
        <span>FakeStore</span>
      </Link>
      {!user ? (
        <Link to="/login">
          <span className="bg-white text-black p-2 rounded-lg">
            Iniciar sesión
          </span>
        </Link>
      ) : (
        <button
          onClick={() => {
            signOut(auth);
            alert("Sesión cerrada");
          }}
          className="underline"
        >
          Cerrar sesión
        </button>
      )}
      <Link to="/carrito">
        <span>Carrito({state.cart.length})</span>
      </Link>
    </nav>
  );
};

export default NavBar;
