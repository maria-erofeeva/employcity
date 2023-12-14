import React, { useEffect, useRef } from "react";
import "./Products.css";
import { IProducts, IGroups } from "./Products.types";
import { ICart } from "../App/App.types";

export interface IProps {
  products: IProducts;
  names: IGroups;
  exchange: number;
  cart: ICart;
  setCart: (item: any) => void;
  setProducts: (item: any) => void;
}

function Products(props: IProps) {
  const { products, names, exchange, cart, setCart, setProducts } = props;

  function usePrevious(value: number) {
    const ref = useRef<number | undefined>();

    useEffect(() => {
      ref.current = value;
    }, [value]);

    return ref.current;
  }

  const prevExchangeRate = usePrevious(exchange);

  const getPriceColor = (productId: string) => {
    const currentPrice = products[productId].C * exchange;
    const prevPrice = products[productId].C * (prevExchangeRate || exchange);
    if (currentPrice > prevPrice) {
      return "red";
    } else if (currentPrice < prevPrice) {
      return "green";
    } else {
      return "black";
    }
  };

  const addToCart = (productId: string) => {
    if (!products[productId] || products[productId].P <= 0) return;

    setCart((prevCart: ICart) => ({
      ...prevCart,
      [productId]: (prevCart[productId] || 0) + 1,
    }));

    setProducts((prevProducts: IProducts) => ({
      ...prevProducts,
      [productId]: { ...products[productId], P: products[productId].P - 1 },
    }));
  };

  const removeFromCart = (productId: string) => {
    const product = products[productId];
    const cartQuantity = cart[productId];

    if (!product || cartQuantity <= 0) return;

    setCart((prevCart: ICart) => {
      const newCart = { ...prevCart };
      if (cartQuantity > 1) {
        newCart[productId] = cartQuantity - 1;
      } else {
        delete newCart[productId];
      }
      return newCart;
    });

    setProducts((prevProducts: IProducts) => ({
      ...prevProducts,
      [productId]: { ...product, P: product.P + 1 },
    }));
  };

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  return (
    <div>
      <h2 className="ListHeader">Список товаров</h2>
      <ul className="ListUl">
        {Object.keys(products).map((productId) => {
          const product = products[productId];
          const groupName = names[product.G]?.G;
          const productName = names[product.G]?.B[productId]?.N;
          const currentPrice = Math.floor(product.C * exchange);
          const priceColor = getPriceColor(productId);

          return (
            <li className="ListLi" key={productId}>
              <p className="Group">{groupName}:</p>
              <p>{productName}</p>
              <p style={{ color: priceColor }}>Цена: {currentPrice}</p>
              <p>Количество: {product.P}</p>
              <div>
                <button onClick={() => addToCart(productId)}>Добавить</button>
                <button onClick={() => removeFromCart(productId)}>
                  Удалить
                </button>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default Products;
