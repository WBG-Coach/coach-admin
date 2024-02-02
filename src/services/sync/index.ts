import _axios from "..";
import { ISync } from "../../types";

export const SyncService = {
  getSyncs: async (): Promise<ISync[]> => (await _axios.get("sync/list")).data,
  saveSync: async (sync: Partial<ISync>): Promise<ISync> =>
    (await _axios.post("sync", sync)).data,
  updateSync: async (sync: ISync): Promise<ISync> =>
    (await _axios.put("sync", sync)).data,
  DeleteSync: async (syncId: string): Promise<void> =>
    await _axios.delete(`sync/${syncId}`),
};

export default SyncService;
