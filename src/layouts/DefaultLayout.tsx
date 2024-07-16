import Header from "@/components/Header";
import { ReactNode, useState } from "react";
import { TabMenu } from "primereact/tabmenu";

type Props = {
  children: ReactNode;
};

const items = [
  {
    label: (
      <div className="flex justify-center items-center flex-col gap-2 lg:w-28">
        <span className="flex justify-center items-center">
          <i className="pi pi-home text-lg"></i>
        </span>
        <p className="hidden lg:block text-sm">DoStar-Auto</p>
        <p className="lg:hidden">DoStar</p>
      </div>
    ),
    command: () => {
      alert("SMTH");
    },
  },
  {
    label: (
      <div className="flex justify-center items-center flex-col gap-2 lg:w-28">
        <span className="flex justify-center items-center">
          <i className="pi pi-heart text-lg"></i>
        </span>
        <p className="text-sm">Избранное</p>
      </div>
    ),
  },
  {
    label: (
      <div className="flex justify-center items-center flex-col gap-2 lg:w-28">
        <span className="flex justify-center items-center">
          <i className="pi pi-plus-circle text-lg text-primary"></i>
        </span>
        <p className="text-sm text-primary">Подать</p>
      </div>
    ),
  },
  {
    label: (
      <div className="flex justify-center items-center flex-col gap-2 lg:w-28">
        <span className="flex justify-center items-center">
          <i className="pi pi-globe text-lg"></i>
        </span>
        <p className="text-sm">Новости</p>
      </div>
    ),
  },
  {
    label: (
      <div className="flex justify-center items-center flex-col gap-2 lg:w-28">
        <span className="flex justify-center items-center">
          <i className="pi pi-user text-lg"></i>
        </span>
        <p className="text-sm">Кабинет</p>
      </div>
    ),
  },
];

const DefaultLayout = ({ children }: Props) => {
  const [activeIndex, setActiveIndex] = useState(3);
  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between relative pt-[44px] pb-12`}
    >
      <Header />
      <div className="w-full pb-8">{children}</div>

      <div className="fixed bottom-0 max-w-[768px] w-full">
        <TabMenu
          model={items as any}
          activeIndex={activeIndex}
          onTabChange={(e) => setActiveIndex(e.index)}
        />
      </div>
    </main>
  );
};

export default DefaultLayout;
