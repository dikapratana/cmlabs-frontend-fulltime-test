import { Skeleton } from "@/components/ui/skeleton";

type ProductSkeletonGridProps = {
  count: number;
};

function ProductCardSkeleton() {
  return (
    <article className="overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-[0_8px_24px_rgba(15,23,42,0.05)]">
      <div className="flex h-52 items-center justify-center bg-linear-to-b from-slate-100 via-emerald-50 to-white p-6">
        <div className="flex h-full w-full flex-col items-center justify-center rounded-xl bg-white/70">
          <Skeleton className="h-28 w-28 rounded-full" />
          <Skeleton className="mt-4 h-6 w-32 rounded-full" />
        </div>
      </div>
    </article>
  );
}

export function ProductSkeletonGrid({ count }: ProductSkeletonGridProps) {
  return (
    <div className="grid grid-cols-2 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
      {Array.from({ length: count }, (_, index) => (
        <ProductCardSkeleton key={index} />
      ))}
    </div>
  );
}
