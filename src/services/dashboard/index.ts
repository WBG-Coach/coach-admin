import { IDashboard } from '@/types';
import _axios from '..';

export const DashboardService = {
  getData: async (region?: string, schoolId?: string): Promise<IDashboard> =>
    (await _axios.get<IDashboard>('dashboard', { params: { region, schoolId } })).data,
};

export default DashboardService;
