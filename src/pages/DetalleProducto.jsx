import { useCartContext } from "../provider/CartProvider"


export default function DetalleProducto() {
    const { dispatch,state: { productDetalle } } = useCartContext();

    console.log(productDetalle);
    return (<div className="grid grid-cols-2 gap-4">
        <div className="flex justify-center bg-orange-100 items-center h-4/6"><img className="flex h-3/5" src={productDetalle.image} alt="" /></div>
        <div className="bg-gray-100 p-8 h-4/6">
            <div className="text-5xl">{productDetalle.title}</div>
            <div className="text-2xl">${productDetalle.price}</div>
            <div><p>{productDetalle.description}</p></div>
            <button
                className="bg-gray-500 hover:bg-gray-800 text-white rounded-md p-2 mt-2"
                onClick={() => {
                    dispatch({ type: "ADD_TO_CART", payload: productDetalle });
                    alert("Producto añadido al carrito");
                }}>
                Añadir al carrito
            </button>
        </div>
    </div>)
}