import { IDashboard } from '@/types';
import _axios from '..';

export const DashboardService = {
  getData: async (regionId?: string, district?: string, schoolId?: string): Promise<IDashboard> =>
    (await _axios.get<IDashboard>('dashboard', { params: { regionId, district, schoolId } })).data,
};

export default DashboardService;
