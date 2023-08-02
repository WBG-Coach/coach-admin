import _axios from '..';
import { ICoach, ILogs } from '../../types';

export const LogsService = {
  getLogs: async (): Promise<ILogs[]> => (await _axios.get('logs')).data,
};

export default LogsService;
