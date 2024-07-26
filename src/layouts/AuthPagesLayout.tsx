import { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

const AuthPagesLayout = ({ children }: Props) => {
  return (
    <div className="min-h-screen w-full flex items-center justify-center">
      {children}
    </div>
  );
};

export default AuthPagesLayout;
