import { dateFormatter } from "@/helpers/functions";
import { IBlog } from "@/interfaces/blog";
import Image from "next/image";
import BaseDivider from "../shared/BaseDivider";
import { Divider } from "primereact/divider";

interface Props {
  blog: IBlog;
}

const BlogListItem = ({ blog }: Props) => {
  return (
    <div className="bg-white py-4 rounded-xl pl-2 md:pr-12 group cursor-pointer">
      <div className="flex flex-col sm:flex-row gap-2">
        <div className="w-full h-32 sm:h-[unset] sm:w-2/5 relative">
          <Image fill src={blog.image_url} alt={blog.title} />
        </div>
        <div className="w-full sm:w-3/5">
          <h2 className="leading-tight group-hover:text-primary">
            {blog.title}
          </h2>
          <p className="text-gray-600 leading-tight text-sm mt-1">
            {blog.description.slice(0, 130)}{" "}
            {blog.description.length > 130 && "..."}
          </p>
          <Divider className="my-3" />
          <p className="text-right text-gray-400 text-sm">
            {dateFormatter.format(new Date(blog.created_at))}
          </p>
        </div>
      </div>
    </div>
  );
};

export default BlogListItem;
