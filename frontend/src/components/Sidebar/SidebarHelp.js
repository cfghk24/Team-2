import { QuestionIcon } from "@chakra-ui/icons";
import { Button, Flex, Link, Text } from "@chakra-ui/react";
import SidebarHelpImage from "assets/img/SidebarHelpImage.png";
import IconBox from "components/Icons/IconBox";
import React from "react";

export function SidebarHelp(props) {
  // Pass the computed styles into the `__css` prop
  const { children, ...rest } = props;
  return (
    <Flex
      borderRadius="15px"
      flexDirection="column"
      bg="#dd6633"
      justifyContent="flex-start"
      alignItems="start"
      boxSize="border-box"
      p="16px"
      h="170px"
      w="100%"
      mt="22vh"
    >
      <IconBox width="35px" h="35px" bg="white" mb="auto">
        <QuestionIcon color="#dd6633" h="18px" w="18px" />
      </IconBox>
      <Text fontSize="sm" color="white" fontWeight="bold">
        Need help?
      </Text>
      <Text fontSize="xs" color="white" mb="10px">
        Please check our docs
      </Text>
      <Link
        w="100%"
        href="mailto:wasiflh@connect.hku.hk"
        target="_blank"
      >
        <Button
          fontSize="13px"
          fontWeight="bold"
          w="100%"
          bg="#F3C623"
          _hover="none"
          _active={{
            bg: "white",
            transform: "none",
            borderColor: "transparent",
          }}
          _focus={{
            boxShadow: "none",
          }}
          color="white"
        >
          Contact Us
        </Button>
      </Link>
    </Flex>
  );
}
