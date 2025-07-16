function UserCartProductCard({ product, onRemove, onIncrease, onDecrease }) {
  console.log(product);
  return (
    <div className="flex items-center gap-4 p-4 bg-gray-100 rounded-lg shadow-md mb-4">
      <img
        src={product.image}
        alt={product.name}
        className="w-24 h-24 object-cover rounded-lg"
      />

      <div className="flex-1">
        <h2 className="text-lg font-semibold">
          {product.name.length > 80
            ? product.name.slice(0, 80) + "..."
            : product.name}
        </h2>
        <p className="text-gray-600">Price: ${product.price}</p>
        {product.countInStock > 0 ? (
          <p className="text-green-700">In Stock</p>
        ) : (
          <p className="text-red-700">Out of Stock</p>
        )}
      </div>

      <div className="flex flex-col gap-2">
        <button
          onClick={() => onRemove(product._id)}
          className="text-sm bg-red-500 hover:cursor-pointer text-white px-3 py-1 rounded hover:bg-red-600"
        >
          Remove
        </button>
        <span className="flex gap-2">
          <button
            onClick={() => onIncrease(product._id)}
            className="w-8 h-8 bg-blue-300 rounded-full text-lg font-bold hover:bg-blue-500 hover:cursor-pointer"
          >
            +
          </button>
          {product.qty}
          <button
            onClick={() => onDecrease(product._id)}
            className="w-8 h-8 bg-blue-300 rounded-full text-lg font-bold hover:bg-blue-500 hover:cursor-pointer"
          >
            -
          </button>
        </span>
      </div>
    </div>
  );
}

export default UserCartProductCard;
