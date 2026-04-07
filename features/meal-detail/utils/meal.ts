export function getVideoEmbedUrl(url: string | null) {
  if (!url) {
    return null;
  }

  if (url.includes("youtube.com/watch")) {
    const searchParams = new URL(url).searchParams;
    const videoId = searchParams.get("v");

    return videoId ? `https://www.youtube.com/embed/${videoId}` : null;
  }

  if (url.includes("youtu.be/")) {
    const videoId = url.split("youtu.be/")[1]?.split("?")[0];

    return videoId ? `https://www.youtube.com/embed/${videoId}` : null;
  }

  return null;
}

export function getMealIngredients(item: MealDetailItem) {
  const ingredients: MealDetailIngredient[] = [];

  for (let index = 1; index <= 20; index += 1) {
    const ingredient = item[`strIngredient${index}`]?.trim();
    const measure = item[`strMeasure${index}`]?.trim() ?? "";

    if (!ingredient) {
      continue;
    }

    ingredients.push({
      ingredient,
      measure,
    });
  }

  return ingredients;
}
