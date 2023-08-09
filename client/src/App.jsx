/* eslint-disable no-unused-vars */
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import {
  HomeLayout,
  Landing,
  Register,
  Login,
  DashboardLayout,
  Error,
  AddPost,
  AllPosts,
  Stats,
  Profile,
  Admin,
  EditPost,
} from './pages';
import {
  loginAction,
  registerAction,
  addPostAction,
  editPostAction,
  deletePostAction,
  updateUserAction,
} from './utils/actionsUtils.js';
import {
  adminLoader,
  allPostsLoader,
  dashboardLoader,
  editPostLoader,
  statsLoader,
} from './utils/loadersUtils';

const checkDefaultTheme = () => {
  const isDarkTheme = localStorage.getItem('darkTheme') === 'true';
  document.body.classList.toggle('dark-theme', isDarkTheme);
  return isDarkTheme;
};

const isDarkThemeEnabled = checkDefaultTheme();

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomeLayout />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <Landing />,
      },
      {
        path: 'register',
        element: <Register />,
        action: registerAction,
      },
      {
        path: 'login',
        element: <Login />,
        action: loginAction,
      },
      {
        path: 'dashboard',
        element: <DashboardLayout isDarkThemeEnabled={isDarkThemeEnabled} />,
        loader: dashboardLoader,
        children: [
          {
            index: true,
            element: <AddPost />,
            action: addPostAction,
          },
          {
            path: 'all-posts',
            element: <AllPosts />,
            loader: allPostsLoader,
          },
          {
            path: 'stats',
            element: <Stats />,
            loader: statsLoader,
          },
          {
            path: 'profile',
            element: <Profile />,
            action: updateUserAction,
          },
          {
            path: 'admin',
            element: <Admin />,
            loader: adminLoader,
          },
          {
            path: 'edit-post/:id',
            element: <EditPost />,
            loader: editPostLoader,
            action: editPostAction,
          },
          {
            path: 'delete-post/:id',
            action: deletePostAction,
          },
        ],
      },
    ],
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
