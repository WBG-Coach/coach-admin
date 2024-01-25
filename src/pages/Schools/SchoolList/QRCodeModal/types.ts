import { ISchool } from '@/types';

export type Props = {
  handleClose: () => void;
  schoolKey?: string;
  school?: ISchool;
};
