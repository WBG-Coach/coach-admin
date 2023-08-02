import _axios from '..';
import { IUser } from '../../types';

type UserLoginParams = {
  email: IUser['email'];
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
  login: (body: UserLoginParams): Promise<any> => _axios.post('auth', body),
  signup: (body: IUser): Promise<IUser> => _axios.post('users/admin/sign-up', body),
  getGuestToken: () => _axios.get<string>('auth/superset'),
};

export default AuthService;
