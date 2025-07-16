import { useGetProductsQuery } from "@/slices/productApiSlice";
import ProductLayoutToggle from "../Newcomponents/ProductLayoutToggle";
import LoadingSpinner from "../Newcomponents/LoadingSpinner";

function AdminProductPage() {
  const { data: products, isLoading, error } = useGetProductsQuery();

  if (isLoading) return <LoadingSpinner />;

  if (error) {
    return (
      <p className="text-center text-red-600 mt-10">Failed to load products</p>
    );
  }

  return <ProductLayoutToggle products={products} />;
}

export default AdminProductPage;
