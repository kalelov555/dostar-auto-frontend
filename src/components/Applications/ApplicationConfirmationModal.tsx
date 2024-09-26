import { getApplicationParamsById } from "@/helpers/applications";
import { IApplication } from "@/interfaces/applications";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { Dispatch, SetStateAction, useEffect, useState } from "react";

type Props = {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  application: IApplication;
  closeModals: () => void;
};

const ApplicationConfirmationModal = ({
  open,
  setOpen,
  application,
  closeModals,
}: Props) => {
  let initialValues = {
    bgColor: "",
    percentage: "",
  };
  const [decision, setDecision] = useState(initialValues);

  useEffect(() => {
    if (application) {
      setDecision(getApplicationParamsById(application));
    }
  }, [application]);

  return (
    <Dialog
      visible={open}
      modal={true}
      onHide={() => {
        if (!open) return;
        setOpen(false);
      }}
      dismissableMask
      className={`${decision.bgColor} h-1/4 py-4 px-4 md:px-8 mt-8 w-full max-w-[768px] relative`}
      position="center"
      closable
      content={({ hide }) => (
        <div className="w-full h-full flex items-center justify-center">
          <Button
            className="absolute right-2 top-2 w-4 h-4 z-[1500] p-4 "
            icon="pi pi-times text-white border-white"
            outlined
            severity="danger"
            aria-label="Cancel"
            onClick={closeModals}
          />
          <h1 className="text-white">
            Ваши шансы на одобрение кредитования - {decision.percentage}
          </h1>
        </div>
      )}
    />
  );
};

export default ApplicationConfirmationModal;
