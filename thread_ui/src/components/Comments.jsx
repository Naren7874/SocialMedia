/* eslint-disable react/prop-types */
import { Avatar, Divider, Flex, Text } from "@chakra-ui/react";
import { BsThreeDots } from "react-icons/bs";

const Comment = ({reply , lastReply}) => {
    return (
        <>
            <Flex gap={4} py={2} my={2} w={"full"}>
                <Avatar src={reply.userProfilePic} size={"sm"} />
                <Flex gap={1} w={"full"} flexDirection={"column"}>
                    <Flex w={"full"} justifyContent={"space-between"} alignItems={"center"}>
                        <Text fontSize='sm' fontWeight='bold'>
                            {reply.username}
                        </Text>
                        <Flex gap={4} alignItems={"center"}>
                            <BsThreeDots />
                        </Flex>
                    </Flex>
                    <Text>{reply.text}</Text>
                </Flex>
            </Flex>
            {!lastReply ? <Divider /> : null}
            
        </>
    );
};

export default Comment;