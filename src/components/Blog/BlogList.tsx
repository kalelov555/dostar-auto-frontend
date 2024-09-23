import { IBlog } from "@/interfaces/blog";
import BlogListItem from "./BlogListItem";
import Link from "next/link";

interface Props {
  blogs: IBlog[] | undefined;
}

const BlogList = ({ blogs }: Props) => {
  return (
    <div className="flex flex-col gap-4">
      {blogs?.map((blog) => (
        <Link key={blog.id} href={`/blog/news/${blog.id}`}>
          <BlogListItem key={blog.id} blog={blog} />
        </Link>
      ))}
    </div>
  );
};

export default BlogList;
