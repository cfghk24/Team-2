// Chakra imports
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  HStack,
  Icon,
  Input,
  Link,
  Switch,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
// Assets
import BgSignUp from "assets/img/signup-head.jpg";
import React, { useState } from "react";
import { userSignUp } from "api/userApi";  // Import the userSignUp function from your API

function SignUp() {
  const titleColor = useColorModeValue("#dd6633", "teal.200");
  const textColor = useColorModeValue("#10375C", "white");
  const bgColor = useColorModeValue("white", "gray.700");
  
  // State to manage form inputs
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Function to handle sign up attempt
  const attemptSignUp = async () => {
    try {
      const response = await userSignUp(username, email, password);  // Call the signup function

      if (response.userId) {
        // Save userId to localStorage
        localStorage.setItem("userId", response.userId);
        localStorage.setItem("username", response.userName);


        // Redirect user to the homepage
        window.location.href = "http://localhost:3000/#/admin/home";
      } else {
        // Display error message
        console.error("Error during sign up else:", response);
      }
    } catch (error) {
      console.error("Error during sign up:", error);
    }
  };

  return (
    <Flex
      direction='column'
      alignSelf='center'
      justifySelf='center'
      overflow='hidden'>
        <Box
          position='absolute'
          minH={{ base: "70vh", md: "50vh" }}
          w={{ md: "calc(100vw - 50px)" }}
          borderRadius={{ md: "15px" }}
          left='0'
          right='0'
          bg={`linear-gradient(
            rgba(237, 110, 35, 0.6),  
            rgba(237, 110, 35, 0.6)), 
            url(${BgSignUp})`}
          bgRepeat='no-repeat'
          bgSize='cover'
          bgPosition='top'
          mx={{ md: "auto" }}
          mt={{ md: "10px" }}
          zIndex='-1'
          opacity={0.9}
        ></Box>
      <Flex
        direction='column'
        textAlign='center'
        justifyContent='center'
        align='center'
        mt='5.5rem'
        mb='30px'>
        <Text fontSize='4xl' color='white' fontWeight='bold'>
          Welcome!
        </Text>
        <Text
          fontSize='md'
          color='white'
          fontWeight='normal'
          mt='10px'
          mb='26px'
          w={{ base: "90%", sm: "60%", lg: "40%", xl: "30%" }}>
          Sign Up and Manage your events seamlessly!
        </Text>
      </Flex>
      <Flex alignItems='center' justifyContent='center' mb='60px' mt='20px'>
        <Flex
          direction='column'
          w='445px'
          background='transparent'
          borderRadius='15px'
          p='40px'
          mx={{ base: "100px" }}
          bg={bgColor}
          boxShadow='0 20px 27px 0 rgb(0 0 0 / 5%)'>
          <FormControl>
            <FormLabel ms='4px' fontSize='sm' fontWeight='normal'>
              Username
            </FormLabel>
            <Input
              fontSize='sm'
              ms='4px'
              borderRadius='15px'
              type='text'
              placeholder='Your username'
              mb='24px'
              size='lg'
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <FormLabel ms='4px' fontSize='sm' fontWeight='normal'>
              Email
            </FormLabel>
            <Input
              fontSize='sm'
              ms='4px'
              borderRadius='15px'
              type='email'
              placeholder='Your email address'
              mb='24px'
              size='lg'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <FormLabel ms='4px' fontSize='sm' fontWeight='normal'>
              Password
            </FormLabel>
            <Input
              fontSize='sm'
              ms='4px'
              borderRadius='15px'
              type='password'
              placeholder='Your password'
              mb='24px'
              size='lg'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <FormControl display='flex' alignItems='center' mb='24px'>
              <Switch id='remember-login' colorScheme='orange' me='10px' />
              <FormLabel htmlFor='remember-login' mb='0' fontWeight='normal'>
                Remember me
              </FormLabel>
            </FormControl>
            <Button
              type='submit'
              bg='#EB8317'
              fontSize='10px'
              color='white'
              fontWeight='bold'
              w='100%'
              h='45'
              mb='24px'
              _hover={{
                bg: "#F3C623",
              }}
              _active={{
                bg: "teal.400",
              }}
              onClick={attemptSignUp} // Call attemptSignUp on button click
              >
              SIGN UP
            </Button>
          </FormControl>
          <Flex
            flexDirection='column'
            justifyContent='center'
            alignItems='center'
            maxW='100%'
            mt='0px'>
            <Text color={textColor} fontWeight='medium'>
              Already have an account?
              <Link
                color={titleColor}
                as='span'
                ms='5px'
                href='#'
                fontWeight='bold'
                onClick={() => window.location.href = "http://localhost:3000/#/auth/signin"}
                >
                Sign In
              </Link>
            </Text>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
}

export default SignUp;
