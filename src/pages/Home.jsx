import Card from "../components/Card";

function Home({
  items,
  searchValue,
  setSearchValue,
  onChangeSearch,
  onAddFavorite,
  onAddToCart,
}) {
  return (
    <div className="content">
      <div className="all-sneakers">
        <h1>
          {searchValue ? `Поиск по запросу: ${searchValue}` : "Все кроссовки"}
        </h1>
        <div className="search-block">
          <img src="/img/icons/search.svg" alt="Search" />
          {searchValue && (
            <img
              onClick={() => setSearchValue("")}
              className="clear"
              src="/img/icons/button-remove.svg"
              alt="Clear"
            />
          )}
          <input
            onChange={onChangeSearch}
            value={searchValue}
            placeholder="Поиск..."
          />
        </div>
      </div>
      <div className="sneakers">
        {items
          .filter((item) => item.title.toLowerCase().includes(searchValue))
          .map((item, index) => (
            <Card
              key={index}
              onPlus={(obj) => onAddToCart(obj)}
              onFavorite={(obj) => onAddFavorite(obj)}
              {...item}
            />
          ))}
      </div>
    </div>
  );
}

export default Home;
