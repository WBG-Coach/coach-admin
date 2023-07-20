import { Box, Flex, IconButton, Text } from "@chakra-ui/react";
import { EditIcon, DeleteIcon } from "@chakra-ui/icons";
import { ISession } from "@/types";
import Table from "@/components/Table";

type Props = {
  sessions: ISession[];
  handleEdit: (session: ISession) => void;
  handleDelete: (session: ISession) => void;
};

const SessionList: React.FC<Props> = ({
  sessions,
  handleDelete,
  handleEdit,
}) => {
  return (
    <Table
      data={sessions}
      columns={[
        {
          renderColumn: (item: ISession) => item.school.name,
          title: "School",
        },
        {
          renderColumn: (item: ISession) => item.coach.name,
          title: "Coach",
        },
        {
          renderColumn: (item: ISession) => item.teacher.name,
          title: "Teacher",
        },
        {
          renderColumn: (item: ISession) => item.subject,
          title: "Subject",
        },
      ]}
    />
  );
};

export default SessionList;
