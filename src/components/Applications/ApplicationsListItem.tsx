import { Divider } from "primereact/divider";
import { IApplicationExtended } from "@/interfaces/applications";
import { Tag } from "primereact/tag";
import { getApplicationParamsById } from "@/helpers/applications";
import { humanReadableDateFormat } from "@/helpers/functions";

interface Props {
  application: IApplicationExtended;
}

const carName = (type: string) => {
  if (type === "car") return "Машина";
  else if (type === "bus") return "Автобус";
  else if (type === "moto") return "Мото";
  else if (type === "spectechnic") return "Спец. Техника";
  else if (type === "truck") return "Грузовик";
};

const ApplicationsListItem = ({ application }: Props) => {
  return (
    <div className="bg-white py-4 rounded-xl px-2 md:px-4 group cursor-pointer relative">
      <Tag
        className={`absolute right-4 -top-4 ${
          getApplicationParamsById(application)?.bgColor
        }`}
        value={`Шансы - ${getApplicationParamsById(application)?.percentage}`}
      />
      <div className="w-full">
        <div className="flex items-center gap-2">
          <p className="text-lg font-semibold text-primary">
            {!application?.vehicle_data?.model
              ? `${application?.vehicle_data?.manufacturer_name || ""} ${
                  application?.vehicle_data?.vehicle_model_name || ""
                }`
              : `${application?.vehicle_data?.manufacturer_name || ""} ${
                  application?.vehicle_data?.model || ""
                }`}
          </p>
          <Tag value={carName(application.vehicle_type)} severity="info" />
        </div>
        <div>
          <p className="underline text-sm text-gray-600">
            {application?.vehicle_data?.manufacture_year} года
          </p>
        </div>
        <Divider className="my-3" />
        <p className="text-right text-gray-400 text-sm">
          {humanReadableDateFormat(new Date(application.created_at))}
        </p>
      </div>
    </div>
  );
};

export default ApplicationsListItem;
