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
  data.categories = data.categories.split(',');
  data.tags = data.tags.split(',');

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

  data.categories = data.categories.split(',');
  data.tags = data.tags.split(',');
  console.log(data);

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

export const downloadPostAction = async ({ request }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  const { markdown } = data;
  const { title } = JSON.parse(markdown);
  const downloadName = `${title.toLowerCase().split(' ').join('_')}.md`;
  try {
    const response = await customRequest.post('posts/download-post', data, {
      responseType: 'blob', // Indicate that the response is a binary blob
    });
    console.log(response);
    // Create a blob URL from the response
    const blob = new Blob([response.data], { type: 'text/markdown' });
    const blobUrl = URL.createObjectURL(blob);

    // Create a temporary anchor element to trigger the download
    const link = document.createElement('a');
    link.href = blobUrl;
    link.download = downloadName; // Set the desired filename
    link.click();

    // Clean up the blob URL
    URL.revokeObjectURL(blobUrl);

    toast.success('Post downloaded');
    await customRequest.post('posts/remove-downloaded-file', { downloadName });

    return redirect('/dashboard/all-posts');
  } catch (error) {
    toast.error(error?.response?.data?.mgs);
    return error;
  }
};
