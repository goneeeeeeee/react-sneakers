import React from "react";
import styles from "./Card.module.scss";
import ContentLoader from "react-content-loader";

function Card({
  id,
  onFavorite,
  title,
  imageUrl,
  price,
  onPlus,
  favorited = false,
  loading = false,
}) {
  const [isAdded, setIsAdded] = React.useState(false);
  const [isFavorite, setIsFavorite] = React.useState(favorited);

  const handleClick = () => {
    onPlus({ title, imageUrl, price });
    setIsAdded(!isAdded);
  };

  const onClickFavorite = () => {
    onFavorite({ id, title, imageUrl, price });
    setIsFavorite(!isFavorite);
  };

  return (
    <div className={styles.card}>
      {loading ? (
        <ContentLoader
          speed={2}
          width={155}
          height={250}
          viewBox="0 0 155 265"
          backgroundColor="#f3f3f3"
          foregroundColor="#ecebeb"
        >
          <rect x="1" y="0" rx="10" ry="10" width="155" height="155" />
          <rect x="0" y="167" rx="5" ry="5" width="155" height="15" />
          <rect x="0" y="187" rx="5" ry="5" width="100" height="15" />
          <rect x="1" y="234" rx="5" ry="5" width="80" height="25" />
          <rect x="124" y="230" rx="10" ry="10" width="32" height="32" />
        </ContentLoader>
      ) : (
        <>
          <div className={styles.favorite}>
            <img
              onClick={onClickFavorite}
              src={
                isFavorite
                  ? "/img/icons/hearth-like.svg"
                  : "/img/icons/hearth-off.svg"
              }
              alt="Unliked"
            />
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
                isAdded
                  ? "/img/icons/button-accept.svg"
                  : "/img/icons/btn-plus.svg"
              }
              alt="plus"
            />
          </div>
        </>
      )}
    </div>
  );
}
export default Card;
