import { apiClient } from "@/lib/api/client";
import { ENV } from "../constants/env";
import { ENDPOINT } from "../constants/endpoint";

function normalizeQuery(query?: string) {
  return query?.trim().toLowerCase() ?? "";
}

function matchesQuery(item: IngredientItem, normalizedQuery: string) {
  if (!normalizedQuery) {
    return true;
  }

  return [item.strIngredient, item.strType, item.strDescription].some((value) =>
    value?.toLowerCase().includes(normalizedQuery),
  );
}

export async function getIngredients({ query }: GetIngredientsOptions = {}) {
  const normalizedQuery = normalizeQuery(query);
  const response = await apiClient.getJson<IngredientListResponse>(
    ENDPOINT.LIST_INGREDIENTS,
    {
      baseUrl: ENV.HOST,
      params: { i: "list" },
      next: { revalidate: 60 },
    },
  );
  const items = response.meals ?? [];

  return items.filter((item) => matchesQuery(item, normalizedQuery));
}

export async function getMealsByIngredient(ingredientName: string) {
  const normalizedIngredientName = ingredientName.trim();

  if (!normalizedIngredientName) {
    return [];
  }

  const response = await apiClient.getJson<MealListResponse>(
    ENDPOINT.FILTER_MEALS_BY_INGREDIENT,
    {
      baseUrl: ENV.HOST,
      params: { i: normalizedIngredientName },
      next: { revalidate: 60 },
    },
  );

  return response.meals ?? [];
}

export async function getMealById(idMeal: string) {
  const normalizedMealId = idMeal.trim();

  if (!normalizedMealId) {
    return null;
  }

  const response = await apiClient.getJson<MealDetailResponse>(
    ENDPOINT.LOOKUP_MEAL_BY_ID,
    {
      baseUrl: ENV.HOST,
      params: { i: normalizedMealId },
      next: { revalidate: 60 },
    },
  );

  return response &&
    response.meals &&
    Array.isArray(response.meals) &&
    response.meals.length > 0
    ? response.meals[0]
    : null;
}
