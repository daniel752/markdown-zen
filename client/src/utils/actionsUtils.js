import { redirect } from 'react-router-dom';
import customRequest from '../../../utils/customRequest';
import { toast } from 'react-toastify';

// Async function to handle register form action
export const registerAction = async ({ request }) => {
  // Get form data from request
  const formData = await request.formData();
  // Create object from key-value entries
  const data = Object.fromEntries(formData);
  try {
    // Register user
    await customRequest.post('/auth/register', data);
    toast.success('Registration completed');
    // If register was successful then redirect user to login page
    return redirect('/login');
  } catch (error) {
    toast.error(error?.response?.data?.msg);
    return error;
  }
};

export const loginAction = async ({ request }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  try {
    await customRequest.post('/auth/login', data);
    toast.success(`Welcome ${data.email} to MySpot`);
    return redirect('/dashboard');
  } catch (error) {
    toast.error(error?.response?.data?.msg);
    return error;
  }
};

export const addPostAction = async ({ request }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  console.log(data);
  data.tags = JSON.parse(data.tags);
  data.categories = JSON.parse(data.categories);
  // console.log(JSON.parse(data.tags));

  try {
    await customRequest.post('/posts', data);
    toast.success(`Added Post ${data.title} to your posts`);
    return redirect('/dashboard/all-posts');
  } catch (error) {
    toast.error(error?.response?.data?.msg);
    return error;
  }
};

export const editPostAction = async ({ request, params }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);

  data.categories = JSON.parse(data.categories);
  data.tags = JSON.parse(data.tags);

  try {
    await customRequest.patch(`/posts/${params.id}`, data);
    toast.success('Post updated');
    return redirect('/dashboard/all-posts');
  } catch (error) {
    toast.error(error?.response?.data?.msg);
    return error;
  }
};

export const deletePostAction = async ({ params }) => {
  try {
    await customRequest.delete(`/posts/${params.id}`);
    toast.success('Post deleted');
    return redirect('/dashboard/all-posts');
  } catch (error) {
    toast.error(error?.response?.data?.msg);
    return error;
  }
};

export const updateUserAction = async ({ request }) => {
  const formData = await request.formData();
  const file = formData.get('avatar');

  if (file && file.size > 500000) {
    toast.error('Image size is too large');
    return null;
  }

  try {
    await customRequest.patch('users/update-user', formData);
    toast.success('Profile updated');
  } catch (error) {
    toast.error(error?.response?.data?.msg);
  }

  return null;
};
