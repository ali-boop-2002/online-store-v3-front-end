import Product from "@/Newcomponents/Product";
import ProductEditCard from "@/Newcomponents/ProductEditCard";
import { useGetProductsQuery } from "../slices/productApiSlice";

function ProductEdit() {
  const { data: products } = useGetProductsQuery();

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-5">
        {products.map((product) => (
          <ProductEditCard product={product} key={product._id} />
        ))}
      </div>
    </div>
  );
}

export default ProductEdit;
