import Link from "next/link";

const Header = () => {
  return (
    <header className="h-[44px] flex items-center justify-between w-full bg-primary py-2 px-4 fixed top-0 max-w-[768px] mx-auto">
      <div>
        <Link
          href={{ pathname: "/" }}
          className="text-xl font-semibold text-white"
        >
          DoStar-auto
        </Link>
      </div>
      <div></div>
    </header>
  );
};

export default Header;
