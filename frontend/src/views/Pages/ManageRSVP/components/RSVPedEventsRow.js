import {
  Box,
  Button,
  Flex,
  Icon,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import React from "react";
import { FaPencilAlt, FaTrashAlt } from "react-icons/fa";

function RSVPedEventsRow({row, handleRSVPOut}) {
  const textColor = useColorModeValue("#f0bc02", "white");
  const bgColor = useColorModeValue("#F4F6FF", "gray.800");
  const nameColor = useColorModeValue("#dd6633", "white");

  const startDate = new Date(row.dateTimeStart);
  const endDate = new Date(row.dateTimeEnd);

  const eventDay = startDate.getDate();
  const eventMonth = startDate.toLocaleString('default', { month: 'long' });
  const startTime = startDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true });
  const endTime = endDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true });
  const eventDateString = `${eventDay} ${eventMonth}, ${startTime} - ${endTime}`;
  return (
    <Box p="24px" bg={bgColor} my="22px" borderRadius="12px">
      <Flex justify="space-between" w="100%">
        <Flex direction="column" maxWidth="100%">
          <Text color={nameColor} fontSize="md" fontWeight="bold" mb="10px">
            {name}
          </Text>
          <Text color="#EB8317" fontSize="sm" fontWeight="semibold">
            Event Name:{" "}
            <Text as="span" color="#10375C">
              {row.eventName}
            </Text>
          </Text>
          <Text color="#EB8317" fontSize="sm" fontWeight="semibold">
            Event Details:{" "}
            <Text as="span" color="#10375C">
              {eventDateString}
            </Text>
          </Text>
          <Text color="#EB8317" fontSize="sm" fontWeight="semibold">
            Event Location:{" "}
            <Text as="span" color="#10375C">
              {row.location}
            </Text>
          </Text>
        </Flex>
        <Flex
          direction={{ sm: "column", md: "row" }}
          align="flex-start"
          p={{ md: "24px" }}
        >
          <Button
            p="0px"
            bg="transparent"
            mb={{ sm: "10px", md: "0px" }}
            me={{ md: "12px" }}
            onClick={() => handleRSVPOut(row._id)}
          >
            <Flex color={textColor} cursor="pointer" align="center" p="12px">
              <Icon as={FaTrashAlt} me="4px" />
              <Text fontSize="sm" fontWeight="semibold">
                RSVP Out
              </Text>
            </Flex>
          </Button>
        </Flex>
      </Flex>
    </Box>
  );
}

export default RSVPedEventsRow;
