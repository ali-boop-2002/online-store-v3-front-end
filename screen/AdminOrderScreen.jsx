import {
  useDeleteOrderByIdMutation,
  useEditOrderByIdMutation,
  useGetOrdersQuery,
} from "@/slices/orderApiSlice";
import LoadingSpinner from "@/Newcomponents/LoadingSpinner";
import Error from "@/Newcomponents/Error";
import { useState } from "react";
import { ToggleSlider } from "react-toggle-slider";
import Modal from "react-modal";
import { toast } from "react-toastify";
// import { data } from "react-router-dom";

function AdminOrderScreen() {
  const { data: getOrders, isLoading, isError } = useGetOrdersQuery();
  const [editOrderById, { isLoading: isSuccess, isError: error }] =
    useEditOrderByIdMutation();
  const [deleteOrderById] = useDeleteOrderByIdMutation();
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [secondModalIsOpen, setSecondModalIsOpen] = useState(false);
  console.log(getOrders);
  const [sort, setSort] = useState(false);
  const [falseIndex, setFalseIndex] = useState(0);
  const [orderDelivered, setOrderDelivered] = useState(null);
  const [falseAddress, setFalseAddress] = useState("");
  const [falseCity, setFalseCity] = useState("");
  const [falsePostalCode, setFalsePostalCode] = useState("");
  const [falsePaid, setFalsePaid] = useState(null);
  const [secondIndex, setSecondIndex] = useState(0);
  const [search, setSearch] = useState("");
  if (isLoading) return <LoadingSpinner />;
  if (isError) return <Error />;
  const extractOrder = getOrders.map((order) => order.orderItems);
  const handleEdit = (index) => {
    const selectedOrder = getOrders[index];
    setFalseAddress(selectedOrder.shippingAddress.address);
    setFalseCity(selectedOrder.shippingAddress.city);
    setFalsePostalCode(selectedOrder.shippingAddress.postalCode);
    setFalsePaid(selectedOrder.isPaid);
    setOrderDelivered(selectedOrder.isDelivered);
    setFalseIndex(index);
    setModalIsOpen(true);
  };
  const handleDelete = async (index) => {
    try {
      await deleteOrderById(getOrders[index]._id).unwrap();
      toast.success("Order deleted");
      setSecondModalIsOpen(false);
    } catch (error) {
      toast.error(error?.data?.message || error.error);
      setSecondModalIsOpen(false);
    }
  };

  const deliverHandler = async (index, status) => {
    try {
      await editOrderById({
        id: getOrders[index]._id,
        data: {
          ...getOrders[index],
          isDelivered: status,
        },
      }).unwrap();
      toast.success(
        status === true ? "Set to delivered" : "Set to not delivered"
      );
    } catch (error) {
      toast.error(error?.data?.message || error.error);
    }
  };
  const confirmPage = () => {
    handleDelete(secondIndex);
  };

  const submitHandler = async (index) => {
    try {
      await editOrderById({
        id: getOrders[index]._id,
        data: {
          ...getOrders[index],
          isDelivered: orderDelivered,
          shippingAddress: {
            ...getOrders[index].shippingAddress,
            address: falseAddress || getOrders[index].shippingAddress.address,
            city: falseCity || getOrders[index].shippingAddress.city,
            postalCode:
              falsePostalCode || getOrders[index].shippingAddress.postalCode,
          },
          isPaid: falsePaid ?? getOrders[index].isPaid,
        },
      }).unwrap();
      toast.success("order updated");
    } catch (error) {
      toast.error(error?.data?.message || error.error);
      console.error(error);
    }
  };
  return (
    <div className="p-8 h-screen overflow-auto">
      <h2 className="text-2xl font-semibold mb-6">All Orders</h2>
      <div className="bg-purple-300 flex flex-row justify-center rounded-2xl max-w-30 py-2 shadow-2xl m-5">
        <span className="mr-2">Sort</span>
        <ToggleSlider
          padding={5}
          handleSize={20}
          onToggle={(prev) => setSort(!prev)}
        />
      </div>
      <div className=" flex justify-center m-3">
        <input
          placeholder="search order"
          className="bg-gray-200 min-w-2xl rounded-2xl h-10"
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <div>
        {search.length > 0 &&
          getOrders
            .map((order, index) => ({ order, originalIndex: index }))
            .filter(({ order }) => order._id.includes(search))
            .map(({ order, originalIndex }) => (
              <div key={order._id} className="m-3 bg-blue-100 rounded-2xl">
                <div
                  key={order._id}
                  className=" mt-5 grid grid-cols-9 rounded-2xl0"
                >
                  <div className="col-span-1">
                    {order.orderItems.map((item, index) => (
                      <div key={index}>
                        <img
                          src={item.image}
                          className="w-25 h-20 m-2 rounded "
                        />
                      </div>
                    ))}
                  </div>
                  <div className=" items-center col-span-6 ">
                    {order.isDelivered ? (
                      <div className="bg-green-500 flex justify-center rounded-2xl min-w-150 m-2">
                        <span className="text-white">{order._id}</span>
                      </div>
                    ) : (
                      <div className="bg-red-500 flex justify-center rounded-2xl min-w-150 m-2">
                        <span className="text-white">{order._id}</span>
                      </div>
                    )}
                    {/* <div className="bg-red-500 flex justify-center rounded-2xl min-w-150 m-2">
                <span className="text-white">{order._id}</span>
              </div> */}
                    <div>
                      {order.orderItems.map((item, index) => (
                        <div key={index}>
                          <div className="mt-1 rounded">{item.name}</div>
                        </div>
                      ))}
                    </div>
                    <div>
                      <span>Address: </span>
                      <span className="font-bold">
                        {order?.shippingAddress.address}{" "}
                      </span>
                      <span>City: </span>
                      <span className="font-bold">
                        {" "}
                        {order.shippingAddress.city}{" "}
                      </span>
                      <span>Postal Code: </span>
                      <span className="font-bold">
                        {order.shippingAddress.postalCode}
                      </span>
                    </div>
                    <div>
                      <span>status: </span>
                      <span>
                        {order.isDelivered ? "Delivered" : "Not Delivered"}
                      </span>
                      <span> {order.isPaid ? "Paid" : "Not Paid"}</span>
                      <span>
                        {" "}
                        {order.shippingPrice > 10
                          ? "Express"
                          : "Normal Shipping"}
                      </span>
                    </div>
                    <div>
                      <span>User status: </span>
                      <span>Name </span>
                      <span>{order.user.name}</span>
                      <span> Email </span>
                      <span>{order.user.email}</span>
                    </div>
                  </div>
                  <div className=" col-span-2">
                    <div className="flex flex-col">
                      <button
                        onClick={() => {
                          deliverHandler(originalIndex, true);
                        }}
                        className="bg-blue-300 p-3 rounded-4xl shadow-2xl m-1 hover:cursor-pointer"
                      >
                        Order Delivered
                      </button>
                      <button
                        onClick={() => {
                          deliverHandler(originalIndex, false);
                        }}
                        className="bg-red-300 p-3 rounded-4xl shadow-2xl m-1 hover:cursor-pointer"
                      >
                        Order Not Delivered
                      </button>
                      <button
                        className="bg-blue-300 p-3 rounded-4xl shadow-2xl m-1 hover:cursor-pointer"
                        onClick={() => handleEdit(originalIndex)}
                      >
                        Edit Order
                      </button>
                      <button
                        onClick={() => {
                          setSecondIndex(originalIndex);
                          setSecondModalIsOpen(true);
                        }}
                        className="bg-red-700 p-3 rounded-4xl shadow-2xl m-1 hover:cursor-pointer"
                      >
                        Delete Order
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
      </div>
      {sort ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {getOrders?.map((order) => (
            <div key={order._id} className="shadow-md rounded-lg p-4 border">
              <div className="mb-2">
                <span className="font-semibold ">Order ID:</span> {order._id}
              </div>
              <div className="mb-2">
                <span className="font-semibold">User:</span> {order.user?.name}{" "}
                ({order.user?.email})
              </div>
              <div className="mb-2">
                <span className="font-semibold">Total:</span> $
                {order.totalPrice?.toFixed(2)}
              </div>
              <div className="mb-2">
                <span className="font-semibold">Paid:</span>{" "}
                {order.isPaid ? (
                  <span className="text-green-600">Yes</span>
                ) : (
                  <span className="text-red-600">No</span>
                )}
              </div>
              <div className="mb-2">
                <span className="font-semibold">Delivered:</span>{" "}
                {order.isDelivered ? (
                  <span className="text-green-600">Yes</span>
                ) : (
                  <span className="text-red-600">No</span>
                )}
              </div>

              <div className="mt-4">
                <h3 className="font-semibold mb-1">Items:</h3>
                <ul className="list-disc ml-5 text-sm">
                  {order.orderItems.map((item, index) => (
                    <li key={index}>
                      {item.qty} x {item.name} (${item.price})
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div>
          {getOrders?.map((order, index) => (
            <div key={order._id} className=" mt-5 grid grid-cols-9 rounded-2xl">
              <div className="col-span-1">
                {order.orderItems.map((item, index) => (
                  <div key={index}>
                    <img src={item.image} className="w-25 h-20 m-2 rounded " />
                  </div>
                ))}
              </div>
              <div className="bg-amber-200items-center col-span-6 ">
                {order.isDelivered ? (
                  <div className="bg-green-500 flex justify-center rounded-2xl min-w-150 m-2">
                    <span className="text-white">{order._id}</span>
                  </div>
                ) : (
                  <div className="bg-red-500 flex justify-center rounded-2xl min-w-150 m-2">
                    <span className="text-white">{order._id}</span>
                  </div>
                )}
                {/* <div className="bg-red-500 flex justify-center rounded-2xl min-w-150 m-2">
                  <span className="text-white">{order._id}</span>
                </div> */}
                <div>
                  {order.orderItems.map((item, index) => (
                    <div key={index}>
                      <div className="mt-1 rounded">{item.name}</div>
                    </div>
                  ))}
                </div>
                <div>
                  <span>Address: </span>
                  <span className="font-bold">
                    {order?.shippingAddress.address}{" "}
                  </span>
                  <span>City: </span>
                  <span className="font-bold">
                    {" "}
                    {order.shippingAddress.city}{" "}
                  </span>
                  <span>Postal Code: </span>
                  <span className="font-bold">
                    {order.shippingAddress.postalCode}
                  </span>
                </div>
                <div>
                  <span>status: </span>
                  <span>
                    {order.isDelivered ? "Delivered" : "Not Delivered"}
                  </span>
                  <span> {order.isPaid ? "Paid" : "Not Paid"}</span>
                  <span>
                    {" "}
                    {order.shippingPrice > 10 ? "Express" : "Normal Shipping"}
                  </span>
                </div>
                <div>
                  <span>User status: </span>
                  <span>Name </span>
                  <span>{order.user.name}</span>
                  <span> Email </span>
                  <span>{order.user.email}</span>
                </div>
              </div>
              <div className=" col-span-2">
                <div className="flex flex-col">
                  <button
                    onClick={() => {
                      deliverHandler(index, true);
                    }}
                    className="bg-blue-300 p-3 rounded-4xl shadow-2xl m-1 hover:cursor-pointer"
                  >
                    Order Delivered
                  </button>
                  <button
                    onClick={() => {
                      deliverHandler(index, false);
                    }}
                    className="bg-red-300 p-3 rounded-4xl shadow-2xl m-1 hover:cursor-pointer"
                  >
                    Order Not Delivered
                  </button>
                  <button
                    className="bg-blue-300 p-3 rounded-4xl shadow-2xl m-1 hover:cursor-pointer"
                    onClick={() => handleEdit(index)}
                  >
                    Edit Order
                  </button>
                  <button
                    onClick={() => {
                      setSecondIndex(index);
                      setSecondModalIsOpen(true);
                    }}
                    className="bg-red-700 p-3 rounded-4xl shadow-2xl m-1 hover:cursor-pointer"
                  >
                    Delete Order
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      <div>
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={() => setModalIsOpen(false)}
          contentLabel="Write Review Modal"
          className="bg-white p-6 rounded-xl shadow-lg w-120 mx-auto mt-32"
          overlayClassName="fixed inset-0  bg-opacity-50 flex items-center justify-center"
        >
          <form
            onSubmit={(e) => {
              e.preventDefault(); // Prevent default form submission
              setModalIsOpen(false); // Close modal
            }}
          >
            <h2 className="text-xl font-bold mb-4">
              {getOrders[falseIndex]._id}
            </h2>
            <div>
              Order Items
              {extractOrder[falseIndex]?.flat(1).map((order, index) => (
                <div key={index} className="m-2 ">
                  <textarea
                    value={order.name}
                    type="text"
                    className="bg-gray-200 p-3 rounded w-100 h-20"
                  />
                </div>
              ))}
            </div>
            <div className=" flex flex-row items-center">
              <span>Address: </span>
              <textarea
                value={falseAddress}
                onChange={(e) => setFalseAddress(e.target.value)}
              />
              <span>City: </span>
              <textarea
                className=""
                onChange={(e) => setFalseCity(e.target.value)}
                value={falseCity}
              />
              <span>postal code: </span>
              <textarea
                className=""
                onChange={(e) => setFalsePostalCode(e.target.value)}
                value={falsePostalCode}
              />
            </div>
            <div>
              <span>Status: </span>
              <span>
                {" "}
                {getOrders[falseIndex].isPaid ? "Paid" : "Not paid"}{" "}
              </span>
              <select
                className="bg-gray-200"
                value={falsePaid}
                onChange={(e) => setFalsePaid(e.target.value === "true")}
              >
                <option>Null</option>
                <option value={true}>Paid?</option>
                <option value={false}>Not Paid?</option>
              </select>
              <span>
                {getOrders[falseIndex].isDelivered
                  ? "Delivered"
                  : "Not Delivered"}
              </span>
              <select
                className="bg-gray-200"
                value={orderDelivered}
                onChange={(e) => setOrderDelivered(e.target.value === "true")}
              >
                <option value={null}>Null</option>
                <option value={true}>Delivered?</option>
                <option value={false}>Not Delivered?</option>
              </select>
            </div>
            <button className="bg-green-400 p-2 rounded m-2 hover:cursor-pointer">
              Mark order as delivered
            </button>
            <button className="bg-red-400 p-2 rounded m-2 hover:cursor-pointer">
              Mark order as lost
            </button>
            <button className="bg-yellow-400 p-2 rounded m-2 hover:cursor-pointer">
              Mark order as not delivered
            </button>
            <button className="bg-red-700 p-2 rounded m-2 hover:cursor-pointer">
              Delete Order
            </button>
            <div className="flex justify-end gap-2">
              <button
                className="px-4 py-2 bg-gray-200 rounded hover:cursor-pointer m-2"
                onClick={() => setModalIsOpen(false)}
              >
                Cancel
              </button>
              <button
                onClick={() => submitHandler(falseIndex)}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:cursor-pointer m-2"
              >
                Confirm Changes
              </button>
            </div>
          </form>
        </Modal>
      </div>

      <div>
        <Modal
          isOpen={secondModalIsOpen}
          onRequestClose={() => setSecondModalIsOpen(false)}
          contentLabel="Write Review Modal"
          className="bg-white p-6 rounded-xl shadow-lg w-120 mx-auto mt-32"
          overlayClassName="fixed inset-0  bg-opacity-50 flex items-center justify-center"
        >
          <form
            onSubmit={(e) => {
              e.preventDefault(); // Prevent default form submission
              setModalIsOpen(false); // Close modal
            }}
          >
            <h1>Are you sure you want to delete this order</h1>
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setSecondModalIsOpen(false)}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:cursor-pointer m-2"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  confirmPage();
                }}
                className="px-4 py-2 bg-red-500 text-white rounded hover:cursor-pointer m-2"
              >
                Yes
              </button>
            </div>
          </form>
        </Modal>
      </div>
    </div>
  );
}

export default AdminOrderScreen;
