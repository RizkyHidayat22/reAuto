import { Link } from "react-router-dom";
import video from "../assets/bg-viedo.mp4";
import { useState } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";

export default function HomePage() {
  const [brand, setBrand] = useState("");
  const [year, setYear] = useState(0);
  const [price, setPrice] = useState(0);
  const [type, setType] = useState("");
  const [Ai, setAi] = useState();

  async function handleAi() {
    try {
    //   console.log("ok");
      const genAI = new GoogleGenerativeAI("AIzaSyCAJTYSy6LsuviNjsTpns6fEeZo4EvkzQU");
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

      const prompt = `berikan saya rekomendasi mobil dengan dari brand${brand} dan tahun kendaraan${year} dengan harga maskimal${price} dan type mobilnya${type} tidak usah beei kelebihan dan kekurannya cukup jenis mobilnya saja`;
    //   console.log(prompt);

      const result = await model.generateContent(prompt);
    //   console.log(result);
    //   console.log(result.response.text());
      setAi(result.response.text())
    } catch (error) {
      console.log(error);
    }
  }

  function handleSubmit(e) {
    e.preventDefault();

    handleAi();
  }
  return (
    <>
      {/* NABAR */}
      <div className="navbar  sticky top-0 z-50 bg-blue-900">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
              </svg>
            </div>
          </div>
          <a to="/my-coins" className="btn btn-ghost text-xl flex items-center">
            <img src="https://ik.imagekit.io/k700vpx9q/reAuto_dI6r5Hx24.jpg" alt="Coin Icon" className="h-10 w-10 mr-2" />
          </a>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">
            <li>
              <p className="font-bold text-white">WELCOME TO REAUTO</p>
            </li>
          </ul>
        </div>
        <div className="navbar-end flex gap-3">
          <Link to="/login" className="btn bg-yellow-200">
            Login
          </Link>
          <Link to="/register" className="btn  bg-yellow-200">
            Register
          </Link>
        </div>
      </div>
      {/* NAVBAR */}

      <div className="relative w-full h-screen overflow-hidden">
        <video src={video} autoPlay muted loop className="absolute inset-0 w-full h-full object-cover" type="video/mp4"></video>

        <div className="relative flex flex-col justify-center items-center h-full">
          <h1 className="text-center text-white font-semibold font-montserrat">SELAMAT DATANG DI REAUTO</h1>
          <h2 className="text-center text-white font-semibold font-montserrat">JIKA ANDA BUTUH SARAN KAMI UNTUK MEMILIH KENDARAAN ANDA SILAHKAN ISI FORM DI BAWAH</h2>

          <div className="flex font-montserrat justify-between mt-10 w-full max-w-4xl gap-10">
            <div className="flex flex-col gap-10 mx-auto w-full pr-65">
              <form onSubmit={handleSubmit} className="rounded-2xl p-6 bg-white shadow-md">
                <div className="form-control mb-4">
                  <label htmlFor="brand" className="label text-gray-700 font-semibold">
                    Brand
                  </label>
                  <input onChange={(e) => setBrand(e.target.value)} type="text" id="brand" name="brand" placeholder="Masukkan brand kendaraan" className="input input-bordered w-full" />
                </div>
                <div className="form-control mb-4">
                  <label htmlFor="year" className="label text-gray-700 font-semibold">
                    Year
                  </label>
                  <input onChange={(e) => setYear(e.target.value)} type="text" id="year" name="year" placeholder="Masukkan tahun kendaraan" className="input input-bordered w-full" />
                </div>
                <div className="form-control mb-4">
                  <label htmlFor="price" className="label text-gray-700 font-semibold">
                    Price
                  </label>
                  <input onChange={(e) => setPrice(e.target.value)} type="text" id="price" name="price" placeholder="Masukkan harga kendaraan" className="input input-bordered w-full" />
                </div>
                <div className="form-control mb-4">
                  <label htmlFor="type" className="label text-gray-700 font-semibold">
                    Type
                  </label>
                  <input onChange={(e) => setType(e.target.value)} type="text" id="type" name="type" placeholder="Masukkan tipe kendaraan" className="input input-bordered w-full" />
                </div>
                <button type="submit" className="btn btn-primary">
                  Submit
                </button>
              </form>
            </div>
            <div className="border-2 border-white p-14 rounded-lg bg-white w-full h -end-full ">
              <p className="text-black">{Ai}</p>
            </div>
            <div className="flex justify-items-center">
              <button className="btn btn-primary">
                <Link to="/home-buyer" href="">
                  find your car
                </Link>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
