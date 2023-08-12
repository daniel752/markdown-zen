import { toast } from 'react-toastify';
import customRequest from '../../../utils/customRequest.js';
import { redirect } from 'react-router-dom';

export const dashboardLoader = async () => {
  try {
    const { data } = await customRequest.get('/users/current-user');
    console.log(data);
    return data;
  } catch (error) {
    return redirect('/');
  }
};

export const allPostsLoader = async ({ request }) => {
  try {
    const params = Object.fromEntries([
      ...new URL(request.url).searchParams.entries(),
    ]);
    console.log(params);
    const { data } = await customRequest.get('/posts', { params });
    return {
      data,
      searchValues: { ...params },
    };
  } catch (error) {
    toast.error(error?.response?.data?.msg);
    return error;
  }
};

export const editPostLoader = async ({ params }) => {
  try {
    const { data } = await customRequest.get(`/posts/${params.id}`);
    return data;
  } catch (error) {
    toast.error(error?.response?.data?.msg);
    return error;
  }
};

export const adminLoader = async () => {
  try {
    const response = await customRequest.get('/users/admin/app-stats');
    return response.data;
  } catch (error) {
    toast.error('You are not authorized to view this page');
    return redirect('/dashboard');
  }
};

export const statsLoader = async () => {
  try {
    const response = await customRequest.get('/posts/stats');
    return response.data;
  } catch (error) {
    return error;
  }
};
