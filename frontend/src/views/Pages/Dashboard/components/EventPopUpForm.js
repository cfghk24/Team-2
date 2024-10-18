import {
    Box,
    Button,
    Flex,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalCloseButton,
    ModalBody,
    ModalFooter,
    StatLabel,
    Text,
    useColorModeValue,
  } from "@chakra-ui/react";
  import React, { useState, useEffect } from "react";
  
  const EventPopUpForm = ({ isOpen, onClose, event, handleRSVPOut, handleRSVPIn }) => {
    const textColor = useColorModeValue("#1e0a3c", "white");
    const userId = localStorage.getItem("userId");
  
    // Determine if the user is already RSVPed
    const [attendStatus, setAttendStatus] = useState(false);
  
    useEffect(() => {
      if (event.rsvpedUserIds.includes(userId)) {
        setAttendStatus(true); // User has RSVPed
      } else {
        setAttendStatus(false); // User has not RSVPed
      }
    }, [event.rsvpedUserIds, userId]);
  
  
    return (
      <Modal isOpen={isOpen} onClose={onClose} scrollBehavior="inside">
        <ModalOverlay />
        <ModalContent p={6} maxW="60vh" minH="40vh" borderRadius={12}>
          <ModalHeader>
            <Flex justify="space-between" align="center">
              {/* Event details */}
              <Box flex="3">
                <Text fontSize="3xl" fontWeight="bold" color="#dd6633" pb={0}>
                  {event.eventName}
                </Text>
                <Text fontSize="xl" color={textColor} pb={0}>
                  {new Date(event.dateTimeStart).toLocaleString()} -{" "}
                  {new Date(event.dateTimeEnd).toLocaleString()}
                </Text>
                <Text fontSize="xl" color="#286299">
                  {event.location}
                </Text>
                <Button
                  as="a"
                  href="https://maps.app.goo.gl/C2KHvnXYBCUVcwPu8"
                  target="_blank"
                  rel="noopener noreferrer"
                  bg="#FFD147"
                  size="sm"
                  variant="solid"
                  mt={3}
                  color="black"
                >
                  View on Map
                </Button>
              </Box>
            </Flex>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Box maxH="60vh" overflowY="auto" mt="-3">
              <Text fontSize="lg" color={textColor} mb={4}>
                {event.eventDescription && (
                  <Box mb={4}>
                    <StatLabel fontSize="xl" fontWeight="bold" pb={2} color="#a36b03">
                      Event Details:
                    </StatLabel>
                    <Box mb={4} dangerouslySetInnerHTML={{ __html: event.eventDescription }} />
                  </Box>
                )}
              </Text>
              <Text fontSize="lg">
                {event.capacity && (
                  <Box>
                    <StatLabel fontSize="lg" fontWeight="bold" pb={2} color="#a36b03">
                      Event Capacity: {event.capacity}
                    </StatLabel>
                  </Box>
                )}
              </Text>
              <Text fontSize="lg" mb={4}>
                {event.capacity && (
                  <Box mb={4}>
                    <StatLabel fontSize="lg" fontWeight="bold" pb={2} color="#a36b03">
                      Spaces Left: {event.capacity-event.rsvpedUserIds.length}
                    </StatLabel>
                  </Box>
                )}
              </Text>
  
              {/* RSVP Button */}
              <Flex justifyContent="center" mt={5}>
                {attendStatus ? (
                  <Button
                    bg="red.400"
                    color="white"
                    onClick={() => {
                      handleRSVPOut(event._id);
                      setAttendStatus(false); // Update UI
                    }}
                  >
                    RSVP Out
                  </Button>
                ) : (
                  <Button
                    bg="green.400"
                    color="white"
                    onClick={() => {
                      handleRSVPIn(event._id);
                      setAttendStatus(true); // Update UI
                    }}
                  >
                    RSVP In
                  </Button>
                )}
              </Flex>
            </Box>
          </ModalBody>
          <ModalFooter>
            <Button onClick={onClose}>Close</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    );
  };
  
  export default EventPopUpForm;
  