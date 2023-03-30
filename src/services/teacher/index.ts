import _axios from "..";
import { ITeacher } from "../../types";

export const TeacherService = {
  getTeachers: async (): Promise<ITeacher[]> =>
    (await _axios.get("teacher")).data,
  saveTeacher: async (teacher: Partial<ITeacher>): Promise<ITeacher> =>
    (await _axios.post("teacher", teacher)).data,
  updateTeacher: async (teacher: ITeacher): Promise<ITeacher> =>
    (await _axios.put("teacher", teacher)).data,
  DeleteTeacher: async (teacherId: string): Promise<void> =>
    await _axios.delete(`teacher/${teacherId}`),
};

export default TeacherService;
