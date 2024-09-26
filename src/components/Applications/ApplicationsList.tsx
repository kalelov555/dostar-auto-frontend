import { IApplicationExtended } from "@/interfaces/applications";
import ApplicationsListItem from "./ApplicationsListItem";

type Props = {
  applications: IApplicationExtended[] | undefined;
};

const ApplicationsList = ({ applications }: Props) => {
  return (
    <div className="flex flex-col gap-5">
      {applications?.map((application) => (
        <div key={application.id}>
          <ApplicationsListItem application={application} />
        </div>
      ))}
    </div>
  );
};

export default ApplicationsList;
