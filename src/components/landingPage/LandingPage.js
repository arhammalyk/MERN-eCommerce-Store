import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { actionFetchUserData } from "../../state/user/userSlice";
import Carousal from "./Carousal";
import FeaturedProducts from "./FeaturedProducts";

function LandingPage() {
  const dispatch = useDispatch();
  useEffect(() => {
    if (localStorage.getItem("token")) {
      dispatch(actionFetchUserData());
    }
  }, [dispatch]);
  return (
    <>
      <div className="mt-14">
        <Carousal />
        <FeaturedProducts />
        </div>
    </>
  );
}

export default LandingPage;
