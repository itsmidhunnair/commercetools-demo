import { useCallback, useState } from "react";

const useMenuHandling = () => {
  const [menu, setMenu] = useState(false);
  const [cart, setCart] = useState(false);

  if (cart) {
    document.body.style.overflow = "hidden";
  } else {
    document.body.style.overflow = "auto";
  }

  /**
   * Toggle Mini Cart
   */
  const toggleMiniCart = useCallback(() => {
    setCart(!cart);
  }, [cart]);

  /**
   * Toggle Mobile Menu
   */
  const toggleMenu = useCallback(() => {
    setMenu(!menu);
  }, [menu]);

  return { menu, cart, toggleMenu, toggleMiniCart };
};

export default useMenuHandling;
