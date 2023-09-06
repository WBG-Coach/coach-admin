import { IDashboard } from '@/types';
import _axios from '..';

export const DashboardService = {
  getData: async (): Promise<IDashboard> => (await _axios.get<IDashboard>('dashboard')).data,
};

export default DashboardService;
