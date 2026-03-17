type Product = {
  id: string;
  name: string;
  priceRub: number;
};

const PRODUCTS: Product[] = [
  { id: "p1", name: "Футболка", priceRub: 1290 },
  { id: "p2", name: "Худи", priceRub: 3490 },
  { id: "p3", name: "Кепка", priceRub: 990 },
];

export function ProductList() {
  return (
    <main>
      <h2>Товары</h2>
      <ul>
        {PRODUCTS.map((p) => (
          <li key={p.id}>
            <span>{p.name}</span> — <strong>{p.priceRub} ₽</strong>
          </li>
        ))}
      </ul>
    </main>
  );
}

