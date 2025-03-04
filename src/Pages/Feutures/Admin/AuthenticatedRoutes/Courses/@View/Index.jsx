import {
  Button,
  Divider,
  Flex,
  Heading,
  Skeleton,
  Stack,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { useApiRequest, useFetch } from "../../../../../../Hooks/Index";
import {
  CourseCard,
  Pagination,
  SearchField,
  Title,
} from "../../../../../../Components/Common/Index";
import { Link } from "react-router-dom";
import { Admin } from "../../../../../../$Models/Admin";
import { DeleteModal } from "../../../../../../Components/Common/DeleteModal/DeleteModal";
const ExtendedCourseCard = ({ item, index, toaster, onRender }) => {
  const [isLoading, setLoading] = useState();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const HandleDelete = async () => {
    setLoading(true);
    const { error, data } = await Admin.Course.Delete({ id: item?.id });
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
      <CourseCard
        {...item}
        key={item.id}
        transition={`${(index + 1) * 0.2}s`}
        isLink={false}
      >
        <Flex gap="3" justifyContent="center" wrap="wrap" mt="2">
          <Button
            onClick={() =>
              localStorage.setItem("CourseData", JSON.stringify(item))
            }
            as={Link}
            to={item.id}
            colorScheme="blue"
            variant="outline"
          >
            View
          </Button>
          <Button
            as={Link}
            to={`${item.id}/update`}
            colorScheme="green"
            variant="outline"
          >
            Edit
          </Button>
          <Button onClick={onOpen} colorScheme="red" variant="outline">
            Delete
          </Button>
        </Flex>
      </CourseCard>
    </>
  );
};

export default function Index() {
  const toast = useToast({
    position: "top-right",
    duration: 3000,
    isClosable: true,
  });
  const [page, setPage] = useState(1);

  const { data, loading, error, HandleRender } = useFetch({
    endpoint: "courses",
    params: { page },
  });
  return (
    <Stack gap="3" p="5" w="100%" h="100%">
      <Flex
        wrap="wrap"
        p="2"
        justifyContent="space-between"
        alignItems="center"
        gap="5"
      >
        <Heading size="md">Courses</Heading>
        <Flex gap="3">
          <SearchField size="lg">
            <Title>Search For A Course</Title>
          </SearchField>
          <Button
            as={Link}
            to="add"
            colorScheme="blue"
            variant="outline"
            bgColor="white"
          >
            Create A Course
          </Button>
        </Flex>
      </Flex>
      <Divider />
      <Flex
        gap="3"
        flexWrap="wrap"
        as={Skeleton}
        isLoaded={!loading}
        fadeDuration="3"
        borderRadius="lg"
        minH="500px"
        bgColor="white"
        p="3"
      >
        {data?.results?.map((item, index) => {
          return (
            <ExtendedCourseCard
              toaster={toast}
              key={item.id}
              item={item}
              index={index}
              onRender={HandleRender}
            />
          );
        })}
      </Flex>
      <Pagination
        isLoading={loading}
        totalPages={data?.pagination?.totalPages}
        currentPage={page}
        onPageChange={(page) => setPage(page)}
      />
    </Stack>
  );
}
