import React from "react";
import styles from "./Card.module.scss";

function Card(props) {
  const [isAdded, setIsAdded] = React.useState(false);

  const handleClick = () => {
    setIsAdded(!isAdded);
  };

  return (
    <div className={styles.card}>
      <div className={styles.favorite}>
        <img src="/img/icons/hearth-off.svg" alt="Unliked" />
      </div>
      <img src={props.imageUrl} alt="Sneakers" width={133} height={112} />
      <h5>{props.title}</h5>
      <div className={styles.cardfooter}>
        <div className={styles.cardfooter_info}>
          <span>Цена:</span>
          <b>{props.price}руб.</b>
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
