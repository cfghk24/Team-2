import {
  Flex,
  Grid,
  Box,
  Text,
} from "@chakra-ui/react";
import React from "react";
import EventCard from "./EventCard";

export default function CustomCalendar({ events, handleRSVPOut, handleRSVPIn }) {

  const generateDaysInMonth = (month, year) => {
    const days = [];
    const date = new Date(year, month - 1, 1); // Adjust month to be zero-indexed
    while (date.getMonth() === month - 1) {
      days.push(new Date(date));
      date.setDate(date.getDate() + 1);
    }
    return days;
  };

  const daysInTheMonth = generateDaysInMonth(10, 2024); // Adjusted to October

  return (
    <Flex flexDirection="column" pt={{ base: "120px", md: "75px" }} width="100%">
      <Grid templateColumns="repeat(7, 1fr)" gap={4} width="100%">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
          <Box key={day} p={2} textAlign="center" bg="#EB8317" borderRadius={12}>
            <Text fontWeight="bold">{day}</Text>
          </Box>
        ))}

        {daysInTheMonth.map((day) => {
          const dayEvents = events.filter((event) => {
            const eventDate = new Date(event.dateTimeStart);
            return (
              eventDate.getDate() === day.getDate() &&
              eventDate.getMonth() === day.getMonth() &&
              eventDate.getFullYear() === day.getFullYear()
            );
          });

          return (
            <Box
              key={day}
              p={2}
              minHeight="150px"
              border="1px solid #dd6633"
              position="relative"
              borderRadius={12}
            >
              <Text fontSize="lg" mb={2}>
                {day.getDate()}
              </Text>
              {dayEvents && dayEvents.map((event, index) => (
                <EventCard key={index} event={event} handleRSVPIn={handleRSVPIn} handleRSVPOut={handleRSVPOut} />
              ))}
            </Box>
          );
        })}
      </Grid>
    </Flex>
  );
}
