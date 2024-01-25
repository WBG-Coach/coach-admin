import { ITeacher } from '@/types';
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
import { useForm } from 'react-hook-form';

type Props = {
  isOpen: boolean;
  isSubmitting: boolean;
  teacherToEdit?: ITeacher;
  onSubmit: (teacher: Partial<ITeacher>) => void;
  onClose: () => void;
};

const TeacherForm: React.FC<Props> = ({ isOpen, isSubmitting, teacherToEdit, onClose, onSubmit }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  return (
    <Drawer isOpen={isOpen} placement="right" onClose={onClose} size="md">
      <DrawerOverlay />
      <DrawerContent roundedLeft={14}>
        <form onSubmit={handleSubmit(onSubmit)} style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
          <DrawerCloseButton mt={2} color="Primary.$200" />

          <DrawerHeader>{teacherToEdit ? 'Update teacher' : 'New Teacher'}</DrawerHeader>

          <DrawerBody>
            <FormControl isInvalid={!!errors.name}>
              <FormLabel htmlFor="name">Nome</FormLabel>
              <Input id="name" defaultValue={teacherToEdit?.name} {...register('name', { required: true })} />
              <FormErrorMessage>
                {errors.name && errors.name.type === 'required' && 'Name is required'}
              </FormErrorMessage>
            </FormControl>

            <FormControl mt="16px" isInvalid={!!errors.surname}>
              <FormLabel htmlFor="surname">Surname</FormLabel>
              <Input id="surname" defaultValue={teacherToEdit?.name} {...register('surname', { required: true })} />
              <FormErrorMessage>
                {errors.surname && errors.surname.type === 'required' && 'Surname is required'}
              </FormErrorMessage>
            </FormControl>

            <FormControl mt="16px" isInvalid={!!errors.surname}>
              <FormLabel htmlFor="subject">Subject</FormLabel>
              <Input id="subject" defaultValue={teacherToEdit?.subject} {...register('subject', { required: true })} />
              <FormErrorMessage>
                {errors.subject && errors.subject.type === 'required' && 'Subject is required'}
              </FormErrorMessage>
            </FormControl>
          </DrawerBody>

          <DrawerFooter mt="auto">
            <Button colorScheme="blue" mr={3} type="submit">
              Save
            </Button>
            <Button variant="outline" mr={'auto'} onClick={onClose}>
              Cancel
            </Button>
          </DrawerFooter>
        </form>
      </DrawerContent>
    </Drawer>
  );
};

export default TeacherForm;
