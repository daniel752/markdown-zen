/* eslint-disable no-unused-vars */
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
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
  ViewPost,
} from './pages';
import {
  loginAction,
  registerAction,
  addPostAction,
  editPostAction,
  deletePostAction,
  updateUserAction,
  downloadPostAction,
} from './utils/actionsUtils.js';
import {
  adminLoader,
  allPostsLoader,
  dashboardLoader,
  editPostLoader,
  statsLoader,
} from './utils/loadersUtils';
import { ErrorElement } from './components';

const checkDefaultTheme = () => {
  const isDarkTheme = localStorage.getItem('darkTheme') === 'true';
  document.body.classList.toggle('dark-theme', isDarkTheme);
  return isDarkTheme;
};

const isDarkThemeEnabled = checkDefaultTheme();

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // Query cache will be available for 5 minutes
    },
  },
});

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
        action: loginAction(queryClient),
      },
      {
        path: 'dashboard',
        element: (
          <DashboardLayout
            isDarkThemeEnabled={isDarkThemeEnabled}
            queryClient={queryClient}
          />
        ),
        loader: dashboardLoader(queryClient),
        children: [
          {
            index: true,
            element: <AddPost />,
            action: addPostAction(queryClient),
          },
          {
            path: 'all-posts',
            element: <AllPosts />,
            loader: allPostsLoader(queryClient),
            errorElement: <ErrorElement />,
          },
          {
            path: 'stats',
            element: <Stats />,
            loader: statsLoader(queryClient),
            errorElement: <ErrorElement />,
          },
          {
            path: 'profile',
            element: <Profile />,
            action: updateUserAction(queryClient),
          },
          {
            path: 'admin',
            element: <Admin />,
            loader: adminLoader,
          },
          {
            path: 'edit-post/:id',
            element: <EditPost />,
            loader: editPostLoader(queryClient),
            action: editPostAction(queryClient),
          },
          {
            path: 'view-post/:id',
            element: <ViewPost />,
            loader: editPostLoader,
          },
          {
            path: 'delete-post/:id',
            action: deletePostAction(queryClient),
          },
          {
            path: 'download-post',
            action: downloadPostAction,
          },
        ],
      },
    ],
  },
]);

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};

export default App;
