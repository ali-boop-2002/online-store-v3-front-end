import { useState } from "react";
import ProductEditCard from "./ProductEditCard";

function ProductLayoutToggle({ products }) {
  const [layout, setLayout] = useState("grid"); // 'grid' or 'column'

  const handleLayoutChange = (e) => {
    setLayout(e.target.value);
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Manage Products</h2>

        <select
          value={layout}
          onChange={handleLayoutChange}
          className="border border-gray-300 rounded px-3 py-1 hover:cursor-pointer"
        >
          <option value="grid" className="hover:cursor-pointer">
            Grid
          </option>
          <option value="column" className="hover:cursor-pointer">
            Column
          </option>
        </select>
      </div>

      <div
        className={
          layout === "grid"
            ? "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6"
            : "flex flex-col gap-6"
        }
      >
        {products.map((product) => (
          <ProductEditCard key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
}

export default ProductLayoutToggle;
