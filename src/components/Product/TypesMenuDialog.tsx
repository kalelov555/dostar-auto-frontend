import { Dialog } from "primereact/dialog";
import { Dispatch, SetStateAction } from "react";

type Props = {
  typeModalOpened: boolean;
  setTypeModalOpened: Dispatch<SetStateAction<boolean>>;
};

const TypesMenuDialog = ({ typeModalOpened, setTypeModalOpened }: Props) => {
  return (
    <Dialog
      id="type"
      header="Выберите Категорию"
      visible={typeModalOpened}
      position={"bottom"}
      style={{ maxWidth: "768px", width: "100%" }}
      onHide={() => {
        if (!typeModalOpened) return;
        setTypeModalOpened(false);
      }}
      draggable={false}
    >
      <p className="m-0">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
        velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
        occaecat cupidatat non proident, sunt in culpa qui officia deserunt
        mollit anim id est laborum.
      </p>
    </Dialog>
  );
};

export default TypesMenuDialog;
