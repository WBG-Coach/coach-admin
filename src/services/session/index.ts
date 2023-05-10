import _axios from "..";
import { ISession } from "../../types";

export const SessionService = {
  getSessions: async (): Promise<ISession[]> =>
    (await _axios.get("session")).data,
  saveSession: async (session: Partial<ISession>): Promise<ISession> =>
    (await _axios.post("session", session)).data,
  updateSession: async (session: ISession): Promise<ISession> =>
    (await _axios.put("session", session)).data,
  DeleteSession: async (id: string): Promise<void> =>
    await _axios.delete(`session/${id}`),
};

export default SessionService;
