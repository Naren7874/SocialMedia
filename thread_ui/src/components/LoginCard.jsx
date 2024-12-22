import {
	Flex,
	Box,
	FormControl,
	FormLabel,
	Input,
	InputGroup,
	InputRightElement,
	Stack,
	Button,
	Heading,
	Text,
	useColorModeValue,
	Link,
} from "@chakra-ui/react";

import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { useState } from "react";
import { useSetRecoilState } from "recoil";
import authScreenAtom from "../atoms/authAtom";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'; 
import apiReq from "./lib/apiReq";
import userAtom from "../atoms/userAtom";
// import apiReq from "./lib/apiReq";


export default function LoginCard() {

    const [showPassword, setShowPassword] = useState(false);
	const setAuthScreenState = useSetRecoilState(authScreenAtom);
	const setUser = useSetRecoilState(userAtom);
	const [loading ,setLoading] = useState(false);

	const [input , setInput] = useState({
		username: "",
        password: "",
	});
	const handleSignUp =()=>{
		setAuthScreenState("signup");
	}


	const handleLogin = async() => {
		setLoading(true);
        try {
			const res = await apiReq.post('/users/login',{
				username: input.username,
                password: input.password,
			})
			localStorage.setItem('user-threads', JSON.stringify(res.data));
			toast.success("Login successful!");
			console.log(res.data);
			setUser(res.data);
		} catch (error) {
			console.error("Error during login:", error);
			toast.error(error.message);
			console.log("Error: " + error.message);
			return;
		}
		finally{
            setLoading(false);
        }
    };
	return (
		<Flex align={"center"} justify={"center"}>
			<Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
				<Stack align={"center"}>
					<Heading fontSize={"4xl"} textAlign={"center"}>
						Login
					</Heading>
				</Stack>
				<Box
					rounded={"lg"}
					bg={useColorModeValue("white", "gray.dark")}
					boxShadow={"lg"}
					p={8}
					w={{
						base: "full",
						sm: "400px",
					}}
				>
					<Stack spacing={4}>
						<FormControl isRequired>
							<FormLabel>Username</FormLabel>
							<Input
								type='text'
								value={input.username}
								onChange={(e) => setInput({...input, username: e.target.value })}
							/>
						</FormControl>
						<FormControl isRequired>
							<FormLabel>Password</FormLabel>
							<InputGroup>
								<Input
									type={showPassword ? "text" : "password"}
									value={input.password}
									onChange={(e) => setInput({...input, password: e.target.value })}
								/>
								<InputRightElement h={"full"}>
									<Button
										variant={"ghost"}
										onClick={() => setShowPassword((showPassword) => !showPassword)}
									>
										{showPassword ? <ViewIcon /> : <ViewOffIcon />}
									</Button>
								</InputRightElement>
							</InputGroup>
						</FormControl>
						<Stack spacing={10} pt={2}>
							<Button
								size='lg'
								bg={useColorModeValue("gray.600", "gray.700")}
								color={"white"}
								_hover={{
									bg: useColorModeValue("gray.700", "gray.800"),
								}}
								onClick={handleLogin}
								isLoading={loading}
							>
								Login
							</Button>
							<ToastContainer/>
						</Stack>
						<Stack pt={6}>
							<Text align={"center"}>
								Don&apos;t have an account?{" "}
								<Link color={"blue.400"}
								onClick={handleSignUp}>
									Sign up
								</Link>
							</Text>
						</Stack>
					</Stack>
				</Box>
			</Stack>
		</Flex>
	);
}