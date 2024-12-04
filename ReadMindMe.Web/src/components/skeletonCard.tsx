import { Skeleton } from "./ui/skeleton";

function SkeletonCard() {
  return (
    <>
      <div className="rounded-lg border  text-card-foreground shadow-sm p-6 h-[200px]">
        <div className="flex items-center space-x-4">
          <Skeleton className="relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full"></Skeleton>
          <div className="space-y-2">
            <Skeleton className="w-64 h-8"></Skeleton>
            <Skeleton className="w-36 h-4"></Skeleton>
          </div>
        </div>
        <div className="space-y-2 pt-7">
          <Skeleton className="w-full h-6"></Skeleton>
          <Skeleton className="w-2/3 h-6"></Skeleton>
        </div>
      </div>
    </>
  );
}

export default SkeletonCard;
