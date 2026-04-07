import type { Metadata } from "next";
import { IngredientPage } from "@/features/ingredients/sections/ingredients-page";
import { getIngredients } from "@/lib/server/ingredients";
import { getSearchQueryValue } from "@/lib/utils/search-params";

type IngredientPageSearchParams = Promise<{
  q?: string | string[];
}>;

export const metadata: Metadata = {
  title: "Ingredients",
  description:
    "Browse available ingredients, explore culinary inspiration, and discover meals built from each ingredient.",
};

export default async function Page({
  searchParams,
}: {
  searchParams: IngredientPageSearchParams;
}) {
  const resolvedSearchParams = await searchParams;
  const query = getSearchQueryValue(resolvedSearchParams.q);
  const items = await getIngredients();

  return <IngredientPage items={items} query={query} />;
}
