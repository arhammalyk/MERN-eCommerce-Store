
import {
  Disclosure,
} from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Cart from "./Cart";
import { toggleCart, clearCart } from "../state/userCart/cartSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";

const navigation = [
  { name: "Sign in", to: "/signin" },
  { name: "Join", to: "/signup" },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Navbar() {
  const showCart = useSelector((state) => state.cart.toggleCart);
  const dispatch = useDispatch();
  // const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  // useEffect(() => {
  //   const token = localStorage.getItem("token");
  //   setIsLoggedIn(!!token);
  // }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    // setIsLoggedIn(false);
    dispatch(clearCart());
    navigate("/signin");
  };

  const handleShowCart = () => {
    dispatch(toggleCart());
  };

  return (
    <Disclosure
      as="nav"
      className="bg-[#07141d] transition-all duration-1000 h-16 w-full fixed top-0 z-40"
    >
      {({ open }) => (
        <>
          <div className="fixed right-0 top-16">
            <button
              onClick={handleShowCart}
              className="bg-red-900 text-white p-4 hover:bg-red-800"
            >
              <FontAwesomeIcon icon={faCartShopping} />{" "}
            </button>
          </div>
          {showCart && <Cart />}
          <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-24">
            <div className="relative flex h-[70px] items-center justify-between">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                <Disclosure.Button className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span className="absolute -inset-0.5" />
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
              <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                <div
                  onClick={() => {
                    navigate("/");
                  }}
                  className="text-white cursor-pointer bg-[#091824] flex flex-shrink-0 items-center text-xl"
                >
                  Arham Shop
                </div>
              </div>
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                <div className="hidden sm:ml-6 sm:block">
                  <div className="flex space-x-4">
                    <button
                      onClick={() => navigate("/products")}
                      className={classNames(
                        "text-white hover:text-gray-400 transition-all duration-200 rounded-md px-3 py-2 text-sm font-medium"
                      )}
                    >
                      Products
                    </button>
                    {localStorage.getItem("token") ? (
                      <button
                        onClick={handleLogout}
                        className={classNames(
                          "text-white hover:text-gray-400 transition-all duration-200 rounded-md px-3 py-2 text-sm font-medium"
                        )}
                      >
                        Logout
                      </button>
                    ) : (
                      navigation.map((item) => (
                        <Link
                          key={item.name}
                          to={item.to}
                          className={classNames(
                            "text-white hover:text-gray-400 transition-all duration-200 rounded-md px-3 py-2 text-sm font-medium"
                          )}
                        >
                          {item.name}
                        </Link>
                      ))
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <Disclosure.Panel className="sm:hidden">
            <div className="space-y-1 px-2 pb-3 pt-2 bg-[#07141d]">
              <Disclosure.Button
                as="button"
                onClick={() => navigate("/products")}
                className={classNames(
                  " text-gray-300 hover:bg-gray-700 hover:text-white block rounded-md px-3 py-2 text-base font-medium"
                )}
              >
                Products
              </Disclosure.Button>
              {localStorage.getItem("token") ? (
                <Disclosure.Button
                  as="button"
                  onClick={handleLogout}
                  className={classNames(
                    "text-gray-300 hover:bg-gray-700 hover:text-white block rounded-md px-3 py-2 text-base font-medium"
                  )}
                >
                  Logout
                </Disclosure.Button>
              ) : (
                navigation.map((item) => (
                  <Disclosure.Button
                    key={item.name}
                    as={Link}
                    to={item.to}
                    className={classNames(
                      "text-gray-300 hover:bg-gray-700 hover:text-white block rounded-md px-3 py-2 text-base font-medium"
                    )}
                  >
                    {item.name}
                  </Disclosure.Button>
                ))
              )}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}
