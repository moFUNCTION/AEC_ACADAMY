import React, { useRef } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Stack,
  Heading,
  Text,
  Divider,
  ButtonGroup,
  Button,
  Flex,
  Badge,
  Avatar,
  IconButton,
} from "@chakra-ui/react";
import { AnimatedText, LazyLoadedImage } from "../Index";
import { BsClock, BsPeople } from "react-icons/bs";
import { LiaStarSolid } from "react-icons/lia";
import { MdTimer } from "react-icons/md";
import { formatRelativeTime } from "../../../Utils/GetRelativeTime/GetRelativeTime";
import { transform, useInView } from "framer-motion";
import { Link } from "react-router-dom";
export const CourseCard = ({
  title,
  image = "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80",
  language,
  category,
  user,
  id,
  description,
  created_at,
  level,
  transition = "0.3s",
  ...rest
}) => {
  const LevelColor = () => {
    if (level === "beginner") {
      return "green";
    }
    if (level === "intermediate") {
      return "orange";
    }
    if (level === "expert") {
      return "red";
    }
  };
  const ref = useRef();
  const inView = useInView(ref);
  return (
    <Card
      as={Link}
      to={`/courses/${id}`}
      ref={ref}
      border="1px"
      borderRadius="2xl"
      overflow="hidden"
      borderColor="gray.400"
      w="100%"
      maxW="sm"
      _hover={{
        img: {
          transform: "scale(1) !important",
        },
        transform: "translate(0 , -10px)",
      }}
      sx={
        inView
          ? {
              opacity: 1,
              transform: "translate(0 , 0)",
            }
          : {
              opacity: 0,
              transform: "translate(0 , 20%)",
            }
      }
      transition={transition}
      {...rest}
    >
      <LazyLoadedImage
        src={image}
        alt="Green double couch with wooden legs"
        w="100%"
        h="300px"
        ImageProps={{
          objectFit: "cover",
          transition: "0.3s",
          transform: "scale(1.05)",
        }}
      />
      <CardBody>
        <Stack spacing="3">
          <Flex alignItems="center" gap="1">
            <Badge
              mr="auto"
              px="3"
              py="1"
              borderRadius="full"
              colorScheme={LevelColor()}
              alignItems="center"
              justifyContent="center"
              display="flex"
              h="fit-content"
            >
              {level}
            </Badge>
            <Button gap="3" variant="ghost">
              <BsPeople />
              120
            </Button>
            <Button alignItems="center" gap="3" variant="ghost">
              <LiaStarSolid color="orange" size="20px" />
              4.7
            </Button>
          </Flex>
          <Heading mt="2" size="md">
            {title}
          </Heading>

          <Flex gap="4" alignItems="center" mt="2">
            <IconButton w="fit-content" h="fit-content" borderRadius="full">
              <Avatar
                size="md"
                src="https://t3.ftcdn.net/jpg/02/43/12/34/360_F_243123463_zTooub557xEWABDLk0jJklDyLSGl2jrr.jpg"
              />
            </IconButton>
            <Text fontSize="sm" color="gray.500">
              William Samy
            </Text>
            <Button ml="auto" gap="3" variant="ghost">
              <BsClock size="15px" />
              <Text color="gray.600" fontSize="xs">
                {formatRelativeTime(created_at)}
              </Text>
            </Button>
          </Flex>
        </Stack>
      </CardBody>
    </Card>
  );
};
