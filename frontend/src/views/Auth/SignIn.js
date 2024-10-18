import React, { useState } from "react";
// Chakra imports
import {
  Box,
  Flex,
  Button,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Link,
  Switch,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
// Assets
import signInImage from "assets/img/signup-head.jpg";
import { userSignIn } from "api/userApi";

function SignIn() {
  // Chakra color mode
  const titleColor = useColorModeValue("#dd6633", "teal.200");
  const textColor = useColorModeValue("#10375C", "white");

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const attemptSignIn = async () => {
    try {
      const response = await userSignIn(username, password);
      if (response.userId) {
        localStorage.setItem("userId", response.userId);
        localStorage.setItem("username", response.userName);
        window.location.href = "http://localhost:3000/#/admin/home";
      } else {
        console.error("Error during sign in else:", response);
      }
    } catch (error) {
      console.error("Error during sign in:", error);
    }
  };

  return (
    <Flex position='relative' mb='40px'>
      <Flex
        h={{ sm: "initial", md: "75vh", lg: "85vh" }}
        w='100%'
        maxW='1044px'
        mx='auto'
        justifyContent='space-between'
        mb='30px'
        pt={{ sm: "100px", md: "0px" }}>
        <Flex
          alignItems='center'
          justifyContent='start'
          style={{ userSelect: "none" }}
          w={{ base: "100%", md: "50%", lg: "42%" }}>
          <Flex
            direction='column'
            w='100%'
            background='transparent'
            p='48px'
            mt={{ md: "150px", lg: "80px" }}>
            <Heading color={titleColor} fontSize='32px' mb='10px'>
              Welcome Back
            </Heading>
            <Text
              mb='36px'
              ms='4px'
              color={textColor}
              fontWeight='bold'
              fontSize='14px'>
              Enter your username and password to sign in
            </Text>
            <FormControl>
              <FormLabel ms='4px' fontSize='sm' fontWeight='normal'>
                Username
              </FormLabel>
              <Input
                borderRadius='15px'
                mb='24px'
                fontSize='sm'
                type='text'
                placeholder='Your username'
                size='lg'
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <FormLabel ms='4px' fontSize='sm' fontWeight='normal'>
                Password
              </FormLabel>
              <Input
                borderRadius='15px'
                mb='36px'
                fontSize='sm'
                type='password'
                placeholder='Your password'
                size='lg'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <FormControl display='flex' alignItems='center'>
                <Switch id='remember-login' colorScheme='orange' me='10px' />
                <FormLabel
                  htmlFor='remember-login'
                  mb='0'
                  ms='1'
                  fontWeight='normal'>
                  Remember me
                </FormLabel>
              </FormControl>
              <Button
                fontSize='10px'
                type='submit'
                bg='#EB8317'
                w='100%'
                h='45'
                mb='20px'
                color='white'
                mt='20px'
                _hover={{
                  bg: "#F3C623",
                }}
                _active={{
                  bg: "teal.400",
                }}
                onClick={attemptSignIn}
                >
                SIGN IN
              </Button>
            </FormControl>
            <Flex
              flexDirection='column'
              justifyContent='center'
              alignItems='center'
              maxW='100%'
              mt='0px'>
              <Text color={textColor} fontWeight='medium'>
                Don't have an account?
                <Link 
                  color={titleColor} 
                  as='span' 
                  ms='5px' 
                  fontWeight='bold'
                  onClick={() => window.location.href = "http://localhost:3000/#/auth/signup"}
                >
                  Sign Up
                </Link>
              </Text>
            </Flex>
          </Flex>
        </Flex>
        <Box
          display={{ base: "none", md: "block" }}
          overflowX='hidden'
          h='100%'
          w='40vw'
          position='absolute'
          right='0px'>
          <Box
            bg={`linear-gradient(
              rgba(221, 102, 51, 0.6),  
              rgba(221, 102, 51, 0.2)),
              url(${signInImage})`}
            w='100%'
            h='100%'
            bgSize='cover'
            bgPosition='50%'
            position='absolute'
            borderBottomLeftRadius='20px'
            opacity='0.9'
          ></Box>
        </Box>
      </Flex>
    </Flex>
  );
}

export default SignIn;
