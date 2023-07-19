import { Box, Flex, IconButton, Text } from "@chakra-ui/react";
import { EditIcon, DeleteIcon } from "@chakra-ui/icons";
import { ICompetence } from "@/types";
import Table from "@/components/Table";

type Props = {
  competences: ICompetence[];
  handleEdit: (competence: ICompetence) => void;
  handleDelete: (competence: ICompetence) => void;
};

const CompetenceList: React.FC<Props> = ({
  competences,
  handleDelete,
  handleEdit,
}) => {
  return (
    <Table
      data={competences}
      columns={[
        {
          renderColumn: (item: ICompetence) => item.title,
          title: "competence.title",
        },
      ]}
    />
  );
};

export default CompetenceList;
