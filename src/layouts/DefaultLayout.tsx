import Header from "@/components/Header/Header";
import { ReactNode, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/router";
import TabMenu from "@/components/Tab/TabMenu";

type Props = {
  children: ReactNode;
};

const DefaultLayout = ({ children }: Props) => {
  const router = useRouter();
  const items = useMemo(
    () => [
      {
        id: 0,
        label: (
          <div className="flex justify-center items-center flex-col gap-2 lg:w-28">
            <span className="flex justify-center items-center">
              <i className="pi pi-home text-lg"></i>
            </span>
            <p className="hidden lg:block text-sm">DoStar-Auto</p>
            <p className="lg:hidden">DoStar</p>
          </div>
        ),
        url: "/",
      },
      {
        id: 1,
        label: (
          <div className="flex justify-center items-center flex-col gap-2 lg:w-28">
            <span className="flex justify-center items-center">
              <i className="pi pi-heart text-lg"></i>
            </span>
            <p className="text-sm">Избранное</p>
          </div>
        ),
        url: "/favorites",
      },
      {
        id: 2,
        label: (
          <div className="flex justify-center items-center flex-col gap-2 lg:w-28">
            <span className="flex justify-center items-center">
              <i className="pi pi-plus-circle text-lg text-primary"></i>
            </span>
            <p className="text-sm text-primary">Подать</p>
          </div>
        ),
        url: "/requests/create",
      },
      {
        id: 3,
        label: (
          <div className="flex justify-center items-center flex-col gap-2 lg:w-28">
            <span className="flex justify-center items-center">
              <i className="pi pi-globe text-lg"></i>
            </span>
            <p className="text-sm">Новости</p>
          </div>
        ),
        url: "/blog/news",
      },
      {
        id: 4,
        label: (
          <div className="flex justify-center items-center flex-col gap-2 lg:w-28">
            <span className="flex justify-center items-center">
              <i className="pi pi-user text-lg"></i>
            </span>
            <p className="text-sm">Кабинет</p>
          </div>
        ),
        url: "/profile",
      },
    ],
    []
  );

  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (router.isReady) {
      const elem = items.find((item) => item.url === router.pathname);
      if (elem) setActiveIndex(elem.id);
    }
  }, [router.pathname]);
  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between relative pt-[44px] pb-12`}
    >
      <Header />
      <div className="w-full pb-8">{children}</div>

      <div className="fixed bottom-0 max-w-[768px] w-full">
        <TabMenu items={items} activeIndex={activeIndex} />
      </div>
    </main>
  );
};

export default DefaultLayout;
