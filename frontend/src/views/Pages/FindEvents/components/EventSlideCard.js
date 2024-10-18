import React from "react";
import { Box, Text, Flex, Button, Image, useColorModeValue, Icon } from "@chakra-ui/react";
import { FaCheck, FaTrashAlt } from "react-icons/fa"; // Icons for RSVP buttons

const EventSlideCard = ({ event, attendStatus, onRSVPIn, onRSVPOut, eventimage }) => {
  // Format date and time
  const userId = localStorage.getItem("userId");
  const startDate = new Date(event.dateTimeStart);
  const eventDay = startDate.getDate();
  const eventMonth = startDate.toLocaleString('default', { month: 'long' });
  const startTime = startDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true });
  const endTime = new Date(event.dateTimeEnd).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true });
  const eventDateString = `${eventDay} ${eventMonth}, ${startTime} - ${endTime}`;

  // Chakra UI color scheme
  const rsvptextColor = useColorModeValue("#dd6633", "white");
  const textColor = useColorModeValue("#1e0a3c", "white");

  return (
    <Box
      p={4}
      borderWidth="1px"
      borderRadius="20px"
      overflow="hidden"
      boxShadow="md"
      bgGradient="linear(to-t, #fae69d 5%, #dd6633 90%)"
      width="90%" // Set a fixed width to resemble a card
      textAlign="center"
      minHeight="52vh"
    >
      {/* Top Section: Event Image */}
      <Image 
        src={event.image || eventimage} 
        alt="Event" 
        borderRadius="10px"
        mb={4}
        boxSize="100%"
        objectFit="cover"
        h="28vh"
        loading="lazy"
      />

      {/* Middle Section: Event Details */}
      <Text fontWeight="bold" fontSize="lg" color={textColor}>
        {event.eventName}
      </Text>
      <Text mt={2} fontSize="sm" color={textColor}>
        <strong>Date & Time:</strong> {eventDateString}
      </Text>
      <Text mt={2} fontSize="sm" color={textColor}>
        <strong>Location:</strong> {event.location}
      </Text>

      {/* Bottom Section: RSVP Button */}
      <Flex justifyContent="center" mt={4}>
        { event.rsvpedUserIds.includes(userId) ? (
          <Button
            p="0px"
            bg="transparent"
            border="1px solid"
            borderRadius="full"
            onClick={() => onRSVPOut(event._id)} // Trigger RSVP out
            width="full"
          >
            <Flex color={rsvptextColor} cursor="pointer" align="center" p="12px">
              <Icon as={FaTrashAlt} me="4px" />
              <Text fontSize="sm" fontWeight="semibold">
                RSVP Out
              </Text>
            </Flex>
          </Button>
        ) : (
          <Button
            p="0px"
            bg="transparent"
            border="1px solid"
            borderRadius="full"
            onClick={() => onRSVPIn(event._id)} // Trigger RSVP in
            width="full"
          >
            <Flex color={rsvptextColor} cursor="pointer" align="center" p="12px">
              <Icon as={FaCheck} me="4px" />
              <Text fontSize="sm" fontWeight="semibold">
                RSVP In
              </Text>
            </Flex>
          </Button>
        )}
      </Flex>
    </Box>
  );
};

export default EventSlideCard;
