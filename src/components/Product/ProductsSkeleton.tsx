import { Skeleton } from "primereact/skeleton";

const ProductsSkeleton = () => {
  return (
    <div className="flex flex-col gap-4">
      <div>
        <Skeleton width="20rem" className="mb-2"></Skeleton>
        <div className="flex gap-4">
          <Skeleton width="150px" height="150px"></Skeleton>
          <div>
            <Skeleton height="2rem" width="24rem" className="mb-2"></Skeleton>
            <Skeleton width="10rem" className="mb-2"></Skeleton>
            <Skeleton width="5rem" className="mb-2"></Skeleton>
          </div>
        </div>
      </div>
      <div>
        <Skeleton className="mb-2"></Skeleton>
        <div className="flex gap-4">
          <Skeleton width="150px" height="150px"></Skeleton>
          <div>
            <Skeleton height="2rem" width="24rem" className="mb-2"></Skeleton>
            <Skeleton width="10rem" className="mb-2"></Skeleton>
            <Skeleton width="5rem" className="mb-2"></Skeleton>
          </div>
        </div>
      </div>
      <div>
        <Skeleton className="mb-2"></Skeleton>
        <div className="flex gap-4">
          <Skeleton width="150px" height="150px"></Skeleton>
          <div>
            <Skeleton height="2rem" width="24rem" className="mb-2"></Skeleton>
            <Skeleton width="10rem" className="mb-2"></Skeleton>
            <Skeleton width="5rem" className="mb-2"></Skeleton>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductsSkeleton;
