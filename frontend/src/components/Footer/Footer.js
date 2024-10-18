/*eslint-disable*/
import React from "react";
import { Flex, Link, List, ListItem, Text } from "@chakra-ui/react";
import PropTypes from "prop-types";

export default function Footer(props) {
  // const linkTeal = useColorModeValue("teal.400", "red.200");=
  return (
    <Flex
      flexDirection={{
        base: "column",
        xl: "row",
      }}
      alignItems={{
        base: "center",
        xl: "start",
      }}
      justifyContent="space-between"
      px="30px"
      pb="20px"
    >
      <Text
        textAlign={{
          base: "center",
          xl: "start",
        }}
        mb={{ base: "20px", xl: "0px" }}
        color="#dd6633"
      >
        &copy; {1900 + new Date().getYear()},{" "}
        <Text as="span">
            Exclusive property of{" "}
        </Text>
        <Link
          color="teal.400"
          href="#"
        >
          Gatherly
        </Link>
      </Text>
      <List display="flex">
        <ListItem
          me={{
            base: "20px",
            md: "44px",
          }}
        >
          <Link color="#dd6633" href="#">
            Gatherly
          </Link>
        </ListItem>
        <ListItem>
          <Link
            color="#dd6633"
            href="#license"
            href="https://www.creative-tim.com/license"
          >
            License
          </Link>
        </ListItem>
      </List>
    </Flex>
  );
}
