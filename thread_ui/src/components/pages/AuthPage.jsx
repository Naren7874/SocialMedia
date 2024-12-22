import { useRecoilValue } from "recoil"
import LoginCard from "../LoginCard.jsx"
import SignupCard from "../SignUpCard.jsx"
import authScreenAtom from "../../atoms/authAtom.js"

const AuthPage = () => {
    const authScreenState = useRecoilValue(authScreenAtom);
  return (
    <>
    {authScreenState === 'login' ? <LoginCard /> : <SignupCard />}
    </>
  )
}

export default AuthPage
