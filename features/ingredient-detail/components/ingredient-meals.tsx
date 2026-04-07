"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import useDebounce from "@/hooks/use-debounce";
import { matchesText, normalizeQuery } from "@/lib/utils/search";
import { ProductCard } from "@/components/shared/product-card";
import { ProductSkeletonGrid } from "@/components/shared/product-card/skeleton";

const INITIAL_VISIBLE_COUNT = 20;
const LOAD_MORE_COUNT = 20;
const SEARCH_SKELETON_COUNT = 10;

type IngredientMealsProps = {
  ingredientName: string;
  ingredientSlug: string;
  items: MealItem[];
};

export function IngredientMeals({
  ingredientName,
  ingredientSlug,
  items,
}: IngredientMealsProps) {
  const loadMoreTimeoutRef = useRef<number | null>(null);
  const [visible, setVisible] = useState(INITIAL_VISIBLE_COUNT);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [query, setQuery] = useState("");
  const debouncedQuery = useDebounce(query, 500);
  const normalizedQuery = normalizeQuery(debouncedQuery);
  const isSearching = query !== debouncedQuery;

  useEffect(() => {
    return () => {
      if (loadMoreTimeoutRef.current !== null) {
        window.clearTimeout(loadMoreTimeoutRef.current);
      }
    };
  }, []);

  const onSearch = (value: string) => {
    setQuery(value);
    setVisible(INITIAL_VISIBLE_COUNT);
  };

  const filteredItems = useMemo(
    () => items.filter((item) => matchesText([item.strMeal], normalizedQuery)),
    [items, normalizedQuery],
  );
  const visibleItems = useMemo(
    () => filteredItems.slice(0, visible),
    [filteredItems, visible],
  );
  const hasMoreItems = visibleItems.length < filteredItems.length;

  const onLoadMore = () => {
    if (isLoadingMore) {
      return;
    }

    setIsLoadingMore(true);
    loadMoreTimeoutRef.current = window.setTimeout(() => {
      setVisible((current) => current + LOAD_MORE_COUNT);
      setIsLoadingMore(false);
      loadMoreTimeoutRef.current = null;
    }, 250);
  };

  return (
    <>
      <div className="mb-8 flex w-full flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h2 className="mt-2 text-2xl font-semibold tracking-tight text-slate-800 sm:text-3xl">
            Browse all {ingredientName}
          </h2>
          <p className="mt-2 text-sm text-slate-500">
            Showing {visibleItems.length} of {filteredItems.length} items
          </p>
        </div>
        <div className="w-full max-w-md">
          <div className="flex flex-col gap-3 sm:flex-row">
            <Input
              value={query}
              onChange={(event) => onSearch(event.target.value)}
              placeholder="Search for meals..."
              rightIcon={<Search />}
              wrapperClassName="flex-1"
            />
          </div>
        </div>
      </div>

      {isSearching ? (
        <ProductSkeletonGrid count={SEARCH_SKELETON_COUNT} />
      ) : (
        <div className="grid grid-cols-2 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
          {visibleItems.map((item) => (
            <Link
              key={item.idMeal}
              href={`/ingredients/${ingredientSlug}/${item.idMeal}`}
            >
              <ProductCard
                title={item.strMeal}
                imageSrc={item.strMealThumb}
                imageAlt={item.strMeal}
                fallbackEmoji="🥘"
                badgeClassName="px-2.5 py-1"
                imageClassName="rounded-full object-cover"
              />
            </Link>
          ))}
        </div>
      )}

      {isLoadingMore ? (
        <div className="mt-5">
          <ProductSkeletonGrid
            count={Math.min(
              LOAD_MORE_COUNT,
              filteredItems.length - visibleItems.length,
            )}
          />
        </div>
      ) : null}

      {hasMoreItems ? (
        <div className="mt-8 flex justify-center">
          <Button onClick={onLoadMore} disabled={isLoadingMore || isSearching}>
            {isLoadingMore ? "Loading..." : "Load more"}
          </Button>
        </div>
      ) : null}

      {!isSearching && !filteredItems.length ? (
        <div className="rounded-2xl border border-dashed border-slate-200 bg-slate-50 px-6 py-12 text-center">
          <p className="text-base font-semibold text-slate-700 sm:text-lg">
            No meals matched your search.
          </p>
          <p className="mt-2 text-sm text-slate-500">
            Try a different keyword or clear the search to see everything.
          </p>
        </div>
      ) : null}
    </>
  );
}
