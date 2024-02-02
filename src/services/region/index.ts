import _axios from '..';
import { IRegion } from '../../types';

export type RegionBatchResponse = {
  successCount?: number;
  failItems?: string[][];
};

export const RegionService = {
  deleteRegion: async (regionId: string): Promise<IRegion[]> => (await _axios.delete(`region/${regionId}`)).data,
  getRegions: async (): Promise<IRegion[]> => (await _axios.get('region')).data,
  getRegionsTree: async (): Promise<IRegion[]> => (await _axios.get('region/tree')).data,
  getRegion: async (id: string): Promise<IRegion> => (await _axios.get(`region/${id}`)).data,
  saveRegion: async (region: Partial<IRegion>): Promise<IRegion> => (await _axios.post('region', region)).data,
  createRegionBatch: async (batch: string[][]): Promise<RegionBatchResponse> =>
    (await _axios.post(`region/batch`, { batch })).data,
};

export default RegionService;
