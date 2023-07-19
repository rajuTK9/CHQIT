import React, { useEffect } from "react";
import { useAppSelector, useAppDispatch } from "./app/hooks";
import { setToken, setUser, unsetUser } from "./features/auth/authSlice";
import Cookies from "js-cookie";
import Navbar from "./components/Navbar";
import { Route, Routes } from "react-router-dom";
import Main from "./pages/Main";
import Register from "./pages/Register";
import Login from "./pages/Login";

function App() {
  const auth = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  useEffect(() => {
    const getUserDetails = async () => {
      try {
        const res = await fetch(
          `${process.env.REACT_APP_SERVER_URL}/api/user/detail`,
          {
            method: "GET",
            headers: {
              "Content-type": "application/json",
              Authorization: `Bearer ${auth.token}`,
            },
          }
        );
        const data = await res.json();
        let { name, email, id } = data.data;
        dispatch(setUser({ id, name, email }));
      } catch (error) {
        console.error("Couldn't get user details:", error);
        dispatch(unsetUser());
      }
    };
    const token = Cookies.get("access_token");
    token && dispatch(setToken(token));
    auth.token && getUserDetails();
  }, [auth.token, dispatch]);
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/register" Component={Register} />
        <Route path="/home" Component={Main} />
        <Route path="/login" Component={Login} />
      </Routes>
    </div>
  );
}

export default App;
