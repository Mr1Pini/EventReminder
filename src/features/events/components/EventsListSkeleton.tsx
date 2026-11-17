import { Skeleton } from "@/components/ui/Skeleton";

const SKELETON_ITEMS_COUNT = 4;

export function EventsListSkeleton() {
  return (
    <div className="flex flex-col gap-3">
      <Skeleton className="h-5 w-40" />
      {Array.from({ length: SKELETON_ITEMS_COUNT }, (_, index) => (
        <Skeleton key={index} className="h-20 w-full" />
      ))}
    </div>
  );
}
