import Link from "next/link";
import Image from "next/image";
import { CookingPot, House, MapPinned, UtensilsCrossed } from "lucide-react";

export default function Header() {
  return (
    <>
      <header className="fixed w-full top-0 left-0 border-b border-slate-100 bg-white z-50">
        <div className="mx-auto max-w-360 border-b border-slate-100 px-4 py-4 sm:px-6 lg:px-8 lg:py-5">
          <div className="flex items-center justify-between gap-4 lg:flex-row lg:items-center lg:justify-between">
            <Link href="/" className="flex items-center gap-3">
              <Image
                src="/images/logo.png"
                alt="Meal App Logo"
                width={32}
                height={32}
                className="h-8 w-auto object-contain"
              />
              <div>
                <p className="text-2xl font-bold tracking-tight text-emerald-600 sm:text-3xl">
                  Meal App
                </p>
              </div>
            </Link>

            <div className="hidden flex-wrap items-center gap-2 text-sm text-slate-600 lg:flex">
              <Link
                href="/"
                className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-2 font-medium text-emerald-700"
              >
                <House className="size-4" />
                <span>Home</span>
              </Link>
              <button
                type="button"
                disabled
                className="inline-flex cursor-not-allowed items-center gap-2 rounded-full px-3 py-2 text-slate-400 disabled:opacity-100"
              >
                <UtensilsCrossed className="size-4" />
                <span>Foods</span>
              </button>
              <button
                type="button"
                disabled
                className="inline-flex cursor-not-allowed items-center gap-2 rounded-full px-3 py-2 text-slate-400 disabled:opacity-100"
              >
                <CookingPot className="size-4" />
                <span>Ingredients</span>
              </button>
              <button
                type="button"
                disabled
                className="inline-flex cursor-not-allowed items-center gap-2 rounded-full px-3 py-2 text-slate-400 disabled:opacity-100"
              >
                <MapPinned className="size-4" />
                <span>Local Culinary</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <nav className="fixed inset-x-0 bottom-0 z-50 border-t border-slate-200 bg-white/95 px-3 pb-[calc(env(safe-area-inset-bottom)+0.75rem)] pt-3 backdrop-blur lg:hidden">
        <div className="mx-auto grid max-w-md grid-cols-4 gap-2">
          <Link
            href="/"
            className="flex min-h-16 flex-col items-center justify-center rounded-2xl bg-emerald-50 px-2 py-2 text-emerald-700"
          >
            <House className="size-5" />
            <span className="mt-1 text-[11px] font-semibold">Home</span>
          </Link>

          <button
            type="button"
            disabled
            className="flex min-h-16 cursor-not-allowed flex-col items-center justify-center rounded-2xl px-2 py-2 text-slate-400 disabled:opacity-100"
          >
            <UtensilsCrossed className="size-5" />
            <span className="mt-1 text-[11px] font-medium">Foods</span>
          </button>

          <button
            type="button"
            disabled
            className="flex min-h-16 cursor-not-allowed flex-col items-center justify-center rounded-2xl px-2 py-2 text-slate-400 disabled:opacity-100"
          >
            <CookingPot className="size-5" />
            <span className="mt-1 text-[11px] font-medium">Ingredients</span>
          </button>

          <button
            type="button"
            disabled
            className="flex min-h-16 cursor-not-allowed flex-col items-center justify-center rounded-2xl px-2 py-2 text-slate-400 disabled:opacity-100"
          >
            <MapPinned className="size-5" />
            <span className="mt-1 text-[11px] font-medium">Local</span>
          </button>
        </div>
      </nav>
    </>
  );
}
