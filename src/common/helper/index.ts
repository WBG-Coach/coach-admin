import { IRegion } from '@/types';

export const formatRegionPath = (region?: IRegion): string => {
  console.log(region);
  if (region?.parent) {
    return formatRegionPath(region.parent) + ' / ' + region.name;
  }

  return region?.name || '';
};
