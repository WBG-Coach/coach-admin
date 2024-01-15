import React, { useContext, useState, useEffect } from 'react';
import StorageService from '@/services/storage/storage.service';
import { redirect } from 'react-router-dom';
import AuthService from '@/services/auth';
import { IRegion, IUser } from '../../types';
import { toast } from 'react-toastify';
import UserService from '@/services/user';
import { useTranslation } from 'react-i18next';

export type UserContextProps = {
  login: (prop: { email: string; code: string }) => Promise<void>;
  sendOTPCode: (email: string) => Promise<void>;
  handleUpdateUser: (user: Partial<IUser>) => Promise<void>;
  updateLocalUser: (user: IUser) => void;
  logout: () => void;
  user?: IUser;
  userRegionsPath: IRegion[];
};

export const UserContext = React.createContext<UserContextProps>({} as UserContextProps);

interface Props {
  children: React.ReactNode;
}

const UserContextProvider = ({ children }: Props) => {
  const [user, setUser] = useState<IUser>();
  const { i18n } = useTranslation();
  const [userRegionsPath, setUserRegionsPath] = useState<IRegion[]>([]);

  useEffect(() => {
    let storageUser = StorageService.getUser();
    if (storageUser) {
      setUser(storageUser);
      if (storageUser.language) i18n.changeLanguage(storageUser.language);
    }
  }, []);

  useEffect(() => {
    if (user) {
      const makeRegionPath = (region: IRegion): IRegion[] => {
        if (region.parent) return [...makeRegionPath(region.parent), region];
        return [region];
      };

      if (user.region) {
        const regionPath = makeRegionPath(user.region);
        setUserRegionsPath(regionPath);
      }
    }
  }, [user]);

  const handleLogin = async (props: { email: string; code: string }) => {
    const response = await AuthService.login(props);
    console.log({ response });

    setUser(response.data);
    StorageService.setUser(response.data);
    StorageService.setAccessToken(response.headers.token || '');
  };

  const handleUpdateUser = async (userToUpdate: Partial<IUser & { currentPassword?: string }>) => {
    try {
      if (user) {
        const newUser = { ...user, ...userToUpdate };
        await UserService.updateUser(newUser.id || user?.id, userToUpdate);
        StorageService.setUser(newUser);

        setUser(newUser);
      }
    } catch (err) {
      toast.error(
        !!userToUpdate.currentPassword ? 'Your current password is wrong' : 'An error as ocurred on update user',
      );
    }
  };

  const logout = () => {
    setUser(undefined);
    StorageService.cleanStorage();
  };

  const updateLocalUser = async (user: IUser) => {
    StorageService.setUser(user);
    setUser(user);
  };

  const sendOTPCode = async (email: string) => {
    await AuthService.sendOTPCode(email);
  };

  return (
    <UserContext.Provider
      value={{
        logout,
        sendOTPCode,
        updateLocalUser,
        handleUpdateUser,
        login: handleLogin,
        user,
        userRegionsPath,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => {
  const context = useContext(UserContext);

  if (context) return context;

  throw new Error('useUserContext must be used within a UserContextProvider.');
};

export default UserContextProvider;
