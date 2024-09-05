import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();

  function logout() {
    localStorage.clear();
    navigate("/");
  }
  return (
    <>
      <div className="navbar sticky top-0 z-50 bg-blue-900">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
              </svg>
            </div>
          </div>
          <Link to="/" className="btn btn-ghost text-xl flex items-center">
            <img src="https://ik.imagekit.io/k700vpx9q/reAuto_dI6r5Hx24.jpg" alt="Coin Icon" className="h-10 w-10 mr-2" />
          </Link>
        </div>
        <div className="navbar-center hidden lg:flex">
          {localStorage.role !== `Buyer` && (
            <ul className="menu menu-horizontal px-1">
              <li>
                <Link to="/addCar" className="text-white">
                  Add Product
                </Link>
              </li>
              <li>
                <Link to="/Add-category" className="text-white">
                  Add Category
                </Link>
              </li>
            </ul>
          )}
        </div>
        <div onClick={logout} className="navbar-end flex gap-3">
          <a className="btn  bg-yellow-200">Logout</a>
        </div>
      </div>
    </>
  );
}
