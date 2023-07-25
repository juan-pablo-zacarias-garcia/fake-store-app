import { useEffect, useState } from "react";
import ProductItem from "../components/ProductItem";
import { query } from "firebase/firestore";
import { collection, onSnapshot, getDocs } from "firebase/firestore";
import { firestore } from "../index";
import { Link } from "react-router-dom";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  // Consumo de api de productos
  // const { getProducts } = useAPI();

  // useEffect(() => {
  //   getProducts()
  //     .then((products) => {
  //       setProducts(products);
  //       setLoading(false);
  //     })
  //     .catch((err) => console.error(err));
  // }, []);
  useEffect(() => {
    const getProducts = async () => {
      const data = await query(collection(firestore, "products"));
      // Escucha los cambios en la base de datos y los refleja en tiempo real
      onSnapshot(data, (snapshot) => {
        const ps = snapshot.docs.map((doc) => {
          return {...doc.data(), id: doc.id};
        });
        setProducts(ps);
        setLoading(false);
      });
    };
    getProducts();
  }, []);

  return (
    <div className="flex-1 flex flex-col gap-4 p-4">
      <h1>FakeStore</h1>
      {loading && <p>Cargando...</p>}
      {!loading && (
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {products.map((product) => (
            <ProductItem key={product.title} product={product} />
          ))}
        </div>
      )}
      <Link to={"/nuevo-producto"} className="h-20 w-20 flex items-center justify-center rounded-full bg-black absolute bottom-4 right-4 text-white text-3xl">
        +
      </Link>
    </div>
  );
};

export default Home;
