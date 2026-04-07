type GetIngredientsOptions = {
  query?: string;
};

type IngredientItem = {
  idIngredient: string;
  strIngredient: string;
  strDescription: string | null;
  strType: string | null;
  strThumb: string | null;
};

type IngredientListResponse = {
  meals: IngredientItem[] | null;
};

type IngredientsProps = {
  items: IngredientItem[];
  initialQuery: string;
};
