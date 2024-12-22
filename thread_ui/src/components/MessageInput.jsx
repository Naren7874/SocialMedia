import { Input, InputGroup, InputRightElement } from "@chakra-ui/react";
import { useState } from "react";
import { IoSendSharp } from "react-icons/io5";
import useShowToast from "../hooks/useShowToast";
import { useRecoilState, useRecoilValue } from "recoil";
import selectedConversationAtom from "../atoms/selectedConversationAtom";
import apiReq from "./lib/apiReq";
import conversationAtom from "../atoms/messagesAtom";

const MessageInput = ({ setMessages }) => {
  const [messageText, setMessageText] = useState("");
  const showToast = useShowToast();
  const selectedConversation = useRecoilValue(selectedConversationAtom);
  const [conversation, setConversation] = useRecoilState(conversationAtom);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!messageText.trim()) return; // Prevent empty message

    try {
      const res = await apiReq.post(`/messages`, {
        message: messageText,
        reciverId: selectedConversation.userId,
      });

      if (res.data.error) {
        showToast("Error", res.data.error, "error");
        return;
      }

      // Add new message to messages list
      setMessages((messages) => [...messages, res.data]);

      // Update conversation with last message
      
      setConversation((prevConvs) => {
        return prevConvs.map((conversation) => {
          if (conversation._id === selectedConversation._id) {
            return {
              ...conversation,
              lastMessages: {
                text: messageText,
                sender: res.data.sender,
              },
            };
          }
          return conversation;
        });
      });

      setMessageText(""); // Clear input after sending
    } catch (error) {
      showToast("Error", "Failed to send message", "error");
      console.log(error.message);
    }
  };

  return (
    <>
      <form onSubmit={handleSendMessage}>
        <InputGroup>
          <Input
            w="full"
            value={messageText}
            placeholder="Type a message"
            onChange={(e) => setMessageText(e.target.value)}
          />
          <InputRightElement onClick={handleSendMessage} cursor="pointer">
            <IoSendSharp />
          </InputRightElement>
        </InputGroup>
      </form>
    </>
  );
};

export default MessageInput;
