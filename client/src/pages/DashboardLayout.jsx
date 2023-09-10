/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import {
  Navigate,
  Outlet,
  useLoaderData,
  useNavigate,
  useNavigation,
} from 'react-router-dom';
import { createContext, useContext, useState } from 'react';
import Wrapper from '../assets/wrappers/Dashboard';
import { SmallSidebar, BigSidebar, Navbar, Loading } from '../components';
import customRequest from '../../../utils/customRequest';
import { dashboardLoader, userQuery } from '../utils/loadersUtils';
import { toast } from 'react-toastify';
import { useQuery } from '@tanstack/react-query';

const DashboardContext = createContext();

const DashboardLayout = ({ isDarkThemeEnabled, queryClient }) => {
  const { user } = useQuery(userQuery).data;
  const navigate = useNavigate();
  const navigation = useNavigation();
  const isPageLoading = navigation.state === 'loading';
  const [showSidebar, setShowSidebar] = useState(false);
  const [isDarkTheme, setIsDarkTheme] = useState(isDarkThemeEnabled);

  const toggleDarkTheme = () => {
    const newTheme = !isDarkTheme;
    setIsDarkTheme(newTheme);
    document.body.classList.toggle('dark-theme', newTheme);
    localStorage.setItem('darkTheme', newTheme);
  };

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  const logoutUser = async () => {
    navigate('/');
    await customRequest('/auth/logout');
    queryClient.invalidateQueries();
    toast.success('bye bye');
  };

  return (
    <DashboardContext.Provider
      value={{
        user,
        showSidebar,
        isDarkTheme,
        toggleDarkTheme,
        toggleSidebar,
        logoutUser,
      }}
    >
      <Wrapper>
        <main className="dashboard">
          <SmallSidebar />
          <BigSidebar />
          <div>
            <Navbar />
            <div className="dashboard-page">
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
