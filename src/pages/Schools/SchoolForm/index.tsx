import { ISchool } from "@/types";
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
  Text,
  useToast,
} from "@chakra-ui/react";
import React, { ChangeEvent, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

type Props = {
  isOpen: boolean;
  school?: ISchool;
  onSubmit: (competence: ISchool) => void;
  onClose: () => void;
  readonly?: boolean;
};

const SchoolForm: React.FC<Props> = ({
  isOpen,
  school,
  onClose,
  onSubmit,
  readonly,
}) => {
  const { t } = useTranslation();
  const toast = useToast();
  const [schoolValues, setSchoolValues] = useState<ISchool>({
    name: "",
  });

  useEffect(() => {
    if (school) {
      setSchoolValues(school);
    } else {
      setSchoolValues({
        name: "",
      });
    }
  }, [isOpen, school]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSchoolValues({
      ...schoolValues,
      [e.target.name]: e.target.value.toUpperCase(),
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!schoolValues.name) {
      toast({
        title: "School name is required.",
        status: "warning",
        duration: 9000,
        isClosable: true,
        position: "top-left",
      });
      return;
    }

    onSubmit(schoolValues);
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
            {school
              ? readonly
                ? "View School"
                : "Update school"
              : "New School"}
          </DrawerHeader>

          <DrawerBody>
            <FormControl id="name" isRequired>
              <FormLabel fontSize="16px" lineHeight="24px" fontWeight={500}>
                School name
              </FormLabel>
              {readonly ? (
                <Text>{schoolValues.name}</Text>
              ) : (
                <Input
                  type="text"
                  name="name"
                  value={schoolValues.name}
                  onChange={handleInputChange}
                />
              )}
            </FormControl>
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

export default SchoolForm;
