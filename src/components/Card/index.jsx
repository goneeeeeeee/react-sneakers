import styles from "./Card.module.scss";

function Card(props) {
  console.log(props);
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
        <button className={styles.button} onClick={props.onClick}>
          <img src="/img/icons/plus.svg" alt="plus" width={11} height={11} />
        </button>
      </div>
    </div>
  );
}
export default Card;
