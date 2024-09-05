import assert from "assert"
import axios from "axios"
import { useState } from "react";

import { useNavigate } from "react-router-dom"

export default function AddCategory(){ 
    const [name, setName] = useState("");
    const navigate = useNavigate()

    async function handleCategory(e, name){
        e.preventDefault()
        try {
            const body = {name}
            await axios.post('http://localhost:3000/categories',body,{
                headers : {
                    Authorization : `Bearer ${localStorage.access_token}`
                }
            })
            navigate('/home-buyer')
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <>
        <div>
            <form onSubmit={(e) => handleCategory(e, name)} action="" className="mx-auto gap-10 ml-10 rounded-2xl mr-9">
                <div className="form-control">
                    <label htmlFor="category" className="label font-semibold">
                        Category
                    </label>
                    <input onChange={(e)=> setName(e.target.value)} type="text" id="category" name="category" placeholder="Masukkan kategori" className="input input-bordered w-full max-w-xs" />
                </div>
                <div className="flex justify-center pt-10">
                    <button type="submit" className="btn btn-primary mt-4 w-full ">
                        Submit
                    </button>
                </div>
            </form>
        </div>
        </>
    )
}