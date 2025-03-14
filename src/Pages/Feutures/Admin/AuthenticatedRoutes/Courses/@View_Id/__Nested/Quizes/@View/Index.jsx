import React, { useState } from "react";
import { useFetch } from "../../../../../../../../../Hooks/Index";
import {
  Button,
  Divider,
  Flex,
  Heading,
  Skeleton,
  Stack,
  Text,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import {
  SearchField,
  Title,
} from "../../../../../../../../../Components/Common/Index";
import { Link } from "react-router-dom";
import { BsClock } from "react-icons/bs";
import { formatRelativeTime } from "../../../../../../../../../Utils/GetRelativeTime/GetRelativeTime";
import { DeleteModal } from "../../../../../../../../../Components/Common/DeleteModal/DeleteModal";
import { Admin } from "../../../../../../../../../$Models/Admin";
const Field = ({ fieldName, value }) => {
  return (
    <Flex
      bgColor="gray.100"
      px="5"
      py="3"
      borderRadius="lg"
      alignItems="center"
      gap="3"
      justifyContent="space-between"
    >
      <Button w="100%" maxW="140px" borderRadius="full" colorScheme="blue">
        {fieldName}
      </Button>
      <Text fontWeight="bold">{value}</Text>
    </Flex>
  );
};
const AssignmentBox = ({
  title,
  id,
  created_at,
  is_done,
  is_exam,
  timer,
  time_tracker,
  unlocks_at,
  onRender,
}) => {
  const toaster = useToast();

  const [isLoading, setLoading] = useState();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const HandleDelete = async () => {
    setLoading(true);
    const { error, data } = await Admin.Assigment.Delete({ id: id });
    setLoading(false);
    if (error) {
      toaster({
        title: "Error In Delete Course",
        status: "error",
      });
      onClose();
      onRender();
    } else {
      toaster({
        title: "Course Deleted Successfully",
        status: "success",
      });
      onClose();
      onRender();
    }
  };
  return (
    <>
      <DeleteModal
        isLoading={isLoading}
        isOpen={isOpen}
        onClose={onClose}
        onDelete={HandleDelete}
      />
      <Stack
        boxShadow="md"
        w="md"
        flexGrow="1"
        p="3"
        borderRadius="lg"
        _hover={{
          transform: "translate(0, -5px)",
          boxShadow: "lg",
        }}
        transition="0.3s"
        border="1px"
        borderColor="gray.200"
      >
        <Flex alignItems="center">
          <Heading size="md">{title}</Heading>
          <Button ml="auto" gap="3" variant="ghost">
            <BsClock size="15px" />
            <Text color="gray.600" fontSize="xs">
              {created_at && formatRelativeTime(created_at)}
            </Text>
          </Button>
        </Flex>
        <Divider mb="3" />

        <Field fieldName="is Done" value={is_done ? "Yes" : "No"} />
        <Field fieldName="is Exam" value={is_exam ? "Yes" : "No"} />
        <Field fieldName="Timer" value={timer} />
        <Field
          fieldName="Time Tracker"
          value={formatRelativeTime(time_tracker)}
        />
        <Field fieldName="Unlocks At" value={formatRelativeTime(unlocks_at)} />

        <Flex gap="3" justifyContent="start" wrap="wrap" mt="2">
          <Button as={Link} to={id} colorScheme="blue" variant="outline">
            View
          </Button>
          <Button
            as={Link}
            to={`${id}/update`}
            colorScheme="green"
            variant="outline"
          >
            Edit
          </Button>
          <Button onClick={onOpen} colorScheme="red" variant="outline">
            Delete
          </Button>
        </Flex>
      </Stack>
    </>
  );
};

export default function Index() {
  const { loading, error, data, HandleRender } = useFetch({
    endpoint: "assignments",
  });

  return (
    <Stack>
      <Flex
        alignItems="center"
        p="3"
        bgColor="white"
        justifyContent="space-between"
        wrap="wrap"
        gap="6"
      >
        <Heading size="md">Quizes</Heading>
        <Flex gap="3">
          <Button as={Link} to="add" colorScheme="blue">
            Add A Quiz
          </Button>
          <SearchField>
            <Title>Search For A Quiz</Title>
          </SearchField>
        </Flex>
      </Flex>
      <Divider />
      <Flex wrap="wrap" as={Skeleton} isLoaded={!loading} minH="400px" gap="3">
        {data?.map((item) => {
          return (
            <AssignmentBox onRender={HandleRender} key={item.id} {...item} />
          );
        })}
      </Flex>
    </Stack>
  );
}
