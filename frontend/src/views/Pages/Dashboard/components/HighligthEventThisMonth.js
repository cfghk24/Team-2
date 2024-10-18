// Chakra imports
import {
  Button,
  Flex,
  Icon,
  Spacer,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { signUpForEvent } from "api/userApi";
import { rsvpOutFromEvent } from "api/userApi";
// Custom components
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import React, { useEffect, useState } from "react";
// react icons
import { BsArrowRight } from "react-icons/bs";

const HighligthEventThisMonth = ({ title, name, description, image, highlightEvent }) => {
  const userId = localStorage.getItem("userId");
  const textColor = useColorModeValue("gray.700", "white");

  const startDate = new Date(highlightEvent.dateTimeStart);
  const endDate = new Date(highlightEvent.dateTimeEnd);

  const eventDay = startDate.getDate();
  const eventMonth = startDate.toLocaleString('default', { month: 'long' });
  const startTime = startDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true });
  const endTime = endDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true });
  const eventDateString = `${eventDay} ${eventMonth}, ${startTime} - ${endTime}`;

  const [attendStatus, setAttendStatus] = useState(false);

  const handleRSVPIn = async (eventId) => {
    try {
      const addStatus = await signUpForEvent(eventId, userId);
      if (addStatus.message === "User signed up for the event successfully") {
        setAttendStatus(true);
      }
      else {
          console.log(addStatus.message);
      }
    }
    catch (error) {
      console.error('Error signing up for event:', error);
    }
}

const handleRSVPOut = async (eventId) => {
  try {
    const removeStatus = await rsvpOutFromEvent(eventId, userId);
    if (removeStatus.message === "User rsvp-out from the event successfully") {
      setAttendStatus(false);
    }
    else {
      console.log(removeStatus.message);
    }
  } catch (error) {
    console.error('Error RSVPing out from event:', error);
  }
  
};

  useEffect(() => {
    if (highlightEvent.rsvpedUserIds.includes(userId)) {
      setAttendStatus(true);
    }
    else {
      setAttendStatus(false);
    }
  }, [highlightEvent]);

  return (
    <Card minHeight='290.5px' p='1.2rem'>
      <CardBody w='100%'>
        <Flex flexDirection={{ sm: "column", lg: "row" }} w='100%' h="100%" alignItems="stretch">
          <Flex
            flexDirection='column'
            h='100%'
            lineHeight='1.6'
            width={{ lg: "55%" }}>
            <Text fontSize='sm' color='gray.400' fontWeight='bold'>
              {title}
            </Text>
            <Text fontSize='lg' color='#1e0a3c' fontWeight='bold' pb='.5rem'>
              {name}
            </Text>
            <Text fontSize='sm' color='gray.400' fontWeight='normal'>
              {description}
            </Text>
            <Text fontSize='lg' fontWeight='bold' color='#dd6633' style={{marginTop: "10px"}}>
              {highlightEvent.eventName}
            </Text>
            <Text fontSize='sm' color='#dd6633'>
              {highlightEvent.shortDesc}
            </Text>
            <Text fontSize="sm" fontWeight="bold" color="#dd6633">
              Details: {eventDateString}
            </Text>
            <Spacer />
            <Flex align='center'>
            {attendStatus ? (
              <Button
                p='0px'
                variant='no-hover'
                bg='transparent'
                my={{ sm: "1.5rem", lg: "0px" }}
                onClick={() => handleRSVPOut(highlightEvent._id)}
              >
                <Text
                  fontSize='sm'
                  color={textColor}
                  fontWeight='bold'
                  cursor='pointer'
                  transition='all .5s ease'
                  my={{ sm: "1.5rem", lg: "0px" }}
                  _hover={{ me: "4px" }}>
                  RSVP Out
                </Text>
                <Icon
                  as={BsArrowRight}
                  w='20px'
                  h='20px'
                  fontSize='2xl'
                  transition='all .5s ease'
                  mx='.3rem'
                  cursor='pointer'
                  pt='4px'
                  _hover={{ transform: "translateX(20%)" }}
                />
              </Button>
            ):(
              <Button
                p='0px'
                variant='no-hover'
                bg='transparent'
                my={{ sm: "1.5rem", lg: "0px" }}
                onClick={() => handleRSVPIn(highlightEvent._id)}
              >
                <Text
                  fontSize='sm'
                  color={textColor}
                  fontWeight='bold'
                  cursor='pointer'
                  transition='all .5s ease'
                  my={{ sm: "1.5rem", lg: "0px" }}
                  _hover={{ me: "4px" }}>
                  Book Now!
                </Text>
                <Icon
                  as={BsArrowRight}
                  w='20px'
                  h='20px'
                  fontSize='2xl'
                  transition='all .5s ease'
                  mx='.3rem'
                  cursor='pointer'
                  pt='4px'
                  _hover={{ transform: "translateX(20%)" }}
                />
              </Button>
            )}
            </Flex>
          </Flex>
          <Spacer />
          <Flex
            align='center'
            justify='center'
            borderRadius='15px'
            width={{ lg: "40%" }}
            minHeight={{ sm: "250px" }}>
            {image}
          </Flex>
        </Flex>
      </CardBody>
    </Card>
  );
};

export default HighligthEventThisMonth;
