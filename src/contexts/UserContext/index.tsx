import React, { useContext, useState, useEffect } from "react";
import AuthService from "@/services/auth";
import StorageService from "@/services/storage/storage.service";
import UserService from "../../services/user";
import { IUser } from "../../types";
import { redirect } from "react-router-dom";

export type UserContextProps = {
  login: (prop: { email: string; password: string }) => Promise<void>;
  userAlredyLoaded?: boolean;
  logout: () => void;
  user?: IUser;
};

export const UserContext = React.createContext<UserContextProps>(
  {} as UserContextProps
);

interface Props {
  children: React.ReactNode;
}

const UserContextProvider = ({ children }: Props) => {
  const [userAlredyLoaded, setuserAlredyLoaded] = useState<boolean>(false);
  const [user, setUser] = useState<IUser>();

  useEffect(() => {
    (async () => {
      if (!user) {
        let storageUser = StorageService.getUser();
        if (storageUser) {
          setUser(storageUser);
          setUser(await UserService.getCurrentUser());
        }
      }
      setuserAlredyLoaded(true);
    })();
  }, [user]);

  useEffect(() => {
    if (user) {
      StorageService.setUser(user);
    }
  }, [user]);

  const handleLogin = async (props: { email: string; password: string }) => {
    const response = await AuthService.login(props);

    StorageService.setAccessToken(response.headers.token || "");
    setUser(response.data);
    redirect("/");
  };

  const logout = () => {
    setUser(undefined);
    StorageService.cleanStorage();
    redirect("/login");
  };

  return (
    <UserContext.Provider
      value={{
        login: handleLogin,
        logout,
        user,
        userAlredyLoaded,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => {
  const context = useContext(UserContext);

  if (context) return context;

  throw new Error("useUserContext must be used within a UserContextProvider.");
};

export default UserContextProvider;
