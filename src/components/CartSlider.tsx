/* eslint-disable @typescript-eslint/no-non-null-assertion */
import {
  AiFillDelete,
  AiOutlineClose,
  AiOutlineMinusCircle,
  AiOutlinePlusSquare,
} from "react-icons/ai";

import { toast } from "react-hot-toast";
import {
  addToCart,
  removeFromCart,
  removeOne,
} from "../redux/features/cart/cartSlice";
import { useAppDispatch, useAppSelector } from "../redux/hook";
import { IBook } from "../types/bookTypes";

const CartSlider = ({ onClose }: any) => {
  const handleClose = () => {
    onClose();
  };

  const { book, total } = useAppSelector((state) => state.cart);
  const dispatch = useAppDispatch();
  const cartData = book;

  const totalQuantity = () => {
    let totalQuantity = 0;
    cartData.forEach((book) => {
      totalQuantity += book.quantity;
    });

    return totalQuantity;
  };

  const handleRemoveBookFromCart = (book: IBook) => {
    dispatch(removeFromCart(book));
    toast.success("Book Delete From Cart!!");
  };

  return (
    <div className="p-2 shadow-xl">
      <button onClick={handleClose} className="text-xl btn-outline">
        <AiOutlineClose />
      </button>
      <h2 className="text-red-500 text-sm">Total Items: {totalQuantity()}</h2>
      <div className=" mt-4 gap-5">
        <h1 className="font-bold text-cyan-700">Total: {total?.toFixed(2)}</h1>
        {cartData &&
          cartData?.map((cart: IBook) => (
            <div key={cart._id} className="border-b-2 border-sky-500 p-5">
              <div className="border-r pr-20 shrink-0">
                <img src={cart?.bookImage} alt="" className="h-full" />
              </div>
              <p className="text-cyan-700 font-bold "> {cart?.title}</p>
              <p className=" font-bold ">
                {" "}
                price: {(cart.price * cart.quantity!).toFixed(2)}$
              </p>
              <p>Quantity: {cart.quantity}</p>
              <button
                onClick={() => dispatch(addToCart(cart))}
                className="text-2xl btn-outline mr-5"
              >
                <AiOutlinePlusSquare />
              </button>

              <button
                onClick={() => dispatch(removeOne(cart))}
                className="text-2xl btn-outline ml-5"
              >
                <AiOutlineMinusCircle />
              </button>

              <button
                onClick={() => handleRemoveBookFromCart(cart)}
                className="text-2xl btn-outline ml-10"
              >
                <AiFillDelete />
              </button>
            </div>
          ))}

        <p className="text-xl font-bold text-blue-600"></p>
      </div>
    </div>
  );
};

export default CartSlider;
