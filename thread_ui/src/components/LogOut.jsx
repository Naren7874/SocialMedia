import { Button } from "@chakra-ui/react"
import apiReq from "./lib/apiReq";
import { useSetRecoilState } from "recoil";
import userAtom from "../atoms/userAtom";
import {FiLogOut} from 'react-icons/fi'
import useShowToast from "../hooks/useShowToast";
import { useNavigate } from "react-router-dom";
const LogOut = () => {
    const setUser = useSetRecoilState(userAtom);
    const showToast = useShowToast();
    const navigate = useNavigate();
    const handleLogout = async() => {
       try {
         await apiReq.post('/users/logout');
         localStorage.removeItem('user-threads');
         setUser(null);
         navigate('/auth');
       } catch (error) {
         showToast("Error", error.message, "error");
         console.log("Error: " + error.message);
       }
      };
  return (
    <Button 
    size={"xs"}
    onClick={handleLogout}
    >
      <FiLogOut  size={20}/>
    </Button>
  )
}

export default LogOut