import _axios from "..";
import { ICompetence } from "../../types";

export const CompetenceService = {
  getCompetences: async (): Promise<ICompetence[]> =>
    (await _axios.get("competence")).data,
  saveCompetence: async (session: Partial<ICompetence>): Promise<ICompetence> =>
    (await _axios.post("competence", session)).data,
  updateCompetence: async (session: ICompetence): Promise<ICompetence> =>
    (await _axios.put("competence", session)).data,
  deleteCompetence: async (id: string): Promise<void> =>
    await _axios.delete(`competence/${id}`),
};

export default CompetenceService;
