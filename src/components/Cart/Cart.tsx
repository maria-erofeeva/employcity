import React from "react";
import "./Cart.css";
import { IGroups, IProducts } from "../Products/Products.types";

interface IProps {
  cart: { [productId: string]: number };
  products: IProducts;
  names: IGroups;
  exchange: number;
}

function Cart({ cart, products, names, exchange }: IProps) {
  let total = 0;

  Object.keys(cart).forEach((productId) => {
    if (products[productId]) {
      total += products[productId].C * exchange * cart[productId];
    }
  });

  return (
    <div className="Cart">
      <div className="CartHeaderWrapper">
        <h2 className="CartHeader">Корзина</h2>
        <p className="Total">Итоговая сумма: {total}</p>
      </div>
      <ul>
        {Object.keys(cart).map((productId) => {
          const product = products[productId];
          const productName = names[product?.G]?.B[productId]?.N;
          return (
            <li key={productId}>
              {productName}: {cart[productId]} шт.
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default Cart;
