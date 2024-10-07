import Subheader from "@/components/Header/Subheader";
import LoadingScreen from "@/components/shared/LoadingScrenn";
import { humanReadableDateFormat } from "@/helpers/functions";
import { useGetBlogById } from "@/hooks/useBlogs";
import DefaultLayout from "@/layouts/DefaultLayout";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect } from "react";
import Head from "next/head";

const NewsViewPage = () => {
  const router = useRouter();
  const { data, isLoading, isError, error, fetchStatus } = useGetBlogById(
    router.query.slug as string
  );
  useEffect(() => {
    if (router.isReady) {
      if (isError && error?.response?.status === 404) router.push("/404");
    }
  }, [isLoading, fetchStatus, error, isError, router]);
  return (
    <DefaultLayout>
      <Head>
        <title>Dostar-auto - Новости {data?.data.title}</title>
      </Head>
      <Subheader
        label="Новости"
        action={
          <p
            className="text-white hover:underline text-sm cursor-pointer"
            onClick={router.back}
          >
            Назад к новостям
          </p>
        }
      />
      {isLoading ? (
        <LoadingScreen />
      ) : (
        <div className="mt-10">
          <div className="h-[40vh] sm:h-[50vh] w-full relative text-center bg-slate-50">
            <img
              className="max-w-[100%] max-h-[100%] mx-auto"
              src={
                data?.data.image_url
                  ? data.data.image_url
                  : "https://picsum.photos/200/300?random=1"
              }
            />
          </div>
          <div className="container p-3 bg-white">
            <h1>{data?.data.title}</h1>
            <p className="text-right text-gray-400 text-sm">
              {humanReadableDateFormat(
                new Date(data?.data.created_at as string)
              )}
            </p>
            <div
              dangerouslySetInnerHTML={{
                __html: data?.data.description as string,
              }}
              className="leading-tight text-sm mt-3"
            />
          </div>
        </div>
      )}
    </DefaultLayout>
  );
};

export default NewsViewPage;
