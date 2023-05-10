import { ISession } from "@/types";
import {
  Input,
  Button,
  FormLabel,
  FormControl,
  FormErrorMessage,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";

type Props = {
  isOpen: boolean;
  isSubmitting: boolean;
  sessionToEdit?: ISession;
  onSubmit: (session: Partial<ISession>) => void;
  onClose: () => void;
};

const SessionForm: React.FC<Props> = ({
  isOpen,
  isSubmitting,
  sessionToEdit,
  onClose,
  onSubmit,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{sessionToEdit ? "Edit" : "New"} Session</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <form onSubmit={handleSubmit(onSubmit)}>
            <FormControl isInvalid={!!errors.name}>
              <FormLabel htmlFor="name">Nome</FormLabel>
              <Input
                id="name"
                defaultValue={sessionToEdit?.name}
                {...register("name", { required: true })}
              />
              <FormErrorMessage>
                {errors.name &&
                  errors.name.type === "required" &&
                  "Name is required"}
              </FormErrorMessage>
            </FormControl>
            <Button
              my="4"
              colorScheme="teal"
              isLoading={isSubmitting}
              type="submit"
            >
              Save
            </Button>
          </form>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default SessionForm;
