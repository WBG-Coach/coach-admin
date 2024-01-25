import { ICompetence, IQuestion } from '@/types';
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
} from '@chakra-ui/react';
import React, { ChangeEvent, useEffect, useState } from 'react';
import { AddIcon, DeleteIcon, EditIcon } from '@chakra-ui/icons';
import { useTranslation } from 'react-i18next';

type Props = {
  isOpen: boolean;
  competence?: ICompetence;
  onSubmit: (competence: ICompetence) => void;
  onClose: () => void;
  readonly?: boolean;
};

const CompetenceForm: React.FC<Props> = ({ isOpen, competence, onClose, onSubmit, readonly }) => {
  const { t } = useTranslation();
  const toast = useToast();
  const [competenceValues, setCompetenceValues] = useState<ICompetence>({
    title: '',
    questions: [],
  });
  const [question, setQuestion] = useState<IQuestion>({
    title: '',
    description: '',
  });
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [showQuestionForm, setShowQuestionForm] = useState<boolean>();

  useEffect(() => {
    if (competence) {
      setCompetenceValues(competence);
      setShowQuestionForm(false);
    } else {
      setCompetenceValues({
        title: '',
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
          questions: competenceValues.questions ? [...competenceValues.questions, question] : [question],
        });
      }

      setQuestion({ title: '', description: '' });
      setShowQuestionForm(false);
    } else {
      toast({
        title: t('teacher-practices.form.required-title'),
        description: t('teacher-practices.form.required-description'),
        status: 'warning',
        duration: 9000,
        isClosable: true,
        position: 'top-left',
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
      questions: competenceValues?.questions?.filter((q, i) => i !== index) || [],
    });
    if (editIndex === index) {
      setEditIndex(null);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!competenceValues.title) {
      toast({
        title: t('teacher-practices.form.required-title'),
        status: 'warning',
        duration: 9000,
        isClosable: true,
        position: 'top-left',
      });
      return;
    }

    if (competenceValues?.questions?.length === 0) {
      toast({
        title: t('teacher-practices.form.required-question-title'),
        description: t('teacher-practices.form.required-question-description'),
        status: 'warning',
        duration: 9000,
        isClosable: true,
        position: 'top-left',
      });
      return;
    }

    onSubmit(competenceValues);
  };

  return (
    <Drawer isOpen={isOpen} placement="right" onClose={onClose} size="md">
      <DrawerOverlay />
      <DrawerContent roundedLeft={14}>
        <form onSubmit={handleSubmit} style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
          <DrawerCloseButton mt={2} color="Primary.$200" />
          <DrawerHeader>
            {t(
              competence
                ? readonly
                  ? 'teacher-practices.form.title-view'
                  : 'teacher-practices.form.title-update'
                : 'teacher-practices.form.title-new',
            )}
          </DrawerHeader>

          <DrawerBody>
            <FormControl id="title" isRequired>
              <FormLabel fontSize="16px" lineHeight="24px" fontWeight={500}>
                {t('teacher-practices.form.name')}
              </FormLabel>
              {readonly ? (
                <Text>{competenceValues.title}</Text>
              ) : (
                <Input type="text" name="title" value={competenceValues.title} onChange={handleInputChange} />
              )}
            </FormControl>

            <Box my="24px" w="100%" h="1px" bg="#eee" />

            <VStack spacing={4} mt={5} w="full">
              {competenceValues?.questions?.map((q, index) =>
                index === editIndex && showQuestionForm ? (
                  <Box key={index} w="full">
                    <FormControl id="title" isRequired>
                      <FormLabel>{t('teacher-practices.form.question.title')}</FormLabel>
                      <Input type="text" name="title" value={question.title} onChange={handleQuestionChange} />
                    </FormControl>

                    <FormControl id="description" mt={3} isRequired>
                      <FormLabel>{t('teacher-practices.form.question.subtitle')}</FormLabel>
                      <Input
                        type="text"
                        name="description"
                        value={question.description}
                        onChange={handleQuestionChange}
                      />
                    </FormControl>

                    <Button colorScheme="teal" mt={3} onClick={handleSaveQuestion}>
                      {t('teacher-practices.form.question.save')}
                    </Button>
                  </Box>
                ) : (
                  <VStack key={index} display="flex" w="full">
                    <HStack w="full" alignItems="center">
                      <Text flex={1} fontWeight={600} fontSize="16px">
                        {t('teacher-practices.form.question-list', { value: index + 1 })}
                      </Text>

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
                        {t('teacher-practices.form.question-title')}
                      </Text>
                      <Text>{q.title}</Text>
                      <Text fontWeight={600} fontSize="14px">
                        {t('teacher-practices.form.question-description')}
                      </Text>
                      <Text>{q.description}</Text>
                    </VStack>
                  </VStack>
                ),
              )}

              {competenceValues?.questions?.length === 0 && !showQuestionForm && (
                <Text color="gray.600" mr="auto">
                  {t('teacher-practices.form.question.empty')}
                </Text>
              )}

              {competenceValues?.questions && competenceValues?.questions?.length > 0 && (
                <Box my="24px" w="100%" h="1px" bg="#eee" />
              )}

              {showQuestionForm && editIndex === null && (
                <Box w="full">
                  <Text mb="24px" fontWeight={600}>
                    {t('teacher-practices.form.question-list', {
                      value: (competenceValues?.questions && competenceValues?.questions?.length + 1) || 1,
                    })}
                  </Text>
                  <FormControl id="title" isRequired>
                    <FormLabel>{t('teacher-practices.form.question-title')}</FormLabel>
                    <Input type="text" name="title" value={question.title} onChange={handleQuestionChange} />
                  </FormControl>

                  <FormControl id="description" mt={3} isRequired>
                    <FormLabel>{t('teacher-practices.form.question-description')}</FormLabel>
                    <Input
                      type="text"
                      name="description"
                      value={question.description}
                      onChange={handleQuestionChange}
                    />
                  </FormControl>

                  <HStack mt="24px">
                    <Button colorScheme="blue" mr={3} onClick={handleSaveQuestion}>
                      {t('teacher-practices.form.question.save')}
                    </Button>
                    <Button variant="outline" onClick={() => setShowQuestionForm(false)}>
                      {t('common.cancel')}
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
                  {t('teacher-practices.form.add-question')}
                </Button>
              )}
            </VStack>
          </DrawerBody>

          {!readonly && (
            <DrawerFooter mt="auto">
              <Button colorScheme="blue" mr={3} type="submit">
                {t('common.save')}
              </Button>
              <Button variant="outline" mr={'auto'} onClick={onClose}>
                {t('common.cancel')}
              </Button>
            </DrawerFooter>
          )}
        </form>
      </DrawerContent>
    </Drawer>
  );
};

export default CompetenceForm;
