import { useMutation } from "@apollo/client";
import { useState } from "react";
import {
  addToCartQuery,
  fetchLineItemQuery,
  removeLineItemQuery,
  updateLineItemQtyQuery,
} from "../graphQl/mutation/cartQuery";
import { debounce } from "lodash";
import { useContext } from "react";
import { CartContext } from "../context/cart/cartContext";

const useCart = () => {
  // const [cartItem, setCartItem] = useState();
  const { cartItem, setCartItem } = useContext(CartContext);
  const [loading, setLoading] = useState(true);

  const [addItemToCart] = useMutation(addToCartQuery);
  const [getCartItem] = useMutation(fetchLineItemQuery);
  const [removeLineItem] = useMutation(removeLineItemQuery);
  const [updateQty] = useMutation(updateLineItemQtyQuery);

  /**
   * To add an item to cart if the cart is already created and cart id is found else will
   * create cart and add product to the cart
   *
   * @param {{prod_id:String, qty:String, sku:String}}
   */
  const addToCart = async ({ qty, sku }) => {
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
      localStorage.setItem("anonymous_id", data?.addToCart.anonymousId);
      setCartItem(data.addToCart);
    } catch (error) {}
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
      setCartItem(data.fetchCart);
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
      const { data } = await removeLineItem({
        variables: {
          input: {
            cart_id: localStorage.getItem("cart_id"),
            item_id: item_id,
            version: parseInt(localStorage.getItem("cart_version")),
          },
        },
      });
      localStorage.setItem("cart_version", data?.deleteFromCart.version);
      localStorage.setItem("cart_id", data?.deleteFromCart.id);
      localStorage.setItem("anonymous_id", data?.deleteFromCart.anonymousId);
      setCartItem(data?.deleteFromCart);
    } catch (error) {}
  };

  /**
   * To update Line item quantity
   * @param {{item_id:String, qty:String}}
   */
  const updateLineItemQty = async ({ item_id, qty }) => {
    if (qty.target.value > 25) {
      qty.target.value = 25;
    }
    if (qty.target.value === "") {
      qty.target.value = 1;
    }
    if (item_id && qty !== "") {
      try {
        const { data } = await updateQty({
          variables: {
            input: {
              cart_id: localStorage.getItem("cart_id"),
              item_id: item_id,
              version: parseInt(localStorage.getItem("cart_version")),
              quantity: parseInt(qty.target.value),
            },
          },
        });
        localStorage.setItem("cart_version", data?.updateItemQty.version);
        localStorage.setItem("cart_id", data?.updateItemQty.id);
        localStorage.setItem("anonymous_id", data?.updateItemQty.anonymousId);
        setCartItem(data?.updateItemQty);
      } catch (error) {}
    }
  };

  /**
   * Handle line item quantity input change
   * @param {{item_id:String, qty:String}}
   */
  const handleQtyChange = debounce(updateLineItemQty, 500);

  return {
    addToCart,
    getLineItems,
    cartItem,
    loading,
    handleQtyChange,
    removeItemFromCart,
  };
};

export default useCart;
