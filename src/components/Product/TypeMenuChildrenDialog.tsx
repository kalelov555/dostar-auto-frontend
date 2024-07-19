import Link from "next/link";
import { Dialog } from "primereact/dialog";
import { Dispatch, SetStateAction } from "react";
import { TypeMenuItem } from "./TypesMenuDialog";

type Props = {
  typeModalOpened: boolean;
  hideAllDialogs: () => void;
  items: TypeMenuItem[];
  headerText: string;
  onBack: (() => void) | undefined;
};

const TypesMenuChildrenDialog = ({
  typeModalOpened,
  hideAllDialogs,
  items,
  headerText,
  onBack = undefined,
}: Props) => {
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
        hideAllDialogs();
      }}
      className="bg-[#f1f1f1] min-h-[250px]"
      content={
        <div style={{ padding: "1.5rem" }}>
          <div className="flex w-full items-center justify-between">
            <div className="flex items-center gap-4">
              {onBack !== undefined && (
                <i
                  onClick={() => onBack()}
                  className="pi pi-arrow-left pi-pw text-lg cursor-pointer"
                ></i>
              )}
              <h1>{headerText}</h1>
            </div>
            <i
              onClick={() => hideAllDialogs()}
              className="pi pi-plus pi-pw rotate-45 text-2xl cursor-pointer"
            ></i>
          </div>
          <ul className="text-lg mt-6">
            {items.map((item) => (
              <li
                className="border-b-[0.5px] border-gray-primary first:pt-0 py-2 last:border-b-0"
                key={item.pathname}
                onClick={() => hideAllDialogs()}
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

export default TypesMenuChildrenDialog;
