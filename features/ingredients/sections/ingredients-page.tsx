import { Ingredients } from "../components/ingredients";

type IngredientPageProps = {
  items: IngredientItem[];
  query: string;
};

export function IngredientPage({ items, query }: IngredientPageProps) {
  return (
    <>
      <section className="bg-white">
        <div className="mx-auto max-w-360 px-4 pb-8 sm:px-6 lg:px-8">
          <div className="relative overflow-hidden rounded-[28px] bg-[linear-gradient(180deg,#f6f7f2_0%,#f0f4eb_100%)] px-6 py-14 sm:px-10 lg:px-14 lg:py-20">
            <div className="pointer-events-none absolute left-0 top-0 h-full w-48 bg-[radial-gradient(circle_at_left,#f59e0b_0%,transparent_60%)] opacity-40" />
            <div className="pointer-events-none absolute right-0 top-0 h-full w-56 bg-[radial-gradient(circle_at_right,#fde047_0%,transparent_62%)] opacity-40" />
            <div className="relative mx-auto max-w-2xl text-center">
              <p className="text-[11px] font-medium uppercase tracking-[0.24em] text-emerald-500 sm:text-sm sm:tracking-[0.3em]">
                Discover Fresh Culinary Experiences
              </p>
              <p className="mt-4 text-lg font-semibold leading-snug text-slate-800 sm:text-2xl lg:text-3xl">
                Explore delicious meals made from the finest ingredients,
                crafted just for you.
              </p>
            </div>
          </div>
        </div>
      </section>
      <section
        id="ingredients-grid"
        className="mx-auto max-w-360 px-4 pb-10 pt-2 sm:px-6 lg:px-8 lg:pb-14"
      >
        <Ingredients items={items} initialQuery={query} />
      </section>
    </>
  );
}
