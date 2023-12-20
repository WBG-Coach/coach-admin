import { IDashboard } from '@/types';
import _axios from '..';
import { Range } from 'react-date-range';

export const DashboardService = {
  getData: async (regionId?: string, dataRange?: Range): Promise<IDashboard> =>
    (
      await _axios.get<IDashboard>('dashboard', {
        params: { regionId, startDate: dataRange?.startDate, endDate: dataRange?.endDate },
      })
    ).data,
};

export default DashboardService;
