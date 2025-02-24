import {
  Button,
  Checkbox,
  Flex,
  Heading,
  IconButton,
  Stack,
  Text,
} from "@chakra-ui/react";
import React from "react";
import {
  AnimatedText,
  CenteredTextWithLines,
  InputElement,
  LazyLoadedImage,
  PasswordInput,
} from "../../../../../Components/Common/Index";
import ShipImage from "../../../../../assets/ShapeImage/Image.png";
import { MdEmail, MdPassword } from "react-icons/md";
import { FaUnlockKeyhole } from "react-icons/fa6";
import { FaFacebook, FaGoogle } from "react-icons/fa";
export default function Index() {
  return (
    <Flex
      justifyContent="center"
      alignItems="center"
      w="100%"
      minH="calc(100vh - 88px)"
      gap="12"
    >
      <Stack gap="3" w="100%" maxW="500px">
        <Heading size="lg">
          Welcome To{" "}
          <span
            style={{
              color: "blue",
            }}
          >
            <span
              style={{
                color: "red",
              }}
            >
              A
            </span>
            EC
          </span>
        </Heading>
        <AnimatedText>
          <Text mb="10" color="gray.600">
            With AEC academy you can learn quickly and easily than any other
            academy with highly experienced teachers.
          </Text>
        </AnimatedText>

        <InputElement placeholder="Email" Icon={MdEmail} />
        <PasswordInput
          Icon={FaUnlockKeyhole}
          placeholder="Password"
          varient="filled"
        />
        <Flex
          gap="4"
          w="100%"
          alignItems="center"
          justifyContent="space-between"
        >
          <Checkbox color="gray.600">Remember Me</Checkbox>
          <Button variant="link">Forget Password</Button>
        </Flex>

        <Button colorScheme="blue">Login</Button>
        <CenteredTextWithLines>
          <Text color="gray.600" flexShrink="0">
            Continue With
          </Text>
        </CenteredTextWithLines>
        <Flex justifyContent="center" gap="3">
          <IconButton
            borderRadius="full"
            size="lg"
            colorScheme="red"
            variant="outline"
          >
            <FaGoogle />
          </IconButton>
          <IconButton
            borderRadius="full"
            size="lg"
            colorScheme="blue"
            variant="outline"
          >
            <FaFacebook />
          </IconButton>
        </Flex>
      </Stack>
      <LazyLoadedImage
        w="100%"
        maxW="400px"
        ImageProps={{
          objectFit: "contain",
        }}
        src={ShipImage}
      />
    </Flex>
  );
}
