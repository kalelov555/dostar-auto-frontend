import ApplicationsList from "@/components/Applications/ApplicationsList";
import Subheader from "@/components/Header/Subheader";
import LoadingScreen from "@/components/shared/LoadingScrenn";
import { useGetApplications } from "@/hooks/useApplications";
import DefaultLayout from "@/layouts/DefaultLayout";
import Head from "next/head";

const ApplicationsPage = () => {
  const { data, isLoading, isError } = useGetApplications({ view: "extended" });
  return (
    <DefaultLayout>
      <Head>
        <title>Dostar-auto - Мои заявки</title>
      </Head>
      <Subheader label="Мои заявки" />
      {isLoading ? (
        <LoadingScreen />
      ) : (
        <div className="mt-16 pb-8">
          <ApplicationsList applications={data?.data.data} />
        </div>
      )}
    </DefaultLayout>
  );
};

export default ApplicationsPage;
