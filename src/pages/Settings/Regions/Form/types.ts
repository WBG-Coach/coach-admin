import { IRegion } from '@/types';

export type Props = {
  isOpen: boolean;
  handleClose: () => void;
  regionId?: IRegion['id'];
  handleSubmitForm: (region: IRegion) => Promise<void>;
};
