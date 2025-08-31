import Error from "@/Newcomponents/Error";
import LoadingSpinner from "../Newcomponents/LoadingSpinner";
import Product from "../Newcomponents/Product";
import ProductCarousel from "../Newcomponents/ProductCouresel";
import { useGetProductsQuery } from "../slices/productApiSlice";

function HomeScreen() {
  const { data: products, isLoading, error } = useGetProductsQuery();

  if (isLoading) {
    return (
      <div className="text-center text-lg py-10">
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    console.log(error);
    return <Error />;
  }

  return (
    <div className="min-w-screen min-h-screen bg-white mx-auto px-4 py-8 ">
      <ProductCarousel />

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-5">
        {products.map((product) => (
          <Product product={product} key={product._id} />
        ))}
      </div>
    </div>
  );
}

export default HomeScreen;
