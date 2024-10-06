import ApplicationsList from "@/components/Applications/ApplicationsList";
import Subheader from "@/components/Header/Subheader";
import LoadingScreen from "@/components/shared/LoadingScrenn";
import { useGetApplications } from "@/hooks/useApplications";
import { useAuth } from "@/hooks/useAuth";
import DefaultLayout from "@/layouts/DefaultLayout";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect } from "react";

const ApplicationsPage = () => {
  const { data, isLoading, isError } = useGetApplications({ view: "extended" });
  const auth = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (auth.isError) {
      router.replace("/login");
    }
  }, [auth.isLoading]);
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
