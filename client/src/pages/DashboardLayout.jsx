import {
  Outlet,
  redirect,
  useLoaderData,
  useNavigate,
  useNavigation,
} from 'react-router-dom';
import Wrapper from '../assets/wrappers/Dashboard';
import { Navbar, SmallSidebar, BigSidebar, Loading } from '../components';
import { useState, createContext, useContext, useEffect } from 'react';
import { checkDarkTheme } from '../App';
import customFetch from '../utils/customFetch';
import { toast } from 'react-toastify';
import { useQuery, useQueryClient } from '@tanstack/react-query';

const queryObject = {
  queryKey: ['user'],
  queryFn: async () => {
    const response = await customFetch.get('/users/current-user');
    return response.data;
  },
};

export const loader = (queryClient) => async () => {
  try {
    return await queryClient.ensureQueryData(queryObject);
  } catch (error) {
    return redirect('/');
  }
};

const DashboardContext = createContext();

const DashboardLayout = () => {
  const queryClient = useQueryClient()
  const { data } = useQuery(queryObject);
  
  const [isAuthError,setIsAuthError] = useState()

  const navigate = useNavigate();
  const navigation = useNavigation();

  const isPageLoading = navigation.state === 'loading';

  const { user } = data;
  const [showSidebar, setShowSidebar] = useState(false);
  const [isDarkTheme, setIsDarkTheme] = useState(checkDarkTheme());

  const toggleTheme = () => {
    const newDarkTheme = !isDarkTheme;
    setIsDarkTheme(newDarkTheme);
    document.body.classList.toggle('dark-theme', newDarkTheme);
    localStorage.setItem('darkTheme', newDarkTheme);
  };

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  const logoutUser = async () => {
    navigate('/');
    await customFetch.get('/auth/logout');
    await queryClient.invalidateQueries()
    toast.success('Logging out');
  };

  customFetch.interceptors.response.use((response) => {
    return response
  }, (error) => {
    if (error?.response?.status === 401) {
      setIsAuthError(true)
    }
    return Promise.reject(error)
  })

  useEffect(() => {
    if (!isAuthError) return
    logoutUser()
  },[isAuthError])

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
        <main className='dashboard'>
          <SmallSidebar />
          <BigSidebar />
          <div>
            <Navbar />
            <div className='dashboard-page'>
              {isPageLoading ? <Loading /> : <Outlet context={{ user }} />}
            </div>
          </div>
        </main>
      </Wrapper>
    </DashboardContext.Provider>
  );
};

export const useDashboardContext = () => useContext(DashboardContext);
export default DashboardLayout;
