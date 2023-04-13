import Header from "./components/Header";
import { Route, Routes } from "react-router-dom";
import Drawer from "./components/Drawer";
import Home from "./pages/Home";
import Favorites from "./pages/Favorites";
import React from "react";
import axios from "axios";

const AppContext = React.createContext({});

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

  const onAddToCart = (obj) => {
    if (cartItems.find((item) => item.id === obj.id)) {
      setCartItems((prev) => prev.filter((item) => item.id !== obj.id));
    } else {
      axios.post(`https://642468ad9e0a30d92b1b3f07.mockapi.io/cart`, obj);
      setCartItems((prev) => [...prev, obj]);
    }
  };
  const onRemoveToCart = (id) => {
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
    <AppContext.Provider value={{ items, cartItems, favoriteItems }}>
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
            element={
              <Favorites items={favoriteItems} onAddFavorite={onAddFavorite} />
            }
          ></Route>
        </Routes>
      </div>
    </AppContext.Provider>
  );
}

export default App;
