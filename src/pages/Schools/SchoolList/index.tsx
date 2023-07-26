import { Flex, Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react";
import { ISchool } from "@/types";
import Table from "@/components/Table";
import Icon from "@/components/Base/Icon";
import { useTranslation } from "react-i18next";

type Props = {
  schools: ISchool[];
  handleEdit: (school: ISchool) => void;
  handleDelete: (school: ISchool) => void;
};

const SchoolList: React.FC<Props> = ({ schools, handleDelete, handleEdit }) => {
  const { t } = useTranslation();
  return (
    <Table
      filters={[{ label: "School name", prop: "name" }]}
      data={schools}
      columns={[
        {
          renderColumn: (item: ISchool) => item.name,
          title: "Name",
        },
        {
          renderColumn: (item: ISchool) => (
            <Flex justifyContent="center">
              <Menu>
                <MenuButton p="8px">
                  <Icon name="ellipsis-v" size={16} />
                </MenuButton>
                <MenuList>
                  <MenuItem
                    gap="8px"
                    alignItems="center"
                    onClick={() => handleEdit(item)}
                  >
                    <Icon name="pen" />
                    {t("common.edit")}
                  </MenuItem>
                  <MenuItem
                    gap="8px"
                    alignItems="center"
                    color="red"
                    onClick={() => handleDelete(item)}
                  >
                    <Icon name="trash-alt" color="red" />
                    {t("common.delete")}
                  </MenuItem>
                </MenuList>
              </Menu>
            </Flex>
          ),
          width: "85px",
          title: "common.actions",
        },
      ]}
    />
  );
};

export default SchoolList;
