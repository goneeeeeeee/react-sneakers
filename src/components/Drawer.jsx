function Drawer() {
  return (
    <div style={{ display: "none" }} className="overlay">
      <div className="drawer">
        <h2>
          Корзина{" "}
          <img
            className="cart-remove"
            src="/img/icons/button-remove.svg"
            alt="Remove"
          />
        </h2>
        <div className="items">
          <div className="cartItem">
            <div
              style={{ backgroundImage: "url(/img/sneakers/1.jpg)" }}
              className="cartItemImg"
            ></div>
            <div className="cart-info">
              <p>Мужские Кроссовки Nike Air Max 270</p>
              <b>12 999 руб.</b>
            </div>
            <img
              className="cart-remove"
              src="/img/icons/button-remove.svg"
              alt="Remove"
            />
          </div>
          <div className="cartItem">
            <div
              style={{ backgroundImage: "url(/img/sneakers/1.jpg)" }}
              className="cartItemImg"
            ></div>
            <div className="cart-info">
              <p>Мужские Кроссовки Nike Air Max 270</p>
              <b>12 999 руб.</b>
            </div>
            <img
              className="cart-remove"
              src="/img/icons/button-remove.svg"
              alt="Remove"
            />
          </div>
        </div>
        <div className="total-block">
          <ul>
            <li>
              <span>Итого:</span>
              <div></div>
              <b>21 498 руб.</b>
            </li>
            <li>
              <span>Налог 5%:</span>
              <div></div>
              <b>1074 руб.</b>
            </li>
          </ul>
          <button className="greenButton">
            Оформить заказ <img src="img/icons/arrow.svg" alt="arrow" />
          </button>
        </div>
      </div>
    </div>
  );
}
export default Drawer;
