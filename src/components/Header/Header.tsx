import Link from "next/link";
import { Button } from "primereact/button";
import { SplitButton } from "primereact/splitbutton";

const Header = () => {
  const items = [
    {
      label: "RU",
      command: () => {
        alert("RU");
      },
    },
    {
      label: "KZ",
      command: () => {
        alert("KZ");
      },
    },
  ];
  return (
    <header className="h-[44px] flex items-center justify-between w-full bg-primary py-2 px-4 fixed top-0 max-w-[768px] mx-auto">
      <div>
        <Link
          href={{ pathname: "/" }}
          className="text-xl font-semibold text-white"
        >
          DoStar-auto
        </Link>
      </div>
      <div className="flex items-center gap-1">
        <p className="text-white text-lg font-medium">RU</p>
        <Button
          icon="pi pi-angle-down"
          className="bg-primary h-8 border-primary"
          aria-label="Filter"
        />
      </div>
    </header>
  );
};

export default Header;
