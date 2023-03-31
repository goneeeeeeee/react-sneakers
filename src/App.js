import Card from "./components/Card";
import Header from "./components/Header";
import Drawer from "./components/Drawer";
import React from "react";
import axios from "axios";

function App() {
  const [cartOpened, setCartOpened] = React.useState(false);
  const [items, setItems] = React.useState([]);
  const [cartItems, setCartItems] = React.useState([]);
  const [searchValue, setSearchValue] = React.useState("");

  React.useEffect(() => {
    axios
      .get(`https://642468ad9e0a30d92b1b3f07.mockapi.io/items`)
      .then((res) => {
        setItems(res.data);
      });
    axios
      .get(`https://642468ad9e0a30d92b1b3f07.mockapi.io/cart`)
      .then((res) => {
        setCartItems(res.data);
      });
  }, []);

  const onAddToCart = (obj) => {
    axios.post(`https://642468ad9e0a30d92b1b3f07.mockapi.io/cart`, obj);
    setCartItems((prev) => [...prev, obj]);
  };
  const onRemoveToCart = (id) => {
    console.log(id);
    axios.delete(`https://642468ad9e0a30d92b1b3f07.mockapi.io/cart/${id}`);
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };
  const onChangeSearch = (event) => {
    setSearchValue(event.target.value);
  };

  return (
    <div className="wrapper">
      {cartOpened && (
        <Drawer
          items={cartItems}
          onClickClose={() => setCartOpened(!cartOpened)}
          onRemove={onRemoveToCart}
        />
      )}
      <Header onClickCard={() => setCartOpened(!cartOpened)} />
      <div className="content">
        <div className="all-sneakers">
          <h1>
            {searchValue ? `Поиск по запросу: ${searchValue}` : "Все кроссовки"}
          </h1>
          <div className="search-block">
            <img src="/img/icons/search.svg" alt="Search" />
            {searchValue && (
              <img
                onClick={() => setSearchValue("")}
                className="clear"
                src="/img/icons/button-remove.svg"
                alt="Clear"
              />
            )}
            <input
              onChange={onChangeSearch}
              value={searchValue}
              placeholder="Поиск..."
            />
          </div>
        </div>
        <div className="sneakers">
          {items
            .filter((item) => item.title.toLowerCase().includes(searchValue))
            .map((item, index) => (
              <Card
                key={index}
                title={item.title}
                price={item.price}
                imageUrl={item.imageUrl}
                onPlus={(item) => onAddToCart(item)}
                onFavorite={() => console.log()}
              />
            ))}
        </div>
      </div>
    </div>
  );
}

export default App;
