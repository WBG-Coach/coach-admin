import _axios from "..";
import { IUser } from "../../types";

export const UserService = {
  getCurrentUser: async (): Promise<IUser> => (await _axios.get("auth")).data,

  getUsers: async (): Promise<IUser[]> => (await _axios.get("users/admin")).data,
};

export default UserService;
