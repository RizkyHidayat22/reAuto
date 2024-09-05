import { useEffect, useState } from "react";
import axios from "axios";
import Card from "../components/Card";
import {useDispatch, useSelector} from "react-redux"
import { fetchAsycProduct } from "../features/ProductSilce";

export default function HomeBuyer() {

const dispact = useDispatch()
const {reviews, loading, error} = useSelector((state) => state.fetchProduct)


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
