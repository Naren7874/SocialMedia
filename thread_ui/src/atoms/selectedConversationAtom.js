import { atom } from "recoil";


const selectedConversationAtom = atom({
    key: "selectedConversationAtom",
    default: {
        _id:"",
        userId:"",
        username :"",
        userProfilePic : "",
    },
});


export default selectedConversationAtom;