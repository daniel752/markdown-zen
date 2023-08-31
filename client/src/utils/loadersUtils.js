import { toast } from 'react-toastify';
import customRequest from '../../../utils/customRequest.js';
import { redirect } from 'react-router-dom';

export const dashboardLoader = async () => {
  try {
    const { data } = await customRequest.get('/users/current-user');
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

    const fetchCollaboratorsIds = async () => {
      const collaboratorsIds = await Promise.all(
        data.post.collaborators.map(async collaborator => {
          const response = await customRequest.post(
            '/users/get-collaborator-id',
            { collabId: collaborator },
          );
          return response.data;
        }),
      );
      return collaboratorsIds;
    };

    const collaboratorsIds = await fetchCollaboratorsIds();

    const fetchUsers = async () => {
      const collabUsers = await Promise.all(
        collaboratorsIds.map(async value => {
          const data = { userId: value.collaboration.user };
          const response = await customRequest.post('/users/get-user-id', data);
          return response.data;
        }),
      );
      return collabUsers;
    };

    const collabUsers = await fetchUsers();

    data.post.collaborators = collabUsers.map(value => ({
      ...value,
      _id: collaboratorsIds.find(
        collab => collab.collaboration.user === value.user._id,
      )?.collaboration?._id,
      hasEditPermission:
        collaboratorsIds.find(
          collab => collab.collaboration.user === value.user._id,
        )?.collaboration?.hasEditPermission || false,
    }));

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
