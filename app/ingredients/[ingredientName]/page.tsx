import type { Metadata } from "next";
import { IngredientDetailPage } from "@/features/ingredient-detail/sections/ingredient-detail-page";
import { getMealsByIngredient } from "@/lib/server/ingredients";
import { fromKebabCase } from "@/lib/utils/slug";

type IngredientDetailRouteParams = Promise<{
  ingredientName: string;
}>;

export async function generateMetadata({
  params,
}: {
  params: IngredientDetailRouteParams;
}): Promise<Metadata> {
  const { ingredientName } = await params;
  const decodedIngredientSlug = decodeURIComponent(ingredientName).trim();
  const ingredientNameForDisplay = fromKebabCase(decodedIngredientSlug);

  return {
    title: `${ingredientNameForDisplay} Meals`,
    description: `Explore meals made with ${ingredientNameForDisplay} and discover recipe inspiration based on this ingredient.`,
  };
}

export default async function Page({
  params,
}: {
  params: IngredientDetailRouteParams;
}) {
  const { ingredientName } = await params;
  const decodedIngredientSlug = decodeURIComponent(ingredientName).trim();
  const ingredientNameForDisplay = fromKebabCase(decodedIngredientSlug);
  const ingredientNameForQuery = decodedIngredientSlug.replace(/-/g, " ");
  const meals = await getMealsByIngredient(ingredientNameForQuery);

  return (
    <IngredientDetailPage
      ingredientName={ingredientNameForDisplay}
      ingredientSlug={decodedIngredientSlug}
      meals={meals}
    />
  );
}
