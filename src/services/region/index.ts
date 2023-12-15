import _axios from '..';
import { IRegion } from '../../types';

export const RegionService = {
  getRegions: async (): Promise<IRegion[]> => (await _axios.get('region')).data,
  getRegionsTree: async (): Promise<IRegion[]> => (await _axios.get('region/tree')).data,
  getRegion: async (id: string): Promise<IRegion> => (await _axios.get(`region/${id}`)).data,
  saveRegion: async (region: Partial<IRegion>): Promise<IRegion> => (await _axios.post('region', region)).data,
};

export default RegionService;
