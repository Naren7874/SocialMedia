/* eslint-disable react/prop-types */
import {
  Avatar,
  AvatarBadge,
  Box,
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

const Conversation = ({ conversation, setSelectedConversation, isOnline }) => {
  const { lastMessages = {}, participants, _id: conversationId, mock } = conversation || {};
  const { text: lastMessageText = "", seen, sender } = lastMessages;
  const [selectedConversation] = useRecoilState(selectedConversationAtom);
  const currentUser = useRecoilValue(userAtom);

  const otherParticipant = participants?.find(
    (participant) => participant._id !== currentUser._id
  );

  const isSelected = selectedConversation?._id === conversationId;
  const selectedBg = useColorModeValue("gray.200", "gray.700"); // Light and dark mode bg for selected
  const hoverBg = useColorModeValue("gray.100", "gray.600"); // Light and dark mode bg for hover
  const textColor = useColorModeValue("black", "white"); // Text color for light and dark modes

  const handleSelectConversation = () => {
    if (otherParticipant) {
      setSelectedConversation({
        _id: conversationId,
        userId: otherParticipant._id,
        username: otherParticipant.username,
        userProfilePic: otherParticipant.profilePic || "./NoProfile",
        mock,
      });
    }
  };

  return (
    <Flex
      gap={4}
      alignItems="center"
      p={2}
      onClick={handleSelectConversation}
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
          src={otherParticipant?.profilePic || "./NoProfile"}
        >
          {isOnline && <AvatarBadge boxSize="1em" bg="green.500" />}
        </Avatar>
      </WrapItem>

      <Stack direction="column" fontSize="sm">
        <Text fontWeight="700" display="flex" alignItems="center">
          {otherParticipant?.username}
          <Image src="/verified.png" w={4} h={4} ml={1} alt="Verified Badge" />
        </Text>
        <Text fontSize="xs" display="flex" alignItems="center" gap={1}>
          {lastMessageText?.length > 18
            ? `${lastMessageText.substring(0, 18)}...`
            : lastMessageText}
          {currentUser._id === sender && (
            <Box color={seen ? "blue.400" : ""}>
              <BsCheck2All size={16} />
            </Box>
          )}
        </Text>
      </Stack>
    </Flex>
  );
};

export default Conversation;
