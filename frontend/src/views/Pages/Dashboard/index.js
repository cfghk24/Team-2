// Chakra imports
import {
  Flex,
  Grid,
  Image,
  SimpleGrid,
  useColorModeValue,
  Box,
  Text,
} from "@chakra-ui/react";
// assets
import peopleImage from "assets/img/friends2.jpg";

import highlightEventImage from "assets/img/diwali.jpg";

import React, { useEffect, useState } from "react";
import HighligthEventThisMonth from "./components/HighligthEventThisMonth";
import YourPerfectEventMatch from "./components/YourPerfectEventMatch";
import CustomCalendar from "./components/CustomCalender";
import {events as initialEvents} from "./events";
import { getEvents } from "api/eventApi";
import { rsvpOutFromEvent } from "api/userApi";
import { signUpForEvent } from "api/userApi";

export default function Home() {
  const userId = localStorage.getItem("userId");
  const iconBoxInside = useColorModeValue("white", "white");

  const [events, setEvents] = useState(); 
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null);
  const [monthString, setMonthString] = useState(""); 

  useEffect(() => {
    const getAllEventsThisMonth = async () => {
      const currentMonth = new Date().getMonth() + 1;
      const monthNames = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
      ];
      const currentMonthName = monthNames[new Date().getMonth()];
      setMonthString(currentMonthName);

      try {
        setLoading(true);
        const events = await getEvents(currentMonth);
        if (events.length > 0) {
          setEvents(events);
        }
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    }

    getAllEventsThisMonth();
  }, []);

  if (loading) {
    return <p>Loading events...</p>;
  }
  if (error) {
    return <p>{error}</p>;
  }

  const handleRSVPIn = async (eventId) => {
    try {
      const addStatus = await signUpForEvent(eventId, userId);
      if (addStatus.message === "User signed up for the event successfully") {
        
        const updatedEvents = events.map(event => {
          if (event._id === eventId) {
            return {
              ...event,
              rsvpedUserIds: [...event.rsvpedUserIds, userId],  
            };
          }
          return event;
        });
        
        setEvents(updatedEvents);  
      } else {
        console.log(addStatus.message);
      }
    } catch (error) {
      console.error('Error signing up for event:', error);
    }
  };
  
  const handleRSVPOut = async (eventId) => {
    try {
      const removeStatus = await rsvpOutFromEvent(eventId, userId);
      if (removeStatus.message === "User rsvp-out from the event successfully") {

        const updatedEvents = events.map(event => {
          if (event._id === eventId) {
            return {
              ...event,
              rsvpedUserIds: event.rsvpedUserIds.filter(id => id !== userId), 
            };
          }
          return event;
        });
  
        setEvents(updatedEvents);  
      } else {
        console.log(removeStatus.message);
      }
    } catch (error) {
      console.error('Error RSVPing out from event:', error);
    }
  };
  

  return (
    <Flex flexDirection='column' pt={{ base: "120px", md: "75px" }}>
      <SimpleGrid columns={{ sm: 1, md: 2, xl: 4 }} spacing=''>
        <Box gridColumn="span 4" textAlign="celeftnter">
          <Text fontSize="3xl" fontWeight="bold" color="#dd6633">
            Events Dashboard
          </Text>
          <Text fontSize="lg" fontWeight="" color="#28271F" mb="4">
            Find events near you from our exclusive calendar. Sign up to help in our events and be at the top of our leaderboards! 
          </Text>
        </Box>
      </SimpleGrid>
      <Grid
        templateColumns={{ md: "1fr", lg: "1.8fr 1.2fr" }}
        templateRows={{ md: "1fr auto", lg: "1fr" }}
        style={{marginBottom: "12px"}}
        gap='24px'>
        <HighligthEventThisMonth
          title={"Highligth Event This Month"}
          name={"Gatherly's Highlights"}
          description={
            "Find out about the most teending, hot event according to Gatherly's statistics. You can't miss this one out!"
          }
          image={
            <Image
              src={highlightEventImage}
              alt='highlight'
              minWidth={{ md: "300px", lg: "auto" }}
              borderRadius="15px"
              loading="lazy"
            />
          }
          highlightEvent={events[1]}
        />
        <YourPerfectEventMatch
          backgroundImage={peopleImage}
          title={"We have found the perfect event for YOU!"}
          description={
            "Our AI-matching tool has found events which match your interests and can help you meet people with similar interests."
          }
          perfectMatchEvent={events[0]}          
        />
      </Grid>
      <SimpleGrid columns={{ sm: 1, md: 2, xl: 4 }} spacing=''>
        <Box gridColumn="span 4" textAlign="celeftnter">
          <Flex alignItems="center" justifyContent="space-between" mt={1} border="#dd6633 1px solid" borderRadius={12} pl={3} pr={5} pt={2} pb={2}>
            <Box>
              <Text fontSize="xl" fontWeight="bold" color="#dd6633">
                Month: {monthString} 2024
              </Text>
            </Box>
            <Flex alignItems="center">
              <Box display="flex" alignItems="center" mr={4}>
                <Box width="15px" height="15px" bg="green.300" mr={2} borderRadius="md"></Box>
                <Text color="#dd6633" fontWeight="bold">Attending</Text>
              </Box>
              <Box display="flex" alignItems="center">
                <Box width="15px" height="15px" bg="blue.300" mr={2} borderRadius="md"></Box>
                <Text color="#dd6633" fontWeight="bold">Open</Text>
              </Box>
            </Flex>
            <Flex>
              <Box
                as="button"
                p={2}
                borderRadius={12}
                bg="#dd6633"
                color="white"
                mr={2}
                minW={40}
                fontWeight="bold"
              >
                ← Previous
              </Box>
              <Box
                as="button"
                p={2}
                borderRadius={12}
                bg="#dd6633"
                color="white"
                minW={40}
                fontWeight="bold"
              >
                Next →
              </Box>
            </Flex>
          </Flex>
        </Box>
      </SimpleGrid>
      <Grid
        templateColumns={{ md: "1fr", lg: "1.8fr 1.2fr" }}
        templateRows={{ md: "1fr auto", lg: "1fr" }}
        my="-55px"
        gap="24px"
      >
        <Box width="152%" height="auto" paddingBottom={10}>
          <CustomCalendar
            handleRSVPIn={handleRSVPIn}
            handleRSVPOut={handleRSVPOut}
            events={events}
          />
        </Box>
      </Grid>
    </Flex>
  );
}
