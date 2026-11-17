import { Skeleton } from "@/components/ui/Skeleton";

// Повторює розмітку тулбару й календаря (вигляд за замовчуванням), щоб уникнути зсуву макета
export default function EventsLoading() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-3">
        <div className="flex items-center justify-between gap-3">
          <Skeleton className="h-12 w-48 md:h-10" />
          <Skeleton className="h-10 w-36" />
        </div>
        <div className="flex flex-col gap-3 lg:flex-row">
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-12 w-full max-w-xl md:h-10" />
        </div>
      </div>
      <Skeleton className="h-180 w-full" />
    </div>
  );
}
