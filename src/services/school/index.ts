import _axios from '..';
import { ISchool } from '../../types';

export const SchoolService = {
  getSchools: async (): Promise<ISchool[]> => (await _axios.get('school')).data,
  saveSchool: async (school: Partial<ISchool>): Promise<ISchool> => (await _axios.post('school', school)).data,
  updateSchool: async (school: ISchool): Promise<ISchool> => (await _axios.put('school', school)).data,
  DeleteSchool: async (schoolId: string): Promise<void> => await _axios.delete(`school/${schoolId}`),
  generateQrCode: async (schoolId: string): Promise<string> => (await _axios.get(`school/qrcode/${schoolId}`)).data,
};

export default SchoolService;
