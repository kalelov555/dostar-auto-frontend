import { ReactNode } from "react";

type Props = {
  label: string | ReactNode;
  isActive: boolean;
};

const TabItem = ({ label, isActive }: Props) => {
  return <div className={`${isActive ? "text-primary" : ""}`}>{label}</div>;
};

export default TabItem;
