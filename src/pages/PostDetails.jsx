import { useParams } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import styled from "./postDetail.module.css"; // ← فایل استایل جدا

function PostDetails() {
  const { id } = useParams(); // ← اسم تمیزتر
  const [ettelaat, setEttelaat] = useState(null); // ← به جای {} از null استفاده کن
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://192.168.42.146:8000/articles/${id}`)
      .then((result) => {
        setEttelaat(result.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("خطا در دریافت اطلاعات:", err);
        setError("مشکلی در دریافت اطلاعات پیش آمد.");
        setLoading(false);
      });
  }, [id]); // ← وابستگی به id

  // حالت بارگذاری
  if (loading) {
    return (
      <div className={styled.loading}>
        <div className={styled.spinner}></div>
        <p>در حال بارگذاری جزئیات کالا...</p>
      </div>
    );
  }

  // حالت خطا
  if (error || !ettelaat) {
    return (
      <div className={styled.error}>
        <h2>❌ {error || "کالایی یافت نشد!"}</h2>
        <button onClick={() => window.history.back()}>بازگشت</button>
      </div>
    );
  }

  return (
    <div className={styled.container}>
      <div className={styled.card}>
        {/* دکمه بازگشت */}
        <button className={styled.backButton} onClick={() => window.history.back()}>
          ← بازگشت
        </button>

        <div className={styled.content}>
          {/* بخش تصویر */}
          <div className={styled.imageWrapper}>
            <img
              src={ettelaat.imageUrl || "https://via.placeholder.com/400x400?text=No+Image"}
              alt={ettelaat.name || "تصویر کالا"}
              className={styled.image}
            />
          </div>

          {/* بخش اطلاعات */}
          <div className={styled.info}>
            <h1 className={styled.title}>{ettelaat.name}</h1>

            <div className={styled.priceBadge}>
              <span className={styled.price}>{ettelaat.cost?.toLocaleString()}</span>
              <span className={styled.currency}>تومان</span>
            </div>

            <div className={styled.divider}></div>

            <p className={styled.description}>
              {ettelaat.description || "توضیحاتی برای این کالا ثبت نشده است."}
            </p>

            <div className={styled.detailsGrid}>
              <div className={styled.detailItem}>
                <span className={styled.label}>🆔 کد کالا:</span>
                <span className={styled.value}>{ettelaat.id}</span>
              </div>
              <div className={styled.detailItem}>
                <span className={styled.label}>📅 تاریخ ثبت:</span>
                <span className={styled.value}>{new Date().toLocaleDateString('fa-IR')}</span>
              </div>
            </div>

            <button className={styled.addButton}>➕ افزودن به سبد خرید</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PostDetails;