import React from "react";
import Card from "../components/Card";
import AppContext from "../context";

function Favorites({ onAddFavorite }) {
  const { favoriteItems } = React.useContext(AppContext);
  return (
    <div className="content">
      <div className="all-sneakers">
        <h1>Мои Закладки</h1>
      </div>
      <div className="sneakers">
        {favoriteItems.map((item, index) => (
          <Card
            key={index}
            favorited={true}
            onFavorite={onAddFavorite}
            {...item}
          />
        ))}
      </div>
    </div>
  );
}

export default Favorites;
