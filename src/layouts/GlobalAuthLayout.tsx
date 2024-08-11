import { useAuth } from "@/hooks/useAuth";
import { userAuthAtom } from "@/store/user";
import { useAtom } from "jotai";
import { ReactNode, useEffect } from "react";

export const GlobalAuthLayout = ({ children }: { children: ReactNode }) => {
  const auth = useAuth();
  const [_, setUserAuth] = useAtom(userAuthAtom);
  useEffect(() => {
    if (auth.user) {
      setUserAuth(auth.user.data);
    }
  }, []);
  return <>{children}</>;
};
