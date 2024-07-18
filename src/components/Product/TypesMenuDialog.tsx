import Link from "next/link";
import { Dialog } from "primereact/dialog";
import { Dispatch, SetStateAction } from "react";

type Props = {
  typeModalOpened: boolean;
  setTypeModalOpened: Dispatch<SetStateAction<boolean>>;
};

const items = [
  {
    pathname: "/products/cars",
    label: "Лекговые",
    icon: "pi pi-car",
  },
  {
    pathname: "/products/commercial",
    label: "Коммерческие",
    icon: "pi pi-truck",
  },
  {
    pathname: "/products/moto",
    label: "Мото",
    icon: "pi pi-car",
  },
];

const TypesMenuDialog = ({ typeModalOpened, setTypeModalOpened }: Props) => {
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
      className="bg-[#f1f1f1]"
      content={
        <div style={{ padding: "1.5rem" }}>
          <div className="flex w-full items-center justify-between">
            <h1>Выберите Категорию</h1>
            <i
              onClick={() => setTypeModalOpened(false)}
              className="pi pi-plus pi-pw rotate-45 text-2xl cursor-pointer"
            ></i>
          </div>
          <ul className="text-lg mt-6">
            {items.map((item) => (
              <li
                className="border-b-[0.5px] border-gray-primary first:pt-0 py-2 last:border-b-0"
                key={item.pathname}
                onClick={() => setTypeModalOpened(false)}
              >
                <Link
                  className="flex justify-between items-center "
                  href={{ pathname: item.pathname }}
                >
                  <div className="flex gap-3 items-center">
                    <i
                      className={`${item.icon} pi-pw text-lg text-primary`}
                    ></i>
                    <p>{item.label}</p>
                  </div>
                  <span>
                    <i className="pi pi-chevron-right text-sm"></i>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      }
    ></Dialog>
  );
};

export default TypesMenuDialog;
