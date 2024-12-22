import {
	Avatar,
	Box,
	Button,
	Divider,
	Flex,
	Image,
	Text,
	useToast,
  } from "@chakra-ui/react";
  import { useEffect, useState } from "react";
  import { useParams, useNavigate } from "react-router-dom";
  import { formatDistanceToNow } from "date-fns";
  import apiReq from "../lib/apiReq.js";
  import useGetUserProfile from "../../hooks/useGetUserProfile.js";
  import PostPageSkeleton from "../skeleton/PostPageSkeleton.jsx";
  import Actions from "../Actions.jsx";
  import { useRecoilState, useRecoilValue } from "recoil";
  import userAtom from "../../atoms/userAtom.js";
  import { DeleteIcon } from "@chakra-ui/icons";
  import Comment from '../Comments.jsx'
import useShowToast from "../../hooks/useShowToast.js";
import postAtom from "../../atoms/postAtom.js";

  
const PostPage = () => {
	const { user, loading: userLoading } = useGetUserProfile();
	const [posts ,setPosts] = useRecoilState(postAtom);
	const [loading, setLoading] = useState(true);
	const toast = useToast();
	const { pid } = useParams();
	const navigate = useNavigate();
	const currentUser = useRecoilValue(userAtom);
	const showToast = useShowToast();

	const currentPost = posts[0];
	
	const handleDeletePost = async(e)=>{
        e.preventDefault();
        try {
            if(!window.confirm('Are you sure you want to delete')) return;

            const res = await apiReq.delete(`/posts/${pid}`);
            if (res.data.error) {
                showToast("Error", res.data.error, "error");
                return;
            }
            showToast("Success", "Post deleted successfully", "success");
			setPosts(posts.filter(p=>p._id!==pid))
            navigate(`/${currentUser.username}`);
        } catch (error) {
            console.log(error.message);
            showToast("Error", "Failed to delete post", "error");
        }
    }
	useEffect(() => {
	  const getPost = async () => {
		try {
		  const res = await apiReq.get(`/posts/${pid}`);
		  if (res.data.error) {
			showToast("Error", res.data.error, "error");
			return;
		  }                   
		  setPosts([res.data])
		} catch (error) {
			console.log(error.message);
			showToast("Error", "Failed to get post", "error");
		} finally {
		  setLoading(false);
		}
	  };
	  getPost();
	}, [pid, toast,setPosts]);
  
	if (userLoading || loading) {
	  return <PostPageSkeleton />;
	}
  
	if (!user || !currentPost) {
	  return <Text textAlign="center">User or Post not found</Text>;
	}
  
	return (
	  <>
		<Flex justifyContent="space-between" alignItems="center" mb={4}>
		  <Flex alignItems="center" gap={3}>
			<Avatar src={user?.profilePic} size="md" name={user?.name} />
			<Flex>
			  <Text fontSize="sm" fontWeight="bold">
				{user?.username || "unknown"}
			  </Text>
			  <Image src="/verified.png" w="4" h="4" ml={1} alt="Verified" />
			</Flex>
		  </Flex>
		  
		  <Flex alignItems="center" gap={4}>
			<Text fontSize="xs" color="gray.500">
			  {currentPost.createdAt ? formatDistanceToNow(new Date(currentPost.createdAt)) : "1d"} ago
			</Text>
			{currentUser?._id === user._id && (
			  <DeleteIcon size={20} cursor="pointer" onClick={handleDeletePost} />
			)}
		  </Flex>
		</Flex>
  
		<Text my={3}>{currentPost.text}</Text>
  
		{currentPost.img && (
		  <Box borderRadius={6} overflow="hidden" border="1px solid" borderColor="gray.300" mb={4}>
			<Image src={currentPost.img} w="full" />
		  </Box>
		)}
  
		<Flex gap={3} my={3}>
		  <Actions post={currentPost} />
		</Flex>
  
		<Divider my={4} />
  
		<Flex justifyContent="space-between" alignItems="center" mb={4}>
		  <Flex gap={2} alignItems="center">
			<Text fontSize="2xl">👋</Text>
			<Text color="gray.500">Get the app to like, reply, and post.</Text>
		  </Flex>
		  <Button colorScheme="blue">Get</Button>
		</Flex>
  
		<Divider my={4} />
		
		{
			currentPost.replies.map(reply=>(
				<Comment
				key = {reply._id}
				reply={reply}
				lastReply={reply._id === currentPost.replies[currentPost.replies.length - 1]._id} 
				/>
			))
		}
		{/* <Text>Comment Section Placeholder</Text> */}
	  </>
	);
  };
  
  export default PostPage;
  