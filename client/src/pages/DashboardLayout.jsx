import { Outlet, redirect, useLoaderData, useNavigate } from "react-router-dom";
import Wrapper from "../assets/wrappers/Dashboard";
import { Navbar, SmallSidebar, BigSidebar } from "../components";
import { useState, createContext, useContext } from "react";
import { checkDarkTheme } from "../App";
import customFetch from "../utils/customFetch";
import { toast } from "react-toastify";

export const loader = async () => {
  try {
    const { data } = await customFetch.get('/users/current-user')
    return data
  } catch (error) {
    return redirect('/')
  }
}

const DashboardContext = createContext();

const DashboardLayout = () => {
  const navigate = useNavigate()

  const {user} = useLoaderData()
  const [showSidebar, setShowSidebar] = useState(false);
  const [isDarkTheme, setIsDarkTheme] = useState(checkDarkTheme());

  const toggleTheme = () => {
    const newDarkTheme = !isDarkTheme;
    setIsDarkTheme(newDarkTheme);
    document.body.classList.toggle("dark-theme", newDarkTheme);
    localStorage.setItem("darkTheme", newDarkTheme);
  };

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
    console.log(showSidebar);
  };

  const logoutUser = async () => {
    navigate('/')
    await customFetch.get('/auth/logout')
    toast.success('Logging out')
  };

  return (
    <DashboardContext.Provider
      value={{
        user,
        toggleTheme,
        toggleSidebar,
        logoutUser,
        showSidebar,
        isDarkTheme,
      }}
    >
      <Wrapper>
        <main className="dashboard">
          <SmallSidebar />
          <BigSidebar />
          <div>
            <Navbar />
            <div className="dashboard-page">
              <Outlet context={{user}}/>
            </div>
          </div>
        </main>
      </Wrapper>
    </DashboardContext.Provider>
  );
};

export const useDashboardContext = () => useContext(DashboardContext);
export default DashboardLayout;
