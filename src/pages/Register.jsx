import {onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";
import { useState,useEffect } from "react";
import { auth } from "../index";
import { useNavigate } from "react-router-dom";

const Register = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState();
    const navigate = useNavigate();

    const submit = async (event) => {
        event.preventDefault();
        try {
            const response = await signInWithEmailAndPassword(auth, email, password);
            navigate("/");
          } catch (e) {
            setError(e.message);
          }
      };
      useEffect(()=>{
        const unsuscribe = onAuthStateChanged(auth,(user)=>{
            if(user){
                navigate("/");
            }
        });
        return ()=>unsuscribe();
      },);

    return (
        <div className="flex-1 flex flex-col gap-4 p-4 items-center justify-center">
      <h1>Iniciar sesión</h1>
      <form
        className="flex flex-col gap-4 max-w-xl border border-gray-400 shadow-md rounded-xl p-8"
        onSubmit={submit}
      >
        <div className="flex flex-col gap-2">
          <label htmlFor="email">Correo electrónico</label>
          <input
            type="email"
            id="email"
            className="border  rounded-lg  p-1 border-gray-600"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
<div className="flex flex-col gap-2">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            className="border  rounded-lg  p-1 border-gray-600"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit" className="p-3 bg-black text-white rounded-lg">
          Iniciar sesión
        </button>
        {error && <span className="text-red-500">{error}</span>}
      </form>
    </div>
    );
};

export default Register;