import Subheader from "@/components/Header/Subheader";
import { useGetApplications } from "@/hooks/useApplications";
import DefaultLayout from "@/layouts/DefaultLayout";
import { useState } from "react";

const ApplicationsPage = () => {
  const [page, setPage] = useState(1);
  const { data, isLoading, isError } = useGetApplications({ page });
  return (
    <DefaultLayout>
      <Subheader label="Мои заявки" />
      <div className="flex flex-col gap-2"></div>
    </DefaultLayout>
  );
};

export default ApplicationsPage;
