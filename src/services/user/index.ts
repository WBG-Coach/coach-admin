import _axios from "..";
import { IUser } from "../../types";

export const UserService = {
  getCurrentUser: async (): Promise<IUser> => (await _axios.get("user")).data,
};

export default UserService;
