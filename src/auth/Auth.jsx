import { useSessionStorage } from "@uidotdev/usehooks";
import { useNavigate,useLocation } from "react-router-dom";

const Auth = ({ children }) => {
  const navigate = useNavigate();
  let location = useLocation();
  const [authStatus, setAuthStatus] = useSessionStorage("authStatus", false);

  
  return children;
};

export default Auth;
