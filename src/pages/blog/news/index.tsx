import BlogList from "@/components/Blog/BlogList";
import Subheader from "@/components/Header/Subheader";
import LoadingScreen from "@/components/shared/LoadingScrenn";
import Pagination from "@/components/shared/Pagination";
import { showErrorNotification } from "@/helpers/notifications";
import { IBlog } from "@/interfaces/blog";
import DefaultLayout from "@/layouts/DefaultLayout";
import { fetchBlogs } from "@/services/api/modules/blogs";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";

const ProductMotosPage = () => {
  const [page, setPage] = useState(1);
  const [blogs, setBlogs] = useState<IBlog[]>();

  const { data, status, isLoading } = useQuery({
    queryKey: ["blogs", page],
    queryFn: () =>
      fetchBlogs({ page }).catch((err) => {
        showErrorNotification(err.response.message || err.message);
      }),
  });

  useEffect(() => {
    setBlogs(data?.data.data);
  }, [isLoading, page]);

  return (
    <DefaultLayout>
      <Subheader label="Новости" />

      {isLoading ? (
        <LoadingScreen />
      ) : (
        <div className="mt-12 pb-8">
          <BlogList blogs={blogs} />
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

export default ProductMotosPage;
