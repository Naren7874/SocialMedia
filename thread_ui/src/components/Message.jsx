import { Avatar, Box, Flex, Image, Text } from "@chakra-ui/react";
import { BsCheck2All } from "react-icons/bs";
import selectedConversationAtom from "../atoms/selectedConversationAtom";
import { useRecoilState, useRecoilValue } from "recoil";
import userAtom from "../atoms/userAtom";

const Message = ({ ownMessage  , message}) => {
  const currentUser = useRecoilValue(userAtom);
  const [selectedConversation, setSelectedConversation] = useRecoilState(
    selectedConversationAtom
  );
  return (
    <>
      {ownMessage ? (
        <Flex gap={2} alignSelf={"flex-end"}>
          <Flex bg={"green.800"} maxW={"350px"} p={1} borderRadius={"md"}>
            <Text color={"white"}>
              {
                message.text
              }
            </Text>
          </Flex>
          <Avatar src={
            currentUser.profilePic || "./NoProfile"
          } w="7" h={7} />
        </Flex>
      ) : (
        <Flex gap={2}>
          <Avatar src={
            selectedConversation.userProfilePic || "./NoProfile"
          } w="7" h={7} />
          <Text
            maxW={"350px"}
            bg={"gray.400"}
            p={1}
            borderRadius={"md"}
            color={"black"}
          >
            {
              message.text
            }
          </Text>
        </Flex>
      )}
    </>
  );
};

export default Message;
