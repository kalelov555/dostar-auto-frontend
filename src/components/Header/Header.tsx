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
        <h1 className="text-xl font-semibold text-white">DoStar-auto</h1>
      </div>
      <div>
        <SplitButton
          label="RU"
          outlined
          model={items}
          text
          severity="danger"
          className="h-8"
        />
      </div>
    </header>
  );
};

export default Header;
