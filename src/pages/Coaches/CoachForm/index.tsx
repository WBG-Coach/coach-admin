import { ICoach } from '@/types';
import {
  Input,
  Button,
  FormLabel,
  FormControl,
  FormErrorMessage,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
  DrawerFooter,
} from '@chakra-ui/react';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

type Props = {
  isOpen: boolean;
  isSubmitting: boolean;
  coachToEdit?: ICoach;
  onClose: () => void;
  onSubmit: (coach: Partial<ICoach>) => void;
};

const CoachForm: React.FC<Props> = ({ isOpen, coachToEdit, onClose, onSubmit }) => {
  const { t } = useTranslation();
  const {
    register,
    handleSubmit,
    resetField,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (coachToEdit) {
      resetField('name');
      resetField('surname');
    }
  }, [coachToEdit]);

  return (
    <Drawer isOpen={isOpen} placement="right" onClose={onClose} size="md">
      <DrawerOverlay />
      <DrawerContent roundedLeft={14}>
        {isOpen && (
          <form onSubmit={handleSubmit(onSubmit)} style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
            <DrawerCloseButton mt={2} color="Primary.$200" />

            <DrawerHeader>{t(coachToEdit ? 'coaches.update-coach' : 'coaches.new-coach')}</DrawerHeader>

            <DrawerBody>
              <FormControl isInvalid={!!errors.name}>
                <FormLabel htmlFor="name">{t('coaches.name')}</FormLabel>
                <Input id="name" defaultValue={coachToEdit?.name} {...register('name', { required: true })} />
                <FormErrorMessage>
                  {errors.name && errors.name.type === 'required' && 'Name is required'}
                </FormErrorMessage>
              </FormControl>

              <FormControl mt="16px" isInvalid={!!errors.surname}>
                <FormLabel htmlFor="surname">{t('coaches.surname')}</FormLabel>
                <Input id="surname" defaultValue={coachToEdit?.surname} {...register('surname', { required: true })} />
                <FormErrorMessage>
                  {errors.surname && errors.surname.type === 'required' && 'Surname is required'}
                </FormErrorMessage>
              </FormControl>

              <FormControl mt="16px" isInvalid={!!errors.email}>
                <FormLabel htmlFor="email">{t('coaches.email')}</FormLabel>
                <Input
                  id="email"
                  type="email"
                  defaultValue={coachToEdit?.email}
                  {...register('email', { required: true })}
                />
                <FormErrorMessage>
                  {errors.email && errors.email.type === 'required' && 'Email is required'}
                </FormErrorMessage>
              </FormControl>

              <FormControl mt="16px">
                <FormLabel htmlFor="phone">{t('coaches.phone')}</FormLabel>
                <Input
                  id="phone"
                  type="tel"
                  defaultValue={coachToEdit?.phone}
                  {...register('phone', { required: false })}
                />
              </FormControl>
            </DrawerBody>

            <DrawerFooter mt="auto">
              <Button colorScheme="blue" mr={3} type="submit">
                {t('common.save')}
              </Button>
              <Button variant="outline" mr={'auto'} onClick={onClose}>
                {t('common.cancel')}
              </Button>
            </DrawerFooter>
          </form>
        )}
      </DrawerContent>
    </Drawer>
  );
};

export default CoachForm;
