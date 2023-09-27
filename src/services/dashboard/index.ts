import { IDashboard } from '@/types';
import _axios from '..';

export const DashboardService = {
  getData: async (region?: string): Promise<IDashboard> =>
    (await _axios.get<IDashboard>('dashboard', { params: { region } })).data,
};

export default DashboardService;
