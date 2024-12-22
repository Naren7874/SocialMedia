/* eslint-disable react/prop-types */
import { Avatar } from "@chakra-ui/avatar";
import { Image } from "@chakra-ui/image";
import { Box, Flex, Text } from "@chakra-ui/layout";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Actions from "./Actions";
import { formatDistanceToNow } from "date-fns";
import { DeleteIcon } from "@chakra-ui/icons";
import apiReq from "./lib/apiReq";
import useShowToast from "../hooks/useShowToast";
import UserPostSkeleton from './skeleton/UserPostSkeleton';
import { useRecoilState, useRecoilValue } from "recoil";
import userAtom from "../atoms/userAtom";
import postAtom from "../atoms/postAtom";

const Post = ({ post, postedBy  }) => {
    // const [liked, setLiked] = useState(false);
    const [Postuser, setPostUser] = useState(null);
    const [isLoading, setLoading] = useState(true);
    const navigate = useNavigate();
    const showToast = useShowToast();
    const { _id, text, img, createdAt, replies } = post;
    const currentUser = useRecoilValue(userAtom);
    const [posts, setPosts] = useRecoilState(postAtom);

    // Check if the current user is post user
    
    const handleDeletePost = async(e)=>{
        e.preventDefault();
        try {
            if(!window.confirm('Are you sure you want to delete')) return;

            const res = await apiReq.delete(`/posts/${_id}`);
            if (res.data.error) {
                showToast("Error", res.data.error, "error");
                return;
            }
            showToast("Success", "Post deleted successfully", "success");
           // navigate(`/${currentUser.username}`);
            setPosts(posts.filter(p=>p._id!==_id))

        } catch (error) {
            console.log(error.message);
            showToast("Error", "Failed to delete post", "error");
        }
    }

    useEffect(() => {
        const getUser = async () => {
            setLoading(true);
            try {
                const res = await apiReq.get(`/users/profile/${postedBy}`);
                if (res.data.error) {
                    showToast("Error", res.data.error, "error");
                    return;
                }
                setPostUser(res.data);
            } catch (error) {
                console.log("Error: " + error.message);
                showToast("Error", "Failed to get user profile", "error");
                setPostUser(null);
            } finally {
                setLoading(false);
            }
        };
        getUser();
    }, [postedBy, showToast ]);

    if (isLoading) {
        return <UserPostSkeleton />;
    }

    if (!Postuser) {
        return <Text>User not found</Text>;
    }

    return (
        <Link to={`/${Postuser.username}/post/${_id}`}>
            <Flex gap={3} mb={4} py={5}>
                {/* Left Column - Avatar and Replies */}
                <Flex flexDirection={"column"} alignItems={"center"}>
                    <Avatar
                        size="md"
                        name={Postuser.name || "User"}
                        src={Postuser.profilePic || "/avatar.png"}
                        onClick={(e) => {
                            e.preventDefault();
                            navigate(`/${Postuser.username}`);
                        }}
                    />
                    <Box w="1px" h="full" bg="gray.light" my={2}></Box>
                    <Box position="relative" w="full">
                        {replies.length === 0 && <Text textAlign="center">{"😄"}</Text>}
                        {replies[replies.length-1] && (
                            <Avatar
                                size="xs"
                                src={replies[replies.length-1].userProfilePic}
                                position="absolute"
                                top="0px"
                                left="15px"
                                padding="2px"
                            />
                        )}
                        {replies[replies.length-2] && (
                            <Avatar
                                size="xs"
                                src={replies[replies.length-2].userProfilePic}
                                position="absolute"
                                bottom="0px"
                                right="-5px"
                                padding="2px"
                            />
                        )}
                        {replies[replies.length-3] && (
                            <Avatar
                                size="xs"
                                src={replies[replies.length-3].userProfilePic}
                                position="absolute"
                                bottom="0px"
                                left="4px"
                                padding="2px"
                            />
                        )}
                    </Box>
                </Flex>

                {/* Right Column - Post Content */}
                <Flex flex={1} flexDirection="column" gap={2}>
                    <Flex justifyContent="space-between" w="full">
                        <Flex w="full" alignItems="center">
                            <Text
                                fontSize="sm"
                                fontWeight="bold"
                                onClick={(e) => {
                                    e.preventDefault();
                                    navigate(`/${Postuser.username}`);
                                }}
                            >
                                {Postuser.username || "Unknown User"}
                            </Text>
                            {Postuser.verified && (
                                <Image src="/verified.png" w={4} h={4} ml={1} alt="Verified" />
                            )}
                        </Flex>
                        <Flex gap={4} alignItems="center">
                            <Text fontSize="xs" width={36} textAlign="right" color="gray.light">
                                {createdAt ? `${formatDistanceToNow(new Date(createdAt))} ago` : "Just now"}
                            </Text>

                            {currentUser?._id === Postuser._id && <DeleteIcon size={20} onClick={handleDeletePost} />}
                        </Flex>
                    </Flex>

                    {/* Post Text */}
                    <Text fontSize="sm">{text}</Text>

                    {/* Post Image (if available) */}
                    {img && (
                        <Box borderRadius={6} overflow="hidden" border="1px solid" borderColor="gray.light">
                            <Image src={img} w="full" />
                        </Box>
                    )}

                    {/* Actions (like, share, etc.) */}
                    <Flex gap={3} my={1}>
                        <Actions post={post}  />
                    </Flex>
                </Flex>
            </Flex>
        </Link>
    );
};

export default Post;
