import Link from "next/link";
import Image from "next/image";
import { Breadcrumb } from "@/components/shared/breadcrumb";
import { getMealIngredients, getVideoEmbedUrl } from "../utils/meal";

type MealDetailPageProps = {
  ingredientName: string;
  ingredientSlug: string;
  item: MealDetailItem | null;
};

export function MealDetailPage({
  ingredientName,
  ingredientSlug,
  item,
}: MealDetailPageProps) {
  if (!item) {
    return (
      <>
        <section className="bg-white">
          <div className="mx-auto max-w-360 px-4 pt-2 sm:px-6 lg:px-8">
            <Breadcrumb
              items={[
                {
                  href: `/ingredients/${ingredientSlug}`,
                  label: ingredientName,
                },
                { label: "Meal not found" },
              ]}
            />
          </div>
        </section>

        <section className="mx-auto max-w-360 px-4 pb-10 pt-6 sm:px-6 lg:px-8 lg:pb-14">
          <div className="rounded-[28px] border border-dashed border-slate-200 bg-slate-50 px-6 py-16 text-center">
            <p className="text-xl font-semibold text-slate-800 sm:text-2xl">
              Meal data was not found
            </p>
            <p className="mt-3 text-sm text-slate-500">
              The meal you are looking for may be unavailable or no longer
              exists in the current data source.
            </p>
            <div className="mt-6">
              <Link
                href={`/ingredients/${ingredientSlug}`}
                className="inline-flex items-center rounded-full border border-emerald-200 bg-white px-4 py-2 text-sm font-medium text-emerald-700 transition hover:bg-emerald-50"
              >
                Back to meals
              </Link>
            </div>
          </div>
        </section>
      </>
    );
  }

  const ingredients = getMealIngredients(item);
  const videoEmbedUrl = getVideoEmbedUrl(item.strYoutube);

  return (
    <>
      <section className="bg-white">
        <div className="mx-auto max-w-360 px-4 pt-2 sm:px-6 lg:px-8">
          <Breadcrumb
            items={[
              { href: `/ingredients/${ingredientSlug}`, label: ingredientName },
              { label: item.strMeal },
            ]}
          />
        </div>
      </section>

      <section className="mx-auto max-w-360 px-4 pb-10 pt-2 sm:px-6 lg:px-8 lg:pb-14">
        <h1 className="mt-4 text-2xl font-semibold text-slate-800 sm:text-3xl lg:text-4xl">
          {item.strMeal}
        </h1>
        {item.strCategory && (
          <span className="my-4 inline-flex w-fit max-w-full rounded-full bg-emerald-600 px-3 py-1.5 text-center text-[10px] font-semibold uppercase tracking-[0.14em] text-white sm:tracking-[0.18em]">
            {item.strCategory}
          </span>
        )}
        <div className="flex flex-col gap-4 lg:flex-row lg:items-start">
          <div className="w-full lg:w-2/5">
            <div className="overflow-hidden rounded-[28px] border border-slate-100 bg-white shadow-[0_16px_40px_rgba(15,23,42,0.06)]">
              {item.strMealThumb ? (
                <Image
                  src={item.strMealThumb}
                  alt={item.strMeal}
                  width={360}
                  height={360}
                  className="h-72 w-full object-cover sm:h-96"
                />
              ) : (
                <div className="flex h-72 items-center justify-center sm:h-96">
                  <span className="text-8xl">🍽️</span>
                </div>
              )}
            </div>
          </div>

          <div className="w-full space-y-4 lg:flex-1">
            <article className="rounded-[28px] border border-slate-100 bg-white p-6 shadow-[0_16px_40px_rgba(15,23,42,0.06)]">
              <h2 className="text-xl font-semibold tracking-tight text-slate-800 sm:text-2xl lg:text-3xl">
                Instructions
              </h2>
              <p className="mt-4 whitespace-pre-line text-sm leading-6 text-slate-600 sm:leading-7">
                {item.strInstructions ||
                  "No instructions are available for this meal."}
              </p>
            </article>

            <article className="rounded-[28px] border border-slate-100 bg-white p-6 shadow-[0_16px_40px_rgba(15,23,42,0.06)]">
              <h2 className="text-xl font-semibold tracking-tight text-slate-800 sm:text-2xl lg:text-3xl">
                Recipes
              </h2>
              <ul className="mt-5 list-disc space-y-1 pl-5 text-sm leading-6 text-slate-600 sm:leading-7">
                {ingredients.map((entry) => (
                  <li key={`${entry.ingredient}-${entry.measure}`}>
                    {entry.measure ? `${entry.measure} ` : ""}
                    {entry.ingredient}
                  </li>
                ))}
              </ul>
            </article>
          </div>
        </div>
        <article className="mt-10">
          <h2 className="text-center text-xl font-semibold tracking-tight text-slate-800 sm:text-2xl lg:text-3xl">
            Tutorials
          </h2>
          <div className="mt-6 overflow-hidden rounded-[28px] border border-slate-100 bg-white shadow-[0_16px_40px_rgba(15,23,42,0.06)]">
            {videoEmbedUrl ? (
              <iframe
                className="aspect-video w-full"
                src={videoEmbedUrl}
                title={`${item.strMeal} tutorial`}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            ) : (
              <div className="p-6">
                <p className="text-sm leading-6 text-slate-600 sm:leading-7">
                  Video tutorial is not available as an embeddable player for
                  this meal.
                </p>
                <div className="mt-4 flex flex-wrap gap-3">
                  {item.strYoutube ? (
                    <Link
                      href={item.strYoutube}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center rounded-full border border-emerald-200 bg-white px-4 py-2 text-sm font-medium text-emerald-700 transition hover:bg-emerald-50"
                    >
                      Watch Video
                    </Link>
                  ) : null}
                  {item.strSource ? (
                    <Link
                      href={item.strSource}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center rounded-full border border-emerald-200 bg-white px-4 py-2 text-sm font-medium text-emerald-700 transition hover:bg-emerald-50"
                    >
                      Source
                    </Link>
                  ) : null}
                </div>
              </div>
            )}
          </div>
        </article>
      </section>
    </>
  );
}
