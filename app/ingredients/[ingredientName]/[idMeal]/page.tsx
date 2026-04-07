import type { Metadata } from "next";
import { MealDetailPage } from "@/features/meal-detail/sections/meal-detail-page";
import { getMealById } from "@/lib/server/ingredients";
import { fromKebabCase } from "@/lib/utils/slug";

type MealDetailRouteParams = Promise<{
  ingredientName: string;
  idMeal: string;
}>;

export async function generateMetadata({
  params,
}: {
  params: MealDetailRouteParams;
}): Promise<Metadata> {
  const { ingredientName, idMeal } = await params;
  const ingredientSlug = decodeURIComponent(ingredientName).trim();
  const ingredientDisplayName = fromKebabCase(ingredientSlug);
  const meal = await getMealById(idMeal);

  if (!meal) {
    return {
      title: "Meal Not Found",
      description: "The requested meal data could not be found.",
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  return {
    title: meal.strMeal,
    description:
      meal.strInstructions?.slice(0, 160) ||
      `Discover how to make ${meal.strMeal} with ${ingredientDisplayName}.`,
  };
}

export default async function Page({
  params,
}: {
  params: MealDetailRouteParams;
}) {
  const { ingredientName, idMeal } = await params;
  const meal = await getMealById(idMeal);

  const ingredientSlug = decodeURIComponent(ingredientName).trim();
  const ingredientDisplayName = fromKebabCase(ingredientSlug);

  return (
    <MealDetailPage
      ingredientName={ingredientDisplayName}
      ingredientSlug={ingredientSlug}
      item={meal}
    />
  );
}
