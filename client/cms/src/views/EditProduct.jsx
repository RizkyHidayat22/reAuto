import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import Toastify from "toastify-js";

export default function EditImg() {
  const { id } = useParams();
//   console.log(id);
  const navigate = useNavigate();

  async function fetchEdit(e) {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("imageUrl", file);
    try {
      //   console.log(localStorage.access_token);
      await axios.patch(`https://iproject.rizkyhidayat.dev/products/${id}`, formData, {
        headers: {
          Authorization: `Bearer ${localStorage.access_token}`,
          "Content-Type": "multipart/from-data",
        },
      });
      navigate("/home-buyer");
        Toastify({
          text: `Succedd add Edit Image`,
          duration: 3000,
          newWindow: true,
          close: true,
          gravity: "bottom", // `top` or `bottom`
          position: "right", // `left`, `center` or `right`
          stopOnFocus: true, // Prevents dismissing of toast on hover
          style: {
            background: "#008000",
          },
          onClick: function () {}, // Callback after click
        }).showToast();
    } catch (error) {
      Toastify({
          text: error.response.data.message,
          duration: 3000,
          newWindow: true,
          close: true,
          gravity: "bottom", // `top` or `bottom`
          position: "right", // `left`, `center` or `right`
          stopOnFocus: true, // Prevents dismissing of toast on hover
          style: {
            background: "#FF0000",
          },
          onClick: function () {}, // Callback after click
        }).showToast();
    }
  }

  return (
    <>
      <div>
        <form onSubmit={EditImg} action="">
          <input onChange={fetchEdit} type="file" className="file-input file-input-bordered w-full max-w-xs" />
        </form>
      </div>
    </>
  );
}
