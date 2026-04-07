type SkeletonProps = React.ComponentPropsWithoutRef<"div">;

function cn(...classes: Array<string | undefined>) {
  return classes.filter(Boolean).join(" ");
}

const baseSkeletonClassName =
  "animate-pulse rounded-md bg-slate-200/80";

export function Skeleton({
  className,
  ...props
}: SkeletonProps) {
  return (
    <div
      aria-hidden="true"
      className={cn(baseSkeletonClassName, className)}
      {...props}
    />
  );
}
