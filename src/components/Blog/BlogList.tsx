import { IBlog } from "@/interfaces/blog";
import BlogListItem from "./BlogListItem";

interface Props {
  blogs: IBlog[] | undefined;
}

const BlogList = ({ blogs }: Props) => {
  return (
    <div className="flex flex-col gap-4">
      {blogs?.map((blog) => (
        <BlogListItem key={blog.id} blog={blog} />
      ))}
    </div>
  );
};

export default BlogList;
