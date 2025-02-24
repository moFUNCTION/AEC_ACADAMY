import React from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Stack,
  Heading,
  Divider,
  ButtonGroup,
  Button,
  Flex,
  Avatar,
  IconButton,
  Tooltip,
  Text,
  AvatarBadge,
} from "@chakra-ui/react";
import {
  CountryFlagButton,
  LazyLoadedImage,
} from "../../../../../../../Components/Common/Index";
import { FaFemale, FaMale, FaUser } from "react-icons/fa";
import { SlUserFemale } from "react-icons/sl";
import { CiUser } from "react-icons/ci";
import { useApiRequest } from "../../../../../../../Hooks/useApiRequest/useApiRequest";

const GetColorByStatus = (status) => {
  if (status === "in review") {
    return "orange";
  }
  if (status === "accepted") {
    return "green";
  }
  if (status === "rejected") {
    return "red";
  }
};
export const ApplicationCard = ({
  photos,
  status,
  first_name,
  email,
  gender,
  nationality,
  id,
}) => {
  const { sendRequest, loading: RequestLoading } = useApiRequest();
  return (
    <Card
      _hover={{
        boxShadow: "lg",
        translate: "0 -10px",
      }}
      transition="0.3s"
      w="lg"
      flexGrow="1"
      maxW="lg"
    >
      <CardBody>
        <Stack mt="3" spacing="3">
          <Flex
            flexWrap="wrap"
            alignItems="center"
            justifyContent="space-between"
          >
            <Flex alignItems="center" gap="3">
              <Tooltip label="User Photo">
                <IconButton w="fit-content" h="fit-content" borderRadius="full">
                  <Avatar src={photos[0]}>
                    <AvatarBadge
                      borderColor="papayawhip"
                      bg="green"
                      boxSize="1em"
                    />
                  </Avatar>
                </IconButton>
              </Tooltip>
              <Stack justifyContent="center" gap="0">
                <Text>{first_name}</Text>
                <Text>{email}</Text>
              </Stack>
            </Flex>
            <Flex>
              <Button
                textTransform="capitalize"
                variant="ghost"
                colorScheme={GetColorByStatus(status)}
              >
                {status}
              </Button>
              <Tooltip label={gender}>
                <IconButton colorScheme="blue" variant="ghost">
                  {gender === "male" ? <CiUser /> : <SlUserFemale />}
                </IconButton>
              </Tooltip>
              <CountryFlagButton countryCode={nationality} />
            </Flex>
          </Flex>
        </Stack>
      </CardBody>
      <Divider borderColor="gray.400" />
      <CardFooter>
        <ButtonGroup spacing="2">
          <Button variant="outline" colorScheme="blue">
            View
          </Button>
          {status === "in review" ? (
            <>
              <Button
                onClick={async () => {
                  await sendRequest({
                    url: `/instractor-application/${id}/approve/`,
                    method: "post",
                  });
                }}
                isLoading={RequestLoading}
                colorScheme="green"
                variant="outline"
              >
                Accept Request
              </Button>{" "}
              <Button
                onClick={async () => {
                  await sendRequest({
                    url: `/instractor-application/${id}/reject/`,
                    method: "post",
                  });
                }}
                isLoading={RequestLoading}
                colorScheme="red"
                variant="outline"
              >
                Reject Request
              </Button>
            </>
          ) : status === "accepted" ? (
            <Button colorScheme="green" variant="outline">
              Request Has been accepted !
            </Button>
          ) : (
            <Button colorScheme="red" variant="outline">
              Request Has Been Rejected
            </Button>
          )}
        </ButtonGroup>
      </CardFooter>
    </Card>
  );
};
