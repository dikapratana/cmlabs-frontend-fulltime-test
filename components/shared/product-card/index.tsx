import Image from "next/image";

type ProductCardProps = {
  title: string;
  imageSrc: string | null;
  imageAlt: string;
  fallbackEmoji: string;
  imageClassName?: string;
  badgeClassName?: string;
  innerClassName?: string;
};

function cn(...classes: Array<string | undefined>) {
  return classes.filter(Boolean).join(" ");
}

const baseBadgeClassName =
  "mt-4 rounded-full bg-emerald-600 px-3 py-1.5 text-center text-[8px] sm:text-[10px] font-semibold uppercase tracking-[0.18em] text-white px-4";

export function ProductCard({
  title,
  imageSrc,
  imageAlt,
  fallbackEmoji,
  imageClassName,
  badgeClassName,
  innerClassName,
}: ProductCardProps) {
  return (
    <article className="group overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-[0_8px_24px_rgba(15,23,42,0.05)] transition hover:-translate-y-1 hover:shadow-[0_16px_36px_rgba(15,23,42,0.1)]">
      <div className="relative flex h-48 items-center justify-center bg-linear-to-b from-yellow-100 via-emerald-50 to-white sm:h-52">
        <div
          className={cn(
            "flex h-full w-full flex-col items-center justify-center rounded-xl bg-white/70",
            innerClassName,
          )}
        >
          {imageSrc ? (
            <Image
              src={imageSrc}
              alt={imageAlt}
              width={112}
              height={112}
              className={cn(
                "h-24 w-24 object-contain sm:h-28 sm:w-28",
                imageClassName,
              )}
            />
          ) : (
            <span className="text-5xl">{fallbackEmoji}</span>
          )}
          <span className={cn(baseBadgeClassName, badgeClassName)}>
            {title}
          </span>
        </div>
      </div>
    </article>
  );
}
