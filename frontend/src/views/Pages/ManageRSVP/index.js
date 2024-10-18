// Chakra imports
import { Box, Flex, Grid, IconButton, Input, InputGroup, InputLeftElement, useColorModeValue, Text, Icon } from "@chakra-ui/react";
// Assets
import React, { useEffect, useState } from "react";
import { SearchIcon } from "@chakra-ui/icons";


import RSVPedEvents from "./components/RSVPedEvents";
import { rsvpedEvents } from "./rsvpedEvents";
import EventSearchResult from "./components/EventSearchResult";
import { getFirst50AttendingEvents } from "api/eventApi";
import { rsvpOutFromEvent } from "api/userApi";

function ManageRSVP() {
  const userId = localStorage.getItem("userId");
  const mainTeal = useColorModeValue("teal.300", "teal.300");
  const searchIconColor = useColorModeValue("gray.700", "gray.200");
  const inputBg = useColorModeValue("white", "gray.800");
  const [attending, setAttending] = useState([]);
  const [searchQuery, setSearchQuery] = useState("eid");
  const [loading, setLoading] = useState(true);

  const filteredEvents = attending.filter(event =>
    event.eventName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleRSVPOut = async (eventId) => {
    try {
      const removeStatus = await rsvpOutFromEvent(eventId, userId);
      if (removeStatus.message === "User rsvp-out from the event successfully") {
        const updatedEvents = attending.filter(event => event._id !== eventId);
        setAttending(updatedEvents);
        setSearchQuery(updatedEvents[0].eventName);
        console.log(removeStatus.message);
      }
      else {
        console.log(removeStatus.message);
      }
    } catch (error) {
      console.error('Error RSVPing out from event:', error);
    }
    
  };

  useEffect(() => {
    const getRSVPedEvents = async () => {
      try {
        setLoading(true);
        const events = await getFirst50AttendingEvents(userId);
        if (events.length > 0) {
          setAttending(events);
          setSearchQuery(events[0].eventName); 
        }
      } catch (error) {
        setError(error);
      } 
    }
    getRSVPedEvents();
  }, []);

  return (
    <Flex direction='column' pt={{ base: "120px", md: "75px" }}>

      {/* Search Bar Start */}
      <Flex justifyContent="center">
        <InputGroup
          bg={inputBg}
          borderRadius="15px"
          w="800px"
          mb={4} 
          _focus={{
            borderColor: { mainTeal },
          }}
          _active={{
            borderColor: { mainTeal },
          }}
        >
          <InputLeftElement
            children={
              <IconButton
                bg="inherit"
                borderRadius="inherit"
                _hover="none"
                _active={{
                  bg: "inherit",
                  transform: "none",
                  borderColor: "transparent",
                }}
                _focus={{
                  boxShadow: "none",
                }}
                icon={<SearchIcon color={searchIconColor} w="15px" h="15px" />}
              />
            }
          />
          <Input
            fontSize="xs"
            py="11px"
            placeholder="Search RSVPed events..."
            borderRadius="inherit"
            onChange={(e) => setSearchQuery(e.target.value)} // update search query on input change
          />
        </InputGroup>
      </Flex>
      {/* Search Bar Ends */}


      {/* Display search results using EventSearchResult */}
      {searchQuery && (
        <Box mt={4} bg="gray.50" p={0} borderRadius="md">
          <Text fontWeight="bold" mb={2} fontSize="lg" color="#1e0a3c">
            Search Results/Recent RSVP:
          </Text>
          {filteredEvents.length > 0 ? (
            filteredEvents.map((event) => (
              <EventSearchResult key={event._id} event={event} onRSVPOut={handleRSVPOut} />
            ))
          ) : (
            <Flex justifyContent="center" mb={4}>
              <Text color="#dd6633" fontWeight="bold">No events found / Search something (else)</Text>
            </Flex>
          )}
        </Box>
      )}

      <Grid templateColumns={{ sm: "1fr", lg: "1fr" }}>
        <RSVPedEvents title={"Your RSVPed Events"} attending={attending} setAttending={setAttending} handleRSVPOut={handleRSVPOut} />
      </Grid>
    </Flex>
  );
}

export default ManageRSVP;
