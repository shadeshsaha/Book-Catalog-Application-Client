import { useEffect } from "react";
import { Toaster } from "react-hot-toast";
import { useDispatch } from "react-redux";
import "./App.css";
import MainLayout from "./layouts/MainLayout";
import { setLoading, setUserEmail } from "./redux/features/auth/authSlice";

function App() {
  
  const checkIfUserIsAuthenticated = () => {
    const token = localStorage.getItem("token");
    return !!token;
  };
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setLoading(true));
    const isAuthenticated = checkIfUserIsAuthenticated();

    if (isAuthenticated) {
      const userEmail = localStorage.getItem("email");
      dispatch(setUserEmail({ data: { email: userEmail } }));
      dispatch(setLoading(false));
    }
    dispatch(setLoading(false));
  }, [dispatch]);



  return (
    <>
      <Toaster />
      <MainLayout />
    </>
  );
}

export default App;
