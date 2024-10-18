import React from "react";
import { Button, Flex, Text, Box, useColorModeValue, Icon, Spacer, Image } from "@chakra-ui/react";
import Card from "components/Card/Card.js"; // Reusing your existing Card component
import CardBody from "components/Card/CardBody.js";
import { FaTrashAlt } from "react-icons/fa";
import eventimage from "../../../../assets/img/eid.jpg"; // Sample event image

const EventSearchResult = ({ event, onRSVPOut }) => {
  const rsvptextColor = useColorModeValue("#f0bc02", "white");
  const textColor = useColorModeValue("#1e0a3c", "white");
  const eventBgColor = useColorModeValue("white", "#1e0a3c");
  
  const startDate = new Date(event.dateTimeStart);
  const endDate = new Date(event.dateTimeEnd);
  
  const eventDay = startDate.getDate();
  const eventMonth = startDate.toLocaleString('default', { month: 'long' });
  const startTime = startDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true });
  const endTime = endDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true });
  const eventDateString = `${eventDay} ${eventMonth}, ${startTime} - ${endTime}`;

  return (
    <Card minHeight="290.5px" p="1.2rem" bg={eventBgColor} borderRadius="15px">
      <CardBody w="100%">
        <Flex flexDirection={{ sm: "column", lg: "row" }} w="100%" h="100%" alignItems="stretch">
          {/* Left Section: Event Information */}
          <Flex
            flexDirection="column"
            h="100%"
            lineHeight="1.6"
            width={{ lg: "60%" }}>
            <Text fontSize="2xl" color="#dd6633" fontWeight="bold" pb=".5rem">
              {event.eventName}
            </Text>
            <Box
              dangerouslySetInnerHTML={{ __html: event.eventDescription }}
              fontSize="sm"
              color={textColor}
              pb="1rem"
            />
            
            {/* Flex container for Date, Time, Location, and RSVP */}
            <Flex direction="row" alignItems="center" w="100%">
              <Box mr="10vh">
                <Text fontSize="sm" color="#dd6633">
                  <strong>Date & Time: </strong>{eventDateString}
                </Text>
                <Text fontSize="sm" color="#dd6633">
                  <strong>Location: </strong>{event.location}
                </Text>
              </Box>

              {/* RSVP Out Button */}
              <Button
                p="0px"
                bg="transparent"
                onClick={() => onRSVPOut(event._id)} // Trigger RSVP out
              >
                <Flex color={rsvptextColor} cursor="pointer" align="center" p="12px">
                  <Icon as={FaTrashAlt} me="4px" />
                  <Text fontSize="sm" fontWeight="semibold">
                    RSVP Out
                  </Text>
                </Flex>
              </Button>
            </Flex>
          </Flex>
          <Flex
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            width={{ lg: "10%" }}
          ></Flex>
          {/* Right Section: Event Image */}
          <Flex
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            width={{ lg: "30%" }}
            height="28vh"
            objectFit={{ lg: "cover" }}
            position="relative"  // Add relative position for gradient overlay
          >
            <Image 
              src={eventimage} 
              alt="Event" 
              borderRadius="15px"
              boxSize="100%"
              objectFit="cover"
              loading="lazy"
            />

            {/* Gradient Overlay */}
            <Box
              bg="linear-gradient(180deg, rgba(49, 56, 96, 0.16) 0%, #dd6633 120%)"
              w="100%"
              h="100%"
              position="absolute"  // Ensure the overlay is positioned over the image
              top="0"  // Align the overlay to the top of the image
              left="0"
              borderRadius="15px"  // Ensure the border radius matches the image's radius
            />
          </Flex>

        </Flex>
      </CardBody>
    </Card>
  );
};

export default EventSearchResult;
