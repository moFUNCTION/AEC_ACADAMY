import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Button,
  Divider,
  Flex,
  Heading,
  Skeleton,
  Stack,
  Text,
  useToast,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useFetch } from "../../../../../../../../../Hooks/Index";
import {
  SearchField,
  Title,
} from "../../../../../../../../../Components/Common/Index";
import { formatRelativeTime } from "../../../../../../../../../Utils/GetRelativeTime/GetRelativeTime";
import { Admin } from "../../../../../../../../../$Models/Admin";
import { useAxiosTracker } from "../../../../../../../../../Hooks/useAxiosTracker/useAxiosTracker";
const Section = ({ id, title, description, created_at, onRender }) => {
  const { id: CourseId } = useParams();
  const [loading, setLoading] = useState();
  const toast = useToast({
    position: "top-right",
    duration: 3000,
    isClosable: true,
  });
  const HandleDelete = async () => {
    setLoading(true);
    const { data, error } = await Admin.Section.Delete({ id });
    if (error) {
      toast({
        title: "Error In Delete",
        status: "error",
      });
      return error;
    }
    toast({
      title: "Deleted Successfully",
      status: "success",
    });
    onRender();
    setLoading(false);
  };
  return (
    <AccordionItem bgColor="gray.50" key={id}>
      <h2>
        <AccordionButton>
          <Flex
            p="3"
            as="span"
            flex="1"
            justifyContent="space-between"
            alignItems="center"
          >
            <Heading fontWeight="normal" size="lg">
              {title}
            </Heading>
            <Text color="gray.800">
              {created_at && formatRelativeTime(created_at)}
            </Text>
          </Flex>
          <AccordionIcon />
        </AccordionButton>
      </h2>
      <AccordionPanel pb="4">
        <Text fontSize="lg" borderRadius="lg" p="3" bgColor="gray.100">
          {description}
        </Text>
        <Flex gap="3" mt="3">
          <Button
            as={Link}
            to={`/courses/${CourseId}/sections/${id}/update`}
            size="sm"
            colorScheme="green"
          >
            Update
          </Button>
          <Button
            isLoading={loading}
            onClick={HandleDelete}
            size="sm"
            colorScheme="red"
          >
            Delete
          </Button>
        </Flex>
      </AccordionPanel>
    </AccordionItem>
  );
};
export default function Index() {
  const { id } = useParams();
  const { loading, error, data, HandleRender } = useFetch({
    endpoint: "sections",
  });
  console.log(data);

  return (
    <Stack p="3" bgColor="gray.50">
      <Flex
        alignItems="center"
        p="3"
        bgColor="white"
        justifyContent="space-between"
        wrap="wrap"
        gap="6"
      >
        <Heading size="md">Sections</Heading>
        <Flex gap="3">
          <Button as={Link} to="add" colorScheme="blue" variant="outline">
            Add A Section
          </Button>
          <SearchField>
            <Title>Search For A Course</Title>
          </SearchField>
        </Flex>
      </Flex>
      <Divider />
      <Stack
        as={Skeleton}
        isLoaded={!loading}
        minH="400px"
        borderRadius="lg"
        p="4"
        bgColor="white"
      >
        <Accordion allowMultiple>
          {data?.map((item) => {
            return <Section {...item} key={item.id} onRender={HandleRender} />;
          })}
        </Accordion>
      </Stack>
    </Stack>
  );
}
