import { IUser } from '@/types';
import { SubmitHandler } from 'react-hook-form';

export type Props = {
  defaultValues: IUser;
  handleClose: () => void;
  handleSubmitForm: SubmitHandler<IUser>;
};
