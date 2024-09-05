import { useEffect, useState } from "react";
import axios from "axios";
import Card from "../components/Card";
import {useDispatch, useSelector} from "react-redux"
import { fetchAsycProduct } from "../features/ProductSilce";

export default function HomeBuyer() {
//   const [products, setProducts] = useState([]);
const dispact = useDispatch()
const {reviews, loading, error} = useSelector((state) => state.fetchProduct)
//   async function fetchData() {
//     try {
//       const { data } = await axios.get("http://localhost:3000/products/readproduct", {
//         headers: {
//           Authorization: `Bearer ${localStorage.access_token}`,
//         },
//       });
//       setProducts(data.data);
//     } catch (error) {
//       console.log(error);
//     }
//   }

  useEffect(() => {
    dispact(fetchAsycProduct());
  }, []);

  const handleProductUpdate = (id) => {
    setProducts(prevProducts => prevProducts.filter(product => product.id !== id));
  };

  return (
    <>
      <div className="flex flex-wrap gap-4 justify-center">
        {!error && reviews.map((product) => {
            return <Card key={product.id} 
            product={product} 
            onProductUpdate={handleProductUpdate}/> 
        })}
         
      </div>
    </>
  );
}
