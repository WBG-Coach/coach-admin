import React, { useContext, useState, useEffect } from "react";
import StorageService from "@/services/storage/storage.service";
import { redirect } from "react-router-dom";
import AuthService from "@/services/auth";
import { IUser } from "../../types";

export type UserContextProps = {
  login: (prop: { email: string; password: string }) => Promise<void>;
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
  const [user, setUser] = useState<IUser>();

  useEffect(() => {
    let storageUser = StorageService.getUser();
    if (storageUser) {
      setUser(storageUser);
    }
  }, []);

  const handleLogin = async (props: { email: string; password: string }) => {
    const response = await AuthService.login(props);

    setUser(response.data);
    StorageService.setUser(response.data);
    StorageService.setAccessToken(response.headers.token || "");
  };

  const logout = () => {
    console.log("saindo");
    setUser(undefined);
    StorageService.cleanStorage();
  };

  return (
    <UserContext.Provider
      value={{
        login: handleLogin,
        logout,
        user,
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
