import { useState } from "react";
import { Flex, Text, useColorModeValue, Button } from "@chakra-ui/react";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardHeader from "components/Card/CardHeader.js";
import RSVPedEventsRow from "./RSVPedEventsRow";

const RSVPedEvents = ({ title, attending, setAttending, handleRSVPOut }) => {
  const textColor = useColorModeValue("#1e0a3c", "white");

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const totalPages = Math.ceil(attending.length / itemsPerPage);

  const currentData = attending.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  return (
    <Card my={{ lg: "24px" }} me={{ lg: "24px" }}>
      <Flex direction="column">
        <CardHeader style={{marginTop: "10px"}}>
          <Text color={textColor} fontSize="lg" fontWeight="bold">
            {title}
          </Text>
        </CardHeader>
        <CardBody>
          <Flex direction="column" w="100%">
            {currentData.map((row, index) => (
              <RSVPedEventsRow
                key={index} // Use index for key since data may not have unique ID
                row={row}
                handleRSVPOut={handleRSVPOut}
              />
            ))}
          </Flex>
        </CardBody>
      </Flex>
      <Flex justifyContent="center" mt="20px">
            <Button
              onClick={handlePreviousPage}
              disabled={currentPage === 1}
              bg="#dd6633"
              textColor="#1e0a3c"
              minWidth={40}
            >
              Previous
            </Button>
            <Text fontWeight="bold" px={4} py={2}>
              Page {currentPage} of {totalPages}
            </Text>
            <Button
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
              bg="#dd6633"
              textColor="#1e0a3c"
              minWidth={40}
            >
              Next
            </Button>
          </Flex>
    </Card>
  );
};

export default RSVPedEvents;
