// Chakra imports
import { Box, Flex, IconButton, Input, InputGroup, InputLeftElement, Text, useColorModeValue } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { allEvents } from "./allEvents"; // Assuming this is the list of events
import { SearchIcon } from "@chakra-ui/icons";
import EventSearched from "./components/EventSearched"; // Import the EventSearched component
import EventSlideCard from "./components/EventSlideCard";

// swiper imports
import { Swiper, SwiperSlide } from "swiper/react"; // Swiper.js
import { Navigation } from "swiper/modules"; 
import "swiper/css"; // import Swiper's base styles
import "swiper/css/navigation"; // import Swiper's navigation styles
import { getFirst50Events } from "api/eventApi";
import { signUpForEvent } from "api/userApi";
import { rsvpOutFromEvent } from "api/userApi";

import eventimage1 from "../../../assets/img/evtimg1.jpg";
import eventimage2 from "../../../assets/img/evtimg2.jpg";
import eventimage3 from "../../../assets/img/evtimg3.jpg";
import eventimage4 from "../../../assets/img/evtimg4.jpg";
import eventimage5 from "../../../assets/img/evtimg5.jpg";

function FindEvents() {
  const userId = localStorage.getItem("userId");
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null);
  const [allCurrEvents, setAllCurrEvents] = useState([]);
  const [searchQuery, setSearchQuery] = useState("eid");
  const mainTeal = useColorModeValue("teal.300", "teal.300");
  const searchIconColor = useColorModeValue("gray.700", "gray.200");
  const inputBg = useColorModeValue("white", "gray.800");
  const eventImages = [eventimage1, eventimage2, eventimage3];

  // filter the events based on the search query
  const filteredEvents = allCurrEvents.filter(event =>
    event.eventName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleRSVPIn = async (eventId) => {
      try {
        const addStatus = await signUpForEvent(eventId, userId);
        if (addStatus.message === "User signed up for the event successfully") {
            const updatedEvents = allCurrEvents.map(event => {
            if (event._id === eventId) {
              return {
              ...event,
              rsvpedUserIds: [...event.rsvpedUserIds, userId], // Add userId to rsvpedUserIds
              };
            }
            return event;
            });
            setAllCurrEvents(updatedEvents);
            console.log(addStatus.message);
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
        const updatedEvents = allCurrEvents.map(event => {
          if (event._id === eventId) {
            return {
              ...event,
              rsvpedUserIds: event.rsvpedUserIds.filter(id => id !== userId), // Remove userId from rsvpedUserIds
            };
          }
          return event;
        });
        setAllCurrEvents(updatedEvents);
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
    const getTopEvents = async () => {

      try {
        setLoading(true);
        const events = await getFirst50Events(userId);
        if (events.length > 0) {
          setAllCurrEvents(events);
          setSearchQuery(events[0].eventName); 
        }
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    }

    getTopEvents();
  }, []);

  if (loading) {
    return <p>Loading events...</p>;
  }
  if (error) {
    return <p>{error}</p>;
  }

  return (
    <Flex direction="column" pt={{ base: "120px", md: "75px" }}>
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
            placeholder="Search events..."
            borderRadius="inherit"
            onChange={(e) => setSearchQuery(e.target.value)} // Update search query on input change
          />
        </InputGroup>
      </Flex>
      {/* search Bar Ends */}
      <Text fontWeight="bold" mb={0} fontSize="lg" color="#1e0a3c">
        Search Results/Most Liked Event:
      </Text>

      {/* display search results */}
      {searchQuery && (
        <Box mt={4} bg="gray.50" p={0} borderRadius="md">
          {filteredEvents.length > 0 ? (
            filteredEvents.map((event) => (
              <EventSearched
                key={event._id}
                event={event}
                attendStatus={event.attendStatus}
                onRSVPIn={()=>handleRSVPIn(event._id)}
                onRSVPOut={()=>handleRSVPOut(event._id)}
              />
            ))
          ) : (
            <Flex justifyContent="center" mb={4}>
              <Text color="#dd6633" fontWeight="bold">No events found 🥺. Search something else?</Text>
            </Flex>
          )}
        </Box>
      )}
      {!searchQuery && (
        <Flex justifyContent="center" mb={4}>
              <Text color="#dd6633" fontWeight="bold">It's quite in here....Search for an event!</Text>
        </Flex> 
      )}
      

      {/* Explore More Section */}
      <Text fontWeight="bold" mb={0} fontSize="2xl" color="#dd6633" mt={5} ml={3}>
        Explore More Events:
      </Text>

      {/* Swiper Carousel for Events */}
      <Box mt={4} bg="gray.50" p={0} borderRadius="md">
        <Swiper
          spaceBetween={15}
          slidesPerView={3}
          navigation={true} // Enable navigation
          modules={[Navigation]} // Pass in the navigation module
          style={{
            padding: "0 45px" // Add padding to the Swiper to give space for navigation buttons
          }}
        >
          {allCurrEvents.map((event, index) => (
            <SwiperSlide key={index}>
            <EventSlideCard 
              event={event} 
              attendStatus={event.attendStatus} // Pass attendStatus here
              onRSVPIn={handleRSVPIn} // Pass the handler
              onRSVPOut={handleRSVPOut} // Pass the handler
              eventimage={eventImages[index % eventImages.length]} // Cycle through the images
            />
            </SwiperSlide>
          ))}
        </Swiper>
      </Box>
    </Flex>
  );
}

export default FindEvents;
