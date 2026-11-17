import { Skeleton } from "@/components/ui/Skeleton";
import { EventsListSkeleton } from "@/features/events/components/EventsListSkeleton";

export default function EventsLoading() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-3">
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-10 w-full max-w-md" />
      </div>
      <Skeleton className="h-10 w-48" />
      <EventsListSkeleton />
    </div>
  );
}
