import _axios from '..';
import { IRegion } from '../../types';

export const RegionService = {
  getRegions: async (): Promise<IRegion[]> => (await _axios.get('region')).data,
  saveRegion: async (region: Partial<IRegion>): Promise<IRegion> => (await _axios.post('region', region)).data,
  updateRegion: async (regionId: string, region: IRegion): Promise<IRegion> =>
    (await _axios.patch(`region/${regionId}`, region)).data,
};

export default RegionService;
