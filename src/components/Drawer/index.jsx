import React from "react";
import styles from "./Drawer.module.scss";
import AppContext from "../../context";
function Drawer({ onClickClose, items = [], onRemove }) {
  const { cartItems, setCartItems } = React.useContext(AppContext);
  const totalPrice = cartItems.reduce((sum, obj) => obj.price + sum, 0);
  return (
    <div className={styles.overlay}>
      <div className={styles.drawer}>
        <h2>
          Корзина
          <img
            onClick={onClickClose}
            className="cart-remove"
            src="/img/icons/button-remove.svg"
            alt="Remove"
          />
        </h2>
        {items.length > 0 ? (
          <div className={styles.items}>
            {items.map((obj) => (
              <div key={obj.id} className={styles.cartItem}>
                <div
                  style={{ backgroundImage: `url(${obj.imageUrl})` }}
                  className={styles.cartItemImg}
                ></div>
                <div className={styles.cartinfo}>
                  <p>{obj.title}</p>
                  <b>{obj.price}</b>
                </div>
                <img
                  onClick={() => onRemove(obj.id)}
                  className={styles.cartremove}
                  src="/img/icons/button-remove.svg"
                  alt="Remove"
                />
              </div>
            ))}
            <div className={styles.totalblock}>
              <ul>
                <li>
                  <span>Итого:</span>
                  <div></div>
                  <b>{totalPrice}руб.</b>
                </li>
                <li>
                  <span>Налог 5%:</span>
                  <div></div>
                  <b>{(totalPrice / 100) * 5}руб.</b>
                </li>
              </ul>
              <button className={styles.greenButton}>
                Оформить заказ <img src="img/icons/arrow.svg" alt="arrow" />
              </button>
            </div>
          </div>
        ) : (
          <div className={styles.cartEmpty}>
            <img
              className={styles.cartEmptyImg}
              src="/img/cart-empty.jpg"
              alt="empty"
            />
            <h2>Корзина пуста</h2>
            <p>Добавьте хотя бы одну пару кроссовок,чтобы сделать заказ.</p>
            <button onClick={onClickClose} className={styles.greenButton}>
              <img
                className={styles.arrowEmpty}
                src="img/icons/arrow.svg"
                alt="arrow"
              />
              Вернуться назад
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
export default Drawer;
