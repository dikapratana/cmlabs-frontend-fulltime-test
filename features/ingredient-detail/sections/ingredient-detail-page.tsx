import { Breadcrumb } from "@/components/shared/breadcrumb";
import { IngredientMeals } from "../components/ingredient-meals";

type IngredientDetailPageProps = {
  ingredientName: string;
  ingredientSlug: string;
  meals: MealItem[];
};

export function IngredientDetailPage({
  ingredientName,
  ingredientSlug,
  meals,
}: IngredientDetailPageProps) {
  return (
    <>
      <section className="bg-white">
        <div className="mx-auto max-w-360 px-4 pt-2 sm:px-6 lg:px-8">
          <Breadcrumb items={[{ label: ingredientName }]} />
        </div>
      </section>

      <section className="bg-white">
        <div className="mx-auto max-w-360 px-4 pb-8 sm:px-6 lg:px-8">
          <div className="relative overflow-hidden rounded-[28px] bg-[linear-gradient(180deg,#f6f7f2_0%,#f0f4eb_100%)] px-6 py-14 sm:px-10 lg:px-14 lg:py-20">
            <div className="pointer-events-none absolute left-0 top-0 h-full w-48 bg-[radial-gradient(circle_at_left,#f59e0b_0%,transparent_60%)] opacity-40" />
            <div className="pointer-events-none absolute right-0 top-0 h-full w-56 bg-[radial-gradient(circle_at_right,#fde047_0%,transparent_62%)] opacity-40" />
            <div className="relative mx-auto max-w-2xl text-center">
              <p className="text-[11px] font-medium uppercase tracking-[0.24em] text-emerald-500 sm:text-sm sm:tracking-[0.3em]">
                Explore Ingredient Details
              </p>
              <p className="mt-4 text-lg font-semibold leading-snug text-slate-800 sm:text-2xl lg:text-3xl">
                Explore delicious meals made with {ingredientName}, curated from
                our ingredient collection.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section
        id="ingredient-meals-grid"
        className="mx-auto max-w-360 px-4 pb-10 pt-2 sm:px-6 lg:px-8 lg:pb-14"
      >
        <IngredientMeals
          ingredientName={ingredientName}
          ingredientSlug={ingredientSlug}
          items={meals}
        />
      </section>
    </>
  );
}
