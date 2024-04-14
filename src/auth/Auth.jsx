import { useSessionStorage, useLocalStorage } from "@uidotdev/usehooks";
import { useNavigate, useLocation, Navigate } from "react-router-dom";
import { useEffect, useState, useMemo } from "react";
import { useStack } from "../functions/Stack";

const Auth = ({ children }) => {
  let location = useLocation();
  const { push,  stack } = useStack();
  push(location.pathname)

  const isProtectedRoute = /^\/(?:dashboard(?:\/.*)?$)/.test(location.pathname);

  const [user, setUser] = useLocalStorage("karmashree_User", "");

  const authStatus = useMemo(() => {
    return Boolean(user.category);
  }, [user]);

  if (!authStatus && isProtectedRoute)
    return <Navigate to={stack[0]} />

  return children;
};

export default Auth;
