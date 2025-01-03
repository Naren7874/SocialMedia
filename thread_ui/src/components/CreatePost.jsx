/* eslint-disable no-unused-vars */
import { AddIcon } from "@chakra-ui/icons";
import {
  Button,
  CloseButton,
  Flex,
  FormControl,
  Image,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  Textarea,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";
import { useRef, useState } from "react";
import UsePreviewImg from "../hooks/usePreviewImg";
import { BsFillImageFill } from "react-icons/bs";
import useShowToast from "../hooks/useShowToast";
import apiReq from "./lib/apiReq";
import { useRecoilState } from "recoil";
import userAtom from "../atoms/userAtom";
import postAtom from "../atoms/postAtom";
import { useParams } from "react-router-dom";

const MAX_CHAR = 500;

const CreatePost = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [postText, setPostText] = useState("");
  const { handleImageChange, imgUrl, setImgUrl } = UsePreviewImg();
  const imgRef = useRef(null);
  const [remainingChar, setRemainingChar] = useState(MAX_CHAR);
  const [loading, setLoading] = useState(false);
  const [posts ,setPosts] = useRecoilState(postAtom);
  const [user, setUser] = useRecoilState(userAtom);
  const {username}  = useParams()
  const showToast = useShowToast();

  const handleTextChange = (e) => {
    const inputText = e.target.value;
    if (inputText.length > MAX_CHAR) {
      const truncatedText = inputText.slice(0, MAX_CHAR);
      setPostText(truncatedText);
      setRemainingChar(0);
      showToast("Error", "You have exceeded the character limit", "error");
    } else {
      setPostText(inputText);
      setRemainingChar(MAX_CHAR - inputText.length);
    }
  };

  const handleCreatePost = async () => {
    setLoading(true);
    try {
      const res = await apiReq.post("/posts/create", {
        postedBy: user._id,
        text: postText,
        img: imgUrl,
      });
      if (res.data.error) {
        showToast("Error", res.data.error, "error");
        return;
      } else {
        showToast("Success", res.data.message, "success");
        onClose();
      }
      if(username === user.username){

        setPosts([res.data, ...posts]);
      }
      setPostText("");
      setImgUrl(null);
      
    } catch (err) {
      showToast("Error", err.message, "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Button
        position={"fixed"}
        bottom={10}
        right={30}
        bg={useColorModeValue("gray.200", "gray.dark")}
        onClick={onOpen}
        size={{base:"sm" , sm:"md"}}
      >
        <AddIcon />
      </Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent mx={2}>
          <ModalHeader>Create Post</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <Textarea
                placeholder="Post Content goes here ..."
                onChange={handleTextChange}
                value={postText}
              />
              <Text
                fontSize={"xs"}
                fontWeight={"bold"}
                textAlign={"right"}
                m={"1"}
                color={"gray.800"}
              >
                {remainingChar}/{MAX_CHAR}
              </Text>
              {/* Hidden Input for file selection */}
              <Input
                type="file"
                hidden
                ref={imgRef}
                onChange={handleImageChange}
              />
              {/* Icon to trigger the file input */}
              <BsFillImageFill
                style={{ marginLeft: "5px", cursor: "pointer" }}
                size={16}
                onClick={() => imgRef.current.click()}
              />
            </FormControl>
            {imgUrl && (
              <Flex mt={5} w={"full"} position={"relative"}>
                <Image src={imgUrl} alt="Selected Image" />
                <CloseButton
                  onClick={() => {
                    setImgUrl("");
                  }}
                  bg={"gray.800"}
                  position={"absolute"}
                  top={2}
                  right={2}
                />
              </Flex>
            )}
          </ModalBody>

          <ModalFooter>
            <Button
              colorScheme="blue"
              mr={3}
              onClick={handleCreatePost}
              isLoading={loading}
            >
              Post
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default CreatePost;
