import Header from "./components/Header";
import { Route, Routes } from "react-router-dom";
import Drawer from "./components/Drawer";
import Home from "./pages/Home";
import Favorites from "./pages/Favorites";
import React from "react";
import axios from "axios";
import AppContext from "./context";

function App() {
  const [cartOpened, setCartOpened] = React.useState(false);
  const [items, setItems] = React.useState([]);
  const [cartItems, setCartItems] = React.useState([]);
  const [favoriteItems, setFavoriteItems] = React.useState([]);
  const [searchValue, setSearchValue] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    async function fetchData() {
      const cartResponse = await axios.get(
        `https://642468ad9e0a30d92b1b3f07.mockapi.io/cart`
      );
      const favoritesResponse = await axios.get(
        `https://642ac259b11efeb759a20c8e.mockapi.io/favorites`
      );
      const itemsResponse = await axios.get(
        `https://642468ad9e0a30d92b1b3f07.mockapi.io/items`
      );

      setIsLoading(false);
      setCartItems(cartResponse.data);
      setFavoriteItems(favoritesResponse.data);
      setItems(itemsResponse.data);
    }

    fetchData();
  }, []);

  const onAddToCart = async (obj) => {
    try {
      const findItem = cartItems.find(
        (item) => Number(item.parentId) === Number(obj.id)
      );
      if (findItem) {
        setCartItems((prev) =>
          prev.filter((item) => Number(item.parentId) !== Number(obj.id))
        );
        await axios.delete(
          `https://642468ad9e0a30d92b1b3f07.mockapi.io/cart/${findItem.id}`
        );
      } else {
        setCartItems((prev) => [...prev, obj]);
        const { data } = await axios.post(
          "https://642468ad9e0a30d92b1b3f07.mockapi.io/cart",
          obj
        );
        setCartItems((prev) =>
          prev.map((item) => {
            if (item.parentId === data.parentId) {
              return {
                ...item,
                id: data.id,
              };
            }
            return item;
          })
        );
      }
    } catch (error) {
      alert("Ошибка при добавлении в корзину");
      console.error(error);
    }
  };

  const onRemoveToCart = (id) => {
    try {
      axios.delete(`https://642468ad9e0a30d92b1b3f07.mockapi.io/cart/${id}`);
      setCartItems((prev) =>
        prev.filter((item) => Number(item.id) !== Number(id))
      );
    } catch (error) {
      alert("Ошибка при удалении из корзины");
      console.error(error);
    }
  };
  const onChangeSearch = (event) => {
    setSearchValue(event.target.value);
  };

  const onAddFavorite = async (obj) => {
    try {
      if (favoriteItems.find((favobj) => favobj.id === obj.id)) {
        axios.delete(
          `https://642ac259b11efeb759a20c8e.mockapi.io/favorites/${obj.id}`
        );
        setFavoriteItems((prev) =>
          prev.filter((item) => Number(item.id) !== Number(obj.id))
        );
      } else {
        const { data } = await axios.post(
          `https://642ac259b11efeb759a20c8e.mockapi.io/favorites`,
          obj
        );
        setFavoriteItems((prev) => [...prev, data]);
      }
    } catch (error) {
      alert("Не удалось добавить в фавориты.");
    }
  };

  return (
    <AppContext.Provider
      value={{ items, cartItems, favoriteItems, setCartOpened }}
    >
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
                isLoading={isLoading}
              />
            }
          />
          <Route
            path="/favorites"
            element={<Favorites onAddFavorite={onAddFavorite} />}
          ></Route>
        </Routes>
      </div>
    </AppContext.Provider>
  );
}

export default App;
