import { toast } from 'react-toastify';
import customRequest from '../../../utils/customRequest.js';
import { redirect } from 'react-router-dom';

// React query and loader for 'Dashboard' page
export const userQuery = {
  queryKey: ['user'],
  queryFn: async () => {
    const { data } = await customRequest.get('/users/current-user');
    return data;
  },
};

export const dashboardLoader = queryClient => async () => {
  try {
    return await queryClient.ensureQueryData(userQuery);
  } catch (error) {
    return redirect('/');
  }
};

// React query and loader for 'AllPosts' page
export const allPostsQuery = params => {
  const { search, status, categories, tags, sort, page } = params;
  return {
    queryKey: [
      'posts',
      search ?? '',
      status ?? 'all',
      categories ?? '',
      tags ?? '',
      sort ?? 'newest',
      page ?? 1,
    ],
    queryFn: async () => {
      const { data } = await customRequest.get('/posts', { params });
      return data;
    },
  };
};

export const allPostsLoader =
  queryClient =>
  async ({ request }) => {
    const params = Object.fromEntries([
      ...new URL(request.url).searchParams.entries(),
    ]);
    await queryClient.ensureQueryData(allPostsQuery(params));
    return {
      searchValues: { ...params },
    };
  };

// React query and loader for 'EditPost' page
export const singlePostQuery = id => {
  return {
    queryKey: ['post', id],
    queryFn: async () => {
      const { data } = await customRequest.get(`/posts/${id}`);
      return data;
    },
  };
};

export const editPostLoader =
  queryClient =>
  async ({ params }) => {
    try {
      await queryClient.ensureQueryData(singlePostQuery(params.id));
      return params.id;
    } catch (error) {
      toast.error(error?.response?.data?.msg);
      return error;
    }
  };

// React query and loader for 'Admin' page
export const adminLoader = async () => {
  try {
    const response = await customRequest.get('/users/admin/app-stats');
    return response.data;
  } catch (error) {
    toast.error('You are not authorized to view this page');
    return redirect('/dashboard');
  }
};

// React query and loader for 'Stats' page
export const statsQuery = {
  queryKey: ['stats'],
  queryFn: async () => {
    const response = await customRequest.get('/posts/stats');
    return response.data;
  },
};

export const statsLoader = queryClient => async () => {
  return await queryClient.ensureQueryData(statsQuery);
};
