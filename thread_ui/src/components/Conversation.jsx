/* eslint-disable react/prop-types */
// Conversation.jsx
import {
  Avatar,
  AvatarBadge,
  Flex,
  Image,
  Stack,
  Text,
  useColorModeValue,
  WrapItem,
} from "@chakra-ui/react";
import { BsCheck2All } from "react-icons/bs";
import { useRecoilState, useRecoilValue } from "recoil";
import userAtom from "../atoms/userAtom";
import selectedConversationAtom from "../atoms/selectedConversationAtom";

const Conversation = ({ conversation, setSelectedConversation ,isOnline }) => {
  const lastMessage = conversation.lastMessages?.text;
  const [selectedConversation] = useRecoilState(selectedConversationAtom);
  const currentUser = useRecoilValue(userAtom);

  const otherParticipant = conversation.participants.find(
    (participant) => participant._id !== currentUser._id
  );

  const isSelected = selectedConversation?._id === conversation._id;
  const selectedBg = useColorModeValue("gray.200", "gray.700"); // Light and dark mode bg for selected
  const hoverBg = useColorModeValue("gray.100", "gray.600"); // Light and dark mode bg for hover
  const textColor = useColorModeValue("black", "white"); // Text color for light and dark modes

  return (
    <Flex
      gap={4}
      alignItems="center"
      p="1"
      onClick={() =>
        setSelectedConversation({
          _id: conversation._id,
          userId: otherParticipant._id,
          username: otherParticipant.username,
          userProfilePic: otherParticipant.profilePic || "./NoProfile",
          mock: conversation.mock,
        })
      }
      _hover={{
        cursor: "pointer",
        bg: hoverBg,
      }}
      bg={isSelected ? selectedBg : ""}
      color={isSelected ? textColor : ""}
      borderRadius="md"
    >
      <WrapItem>
        <Avatar
          size={{ base: "xs", sm: "sm", md: "md" }}
          src={otherParticipant.profilePic || "./NoProfile"}
        >
          {
            isOnline ? <AvatarBadge boxSize='1em' bg="green.500"/>:""
          }
        </Avatar>
      </WrapItem>

      <Stack direction="column" fontSize="sm">
        <Text fontWeight="700" display="flex" alignItems="center">
          {otherParticipant.username}
          <Image src="/verified.png" w={4} h={4} ml={1} />
        </Text>
        <Text fontSize="xs" display="flex" alignItems="center" gap={1}>
          {lastMessage?.length > 18
            ? `${lastMessage.substring(0, 18)}...`
            : lastMessage}
          {currentUser._id === conversation?.lastMessages?.sender && (
            <BsCheck2All size={16} />
          )}
        </Text>
      </Stack>
    </Flex>
  );
};

export default Conversation;
