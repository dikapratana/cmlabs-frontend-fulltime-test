import Link from "next/link";
import { ChevronRight, House } from "lucide-react";

type BreadcrumbItem = {
  href?: string;
  label: string;
};

type BreadcrumbProps = {
  items: BreadcrumbItem[];
};

export function Breadcrumb({ items }: BreadcrumbProps) {
  return (
    <nav
      aria-label="Breadcrumb"
      className="flex flex-wrap items-center gap-2 text-sm text-slate-500 mb-4"
    >
      <Link
        href="/"
        className="inline-flex items-center gap-2 font-medium text-slate-600 transition hover:text-emerald-600"
      >
        <House className="size-4" />
        <span>Home</span>
      </Link>

      {items.map((item) => (
        <span
          key={`${item.label}-${item.href ?? "current"}`}
          className="inline-flex items-center gap-2"
        >
          <ChevronRight className="size-4 text-slate-300" />
          {item.href ? (
            <Link
              href={item.href}
              className="font-medium text-slate-600 transition hover:text-emerald-600"
            >
              {item.label}
            </Link>
          ) : (
            <span className="font-medium text-emerald-600">{item.label}</span>
          )}
        </span>
      ))}
    </nav>
  );
}
