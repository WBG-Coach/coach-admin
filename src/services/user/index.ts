import _axios from '..';
import { IUser } from '../../types';

export const UserService = {
  getCurrentUser: async (): Promise<IUser> => (await _axios.get('auth')).data,

  getUsers: async (): Promise<IUser[]> => (await _axios.get('users/admin')).data,
  removeUser: async (user_id: IUser['id']): Promise<void> => (await _axios.delete(`users/admin/${user_id}`)).data,
  updateUser: async (user_id: IUser['id'], body: Partial<IUser>): Promise<IUser[]> =>
    (await _axios.patch(`users/admin/${user_id}`, body)).data,
};

export default UserService;
