import ApplicationsList from "@/components/Applications/ApplicationsList";
import Subheader from "@/components/Header/Subheader";
import LoadingScreen from "@/components/shared/LoadingScrenn";
import Pagination from "@/components/shared/Pagination";
import { useGetApplications } from "@/hooks/useApplications";
import DefaultLayout from "@/layouts/DefaultLayout";
import { useState } from "react";

const ApplicationsPage = () => {
  const [page, setPage] = useState(1);
  const { data, isLoading, isError } = useGetApplications({ page });
  return (
    <DefaultLayout>
      <Subheader label="Мои заявки" />
      {isLoading ? (
        <LoadingScreen />
      ) : (
        <div className="mt-12 pb-8">
          <ApplicationsList applications={data?.data.data} />
          <div className="mt-4">
            <Pagination
              page={page}
              setPage={setPage}
              totalPages={data?.data?.meta?.total_pages}
            />
          </div>
        </div>
      )}
    </DefaultLayout>
  );
};

export default ApplicationsPage;
