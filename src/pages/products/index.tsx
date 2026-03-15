import { useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  useProductsQuery,
  useSearchProductsQuery
} from "@shared/api/dummyApi";
import { useAppSelector } from "@shared/lib/hooks";

const ProductsPage = () => {
  const { t } = useTranslation();
  const settings = useAppSelector((s) => s.settings);
  const [searchParams, setSearchParams] = useSearchParams();
  const [query, setQuery] = useState(searchParams.get("q") ?? "");
  const page = Number(searchParams.get("page") ?? "1");
  const skip = (page - 1) * settings.pageSize;

  const isSearch = !!searchParams.get("q");

  const listQuery = useProductsQuery(
    { limit: settings.pageSize, skip },
    { skip: isSearch }
  );
  const searchQuery = useSearchProductsQuery(
    { q: query, limit: settings.pageSize, skip },
    { skip: !isSearch }
  );

  const { data, isLoading, isError } = isSearch ? searchQuery : listQuery;

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const next = new URLSearchParams(searchParams);
    if (query) next.set("q", query);
    else next.delete("q");
    next.set("page", "1");
    setSearchParams(next);
  };

  const handleLoadMore = () => {
    const next = new URLSearchParams(searchParams);
    next.set("page", String(page + 1));
    setSearchParams(next);
  };

  return (
    <div>
      <h2 style={{ marginBottom: 16 }}>{t("products.title")}</h2>
      <form className="search-row" onSubmit={handleSearchSubmit}>
        <input
          placeholder={t("products.search")}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button className="btn" type="submit">
          {t("products.search")}
        </button>
      </form>

      {isLoading && <div>{t("common.loading")}</div>}
      {isError && <div>{t("common.error")}</div>}

      {data && data.products.length === 0 && (
        <div>{t("products.empty")}</div>
      )}

      {data && data.products.length > 0 && (
        <>
          <div className="products-grid">
            {data.products.map((p) => (
              <Link key={p.id} to={`/products/${p.id}`} className="product-card">
                <img
                  src={p.thumbnail}
                  alt={p.title}
                  className="product-thumb"
                />
                <div className="product-title">{p.title}</div>
                <div className="product-meta">
                  <span>
                    {t("products.price")}: ${p.price}
                  </span>
                  <span>
                    {t("products.rating")}: {p.rating}
                  </span>
                </div>
                <span className="chip">
                  {t("products.category")}: {p.category}
                </span>
              </Link>
            ))}
          </div>
          {data.total > skip + settings.pageSize && (
            <div style={{ marginTop: 16 }}>
              <button className="btn" type="button" onClick={handleLoadMore}>
                {t("products.loadMore")}
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default ProductsPage;

