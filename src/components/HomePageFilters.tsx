import Link from "next/link";

const items = [
  {
    label: "Машины",
    icon: "pi pi-car",
    command: () => {},
  },
  {
    label: "Коммерческие",
    icon: "pi pi-truck",
    command: () => {},
  },
  {
    label: "Мототехника",
    icon: "pi pi-car",
    command: () => {},
  },
  {
    label: "Машины2",
    icon: "pi pi-truck",
    command: () => {},
  },
];

const HomePageFilters = () => {
  return (
    <div className="bg-white shadow-md">
      <div className="grid grid-cols-4">
        {items.map((item) => (
          <div
            key={item.label}
            className="p-3 flex items-center justify-center gap-2 flex-col border border-[0.5px] border-gray-primary h-24 cursor-pointer"
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

export default HomePageFilters;
