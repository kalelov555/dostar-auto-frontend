import { humanReadableDateFormat } from "@/helpers/functions";
import { IBlog } from "@/interfaces/blog";
import { Divider } from "primereact/divider";

interface Props {
  blog: IBlog;
}

const BlogListItem = ({ blog }: Props) => {
  return (
    <div className="bg-white py-4 rounded-xl px-2 md:pr-12 group cursor-pointer">
      <div className="flex flex-col sm:flex-row gap-2">
        <div className="w-full h-32 sm:h-[unset] sm:w-2/5 relative">
          <img
            className="max-w-[100%] max-h-32 mx-auto"
            src={
              blog.image_url
                ? blog.image_url
                : "https://picsum.photos/200/300?random=1"
            }
            alt={blog.title}
          />
        </div>
        <div className="w-full sm:w-3/5">
          <h2 className="leading-tight group-hover:text-primary">
            {blog.title}
          </h2>
          <div
            dangerouslySetInnerHTML={{ __html: blog.description }}
            className="text-gray-600 leading-tight text-sm mt-1"
          />
          <Divider className="my-3" />
          <p className="text-right text-gray-400 text-sm">
            {humanReadableDateFormat(new Date(blog.created_at))}
          </p>
        </div>
      </div>
    </div>
  );
};

export default BlogListItem;
