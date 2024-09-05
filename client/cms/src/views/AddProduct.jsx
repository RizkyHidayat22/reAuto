import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function AddCar() {
  const [brand, setBrand] = useState("");
  const [model, setModel] = useState("");
  const [price, setPrice] = useState(0);
  const [imageUrl, setImageUrl] = useState(null);
  const [description, setDescription] = useState("");
  const [kilometer, setKilometer] = useState(0);
  const [year, setYear] = useState(0);
  const [color, setColor] = useState("");
  const [transmission, setTransmission] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  async function AddNewCar(e) {
    try {
      e.preventDefault();
      const formData = new FormData();
      formData.append("brand", brand);
      formData.append("model", model);
      formData.append("price", price);
      console.log("ok");
      formData.append("description", description);
      formData.append("year", year);
      formData.append("color", color);
      formData.append("transmission", transmission);
      formData.append("categoryId", categoryId);
      if (imageUrl) formData.append("imageUrl", imageUrl);

      const body = { brand, model, price, imageUrl, description, kilometer, year, color, transmission, categoryId };
      await axios.post("http://localhost:3000/products", body, {
        headers: {
          Authorization: `Bearer ${localStorage.access_token}`,
          "Content-Type": "multipart/form-data",
        },
      });
      navigate("/home-buyer");
    } catch (error) {
      console.log(error);
    }
  }

  async function handleCategory() {
    try {
      const { data } = await axios.get(`http://localhost:3000/categories`, {
        headers: {
          Authorization: `Bearer ${localStorage.access_token}`,
        },
      });
      setCategories(data.data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    handleCategory();
  }, []);

  return (
    <>
      <div>
        <form onSubmit={AddNewCar} action="" className="mx-auto gap-10 ml-10 rounded-2xl mr-9">
          <div className="grid grid-cols-2 gap-4">
            <div className="form-control">
              <label htmlFor="brand" className="label font-semibold">
                Brand
              </label>
              <input onChange={(e) => setBrand(e.target.value)} type="text" id="brand" name="brand" placeholder="Masukkan brand kendaraan" className="input input-bordered w-full max-w-xs" />
            </div>
            <div className="form-control">
              <label htmlFor="model" className="label font-semibold">
                Model
              </label>
              <input onChange={(e) => setModel(e.target.value)} type="text" id="model" name="model" placeholder="Masukkan model kendaraan" className="input input-bordered w-full max-w-xs" />
            </div>
            <div className="form-control">
              <label htmlFor="year" className="label font-semibold">
                Tahun Kendaaran
              </label>
              <input onChange={(e) => setYear(e.target.value)} type="NUMBER" id="year" name="year" placeholder="Masukkan tahun kendaraan" className="input input-bordered w-full max-w-xs" />
            </div>
            <div className="form-control">
              <label htmlFor="transmission" className="label font-semibold">
                Transmission
              </label>
              <select onChange={(e) => setTransmission(e.target.value)} id="transmission" name="transmission" className="select select-bordered w-full max-w-xs" defaultValue="">
                <option disabled value="">
                  Pilih transmisi
                </option>
                <option value="automatic">Automatic</option>
                <option value="manual">Manual</option>
              </select>
            </div>
            <div>
              <label htmlFor="category" className="label font-semibold">
                Category
              </label>
              <select onChange={(e) => setCategoryId(e.target.value)} id="category" name="category" className="w-full input input-bordered input-accent">
                <option disabled value="">
                  Pilih kategori
                </option>
                {categories.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-control">
              <label htmlFor="price" className="label font-semibold">
                Price
              </label>
              <input onChange={(e) => setPrice(e.target.value)} type="number" id="price" name="price" placeholder="Masukkan harga kendaraan" className="input input-bordered w-full max-w-xs" />
            </div>
            <div className="form-control">
              <label htmlFor="color" className="label font-semibold">
                Color
              </label>
              <input onChange={(e) => setColor(e.target.value)} type="text" id="color" name="color" placeholder="Masukkan warna kendaraan" className="input input-bordered w-full max-w-xs" />
            </div>
            <div className="form-control">
              <label htmlFor="color" className="label font-semibold">
                Kilometer
              </label>
              <input onChange={(e) => setKilometer(e.target.value)} type="number" id="color" name="color" placeholder="Masukkan warna kendaraan" className="input input-bordered w-full max-w-xs" />
            </div>
            <div className="mb-5 max-w-lg mx-auto">
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" htmlFor="user_avatar">
                Upload file
              </label>
              <input
                name="imageUrl"
                className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                aria-describedby="user_avatar_help"
                id="user_avatar"
                type="file"
                onChange={(e) => setImageUrl(e.target.files[0])}
              />
            </div>
            <div className="form-control">
              <label htmlFor="description" className="label font-semibold">
                Description
              </label>
              <textarea onChange={(e) => setDescription(e.target.value)} id="description" name="description" placeholder="Masukkan deskripsi kendaraan" className="textarea textarea-bordered w-full max-w-2xl" rows={3}></textarea>
            </div>
          </div>
          <div className="flex justify-center pt-10">
            <button type="submit" className="btn btn-primary mt-4 w-full ">
              Submit
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
