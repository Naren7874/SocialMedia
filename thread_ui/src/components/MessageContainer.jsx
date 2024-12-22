/* eslint-disable no-unused-vars */
import {
  Avatar,
  Divider,
  Flex,
  Image,
  Skeleton,
  SkeletonCircle,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import Message from "./Message";
import MessageInput from "./MessageInput.jsx";
import { useRecoilState, useRecoilValue } from "recoil";
import selectedConversationAtom from "../atoms/selectedConversationAtom.js";
import { useEffect, useState } from "react";
import useShowToast from "../hooks/useShowToast.js";
import apiReq from "./lib/apiReq.js";
import userAtom from "../atoms/userAtom.js";
import { useSocket } from "../context/SocketContext.jsx";
const MessageContainer = () => {
  const [selectedConversation, setSelectedConversation] = useRecoilState(
    selectedConversationAtom
  );
  const [loadingMessage, setLoadingMessages] = useState(true);
  const currentUser = useRecoilValue(userAtom);
  const showToast = useShowToast();
  const [messages  ,setMessages] = useState([]);
  const {socket} = useSocket();
  // Fetch messages from selected conversation
  // console.log("your selected user id is \n"+ selectedConversation.userId);


  useEffect(() =>{
    socket.on("newMessage",(message)=>{
      setMessages((prev)=>[...prev , message])
    })

    return () => socket.off("newMessage");

  },[socket])

  // Fetch messages when selected conversation changes
  useEffect(() => {
    const getMessages = async () => {
      setLoadingMessages(true);
      setMessages([]);
      
      try {
        if(selectedConversation.mock) return; 
        const res = await apiReq.get(
          `/messages/${selectedConversation.userId}`
        );
        if (res.data.error) {
          showToast("Error", res.data.error, "error");
          return;
        }
        // console.log(res.data)
        setMessages(res.data);
      } catch (error) {
        console.log("Error: " + error.message);
        showToast("Error", "Failed to fetch messages", "error");
   
      } finally {
        setLoadingMessages(false);

      }
    };
    getMessages();
    // You can fetch all messages from selected conversation here

  }, [showToast, selectedConversation.userId, selectedConversation._id, selectedConversation.mock]);

  
  return (
    <Flex
      flex="70"
      bg={useColorModeValue("gray.200", "gray.dark")}
      borderRadius={"md"}
      p={2}
      flexDirection={"column"}
    >
      {/* Message header */}
      <Flex w={"full"} h={12} alignItems={"center"} gap={2}>
        <Avatar
          src={
            selectedConversation.userProfilePic
          }
          size={"sm"}
        />
        <Text display={"flex"} alignItems={"center"}>
          {selectedConversation.username}
          <Image src="/verified.png" w={4} h={4} ml={1} />
        </Text>
      </Flex>

      <Divider />

      <Flex
        flexDir={"column"}
        gap={4}
        my={4}
        p={2}
        height={"400px"}
        overflowY={"auto"}
      >
        {loadingMessage &&
          [...Array(5)].map((_, i) => (
            <Flex
              key={i}
              gap={2}
              alignItems={"center"}
              p={1}
              borderRadius={"md"}
              alignSelf={i % 2 === 0 ? "flex-start" : "flex-end"}
            >
              {i % 2 === 0 && <SkeletonCircle size={7} />}
              <Flex flexDir={"column"} gap={2}>
                <Skeleton h="8px" w="250px" />
                <Skeleton h="8px" w="250px" />
                <Skeleton h="8px" w="250px" />
              </Flex>
              {i % 2 !== 0 && <SkeletonCircle size={7} />}
            </Flex>
          ))}

        {!loadingMessage && (
          <>
            {messages.map((message, index) => (
              <Message key={index} message={message} ownMessage={currentUser._id === message.sender} />
            ))}
          </>
        )}
      </Flex>
      < MessageInput   setMessages={setMessages}/>
    </Flex>
  );
};

export default MessageContainer;
