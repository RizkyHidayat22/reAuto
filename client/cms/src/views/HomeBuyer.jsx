import { useEffect, useState } from "react";
import axios from "axios";
import Card from "../components/Card";
export default function HomeBuyer(){
  const [product, setProduct] = useState([]);

  async function fecthData() {
    try {
        const { data } = await axios.get("http://localhost:3000/products/readproduct", {
            headers: {
              Authorization: `Bearer ${localStorage.access_token}`,
            },
          });
          console.log(data);
          setProduct(data.data)
    } catch (error) {
        console.log(error);
    }
  }

  useEffect(
    ()=>{
        fecthData()
    },[]
)
    return(
        <>
        <div className="flex flex-wrap gap-4 justify-center">
        {product.map((el) => {
            return <Card product={el} key={el.id}/>
        })}
       
    </div>
        </>
    )
}