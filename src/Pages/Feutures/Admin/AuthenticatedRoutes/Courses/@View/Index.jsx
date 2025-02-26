import {
  Button,
  Divider,
  Flex,
  Heading,
  Skeleton,
  Stack,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { useFetch } from "../../../../../../Hooks/Index";
import {
  CourseCard,
  Pagination,
  SearchField,
  Title,
} from "../../../../../../Components/Common/Index";
import { Link } from "react-router-dom";
export default function Index() {
  const [page, setPage] = useState(1);

  const { data, loading, error } = useFetch({
    endpoint: "courses",
    params: { page },
  });
  console.log(data);
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
            <CourseCard
              {...item}
              key={item.id}
              transition={`${(index + 1) * 0.2}s`}
              isLink={false}
            >
              <Flex gap="3" justifyContent="center" wrap="wrap" mt="2">
                <Button
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
                <Button colorScheme="red" variant="outline">
                  Delete
                </Button>
              </Flex>
            </CourseCard>
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
