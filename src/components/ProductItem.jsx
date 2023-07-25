import { useCartContext } from "../provider/CartProvider";
import { firestore } from "../index";
import { deleteDoc, doc } from "firebase/firestore";
import useAuth from "../hooks/useAuth";
import { Link, Navigate, useNavigate } from "react-router-dom";

const ProductItem = ({ product }) => {
  const { dispatch, state } = useCartContext();

  const user = useAuth();

  const removeProduct = async () => {
    await deleteDoc(doc(firestore, "products", product.id));
  }

  const editProduct = async () => {

  }
  // found es el elememto encontrado en el carrito, si found no es vacio entonces se agrega el boton de eliminar del carrito
  const found = state.cart.find(productCart => productCart.id == product.id);

  const navigate = useNavigate();
  return (
    <div className="flex flex-col border border-gray-300 shadow-sm rounded-xl p-4">
      {user &&
        <div>
          <button onClick={removeProduct} className="bg-red-800 hover:bg-red-600 text-white rounded-full p-2 mt-2 h-10 w-10">X</button>
          <Link to={'/edita-producto/'+product.id}  className="bg-gray-800 hover:bg-gray-600 text-white rounded-full p-2 mt-2 h-10 w-10 left-4 relative">Edit</Link>
        </div>
      }
      <img
        src={product.image}
        alt={product.title}
        className="h-28 object-cover self-center"
      />
      <h2 className="font-bold">{product.title}</h2>
      <span>${product.price}</span>
      <button
        className="bg-black hover:bg-gray-800 text-white rounded-md p-2 mt-2"
        onClick={() => {
          dispatch({ type: "VER_DETALLE", payload: product });
          navigate('/detalle-producto');          
        }}>
              Ver detalles
      </button>
      <button
        className="bg-gray-500 hover:bg-gray-800 text-white rounded-md p-2 mt-2"
        onClick={() => {
          dispatch({ type: "ADD_TO_CART", payload: product });
          alert("Producto añadido al carrito");
        }}>
              Añadir al carrito
      </button>
      {
        found?<button
        className="bg-red-500 hover:bg-red-800 text-white rounded-md p-2 mt-2"
        onClick={() => {
          dispatch({ type: "REMOVE_FROM_CART", payload: product });
          alert("Producto eliminado del carrito");
        }}>Eliminar del carrito</button>:
        ''
      }


    </div>
  );
}

export default ProductItem;
