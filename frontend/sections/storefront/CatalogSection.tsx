"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { SlidersHorizontal, X } from "lucide-react";
import { useGetProductsQuery } from "@/services/productsService";
import { CATEGORIES } from "@/lib/constants";
import { Search } from "@/custom-components/ui/Search";
import { Pagination } from "@/custom-components/ui/Pagination";
import { ViewToggle, type ViewMode } from "@/custom-components/ui/ViewToggle";
import { Button } from "@/custom-components/ui/Button";
import { EmptyState } from "@/custom-components/ui/EmptyState";
import { Heading, Paragraph } from "@/custom-components/ui/Typography";
import {
  FilterPanel,
  FilterSection,
  CheckboxFilter,
  PriceRangeFilter,
} from "@/custom-components/ui/Filters";
import { ProductGrid } from "@/custom-components/product/ProductGrid";
import { ProductList } from "@/custom-components/product/ProductList";
import { ProductSort } from "@/custom-components/product/ProductSort";
import { PackageSearch } from "lucide-react";

const LIMIT = 12;
const CATEGORY_OPTIONS = CATEGORIES.map((c) => ({ label: c, value: c }));

export function CatalogSection() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // ── Read URL state ──
  const [search, setSearch] = useState(searchParams.get("q") ?? "");
  const [categories, setCategories] = useState<string[]>(
    searchParams.getAll("category")
  );
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 500]);
  const [sortBy, setSortBy] = useState<string>(searchParams.get("sortBy") ?? "newest");
  const [page, setPage] = useState(Number(searchParams.get("page") ?? 1));
  const [view, setView] = useState<ViewMode>("grid");
  const [filtersOpen, setFiltersOpen] = useState(false);

  // Keep local filter state in sync with the URL. The useState initialisers
  // above only run once, so navigating here from elsewhere (e.g. the navbar
  // Categories menu → /shop?category=…) while this component is already mounted
  // would otherwise leave the filters untouched. Treating the URL as the source
  // of truth fixes that. This uses React's "adjust state during render when a
  // value changes" pattern (https://react.dev/learn/you-might-not-need-an-effect),
  // which avoids an extra render/flash and does not loop with syncUrl() since
  // setState with identical values is a no-op.
  const searchParamsKey = searchParams.toString();
  const [prevParamsKey, setPrevParamsKey] = useState(searchParamsKey);
  if (searchParamsKey !== prevParamsKey) {
    setPrevParamsKey(searchParamsKey);
    setSearch(searchParams.get("q") ?? "");
    setCategories(searchParams.getAll("category"));
    setSortBy(searchParams.get("sortBy") ?? "newest");
    setPage(Number(searchParams.get("page") ?? 1));
  }

  // Debounce search -> URL sync
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const syncUrl = useCallback(
    (overrides: Record<string, any> = {}) => {
      const params = new URLSearchParams();
      const q    = overrides.q !== undefined ? String(overrides.q ?? "") : search;
      const cats: string[] = overrides.categories !== undefined ? overrides.categories : categories;
      const sort = overrides.sortBy !== undefined ? String(overrides.sortBy) : sortBy;
      const pg   = overrides.page !== undefined ? Number(overrides.page) : page;
      if (q) params.set("q", q);
      cats.forEach((c) => params.append("category", c));
      if (sort !== "newest") params.set("sortBy", sort);
      if (pg > 1) params.set("page", String(pg));
      router.replace(`?${params.toString()}`, { scroll: false });
    },
    [search, categories, sortBy, page, router]
  );

  const handleSearch = (value: string) => {
    setSearch(value);
    setPage(1);
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => syncUrl({ q: value, page: 1 }), 350);
  };

  const handleCategory = (selected: string[]) => {
    setCategories(selected);
    setPage(1);
    syncUrl({ categories: selected, page: 1 });
  };

  const handleSort = (value: string) => {
    setSortBy(value);
    setPage(1);
    syncUrl({ sortBy: value, page: 1 });
  };

  const handlePage = (p: number) => {
    setPage(p);
    syncUrl({ page: p });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleClearFilters = () => {
    setSearch("");
    setCategories([]);
    setPriceRange([0, 500]);
    setSortBy("newest");
    setPage(1);
    router.replace("?", { scroll: false });
  };

  const activeFilterCount =
    (search ? 1 : 0) +
    categories.length +
    (priceRange[0] > 0 || priceRange[1] < 500 ? 1 : 0);

  // ── Fetch products from API ──
  const { data, isLoading, isFetching } = useGetProductsQuery({
    search: search || undefined,
    category: categories.length > 0 ? categories.join(",") : undefined,
    minPrice: priceRange[0] > 0 ? priceRange[0] : undefined,
    maxPrice: priceRange[1] < 500 ? priceRange[1] : undefined,
    sortBy: sortBy as any,
    page,
    limit: LIMIT,
  });
  const products = data?.data ?? [];
  const total = data?.total ?? 0;
  const totalPages = data?.totalPages ?? 1;

  // Restore view preference from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("catalog-view");
    if (saved === "list" || saved === "grid") setView(saved);
  }, []);

  const handleViewChange = (v: ViewMode) => {
    setView(v);
    localStorage.setItem("catalog-view", v);
  };

  const FilterSidebar = () => (
    <FilterPanel
      activeCount={activeFilterCount}
      onClear={handleClearFilters}
      className="sticky top-20"
    >
      <FilterSection title="Category">
        <CheckboxFilter
          options={CATEGORY_OPTIONS}
          selected={categories}
          onChange={handleCategory}
        />
      </FilterSection>
      <FilterSection title="Price Range">
        <PriceRangeFilter
          min={0}
          max={500}
          value={priceRange}
          onChange={setPriceRange}
        />
      </FilterSection>
    </FilterPanel>
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">

      {/* Page header */}
      <div className="mb-6 sm:mb-8">
        <Heading as="h1" size="2xl" className="mb-1">All Products</Heading>
        <Paragraph variant="muted">
          {total} product{total !== 1 ? "s" : ""} available
        </Paragraph>
      </div>

      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-3 mb-6">
        <Search
          value={search}
          onChange={handleSearch}
          placeholder="Search products…"
          className="flex-1 min-w-[200px] max-w-md"
        />

        <div className="flex items-center gap-2 ml-auto">
          {/* Mobile filter toggle */}
          <Button
            variant="secondary"
            size="md"
            className="lg:hidden"
            onClick={() => setFiltersOpen(!filtersOpen)}
            leftIcon={<SlidersHorizontal className="h-4 w-4" />}
          >
            Filters
            {activeFilterCount > 0 && (
              <span className="ml-1 h-5 w-5 rounded-full bg-violet-600 text-white text-[10px] font-bold flex items-center justify-center">
                {activeFilterCount}
              </span>
            )}
          </Button>

          <ProductSort value={sortBy} onChange={handleSort} />
          <ViewToggle view={view} onChange={handleViewChange} />
        </div>
      </div>

      {/* Active filters row */}
      {activeFilterCount > 0 && (
        <div className="flex flex-wrap items-center gap-2 mb-4">
          {search && (
            <span className="flex items-center gap-1.5 text-xs bg-violet-50 text-violet-700 border border-violet-200 px-2.5 py-1 rounded-full">
              Search: &quot;{search}&quot;
              <button onClick={() => handleSearch("")}><X className="h-3 w-3" /></button>
            </span>
          )}
          {categories.map((c) => (
            <span key={c} className="flex items-center gap-1.5 text-xs bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 px-2.5 py-1 rounded-full">
              {c}
              <button onClick={() => handleCategory(categories.filter((x) => x !== c))}>
                <X className="h-3 w-3" />
              </button>
            </span>
          ))}
          <button onClick={handleClearFilters} className="text-xs text-zinc-400 dark:text-zinc-500 hover:text-zinc-600 dark:text-zinc-400 underline">
            Clear all
          </button>
        </div>
      )}

      {/* Mobile filter drawer */}
      {filtersOpen && (
        <div className="lg:hidden mb-4">
          <div className="fixed inset-0 z-40 bg-black/40" onClick={() => setFiltersOpen(false)} />
          <div className="fixed bottom-0 left-0 right-0 z-50 bg-white dark:bg-zinc-900 rounded-t-2xl p-4 max-h-[80vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <Heading size="md">Filters</Heading>
              <button onClick={() => setFiltersOpen(false)}><X className="h-5 w-5 text-zinc-500 dark:text-zinc-400" /></button>
            </div>
            <FilterSidebar />
            <Button variant="primary" fullWidth className="mt-4" onClick={() => setFiltersOpen(false)}>
              Show {total} results
            </Button>
          </div>
        </div>
      )}

      {/* Main content: sidebar + products */}
      <div className="flex gap-6 lg:gap-8">

        {/* Desktop sidebar */}
        <aside className="hidden lg:block w-56 xl:w-64 shrink-0">
          <FilterSidebar />
        </aside>

        {/* Product area */}
        <div className="flex-1 min-w-0 space-y-6">
          {isLoading || isFetching ? (
            view === "grid" ? (
              <ProductGrid products={[]} loading />
            ) : (
              <ProductList products={[]} loading />
            )
          ) : total === 0 ? (
            <EmptyState
              icon={<PackageSearch className="h-8 w-8" />}
              title="No products found"
              description="Try adjusting your search or filters to find what you're looking for."
              action={{ label: "Clear filters", onClick: handleClearFilters }}
            />
          ) : (
            <>
              {view === "grid" ? (
                <ProductGrid products={products} />
              ) : (
                <ProductList products={products} />
              )}

              {totalPages > 1 && (
                <Pagination
                  page={page}
                  totalPages={totalPages}
                  total={total}
                  limit={LIMIT}
                  onPageChange={handlePage}
                />
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
