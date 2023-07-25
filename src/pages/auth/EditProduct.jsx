import { useState, useEffect } from "react"
import { firestore } from "../../index";
import { addDoc, collection, getDoc } from "firebase/firestore";
import { useParams } from "react-router-dom";

export default function EditProduct() {
    const {id} = useParams();



    const [formData, setFormData] =useState({
        title:"",
        description:"",
        price:0,
        image:"",
    });

    const [loading, setLoading] = useState(false);
    const handleChange = (e)=>{
        console.log(e.target.name+" "+e.target.value);
        setFormData({
            ...formData,
            [e.target.name]:e.target.value
        });

    }
    const handleSubmit = async (e)=>{
        e.preventDefault();
        setLoading(true);
        try{
            const docRef = await addDoc(collection(firestore, "products"), formData);
            setFormData({
                title:"",
                description:"",
                price:0,
                image:"",
            });
            e.target.reset();
        }
        catch(ex){
            window.alert();
        }
        setLoading(false);
    }


    return (
        <div className="flex-1 flex flex-col gap-4 p-4 max-w-xl">
            <h1>Editar producto</h1>
            <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                <div className="flex flex-col gap-2">
                    <label htmlFor="title">Título</label>
                    <input
                        className="border border-gray-500 p-2 "
                        name="title"
                        type="text"
                        onChange={handleChange}
                        value={formData.title}
                    ></input>
                </div>
                <div className="flex flex-col gap-2 ">
                    <label htmlFor="description">Descripción</label>
                    <input
                        className="border border-gray-500 p-2 "
                        name="description"
                        type="text"
                        onChange={handleChange}
                        value={formData.description}
                    ></input>
                </div>
                <div className="flex flex-col gap-2">
                    <label htmlFor="price">Precio</label>
                    <input
                        className="border border-gray-500 p-2 "
                        name="price"
                        type="text"
                        onChange={handleChange}
                        value={formData.price}
                    ></input>
                </div>
                <div className="flex flex-col gap-2">
                    <label htmlFor="image">Imagen</label>
                    <input
                        className="border border-gray-500 p-2 "
                        name="image"
                        type="text"
                        onChange={handleChange}
                        value={formData.image}
                    ></input>
                </div>
                <button type="submit" className="bg-black text-white p-2 rounded-lg">
                    {loading?'Enviando...':'Enviar'}
                </button>
            </form>
        </div>

    )
}