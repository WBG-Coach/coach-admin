import _axios from "..";
import { ICoach } from "../../types";

export const CoachService = {
  getCoaches: async (): Promise<ICoach[]> => (await _axios.get("coach")).data,
  saveCoach: async (coach: Partial<ICoach>): Promise<ICoach> =>
    (await _axios.post("coach", coach)).data,
  updateCoach: async (coach: ICoach): Promise<ICoach> =>
    (await _axios.put("coach", coach)).data,
  DeleteCoach: async (coachId: string): Promise<void> =>
    await _axios.delete(`coach/${coachId}`),
};

export default CoachService;
