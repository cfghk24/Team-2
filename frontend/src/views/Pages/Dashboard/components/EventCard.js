// Chakra imports
import {
  Flex,
  Stat,
  StatLabel,
  StatNumber,
  useColorModeValue,
  Box,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Checkbox,
  Stack,
  useToast
} from "@chakra-ui/react";
// Custom components
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import React, { useState } from "react";
import EventPopUpForm from "./EventPopUpForm";
// import EventSignupPopUpForm from "./EventSignupPopUpForm";
// import EventCheckInfoPopUpForm from "./EventCheckInfoPopUpForm";

const EventCard = ({ event, handleRSVPIn, handleRSVPOut }) => {
  const toast = useToast();
  const userId = localStorage.getItem("userId");
  const bgColor = event.rsvpedUserIds.includes(userId)
    ? useColorModeValue("green.200", "green.700")  // Softer green background
    : useColorModeValue("blue.200", "blue.700");  // Softer blue background
  const textColor = useColorModeValue("black.700", "white");

  const { isOpen, onOpen, onClose } = useDisclosure();

  const [openForm, setOpenForm] = useState(null);

  const handleEventClick = () => {
    onOpen(); 
  };


  return (
    <>
      <Card 
        minH='75px' 
        bg={bgColor}
        cursor="pointer"
        transition="transform 0.2s"
        _hover={{
          transform: "scale(1.05)", // Slight zoom on hover
        }}
        onClick={handleEventClick}
            >
        <CardBody>
          <Flex flexDirection='row' align='center' justify='center' w='100%'>
            <Stat me='auto'>
              <StatLabel
          fontSize='sm'
          color='black'
          fontWeight=''
          pb=''>
          {new Date(event.dateTimeStart).toLocaleTimeString()} - {new Date(event.dateTimeEnd).toLocaleTimeString()}
              </StatLabel>
              <Flex>
          <StatNumber fontSize='md' color={textColor}>
            {event.eventName.slice(0, 14) + '...'}
          </StatNumber>
              </Flex>
            </Stat>
          </Flex>
        </CardBody>
      </Card>
      <EventPopUpForm
        isOpen={isOpen}
        onClose={onClose}
        event={event} 
        handleRSVPIn={handleRSVPIn}
        handleRSVPOut={handleRSVPOut}
      />

    </>
  );
};

export default EventCard;