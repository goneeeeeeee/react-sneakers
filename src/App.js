import Card from "./components/Card";
import Header from "./components/Header";
import Drawer from "./components/Drawer";
import React from "react";
import axios from "axios";

function App() {
  const [cartOpened, setCartOpened] = React.useState(false);
  const [items, setItems] = React.useState([]);

  React.useEffect(() => {
    axios
      .get(`https://642468ad9e0a30d92b1b3f07.mockapi.io/items`)
      .then((res) => {
        setItems(res.data);
      });
  }, []);
  return (
    <div className="wrapper">
      {cartOpened && <Drawer onClickClose={() => setCartOpened(!cartOpened)} />}
      <Header onClickCard={() => setCartOpened(!cartOpened)} />
      <div className="content">
        <div className="all-sneakers">
          <h1>Все кроссовки</h1>
          <div className="search-block">
            <img src="/img/icons/search.svg" alt="Search" />
            <input placeholder="Поиск..." />
          </div>
        </div>
        <div className="sneakers">
          {items.map((obj) => (
            <Card
              title={obj.title}
              price={obj.price}
              imageUrl={obj.imageUrl}
              onClick={() => console.log(obj)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
