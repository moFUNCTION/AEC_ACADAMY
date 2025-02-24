import {
  Flex,
  Grid,
  GridItem,
  Heading,
  IconButton,
  Skeleton,
  Stack,
  Text,
} from "@chakra-ui/react";
import React from "react";
import { MdFacebook } from "react-icons/md";
import { Link } from "react-router-dom";
import { FaXTwitter } from "react-icons/fa6";
import { FaInstagram } from "react-icons/fa6";
const Links = [
  {
    title: "Events",
  },
  {
    title: "Blogs",
  },
  {
    title: "Contact Us",
  },
  {
    title: "Become A Tutor",
    color: "red",
  },
];
export const Footer = () => {
  return (
    <Grid
      templateColumns={{
        base: "repeat(1,1fr)",
        sm: "repeat(1,1fr)",
        md: "repeat(2,1fr)",
        lg: "repeat(5,1fr)",
      }}
      bgColor="black"
      w="100%"
      minH="300px"
      p="5"
      gap="5"
      color="white"
      justifyContent="center"
    >
      <GridItem p="9" colSpan={{ lg: "2", base: 1 }} as={Stack}>
        <Heading>AEC</Heading>
        <Text>Platform for Courses fans and owners</Text>
      </GridItem>
      <GridItem p="9" as={Stack}>
        {Links.map((link) => {
          return (
            <Text
              color={link.color && link.color}
              as={Link}
              size="md"
              key={link.title}
            >
              {link.title}
            </Text>
          );
        })}
      </GridItem>
      <GridItem p="9" as={Stack}>
        <Text fontSize="lg" color="gray.200">
          Email Us At
        </Text>
        <Text color="white">hello@Aec.com</Text>
      </GridItem>
      <GridItem gap="5" p="9" as={Stack}>
        <Text fontSize="lg" color="gray.200">
          Follow Us
        </Text>
        <Flex gap="3">
          <IconButton
            variant="outline"
            color="white"
            _hover={{
              bgColor: "gray.800",
            }}
            borderRadius="full"
          >
            <MdFacebook />
          </IconButton>
          <IconButton
            variant="outline"
            color="white"
            _hover={{
              bgColor: "gray.800",
            }}
            borderRadius="full"
          >
            <FaXTwitter />
          </IconButton>

          <IconButton
            variant="outline"
            color="white"
            _hover={{
              bgColor: "gray.800",
            }}
            borderRadius="full"
          >
            <FaInstagram />
          </IconButton>
        </Flex>
      </GridItem>
    </Grid>
  );
};
