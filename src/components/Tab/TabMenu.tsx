import Link from "next/link";
import TabItem from "./TabItem";

type Props = {
  items: {
    id: number;
    label: JSX.Element;
    url: string;
  }[];
  activeIndex: number;
};

const TabMenu = ({ items, activeIndex }: Props) => {
  return (
    <div className="flex items-center flex-row py-2 bg-white border-t-[1px]">
      {items.map((item) => (
        <Link href={item.url} className="w-full" key={item.id}>
          <TabItem label={item.label} isActive={activeIndex === item.id} />
        </Link>
      ))}
    </div>
  );
};

export default TabMenu;
