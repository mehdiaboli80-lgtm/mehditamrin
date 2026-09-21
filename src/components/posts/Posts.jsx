import styled from "./posts.module.css";

function Posts(props) {
  const { id, imageUrl, name, cost, description } = props.data;

  return (
    <div className={styled.card}>
      <div className={styled.imageWrapper}>
        <img
          src={imageUrl || "https://via.placeholder.com/300x300?text=No+Image"}
          alt={name || "محصول"}
        />
      </div>

      <div className={styled.content}>
        <h3 className={styled.title}>{name}</h3>
        <p className={styled.description}>
          {description || "توضیحاتی برای این محصول ثبت نشده است."}
        </p>
        <div className={styled.footer}>
          <span className={styled.price}>{cost?.toLocaleString()} تومان</span>
          <button className={styled.detailButton}>مشاهده</button>
        </div>
      </div>
    </div>
  );
}

export default Posts;