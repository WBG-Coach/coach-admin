import { ICompetence, IQuestion } from "@/types";
import {
  Input,
  Button,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
  DrawerFooter,
  Box,
  FormControl,
  FormLabel,
  VStack,
  Text,
  IconButton,
  HStack,
  useToast,
} from "@chakra-ui/react";
import React, { ChangeEvent, useEffect, useState } from "react";
import { AddIcon, DeleteIcon, EditIcon } from "@chakra-ui/icons";

type Props = {
  isOpen: boolean;
  competence?: ICompetence;
  onSubmit: (competence: ICompetence) => void;
  onClose: () => void;
  readonly?: boolean;
};

const CompetenceForm: React.FC<Props> = ({
  isOpen,
  competence,
  onClose,
  onSubmit,
  readonly,
}) => {
  const toast = useToast();
  const [competenceValues, setCompetenceValues] = useState<ICompetence>({
    title: "",
    questions: [],
  });
  const [question, setQuestion] = useState<IQuestion>({
    title: "",
    description: "",
  });
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [showQuestionForm, setShowQuestionForm] = useState<boolean>();

  useEffect(() => {
    if (competence) {
      setCompetenceValues(competence);
      setShowQuestionForm(false);
    } else {
      setCompetenceValues({
        title: "",
        questions: [],
      });
      setShowQuestionForm(true);
    }
  }, [isOpen, competence]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setCompetenceValues({
      ...competenceValues,
      [e.target.name]: e.target.value,
    });
  };

  const handleQuestionChange = (e: ChangeEvent<HTMLInputElement>) => {
    setQuestion({
      ...question,
      [e.target.name]: e.target.value,
    });
  };

  const handleSaveQuestion = () => {
    if (question.title && question.description) {
      if (editIndex !== null) {
        const newQuestions = competenceValues.questions || [];
        newQuestions[editIndex] = question;
        setCompetenceValues({
          ...competenceValues,
          questions: newQuestions,
        });

        setEditIndex(null);
      } else {
        setCompetenceValues({
          ...competenceValues,
          questions: competenceValues.questions
            ? [...competenceValues.questions, question]
            : [question],
        });
      }

      setQuestion({ title: "", description: "" });
      setShowQuestionForm(false);
    } else {
      toast({
        title: "Required fields.",
        description: "Title and description are required.",
        status: "warning",
        duration: 9000,
        isClosable: true,
        position: "top-left",
      });
    }
  };

  const handleEditQuestion = (index: number) => {
    if (competenceValues?.questions) {
      setQuestion(competenceValues?.questions[index]);
      setEditIndex(index);
      setShowQuestionForm(true);
    }
  };

  const handleRemoveQuestion = (index: number) => {
    setCompetenceValues({
      ...competenceValues,
      questions:
        competenceValues?.questions?.filter((q, i) => i !== index) || [],
    });
    if (editIndex === index) {
      setEditIndex(null);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!competenceValues.title) {
      toast({
        title: "Teaching practice name is required.",
        status: "warning",
        duration: 9000,
        isClosable: true,
        position: "top-left",
      });
      return;
    }

    if (competenceValues?.questions?.length === 0) {
      toast({
        title: "Question is required.",
        description: "Click on Add question",
        status: "warning",
        duration: 9000,
        isClosable: true,
        position: "top-left",
      });
      return;
    }

    onSubmit(competenceValues);
  };

  return (
    <Drawer isOpen={isOpen} placement="right" onClose={onClose} size="md">
      <DrawerOverlay />
      <DrawerContent roundedLeft={14}>
        <form
          onSubmit={handleSubmit}
          style={{ height: "100%", display: "flex", flexDirection: "column" }}
        >
          <DrawerCloseButton mt={2} color="Primary.$200" />
          <DrawerHeader>
            {competence
              ? readonly
                ? "View teaching practice"
                : "Update teaching practice"
              : "New teaching practice"}
          </DrawerHeader>

          <DrawerBody>
            <FormControl id="title" isRequired>
              <FormLabel fontSize="16px" lineHeight="24px" fontWeight={500}>
                Teaching practice name
              </FormLabel>
              {readonly ? (
                <Text>{competenceValues.title}</Text>
              ) : (
                <Input
                  type="text"
                  name="title"
                  value={competenceValues.title}
                  onChange={handleInputChange}
                />
              )}
            </FormControl>

            <Box my="24px" w="100%" h="1px" bg="#eee" />

            <VStack spacing={4} mt={5} w="full">
              {competenceValues?.questions?.map((q, index) =>
                index === editIndex && showQuestionForm ? (
                  <Box key={index} w="full">
                    <FormControl id="title" isRequired>
                      <FormLabel>Título da Questão</FormLabel>
                      <Input
                        type="text"
                        name="title"
                        value={question.title}
                        onChange={handleQuestionChange}
                      />
                    </FormControl>

                    <FormControl id="description" mt={3} isRequired>
                      <FormLabel>Subtítulo da Questão</FormLabel>
                      <Input
                        type="text"
                        name="description"
                        value={question.description}
                        onChange={handleQuestionChange}
                      />
                    </FormControl>

                    <Button
                      colorScheme="teal"
                      mt={3}
                      onClick={handleSaveQuestion}
                    >
                      Salvar Questão
                    </Button>
                  </Box>
                ) : (
                  <VStack key={index} display="flex" w="full">
                    <HStack w="full" alignItems="center">
                      <Text
                        flex={1}
                        fontWeight={600}
                        fontSize="16px"
                      >{`Question ${index + 1}`}</Text>

                      {!readonly && (
                        <>
                          <IconButton
                            ml="auto"
                            aria-label="Editar questão"
                            icon={<EditIcon />}
                            onClick={() => handleEditQuestion(index)}
                          />
                          <IconButton
                            colorScheme="red"
                            aria-label="Remover questão"
                            icon={<DeleteIcon />}
                            onClick={() => handleRemoveQuestion(index)}
                          />
                        </>
                      )}
                    </HStack>
                    <VStack w="full" alignItems="start">
                      <Text fontWeight={600} fontSize="14px">
                        Title
                      </Text>
                      <Text>{q.title}</Text>
                      <Text fontWeight={600} fontSize="14px">
                        Description
                      </Text>
                      <Text>{q.description}</Text>
                    </VStack>
                  </VStack>
                )
              )}

              {competenceValues?.questions?.length === 0 &&
                !showQuestionForm && (
                  <Text color="gray.600" mr="auto">
                    No questions
                  </Text>
                )}

              {competenceValues?.questions &&
                competenceValues?.questions?.length > 0 && (
                  <Box my="24px" w="100%" h="1px" bg="#eee" />
                )}

              {showQuestionForm && editIndex === null && (
                <Box w="full">
                  <Text mb="24px" fontWeight={600}>{`Question ${
                    (competenceValues?.questions &&
                      competenceValues?.questions?.length + 1) ||
                    1
                  }`}</Text>
                  <FormControl id="title" isRequired>
                    <FormLabel>Title</FormLabel>
                    <Input
                      type="text"
                      name="title"
                      value={question.title}
                      onChange={handleQuestionChange}
                    />
                  </FormControl>

                  <FormControl id="description" mt={3} isRequired>
                    <FormLabel>Description</FormLabel>
                    <Input
                      type="text"
                      name="description"
                      value={question.description}
                      onChange={handleQuestionChange}
                    />
                  </FormControl>

                  <HStack mt="24px">
                    <Button
                      colorScheme="blue"
                      mr={3}
                      onClick={handleSaveQuestion}
                    >
                      Salvar Questão
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => setShowQuestionForm(false)}
                    >
                      Cancel
                    </Button>
                  </HStack>
                </Box>
              )}

              {!readonly && !showQuestionForm && (
                <Button
                  leftIcon={<AddIcon />}
                  colorScheme="blue"
                  variant="outline"
                  mt={3}
                  onClick={() => setShowQuestionForm(true)}
                >
                  Add question
                </Button>
              )}
            </VStack>
          </DrawerBody>

          {!readonly && (
            <DrawerFooter mt="auto">
              <Button colorScheme="blue" mr={3} type="submit">
                Save
              </Button>
              <Button variant="outline" mr={"auto"} onClick={onClose}>
                Cancel
              </Button>
            </DrawerFooter>
          )}
        </form>
      </DrawerContent>
    </Drawer>
  );
};

export default CompetenceForm;
