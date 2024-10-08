import Link from "next/link";
import { Dialog } from "primereact/dialog";
import { Dispatch, ReactNode, SetStateAction, useState } from "react";
import TypesMenuChildrenDialog from "./TypeMenuChildrenDialog";
import { useRouter } from "next/router";
import { Bus, FireTruck, Motorcycle, Truck } from "@phosphor-icons/react";

const mainMenuItems: TypeMenuItem[] = [
  {
    name: "cars",
    pathname: "/products/cars",
    label: "Лекговые",
    icon: <i className={`pi pi-car text-primary`}></i>,
  },
  {
    name: "commercial",
    pathname: "/products/commercial",
    label: "Коммерческие",
    icon: <i className={`pi pi-truck text-primary`}></i>,
    children: [
      {
        name: "buses",
        pathname: "/products/commercial/buses",
        label: "Автобусы",
        icon: <Bus size={16} weight="fill" className="text-primary" />,
      },
      {
        name: "trucks",
        pathname: "/products/commercial/trucks",
        label: "Грузовики",
        icon: <Truck size={16} weight="fill" className="text-primary" />,
      },
      {
        name: "spec_technics",
        pathname: "/products/commercial/spec_technics",
        label: "Спец. техника",
        icon: <FireTruck size={16} weight="fill" className="text-primary" />,
      },
    ],
  },
  {
    name: "motos",
    pathname: "/products/motos",
    label: "Мото",
    icon: <Motorcycle weight="fill" className="text-primary" size={16} />,
  },
];

export type TypeMenuItem = {
  name: string;
  pathname: string;
  label: string;
  icon: string | ReactNode;
  command?: () => void;
  children?: TypeMenuItem[];
};

type Props = {
  typeModalOpened: boolean;
  setTypeModalOpened: Dispatch<SetStateAction<boolean>>;
};

const TypesMenuDialog = ({ typeModalOpened, setTypeModalOpened }: Props) => {
  const [isChildrenMenuOpened, setIsChildrenMenuOpened] = useState(false);
  const [selectedItem, setSelectedItem] = useState("");
  const [blockClicked, setBlockClicked] = useState(false);

  return (
    <Dialog
      contentStyle={{ borderBottomLeftRadius: 0, borderBottomRightRadius: 0 }}
      id="type"
      header="Выберите Категорию"
      visible={typeModalOpened}
      position={"bottom"}
      style={{ maxWidth: "768px", width: "100%" }}
      onHide={() => {
        if (!typeModalOpened) return;
        setTypeModalOpened(false);
      }}
      dismissableMask
      className="bg-[#f1f1f1] min-h-[250px]"
      content={
        <div style={{ padding: "1.5rem" }}>
          <div className="flex w-full items-center justify-between">
            <h2>Выберите Категорию</h2>
            <i
              onClick={() => setTypeModalOpened(false)}
              className="pi pi-plus pi-pw rotate-45 text-2xl cursor-pointer"
            ></i>
          </div>
          <ul className="text-lg mt-6">
            {mainMenuItems.map((item) => {
              let hasChildren = item.children;
              return (
                <li
                  className="border-b-[0.5px] border-gray-primary first:pt-0 py-2 last:border-b-0"
                  key={item.pathname}
                  onClick={() => {
                    setSelectedItem(item.name);
                    item.children
                      ? setIsChildrenMenuOpened(true)
                      : setTypeModalOpened(false);
                  }}
                >
                  {item.children && item.name === selectedItem && (
                    <TypesMenuChildrenDialog
                      items={item.children}
                      typeModalOpened={isChildrenMenuOpened}
                      hideAllDialogs={() => {
                        setTimeout(() => setIsChildrenMenuOpened(false));
                        setTypeModalOpened(false);
                      }}
                      onBack={() =>
                        setTimeout(() => setIsChildrenMenuOpened(false))
                      }
                      headerText="Выберите коммерческий продукт"
                    />
                  )}
                  <Link
                    className={`flex justify-between items-center ${
                      hasChildren ? "pointer-events-none" : ""
                    } `}
                    href={{ pathname: item.pathname }}
                    aria-disabled={hasChildren as unknown as boolean}
                    tabIndex={hasChildren ? -1 : undefined}
                  >
                    <div className="flex gap-3 items-center">
                      {/* <i
                        className={`${item.icon} pi-pw text-lg text-primary`}
                      ></i> */}
                      {item.icon}
                      <p>{item.label}</p>
                    </div>
                    <span>
                      <i className="pi pi-chevron-right text-sm"></i>
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      }
    ></Dialog>
  );
};

export default TypesMenuDialog;
