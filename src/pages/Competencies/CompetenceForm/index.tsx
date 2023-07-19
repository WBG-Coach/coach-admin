import { ICompetence } from "@/types";
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
  competenceToEdit?: ICompetence;
  onSubmit: (competence: Partial<ICompetence>) => void;
  onClose: () => void;
};

const CompetenceForm: React.FC<Props> = ({
  isOpen,
  isSubmitting,
  competenceToEdit,
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
        <ModalHeader>
          {competenceToEdit ? "Edit" : "New"} Competence
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <form onSubmit={handleSubmit(onSubmit)}>
            <FormControl isInvalid={!!errors.title}>
              <FormLabel htmlFor="name">Nome</FormLabel>
              <Input
                id="title"
                defaultValue={competenceToEdit?.title}
                {...register("title", { required: true })}
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

export default CompetenceForm;
