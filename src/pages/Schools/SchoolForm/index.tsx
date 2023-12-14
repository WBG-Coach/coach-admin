import { ISchool } from '@/types';
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
  FormControl,
  FormLabel,
  useToast,
  Text,
  VStack,
  Spinner,
  HStack,
  IconButton,
} from '@chakra-ui/react';
import React, { ChangeEvent, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import RegionSelect from './RegionSelect';
import SchoolService from '@/services/school';
import Icon from '@/components/Base/Icon';

type Props = {
  isOpen: boolean;
  schoolId?: string;
  onSubmit: (school: ISchool) => void;
  onClose: () => void;
};

const SchoolForm: React.FC<Props> = ({ isOpen, schoolId, onClose, onSubmit }) => {
  const { t } = useTranslation();
  const toast = useToast();
  const [isLoading, setIsLoading] = useState(true);
  const [showSelectRegion, setShowSelectRegion] = useState(false);
  const [schoolValues, setSchoolValues] = useState<ISchool>();

  useEffect(() => {
    setShowSelectRegion(false);
    if (schoolId) {
      setIsLoading(true);
      SchoolService.getSchool(schoolId).then((value) => {
        setSchoolValues(value);
        setIsLoading(false);
        if (!value.region_id) {
          setShowSelectRegion(true);
        }
      });
    } else {
      setShowSelectRegion(true);
      setSchoolValues({
        name: '',
        emis_number: '',
        region_id: undefined,
      });
      setIsLoading(false);
    }
  }, [isOpen, schoolId]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (schoolValues)
      setSchoolValues({
        ...schoolValues,
        [e.target.name]: e.target.value.toUpperCase(),
      });
  };

  const handleRegionChange = (region_id?: string) => {
    if (schoolValues) {
      setSchoolValues({
        ...schoolValues,
        region_id,
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (schoolValues) {
      setIsLoading(true);
      onSubmit(schoolValues);
    }
  };

  return (
    <Drawer isOpen={isOpen} placement="right" onClose={onClose} size="md">
      <DrawerOverlay />
      <DrawerContent roundedLeft={14}>
        <form onSubmit={handleSubmit} style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
          <DrawerCloseButton mt={2} color="Primary.$200" />

          <DrawerHeader>{t(schoolId ? 'school.form.new' : 'school.form.update')}</DrawerHeader>

          {isLoading ? (
            <DrawerBody>
              <Spinner />
            </DrawerBody>
          ) : (
            <DrawerBody>
              <FormControl id="name" isRequired>
                <FormLabel fontSize="16px" lineHeight="24px" fontWeight={500}>
                  {t('school.form.name')}
                </FormLabel>
                <Input type="text" name="name" value={schoolValues?.name} onChange={handleInputChange} />

                <FormLabel mt={'14px'} fontSize="16px" lineHeight="24px" fontWeight={500}>
                  {t('school.form.emis')}
                </FormLabel>
                <Input
                  type="number"
                  name="emis_number"
                  value={schoolValues?.emis_number}
                  onChange={handleInputChange}
                />

                {showSelectRegion ? (
                  <RegionSelect direction="column" onSelect={handleRegionChange} level={0} />
                ) : (
                  <HStack mt="20px" justifyContent="center" alignItems="center">
                    <VStack w="full" alignItems="flex-start">
                      <Text fontWeight={600}>{t('school.form.region')}</Text>
                      <Text>{schoolValues?.region?.name}</Text>
                    </VStack>
                    <IconButton
                      my="auto"
                      icon={<Icon name="pen" />}
                      aria-label="Edit"
                      onClick={() => setShowSelectRegion(true)}
                    />
                  </HStack>
                )}
              </FormControl>
            </DrawerBody>
          )}
          <DrawerFooter mt="auto">
            <Button colorScheme="blue" mr={3} type="submit">
              {t('common.save')}
            </Button>
            <Button variant="outline" mr={'auto'} onClick={onClose}>
              {t('common.cancel')}
            </Button>
          </DrawerFooter>
        </form>
      </DrawerContent>
    </Drawer>
  );
};

export default SchoolForm;
