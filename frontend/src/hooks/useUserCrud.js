import { useQuery, useMutation } from 'react-query';
import {
  fetchAllUsers,
  createUser,
  updateUser,
  deleteUser
} from '../api/userApi';
import { toast } from 'react-toastify';

export const useUserCrud = () => {
  const { data: users, refetch } = useQuery('users', fetchAllUsers);

  const createMutation = useMutation(createUser, {
    onSuccess: () => {
      toast.success('User added successfully');
      refetch();
    },
    onError: () => toast.error('Failed to add user')
  });

  const updateMutation = useMutation(
    ({ id, userData }) => updateUser(id, userData),
    {
      onSuccess: () => {
        toast.success('User updated successfully');
        refetch();
      },
      onError: () => toast.error('Failed to update user')
    }
  );

  const deleteMutation = useMutation(deleteUser, {
    onSuccess: () => {
      toast.success('User deleted successfully');
      refetch();
    },
    onError: () => toast.error('Failed to delete user')
  });

  return { users, createMutation, updateMutation, deleteMutation };
};
