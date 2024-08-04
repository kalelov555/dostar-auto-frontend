import { SetStateAction } from "jotai";
import { Button } from "primereact/button";
import { Dispatch } from "react";

type Props = {
  page: number | undefined;
  setPage: Dispatch<SetStateAction<number>>;
  totalPages: number | undefined;
};

const Pagination = ({ page = 1, totalPages = 1, setPage }: Props) => {
  const onNextClick = () => {
    setPage(page + 1);
  };
  const onPrevClick = () => {
    setPage(page - 1);
  };
  return (
    <div className="flex flex-row items-center justify-between">
      <div className="w-1/3">
        {page > 1 && <Button onClick={onPrevClick} label="Предыдущая" />}
      </div>
      <p className="w-1/3 text-center">
        {page || 1}/{totalPages}
      </p>
      <div className="w-1/3 text-right">
        {page < totalPages && (
          <Button onClick={onNextClick} label="Следующая" />
        )}
      </div>
    </div>
  );
};

export default Pagination;
