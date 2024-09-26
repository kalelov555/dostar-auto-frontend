import { IApplication } from "@/interfaces/applications";
import Link from "next/link";
import ApplicationsListItem from "./ApplicationsListItem";

type Props = {
  applications: IApplication[] | undefined;
};

const ApplicationsList = ({ applications }: Props) => {
  return (
    <div className="flex flex-col gap-4">
      {applications?.map((application) => (
        <div key={application.id}>
          <ApplicationsListItem application={application} />
        </div>
      ))}
    </div>
  );
};

export default ApplicationsList;
