import { Link } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import { fetchAsycProduct } from "../features/ProductSilce";
import { useDispatch } from "react-redux";


export default function Card({ product, onProductUpdate }) {

    const dispact = useDispatch()

  async function handleBuy(price, id) {
    try {
      const { data } = await axios.post(
        `https://iproject.rizkyhidayat.dev/midtrans`,
        { price },
        {
          headers: {
            Authorization: `Bearer ${localStorage.access_token}`,
          },
        }
      );

      window.snap.pay(data.transaction_token, {
        onSuccess: async function () {
          try {
            await axios.delete(`http://localhost:3000/products/${id}`, {
              headers: {
                Authorization: `Bearer ${localStorage.access_token}`,
              },
            });
            onProductUpdate(id);

            Swal.fire({
              icon: "success",
              title: "Product deleted successfully!",
            });
          } catch (deleteError) {
            Swal.fire({
              icon: "error",
              title: "Failed to delete the product!",
            });
          }
        },
        onPending: function () {
          Swal.fire({
            icon: "warning",
            title: "Waiting your payment!",
          });
        },
        onError: function () {
          Swal.fire({
            icon: "error",
            title: "Payment failed!",
          });
        },
        onClose: function () {
          Swal.fire({
            icon: "question",
            title: "Cancel payment?",
          });
        },
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: error.response.data.message,
      });
    }
   
  }

  async function handleDelete() {
    try {
       await axios.delete(`http://localhost:3000/products/${product.id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.access_token}`,
        },
      });
      dispact(fetchAsycProduct())

    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="card card-compact bg-base-100 w-96 shadow-xl pt-10">
      <figure>
        <img src={product.imageUrl} alt="Product" />
      </figure>
      <div className="card-body">
        <h2 className="card-title">
          {product.brand} {product.model}
        </h2>
        <h3>kilometer : {product.kilometer}</h3>
        <h3>year : {product.year}</h3>
        <h3>transmission : {product.transmission}</h3>
        <h3>color : {product.color}</h3>
        <h3>description : {product.description}</h3>
        <h3>price : {product.price}</h3>
        <h3>type : {product.categoryId}</h3>

        <div className="card-actions justify-end">
          <button onClick={() => handleBuy(product.price, product.id)} className="btn btn-primary">
            Buy Now
          </button>
        </div>
        {localStorage.role !== "Buyer" && (
          <>
            <div className="flex flex-wrap gap-5">
              <div className="card-actions justify-end">
                <button onClick={(e) => handleDelete(e)} className="btn btn-error">Delete</button>
              </div>
              <div className="card-actions justify-end">
                <Link to={`/edit/${product.id}`} className="btn btn-warning">
                  Edit Image
                </Link>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
