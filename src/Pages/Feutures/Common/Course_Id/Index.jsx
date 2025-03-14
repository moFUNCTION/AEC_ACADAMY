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
  Tag,
  Divider,
} from "@chakra-ui/react";
import {
  CheckIcon,
  TimeIcon,
  StarIcon,
  CalendarIcon,
  InfoIcon,
} from "@chakra-ui/icons";
import { CourseCard, Pagination } from "../../../../Components/Common/Index";
import { useFetch } from "../../../../Hooks/Index";
import { useParams } from "react-router-dom";
import { format } from "date-fns";

const CourseHeader = ({
  title,
  instructor,
  instructorImage,
  rating,
  students,
  startDate,
  endDate,
  price,
  originalPrice,
  level,
  language,
  createdAt,
  image,
}) => {
  // Map language codes to names
  const languageMap = {
    ar: "Arabic",
    en: "English",
    fr: "French",
    es: "Spanish",
    // Add more languages as needed
  };

  // Map level to color scheme
  const levelColorMap = {
    beginner: "green",
    intermediate: "blue",
    advanced: "red",
  };

  return (
    <Grid templateColumns={{ base: "1fr", md: "1fr 1fr" }} gap={6} mb={8}>
      <Box>
        <Image
          src={image || "https://placehold.co/600x400"}
          alt={`${title} banner`}
          borderRadius="lg"
          w="100%"
          objectFit="cover"
        />
      </Box>
      <Box>
        <VStack align="stretch" spacing={4}>
          <Badge
            colorScheme={levelColorMap[level] || "purple"}
            alignSelf="flex-start"
          >
            {level.charAt(0).toUpperCase() + level.slice(1)}
          </Badge>
          <Heading size="lg">{title}</Heading>
          <HStack>
            <Avatar size="sm" name={instructor} src={instructorImage} />
            <Text>{instructor}</Text>
          </HStack>
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
          <HStack>
            <InfoIcon />
            <Text>Language: {languageMap[language] || language}</Text>
            <Box ml={2}>
              <CalendarIcon mr={1} />
              <Text display="inline">
                Created: {format(new Date(createdAt), "MMM d, yyyy")}
              </Text>
            </Box>
          </HStack>
          <Box>
            <Text fontSize="2xl" fontWeight="bold">
              ${price}{" "}
              {originalPrice && (
                <>
                  <Text
                    as="span"
                    textDecoration="line-through"
                    color="gray.500"
                    fontSize="md"
                  >
                    ${originalPrice}
                  </Text>
                  <Badge colorScheme="green" ml={2}>
                    {Math.round(
                      ((originalPrice - price) / originalPrice) * 100
                    )}
                    % off
                  </Badge>
                </>
              )}
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
};

const CourseDescription = ({ description }) => (
  <Box mb={8}>
    <Heading size="md" mb={4}>
      About this course
    </Heading>
    <Text>{description}</Text>
  </Box>
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

const CourseContent = ({ sections = [] }) => {
  // Calculate total lessons
  const totalLessons = sections.reduce(
    (sum, section) => sum + (section.lessons?.length || 0),
    0
  );

  // Calculate total duration (placeholder - would need actual duration data)
  const totalDuration = "9h 48m"; // This would be calculated from actual lesson durations

  return (
    <Box mb={8}>
      <Heading size="md" mb={4}>
        Course Content
      </Heading>
      <Text mb={4}>
        {sections.length} Sections • {totalLessons} lessons • {totalDuration}{" "}
        total length
      </Text>

      {sections.length > 0 ? (
        <Accordion allowMultiple defaultIndex={[0]}>
          {sections.map((section, index) => (
            <AccordionItem key={section.id || index}>
              <AccordionButton py={3}>
                <Box flex="1" textAlign="left" fontWeight="medium">
                  {section.title}
                </Box>
                <Text mr={4}>
                  {section.lessons?.length || 0} lectures •{" "}
                  {section.duration || "00:00"}
                </Text>
                <AccordionIcon />
              </AccordionButton>
              <AccordionPanel pb={4} bg="gray.50">
                {section.lessons && section.lessons.length > 0 ? (
                  <VStack align="stretch" spacing={2} divider={<Divider />}>
                    {section.lessons.map((lesson, lessonIndex) => (
                      <HStack
                        key={lesson.id || lessonIndex}
                        justify="space-between"
                        p={2}
                      >
                        <HStack>
                          <TimeIcon color="blue.500" />
                          <Text>
                            {lesson.title || `Lesson ${lessonIndex + 1}`}
                          </Text>
                        </HStack>
                        <Text fontSize="sm" color="gray.600">
                          {lesson.duration || "00:00"}
                        </Text>
                      </HStack>
                    ))}
                  </VStack>
                ) : (
                  // If there are no lessons yet
                  <Box p={3}>
                    <Text color="gray.500">
                      No lessons available in this section yet
                    </Text>
                  </Box>
                )}
              </AccordionPanel>
            </AccordionItem>
          ))}
        </Accordion>
      ) : (
        // If there are no sections yet
        <Box p={6} borderRadius="md" bg="gray.50" textAlign="center">
          <Text color="gray.500">Course content is being prepared</Text>
        </Box>
      )}
    </Box>
  );
};

const Reviews = ({ averageRating }) => (
  <Box mb={8}>
    <Heading size="md" mb={4}>
      Reviews
    </Heading>
    {averageRating > 0 ? (
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
    ) : (
      <Box p={4} borderRadius="md" bg="gray.50">
        <Text>No reviews yet. Be the first to review this course!</Text>
      </Box>
    )}
  </Box>
);

const CategoryInfo = ({ category, subCategory }) => {
  const {
    data: Category,
    loading: CategoryLoading,
    error: CategoryError,
  } = useFetch({
    endpoint: `categories/${category}`,
  });
  const {
    data: SubCategory,
    loading: SubCatogiryLoading,
    error: SubCategoryError,
  } = useFetch({
    endpoint: `sub-categories/${subCategory}`,
  });
  return (
    <Box
      as={Skeleton}
      isLoaded={!SubCatogiryLoading && !CategoryLoading}
      mb={8}
    >
      <Heading size="md" mb={4}>
        Course Categories
      </Heading>
      <HStack spacing={4}>
        <Tag size="lg" colorScheme="purple" borderRadius="full">
          {Category?.title}
        </Tag>
        {subCategory && (
          <>
            <Text>→</Text>
            <Tag size="lg" colorScheme="blue" borderRadius="full">
              {SubCategory?.title}
            </Tag>
          </>
        )}
      </HStack>
    </Box>
  );
};

const RelatedCourses = () => {
  const [page, setPage] = useState(1);
  const { data, loading, error } = useFetch({
    endpoint: "courses",
  });

  return (
    <Box mb={8}>
      <Heading size="md" mb={4}>
        Students also bought
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
        justifyContent="start"
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
        onPageChange={setPage}
      />
    </Box>
  );
};

export default function Index() {
  const { id } = useParams();
  const {
    data: courseData,
    loading,
    error,
  } = useFetch({
    endpoint: `/courses/course-details/${id}/`,
  });

  if (loading) {
    return (
      <Container maxW="container.xl" py={8}>
        <Skeleton height="400px" mb={8} />
        <Skeleton height="200px" mb={8} />
        <Skeleton height="200px" mb={8} />
      </Container>
    );
  }

  if (error) {
    return (
      <Container maxW="container.xl" py={8}>
        <Box p={8} borderRadius="md" bg="red.50" color="red.500">
          <Heading size="md">Error loading course</Heading>
          <Text mt={2}>Please try again later</Text>
        </Box>
      </Container>
    );
  }

  return (
    <Container maxW="container.xl" py={8}>
      <CourseHeader
        title={courseData?.title}
        instructor={courseData?.user?.name || "Instructor"}
        instructorImage={courseData?.user?.profile_pic}
        rating={courseData?.average_rating || 0}
        students={courseData?.total_enrollments || 0}
        startDate="1/1/2025" // This could come from the API
        endDate="1/14/2025" // This could come from the API
        price={courseData?.price}
        originalPrice={219.99} // This could come from the API
        level={courseData?.level}
        language={courseData?.language}
        createdAt={courseData?.created_at}
        image={courseData?.image}
      />

      <Divider my={6} />

      <CourseDescription description={courseData?.description} />
      <CategoryInfo
        category={courseData?.category}
        subCategory={courseData?.sub_category}
      />
      <LearningPoints />
      <CourseIncludes />
      <CourseContent sections={courseData?.sections || []} />
      <Reviews averageRating={courseData?.average_rating} />
      <RelatedCourses />
    </Container>
  );
}
