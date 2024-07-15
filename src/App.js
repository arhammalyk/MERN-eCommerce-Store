import Navbar from "./components/NavBar";
import OrderSummary from "./components/OrderSummary";
import PageNotFound from "./components/PageNotFound";
import ProductDetails from "./components/ProductDetails";
import Products from "./components/Products";
import Signin from "./components/Signin";
import Signup from "./components/Signup";
// eslint-disable-next-line
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import useTokenExpiryCheck from "./customHooks/useTokenExpiryCheck";
import LandingPage from "./components/landingPage/LandingPage";

function App() {
  useTokenExpiryCheck();
  return (
    <>
      <Navbar />
      <Routes>
        <Route exact path="/" element={<LandingPage />} />
        <Route exact path="/products" element={<Products />} />
        <Route exact path="/products/:productId" element={<ProductDetails />} />
        <Route exact path="/signup" element={<Signup />} />
        <Route exact path="/signin" element={<Signin />} />
        <Route exact path="/orderSummary" element={<OrderSummary />} />
        <Route exact path="*" element={<PageNotFound />} />
      </Routes>
    </>
  );
}

export default App;
