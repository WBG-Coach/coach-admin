import { IRegion } from '@/types';

export const formatRegionPath = (region?: IRegion): string => {
  if (region?.parent) {
    return formatRegionPath(region.parent) + ' / ' + region.name;
  }

  return region?.name || '';
};
