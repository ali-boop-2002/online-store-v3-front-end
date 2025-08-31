function UserCartProductCard({ product, onRemove, onIncrease, onDecrease }) {
  return (
    <div className="flex items-center justify-around space-x-4 p-4 bg-gray-200 md:rounded-lg w-full sm:max-w-2xl shadow-md mb-4">
      <img
        src={product.image}
        alt={product.name}
        className="w-24 h-24 object-cover rounded-lg "
      />

      <div className="flex flex-col ">
        <h2 className="md:text-lg hidden md:block md:font-semibold">
          {product.name.length > 80
            ? product.name.slice(0, 80) + "..."
            : product.name}
        </h2>
        <h2 className="md:text-lg block md:hidden md:font-semibold">
          {product.name.slice(0, 30)}...
        </h2>
        <p className="text-gray-600">Price: ${product.price}</p>
        {product.countInStock > 0 ? (
          <p className="text-green-700">In Stock</p>
        ) : (
          <p className="text-red-700">Out of Stock</p>
        )}
      </div>

      <div className="flex flex-col gap-2 ">
        <button
          onClick={() => onRemove(product._id)}
          className="text-sm bg-red-500 hover:cursor-pointer text-white px-3 py-1 rounded hover:bg-red-600"
        >
          Remove
        </button>
        <span className="flex gap-2  justify-center items-center">
          <button
            onClick={() => onIncrease(product._id)}
            className="w-8 h-8 bg-blue-300 rounded-full text-lg font-bold hover:bg-blue-500 hover:cursor-pointer"
          >
            +
          </button>
          <span className=" w-3 flex justify-center items-center">
            {product.qty}
          </span>

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
