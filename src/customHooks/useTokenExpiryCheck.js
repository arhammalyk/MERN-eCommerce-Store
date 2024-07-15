import { useEffect } from "react";

const useTokenExpiryCheck = () => {
  useEffect(() => {
    const checkTokenExpiry = () => {
      const tokenExpiry = localStorage.getItem("tokenExpiry");
      if (tokenExpiry && new Date().getTime() > tokenExpiry) {
        localStorage.removeItem("token");
        localStorage.removeItem("tokenExpiry");
        alert("Session has expired. Please log in again.");
      }
    };

    checkTokenExpiry();
    const interval = setInterval(checkTokenExpiry, 60000); // Check every minute
    return () => clearInterval(interval); // Cleanup on unmount
  }, []);
};

export default useTokenExpiryCheck;
