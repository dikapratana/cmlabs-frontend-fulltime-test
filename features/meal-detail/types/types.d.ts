type MealItem = {
  idMeal: string;
  strMeal: string;
  strMealThumb: string | null;
};

type MealListResponse = {
  meals: MealItem[] | null;
};

type MealDetailItem = {
  idMeal: string;
  strMeal: string;
  strMealAlternate: string | null;
  strCategory: string | null;
  strArea: string | null;
  strInstructions: string | null;
  strMealThumb: string | null;
  strTags: string | null;
  strYoutube: string | null;
  strSource: string | null;
  strImageSource: string | null;
  strCreativeCommonsConfirmed: string | null;
  dateModified: string | null;
} & {
  [key: `strIngredient${number}`]: string | null | undefined;
} & {
  [key: `strMeasure${number}`]: string | null | undefined;
};

type MealDetailResponse = {
  meals: MealDetailItem[] | null;
};

type MealDetailIngredient = {
  ingredient: string;
  measure: string;
};
