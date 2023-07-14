import { useMutation } from "@apollo/client";
import { useState } from "react";
import {
  addToCartQuery,
  fetchLineItemQuery,
  removeLineItemQuery,
} from "../graphQl/mutation/cartQuery";
import { destructData } from "../utils/productsUtil";

const useCart = () => {
  const [products, setProducts] = useState();
  const [loading, setLoading] = useState(true);

  const [addItemToCart] = useMutation(addToCartQuery);
  const [getCartItem] = useMutation(fetchLineItemQuery);
  const [removeLineItem] = useMutation(removeLineItemQuery);

  /**
   * To add an item to cart if the cart is already created and cart id is found else will
   * create cart and add product to the cart
   *
   * @param {{prod_id:String, qty:String, sku:String}}
   */
  const addToCart = async ({ prod_id, qty, sku }) => {
    try {
      const { data } = await addItemToCart({
        variables: {
          input: {
            cart_id: localStorage.getItem("cart_id"),
            quantity: parseInt(qty),
            sku: sku,
            version: parseInt(localStorage.getItem("cart_version")),
          },
        },
      });
      console.log(data);
      localStorage.setItem("cart_id", data?.addToCart.id);
      localStorage.setItem("cart_version", data?.addToCart.version);
      console.log(
        "🚀 ~ file: useCart.js:20 ~ addToCart ~ data.addToCart:",
        data
      );
    } catch (error) {
      console.log("🚀 ~ file: useCart.js:22 ~ addToCart ~ error:", error);
    }
  };

  /**
   * To Fetch line items based on the cart id
   */
  const getLineItems = async () => {
    try {
      const { data } = await getCartItem({
        variables: {
          cartId: localStorage.getItem("cart_id"),
        },
      });
      setLoading(false);
      setProducts(data.fetchCart);
    } catch (error) {
      console.log(error);
    }
  };

  /**
   * To remove an item from cart
   *
   */
  const removeItemFromCart = async (item_id) => {
    try {
      const data = await removeLineItem({
        variables: {
          input: {
            cart_id: localStorage.getItem("cart_id"),
            item_id: item_id,
            version: parseInt(localStorage.getItem("cart_version")),
          },
        },
      });
      console.log(
        "🚀 ~ file: useCart.js:80 ~ removeItemFromCart ~ data:",
        data
      );
    } catch (error) {
    console.log("🚀 ~ file: useCart.js:85 ~ removeItemFromCart ~ error:", error)
    }
  };

  return { addToCart, getLineItems, products, loading, removeItemFromCart };
};

export default useCart;
