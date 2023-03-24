function Card() {
  return (
    <div className="card">
      <div className="favorite">
        <img src="/img/icons/hearth-off.svg" alt="Unliked" />
      </div>
      <img src="/img/sneakers/1.jpg" alt="Sneakers" width={133} height={112} />
      <h5>Мужские Кроссовки Nike Blazer Mid Suede</h5>
      <div className="card-footer">
        <div className="card-footer_info">
          <span>Цена:</span>
          <b>12 999 руб.</b>
        </div>
        <button className="button">
          <img src="/img/icons/plus.svg" alt="plus" width={11} height={11} />
        </button>
      </div>
    </div>
  );
}
export default Card;
