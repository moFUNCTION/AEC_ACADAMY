import React, { useState } from "react";
import {
  Box,
  Button,
  Container,
  Flex,
  Grid,
  Heading,
  Image,
  Text,
  VStack,
  HStack,
  Badge,
  Input,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  List,
  ListItem,
  ListIcon,
  Avatar,
  Card,
  CardBody,
  SimpleGrid,
  Skeleton,
} from "@chakra-ui/react";
import { CheckIcon, TimeIcon, StarIcon } from "@chakra-ui/icons";
import { CourseCard, Pagination } from "../../../../Components/Common/Index";
import { useFetch } from "../../../../Hooks/Index";

const CourseHeader = ({
  title,
  instructor,
  rating,
  students,
  startDate,
  endDate,
  price,
  originalPrice,
}) => (
  <Grid templateColumns={{ base: "1fr", md: "1fr 1fr" }} gap={6} mb={8}>
    <Box>
      <Image
        src="https://placehold.co/600x400"
        alt="Course banner"
        borderRadius="lg"
        w="100%"
        objectFit="cover"
      />
    </Box>
    <Box>
      <VStack align="stretch" spacing={4}>
        <Badge colorScheme="red" alignSelf="flex-start">
          Advanced
        </Badge>
        <Heading size="lg">{title}</Heading>
        <Text>{instructor}</Text>
        <HStack>
          <StarIcon color="yellow.400" />
          <Text>{rating}</Text>
          <Text>({students} students)</Text>
        </HStack>
        <HStack>
          <TimeIcon />
          <Text>Start: {startDate}</Text>
          <Text>End: {endDate}</Text>
        </HStack>
        <Box>
          <Text fontSize="2xl" fontWeight="bold">
            ${price}{" "}
            <Text
              as="span"
              textDecoration="line-through"
              color="gray.500"
              fontSize="md"
            >
              ${originalPrice}
            </Text>
            <Badge colorScheme="green" ml={2}>
              83% off
            </Badge>
          </Text>
        </Box>
        <Button colorScheme="blue" size="lg">
          Add to Cart
        </Button>
        <Button variant="outline" size="lg">
          Buy Now
        </Button>
        <HStack>
          <Input placeholder="Enter Coupon" />
          <Button>Apply</Button>
        </HStack>
      </VStack>
    </Box>
  </Grid>
);

const LearningPoints = () => (
  <Box mb={8}>
    <Heading size="md" mb={4}>
      What you'll learn
    </Heading>
    <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
      {[
        "Logo Design Theory",
        "The power of color Psychology in Logo Design",
        "Learn what questions to ask before starting your design process",
        "How to use the Golden Ratio in Logo Design",
        "How to present your logo in a professional polished way",
        "Understand the full creative and brainstorming process",
      ].map((point, index) => (
        <HStack key={index} align="flex-start">
          <CheckIcon color="green.500" mt={1} />
          <Text>{point}</Text>
        </HStack>
      ))}
    </SimpleGrid>
  </Box>
);

const CourseIncludes = () => (
  <Box mb={8}>
    <Heading size="md" mb={4}>
      This course includes:
    </Heading>
    <List spacing={3}>
      <ListItem>
        <ListIcon as={CheckIcon} color="green.500" />
        9.5 hours on-demand video
      </ListItem>
      <ListItem>
        <ListIcon as={CheckIcon} color="green.500" />
        Assignments
      </ListItem>
      <ListItem>
        <ListIcon as={CheckIcon} color="green.500" />
        Certificate of completion
      </ListItem>
    </List>
  </Box>
);

const CourseContent = () => (
  <Box mb={8}>
    <Heading size="md" mb={4}>
      Course Content
    </Heading>
    <Text mb={4}>4 Sections • 45 lectures • 9h 48m total length</Text>
    <Accordion allowMultiple>
      <AccordionItem>
        <AccordionButton>
          <Box flex="1" textAlign="left">
            Logo Design Theory
          </Box>
          <Text mr={4}>8 lectures • 32min</Text>
          <AccordionIcon />
        </AccordionButton>
        <AccordionPanel>
          <VStack align="stretch" spacing={2}>
            {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
              <HStack key={num} justify="space-between">
                <Text>
                  Lesson ({num}) eveniet consectetur quis est molestias
                </Text>
                <Text>09:10</Text>
              </HStack>
            ))}
          </VStack>
        </AccordionPanel>
      </AccordionItem>
    </Accordion>
  </Box>
);

const Reviews = () => (
  <Box mb={8}>
    <Heading size="md" mb={4}>
      Featured review
    </Heading>
    <Card>
      <CardBody>
        <HStack spacing={4} mb={4}>
          <Avatar name="William Samy" />
          <Box>
            <Text fontWeight="bold">William Samy</Text>
            <HStack>
              <StarIcon color="yellow.400" />
              <Text>4.5</Text>
            </HStack>
          </Box>
        </HStack>
        <Text>
          Reprehenderit consectetur in quo omnis et ex ut sapiente voluptates.
          Autem magnam consectetur velit. Eveniet similique placeat suscipit.
        </Text>
      </CardBody>
    </Card>
  </Box>
);

const RelatedCourses = () => {
  const [page, setPage] = useState(1);
  const { data, loading, error } = useFetch({
    endpoint: "courses",
  });
  return (
    <Box mb={8}>
      <Heading size="md" mb={4}>
        Student also bought
      </Heading>
      <Flex
        gap="3"
        flexWrap="wrap"
        as={Skeleton}
        isLoaded={!loading}
        fadeDuration="3"
        p="4"
        bgColor="gray.50"
        borderRadius="lg"
        justifyContent="center"
        minH="500px"
      >
        {data?.results?.map((item, index) => {
          return (
            <CourseCard
              {...item}
              key={item.id}
              transition={`${(index + 1) * 0.2}s`}
            />
          );
        })}
      </Flex>
      <Pagination
        isLoading={loading}
        totalPages={data?.pagination?.totalPages}
        currentPage={page}
      />
    </Box>
  );
};

export default function Index() {
  return (
    <Container maxW="container.xl" py={8}>
      <CourseHeader
        title="Logo Design Crafting"
        instructor="Cristofer Smith"
        rating={4.5}
        students={120}
        startDate="1/1/2025"
        endDate="1/14/2025"
        price={37.99}
        originalPrice={219.99}
      />
      <LearningPoints />
      <CourseIncludes />
      <CourseContent />
      <Reviews />
      <RelatedCourses />
    </Container>
  );
}
