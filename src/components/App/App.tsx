import React, { useEffect, useState } from "react";
import "./App.css";
import Cart from "../Cart/Cart";
import Counter from "../Counter/Counter";
import Products from "../Products/Products";
import axios from "axios";
import { IProduct, ICart } from "./App.types";
import { IProducts, IGroups } from "../Products/Products.types";

const CURRENT_EXCHANGE = 90;

function App() {
  const [products, setProducts] = useState<IProducts>({});
  const [names, setNames] = useState<IGroups>({});
  const savedCart = localStorage.getItem("cart");
  const [cart, setCart] = useState<ICart>(
    savedCart ? JSON.parse(savedCart) : {}
  );
  const [exchange, setExchange] = useState(CURRENT_EXCHANGE);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const productsResponse = await axios.get("/products.json");
        const namesResponse = await axios.get("/names.json");

        const data = productsResponse.data.Value.Goods.reduce(
          (acc: IProducts, item: IProduct) => {
            acc[item.T] = item;
            return acc;
          },
          {}
        );
        setProducts(data);
        setNames(namesResponse.data);
      } catch (error) {
        console.log("Ошибка:", error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const poller = setInterval(() => {
      const newExchange = Math.floor(Math.random() * (80 - 50 + 1)) + 50;
      setExchange(newExchange);
    }, 20000);

    return () => clearInterval(poller);
  }, []);

  return (
    <div className="App">
      <Counter exchange={exchange} />
      <div className="MainContentWrapper">
        <Products
          products={products}
          names={names}
          setCart={setCart}
          cart={cart}
          exchange={exchange}
          setProducts={setProducts}
        />
        <Cart
          cart={cart}
          products={products}
          names={names}
          exchange={exchange}
        />
      </div>
    </div>
  );
}

export default App;
