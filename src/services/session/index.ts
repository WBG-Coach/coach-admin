import { ISessionData } from '@/pages/SessionData/SessionList';
import _axios from '..';
import { ISession } from '../../types';
import { ISessionOverTime } from '@/pages/CoachOverTime/SessionList';

export const SessionService = {
  getSessions: async (): Promise<ISession[]> => (await _axios.get('session')).data,
  getSessionData: async (
    period?: string,
    region?: string,
    schoolId?: string,
    showOnlyWithValues?: boolean,
  ): Promise<ISessionData[]> =>
    (await _axios.get('session-data', { params: { period, region, schoolId, showOnlyWithValues } })).data,
  getSessionOverTime: async (
    region?: string,
    schoolId?: string,
    showOnlyWithValues?: boolean,
  ): Promise<ISessionOverTime[]> =>
    (await _axios.get('session-over-time', { params: { region, schoolId, showOnlyWithValues } })).data,
  saveSession: async (session: Partial<ISession>): Promise<ISession> => (await _axios.post('session', session)).data,
  updateSession: async (session: ISession): Promise<ISession> => (await _axios.put('session', session)).data,
  DeleteSession: async (id: string): Promise<void> => await _axios.delete(`session/${id}`),
};

export default SessionService;
