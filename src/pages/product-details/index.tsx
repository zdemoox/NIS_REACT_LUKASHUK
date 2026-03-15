import { useParams, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useProductQuery } from "@shared/api/dummyApi";

const ProductDetailsPage = () => {
  const { id } = useParams<{ id: string }>();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const numericId = Number(id);
  const { data, isLoading, isError } = useProductQuery(numericId, {
    skip: !numericId
  });

  return (
    <div className="card">
      <button
        className="btn"
        type="button"
        style={{ marginBottom: 16 }}
        onClick={() => navigate(-1)}
      >
        {t("common.back")}
      </button>

      {isLoading && <div>{t("common.loading")}</div>}
      {isError && <div>{t("common.error")}</div>}
      {data && (
        <>
          <h2>{data.title}</h2>
          <img
            src={data.thumbnail}
            alt={data.title}
            style={{
              width: "100%",
              maxWidth: 400,
              borderRadius: 12,
              marginBottom: 16
            }}
          />
          <p>{data.description}</p>
          <p>
            <strong>{t("products.price")}:</strong> ${data.price}
          </p>
          <p>
            <strong>{t("products.rating")}:</strong> {data.rating}
          </p>
          <p>
            <strong>{t("products.category")}:</strong> {data.category}
          </p>
        </>
      )}
    </div>
  );
};

export default ProductDetailsPage;

