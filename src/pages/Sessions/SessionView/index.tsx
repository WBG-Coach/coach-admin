import Icon from '@/components/Base/Icon';
import { IAnswer, ICompetence, ISession } from '@/types';
import {
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
  HStack,
  Text,
  VStack,
  Divider,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

type Props = {
  session?: ISession;
  onClose: () => void;
};

const SessionView: React.FC<Props> = ({ session, onClose }) => {
  const { t } = useTranslation();
  const [competencies, setCompetencies] = useState<ICompetence[]>([]);

  useEffect(() => {
    if (session) {
      setCompetencies(
        session.answers
          .reduce((acc: ICompetence[], item: IAnswer) => {
            const competence = acc.find((competence) => competence.id === item.question.competence_id);
            if (competence) {
              competence.answers?.push(item);
              return acc;
            } else {
              return [...acc, { ...(item.question.competence as any), answers: [item] }];
            }
          }, [] as ICompetence[])
          .reverse(),
      );
    } else {
      setCompetencies([]);
    }
  }, [session]);

  return (
    <Drawer isOpen={!!session} placement="right" onClose={onClose} size="md">
      <DrawerOverlay />
      <DrawerContent roundedLeft={14}>
        <DrawerCloseButton mt={2} color="Primary.$200" />
        <DrawerHeader>{t('session.view.title')}</DrawerHeader>

        <DrawerBody>
          <HStack mb="4px" alignItems="center">
            <Icon name="university" size={16} />
            <Text fontWeight="semibold">{t('session.view.school')}</Text>
          </HStack>
          <Text>{session?.school.name}</Text>
          <Divider my="8px" />

          <HStack mb="4px" alignItems="center">
            <Icon name="user" size={16} />
            <Text fontWeight="semibold">{t('session.view.coach')}</Text>
          </HStack>
          <Text>{session?.coach.name}</Text>
          <Divider my="8px" />

          <HStack mb="4px" alignItems="center">
            <Icon name="graduation-cap" size={16} />
            <Text fontWeight="semibold">{t('session.view.teacher')}</Text>
          </HStack>
          <Text>{session?.teacher.name}</Text>
          <Divider my="8px" />

          {session?.feedback_id && (
            <VStack w="100%" mb="20px" py="16px" borderBottom="1px solid #eee">
              <Text w="100%" mb="16px" fontSize={20} fontWeight="semibold">
                {t('session.view.feedback')}
              </Text>
              <Text w="100%">{session?.feedback_id}</Text>
            </VStack>
          )}

          {competencies.map((competence, index) => (
            <div>
              <Text fontSize={20} fontWeight="semibold">
                {index + 1}
                {'. '}
                {competence.title}
              </Text>
              {competence.answers?.map((answer) => (
                <div>
                  <p>{answer.question.title}</p>
                  <Text fontSize="12px" mb="8px">
                    {answer.question.description}
                  </Text>
                  <HStack mb="16px">
                    {[1, 2, 3, 4, 5].map((value) =>
                      value <= answer.value ? (
                        <Icon name="star-solid" color="#E89F0C" />
                      ) : (
                        <Icon name="star-solid" color="#C7CBD1" />
                      ),
                    )}
                  </HStack>
                </div>
              ))}
            </div>
          ))}
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
};

export default SessionView;
