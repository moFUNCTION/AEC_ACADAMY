import { Button, Flex, Skeleton, Stack } from "@chakra-ui/react";
import React from "react";
import { CourseCard } from "../../../../../../Components/Common/Index";
import { Link, Outlet, useParams } from "react-router-dom";
import { useFetch } from "../../../../../../Hooks/Index";

const Links = [
  {
    title: "Sections",
    href: "sections",
  },
  {
    title: "Quizes",
    href: "quizes",
  },
  {
    title: "Lessons",
    href: "lessons",
  },
  {
    title: "Attachments",
    href: "attachments",
  },
  {
    title: "Course Members",
    href: "members",
  },
  {
    title: "How Course Will look Like To User",
    href: "details",
  },
];

export default function Index() {
  const { id } = useParams();
  const { data, loading, error } = useFetch({
    endpoint: `/courses/course-details/${id}/`,
  });

  return (
    <Flex
      pos="relative"
      border="0px"
      gap="5"
      bgColor="blue.500"
      p="3"
      flexWrap={{
        base: "wrap",
        lg: "nowrap",
      }}
      justifyContent="center"
    >
      <Skeleton
        w="lg"
        flexGrow="1"
        maxW="100%"
        h="fit-content"
        isLoaded={!loading}
        borderRadius="2xl"
      >
        <CourseCard
          isLink={false}
          maxW="100%"
          w="100%"
          h="100%"
          border="0px"
          {...data}
        />
      </Skeleton>

      <Stack
        mb="auto"
        h="100%"
        bgColor="white"
        gap="3"
        borderRadius="xl"
        w="100%"
        p="3"
      >
        <Flex wrap="wrap" bgColor="gray.50" p="3" borderRadius="lg" gap="4">
          {Links.map((item) => {
            return (
              <Button
                bgColor="white"
                colorScheme="blue"
                variant="outline"
                key={item.title}
                borderRadius="full"
                as={Link}
                to={item.href}
              >
                {item.title}
              </Button>
            );
          })}
        </Flex>
        <Outlet />
      </Stack>
    </Flex>
  );
}
