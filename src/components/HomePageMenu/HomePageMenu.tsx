import Link from "next/link";
import { useRouter } from "next/router";
import { useMemo } from "react";

const HomePageMenu = () => {
  const router = useRouter();
  const items = useMemo(() => {
    return [
      {
        label: "Машины",
        icon: "pi pi-car",
        command: () => {
          router.push({ pathname: "/product/cars" });
        },
      },
      {
        label: "Коммерческие",
        icon: "pi pi-truck",
        command: () => {
          router.push({ pathname: "/product/commercial" });
        },
      },
      {
        label: "Мототехника",
        icon: "pi pi-car",
        command: () => {
          router.push({ pathname: "/product/moto" });
        },
      },
      {
        label: "Машины2",
        icon: "pi pi-truck",
        command: () => {},
      },
    ];
  }, []);
  return (
    <div className="bg-white shadow-md">
      <div className="grid grid-cols-4">
        {items.map((item) => (
          <div
            key={item.label}
            className="p-3 flex items-center justify-center gap-2 flex-col border border-[0.5px] border-gray-primary h-24 cursor-pointer"
            onClick={() => item.command()}
          >
            <i className={`${item.icon} text-primary`}></i>
            <p className="text-xs">{item.label}</p>
          </div>
        ))}
      </div>
      <div>
        <Link
          href="/"
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
