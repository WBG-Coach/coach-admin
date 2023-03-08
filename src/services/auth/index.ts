import _axios from "..";
import { IUser } from "../../types";

type UserLoginParams = {
  email: IUser["email"];
  password: string;
};

export type UserSignUpParams = {
  name: string;
  surname: string;
  email: string;
  password: string;
  image_url?: string;
  phone?: string;
};

export const AuthService = {
  login: (body: UserLoginParams): Promise<any> =>
    _axios.post("auth/admin/login", body),

  signUp: (body: UserSignUpParams) => _axios.post("auth/user/sign-up", body),

  changePassword: (body: { password: string }, code?: string) =>
    _axios.post(`auth/user/change-password${code ? `/${code}` : ""}`, body),
};

export default AuthService;
