import { User } from "../../types";

const StorageService = {
  getAccessToken: (): string | undefined => {
    const localAccessToken = localStorage.getItem("accessToken");
    if (localAccessToken) return localAccessToken;
    return undefined;
  },

  setAccessToken: (token: string): void => {
    localStorage.setItem("accessToken", token);
  },

  getUser: (): User | undefined => {
    const localUser = localStorage.getItem("user");
    if (localUser) return JSON.parse(localUser);
    return undefined;
  },

  setUser: (user: User): void => {
    localStorage.setItem("user", JSON.stringify(user));
  },

  cleanStorage: (): void => {
    localStorage.clear();
  },
};

export default StorageService;
