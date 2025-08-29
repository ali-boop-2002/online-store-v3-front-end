import { Link, useParams } from "react-router-dom";
import { useGetProductsQuery } from "../slices/productApiSlice";
import { useGetProductByIdQuery } from "../slices/productApiSlice";

function RelatedProducts() {
  const { id } = useParams();

  const {
    data: products,
    isLoading: loadingProducts,
    error: errorProducts,
  } = useGetProductsQuery();

  const {
    data: currentProduct,
    isLoading: loadingCurrent,
    error: errorCurrent,
  } = useGetProductByIdQuery(id);

  if (loadingProducts || loadingCurrent) return <p>Loading...</p>;
  if (errorProducts || errorCurrent) return <p>Error loading products.</p>;
  if (!products || !currentProduct) return <p>No products found.</p>;

  // ✅ Filter related products
  const relatedProducts = products.filter(
    (product) => product.category === currentProduct.category
  );

  return (
    <div className="p-6 bg-blue-100">
      <h1 className="text-lg md:text-3xl font-bold mb-4 text-center">
        Related Products
      </h1>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 ">
        {relatedProducts.map((product) => (
          <div
            key={product._id}
            className="border p-4 rounded shadow bg-white transform transition-transform duration-300 hover:scale-105 cursor-pointer"
          >
            <Link to={`/product/${product._id}`}>
              <img
                src={product.image[0]}
                alt={product.name}
                className="w-full h-40 object-contain mb-2"
              />
              <h3 className="hidden md:block md:text-lg font-semibold">
                {product.name.slice(0, 120)}...
              </h3>
              <h3 className="sm:hidden block md:text-lg font-semibold">
                {product.name.slice(0, 40)}...
              </h3>
              <p className="text-green-600 font-bold">${product.price}</p>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default RelatedProducts;
