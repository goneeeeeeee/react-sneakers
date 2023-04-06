import Header from "./components/Header";
import { Route, Routes } from "react-router-dom";
import Drawer from "./components/Drawer";
import Home from "./pages/Home";
import Favorites from "./pages/Favorites";
import React from "react";
import axios from "axios";

function App() {
  const [cartOpened, setCartOpened] = React.useState(false);
  const [items, setItems] = React.useState([]);
  const [cartItems, setCartItems] = React.useState([]);
  const [favoriteItems, setFavoriteItems] = React.useState([]);
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
    axios
      .get(`https://642ac259b11efeb759a20c8e.mockapi.io/favorites`)
      .then((res) => {
        setFavoriteItems(res.data);
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

  const onAddFavorite = async (obj) => {
    if (favoriteItems.find((favobj) => favobj.id === obj.id)) {
      axios.delete(
        `https://642ac259b11efeb759a20c8e.mockapi.io/favorites/${obj.id}`
      );
    } else {
      const { data } = await axios.post(
        `https://642ac259b11efeb759a20c8e.mockapi.io/favorites`,
        obj
      );
      setFavoriteItems((prev) => [...prev, data]);
    }
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
      <Routes>
        <Route
          path="/"
          element={
            <Home
              items={items}
              searchValue={searchValue}
              setSearchValue={setSearchValue}
              onChangeSearch={onChangeSearch}
              onAddFavorite={onAddFavorite}
              onAddToCart={onAddToCart}
            />
          }
        />
        <Route
          path="/favorites"
          element={
            <Favorites items={favoriteItems} onAddFavorite={onAddFavorite} />
          }
        ></Route>
      </Routes>
    </div>
  );
}

export default App;
