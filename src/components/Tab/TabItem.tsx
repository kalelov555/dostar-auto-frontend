import { ReactNode } from "react";

type Props = {
  label: string | ReactNode;
  isActive: boolean;
};

const TabItem = ({ label, isActive }: Props) => {
  return (
    <div className={`${isActive ? "text-primary font-medium" : ""}`}>
      {label}
    </div>
  );
};

export default TabItem;
