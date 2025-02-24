import React from "react";
import { Hero } from "./Sections/Hero";
import Courses from "./Sections/Courses";
import { Divider, Stack } from "@chakra-ui/react";
import { AskForHelp } from "./Sections/AskForHelp";
import Categories from "./Sections/Categories";
import Instrctors from "./Sections/Instrctors";
import LastestNews from "./Sections/LastestNews";
import OurClients from "./Sections/OurClients";

export default function Index() {
  return (
    <>
      <Stack p="0" gap="0" overflow="hidden">
        <Hero />
        <Courses />
        <AskForHelp />
        <Categories />
        <Instrctors />
        <LastestNews />
        <OurClients />
      </Stack>
    </>
  );
}
