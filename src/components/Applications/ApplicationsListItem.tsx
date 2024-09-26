import { dateFormatter } from "@/helpers/functions";
import { Divider } from "primereact/divider";
import { IApplication } from "@/interfaces/applications";

interface Props {
  application: IApplication;
}

const ApplicationsListItem = ({ application }: Props) => {
  return (
    <div className="bg-white py-4 rounded-xl pl-2 md:pr-12 group cursor-pointer">
      <div className="flex flex-col sm:flex-row gap-2">
        <div className="w-full sm:w-3/5">
          <h2 className="leading-tight group-hover:text-primary">
            {application.vehicle_type}
          </h2>
          {/* <p className="text-gray-600 leading-tight text-sm mt-1">
            {blog.description.slice(0, 130)}{" "}
            {blog.description.length > 130 && "..."}
          </p> */}
          <Divider className="my-3" />
          <p className="text-right text-gray-400 text-sm">
            {dateFormatter.format(new Date(application.created_at))}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ApplicationsListItem;
