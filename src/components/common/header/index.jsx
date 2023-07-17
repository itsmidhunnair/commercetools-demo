import { useContext } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../../../context/cart/cartContext";
import useMenuHandling from "../../../talon/header/useMenuHandling";
import useAuth from "../../../talon/useAuth";
import MiniCart from "../../cart/miniCart";
import SearchBox from "./searchBox";

const Header = () => {
  const { cart, menu, toggleMenu, toggleMiniCart } = useMenuHandling();
  const { getUserName } = useAuth();
  const {cartItem} = useContext(CartContext)
  return (
    <>
      <div className="bg-white shadow-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-1 md:py-4">
          <div className="flex items-center justify-between md:justify-start flex-wrap">
            {/* Menu Trigger */}

            <button
              type="button"
              className="md:hidden w-10 h-10 rounded-lg -ml-2 flex justify-center items-center"
              onClick={toggleMenu}
            >
              <svg
                className="text-gray-500 w-6 h-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>

            {/* ./ Menu Trigger */}

            <Link to="/" className="font-bold text-gray-700 text-2xl">
              Sunrise
            </Link>

            <div className="hidden md:flex space-x-3 flex-1 lg:ml-8">
              <Link
                to="/"
                className="px-2 py-2 hover:bg-gray-100 rounded-lg text-gray-400 hover:text-gray-600"
              >
                Home
              </Link>
              <Link
                to="/products"
                className="px-2 py-2 hover:bg-gray-100 rounded-lg text-gray-400 hover:text-gray-600"
              >
                Products
              </Link>
            </div>

            <div
              className={`flex items-center space-x-4 flex-wrap justify-center gap-y-1 max-sm:overflow-hidden ${
                menu ? "max-sm:h-max" : "max-sm:h-[45px]"
              } transition-all duration-500 `}
            >
              <SearchBox />
              <div className="flex gap-x-2 relative">
                <Link
                  to="#"
                  onClick={toggleMiniCart}
                  className="flex h-10 items-center px-2 rounded-lg border border-gray-200 hover:border-gray-300 focus:outline-none hover:shadow-inner"
                >
                  <svg
                    className="h-6 w-6 leading-none text-gray-300 stroke-current"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                    />
                  </svg>

                  <span className="pl-1 text-gray-500 text-md">{cartItem?.lineItems.length}</span>
                </Link>
                <Link
                  to="/login"
                  className="flex h-10 items-center px-2 rounded-lg border border-gray-200 hover:border-gray-300 focus:outline-none hover:shadow-inner"
                >
                  <svg
                    class="svg-icon"
                    style={{
                      width: "1.5em",
                      height: "1.5em",
                      verticalAlign: "middle",
                      fill: "#b3b6bd",
                      overflow: "hidden",
                    }}
                    viewBox="0 0 1024 1024"
                    version="1.1"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M480 64A416.64 416.64 0 0 0 64 480 416.64 416.64 0 0 0 480 896 416.64 416.64 0 0 0 896 480 416.64 416.64 0 0 0 480 64z m0 64C674.752 128 832 285.248 832 480a351.36 351.36 0 0 1-81.024 225.024 289.408 289.408 0 0 0-162.944-171.776A159.36 159.36 0 0 0 640 416C640 328 568 256 480 256A160.448 160.448 0 0 0 320 416c0 46.272 20.224 88 52.032 117.248a289.024 289.024 0 0 0-162.752 171.776A350.208 350.208 0 0 1 128 480C128 285.248 285.248 128 480 128z m0 192C533.504 320 576 362.496 576 416S533.504 512 480 512A95.36 95.36 0 0 1 384 416C384 362.496 426.496 320 480 320z m0 256c108.8 0 198.016 77.248 218.752 179.776A350.528 350.528 0 0 1 480 832a349.248 349.248 0 0 1-218.496-76.224A222.72 222.72 0 0 1 480 576z"
                      fill=""
                    />
                  </svg>
                  <span className="pl-1 text-gray-500 text-md">
                    {getUserName()}
                  </span>
                </Link>
                {cart && <MiniCart toggleMiniCart={toggleMiniCart} />}
              </div>
            </div>
            <div></div>
          </div>

          {/* Search Mobile */}

          {/* <div className="relative md:hidden my-2">
            <input
              type="search"
              className="mt-1 w-full pl-10 pr-2 h-10 py-1 rounded-lg border border-gray-200 focus:border-gray-300 focus:outline-none focus:shadow-inner leading-none"
              placeholder="Search"
            />

            <svg
              className="h-6 w-6 text-gray-300 ml-2 mt-3 stroke-current absolute top-0 left-0"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div> */}

          {/* ./ Search Mobile */}
        </div>
      </div>
    </>
  );
};

export default Header;
