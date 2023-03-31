import React from "react";
import styles from "./Card.module.scss";

function Card({ onFavorite, title, imageUrl, price, onPlus }) {
  const [isAdded, setIsAdded] = React.useState(false);

  const handleClick = () => {
    onPlus({ title, imageUrl, price });
    setIsAdded(!isAdded);
  };

  return (
    <div className={styles.card}>
      <div className={styles.favorite} onClick={onFavorite}>
        <img src="/img/icons/hearth-off.svg" alt="Unliked" />
      </div>
      <img src={imageUrl} alt="Sneakers" width={133} height={112} />
      <h5>{title}</h5>
      <div className={styles.cardfooter}>
        <div className={styles.cardfooter_info}>
          <span>Цена:</span>
          <b>{price}руб.</b>
        </div>
        <img
          className={styles.plus}
          onClick={handleClick}
          src={
            isAdded ? "/img/icons/button-accept.svg" : "/img/icons/btn-plus.svg"
          }
          alt="plus"
        />
      </div>
    </div>
  );
}
export default Card;
