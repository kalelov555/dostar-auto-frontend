import Link from "next/link";
import { useRouter } from "next/router";
import { useMemo, useState } from "react";
import TypesMenuDialog from "../Product/TypesMenuDialog";
import { Motorcycle } from "@phosphor-icons/react";

const HomePageMenu = () => {
  const router = useRouter();
  const [typeMenuOpened, setTypeMenuOpened] = useState(false);
  const items = useMemo(() => {
    return [
      {
        label: "Машины",
        icon: <i className={`pi pi-car text-primary`}></i>,
        command: () => {
          router.push({ pathname: "/products/cars" });
        },
      },
      {
        label: "Коммерческие",
        icon: <i className={`pi pi-truck text-primary`}></i>,
        command: () => {
          setTypeMenuOpened(true);
        },
      },
      {
        label: "Мототехника",
        icon: <Motorcycle weight="fill" className="text-primary" size={16} />,
        command: () => {
          router.push({ pathname: "/products/motos" });
        },
      },
      {
        label: "Cпец. офферы",
        icon: <i className={`pi pi-bolt text-primary`}></i>,
        command: () => {},
      },
    ];
  }, []);
  return (
    <div className="bg-white shadow-md">
      <TypesMenuDialog
        typeModalOpened={typeMenuOpened}
        setTypeModalOpened={setTypeMenuOpened}
      />
      <div className="grid grid-cols-4">
        {items.map((item) => (
          <div
            key={item.label}
            className="p-3 flex items-center justify-center gap-2 flex-col border border-[0.5px] border-gray-primary h-24 cursor-pointer"
            onClick={() => item.command()}
          >
            {item.icon}

            <p className="text-xs text-center">{item.label}</p>
          </div>
        ))}
      </div>
      <div>
        <Link
          href="/blog/news"
          className="flex items-center justify-between p-3 hover:text-primary"
        >
          <div className="flex gap-4 items-center justify-between">
            <i className="pi pi-book"></i>
            <p className="text-sm">Новости</p>
          </div>
          <span>
            <i className="pi pi-chevron-right text-sm"></i>
          </span>
        </Link>
      </div>
    </div>
  );
};

export default HomePageMenu;
