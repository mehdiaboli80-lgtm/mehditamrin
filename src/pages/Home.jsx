import { useEffect, useState } from "react";
import Posts from "../components/posts/Posts";
import Navbar from "./../components/navbar/Navbar";
import styled from "./home.module.css";
import axios from "axios";
import { Link } from "react-router-dom";

function Home() {
  const [allPosts, setAllPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 4;

  // ===== دریافت همه کالاها از سرور =====
  useEffect(() => {
    setLoading(true);
    axios.get("http://localhost:8000/articles")
      .then((result) => {
        console.log("✅ دیتا دریافت شد:", result.data);
        setAllPosts(result.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("❌ خطا:", error);
        setAllPosts([]);
        setLoading(false);
      });
  }, []);

  
  

  
  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const goToPage = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <div className={styled.titr}>
        <Navbar />
      </div>

      <div className={styled.postWrapper}>
        {loading ? (
          <div className={styled.loading}>
            <div className={styled.spinner}></div>
            <p>در حال بارگذاری کالاها...</p>
          </div>
        ) : allPosts.length === 0 ? (
          <p className={styled.empty}>هیچ کالایی یافت نشد!</p>
        ) : (
          <>
            {/* ===== نمایش کالاهای صفحه جاری ===== */}
            <div className={styled.productGrid}>
              {currentPosts.map((data) => (
                <Link
                  to={`/PostDetails/${data.id}`}
                  key={data.id}
                  className={styled.link}
                >
                  <Posts data={data} />
                </Link>
              ))}
            </div>

            {/* ===== Pagination ===== */}
            {totalPages > 1 && (
              <div className={styled.pagination}>
                <button
                  onClick={prevPage}
                  disabled={currentPage === 1}
                  className={styled.pageButton}
                >
                  ← قبلی
                </button>

                <div className={styled.pageNumbers}>
                  {Array.from({ length: totalPages }, (_, index) => (
                    <button
                      key={index + 1}
                      onClick={() => goToPage(index + 1)}
                      className={`${styled.pageNumber} ${
                        currentPage === index + 1 ? styled.activePage : ""
                      }`}
                    >
                      {index + 1}
                    </button>
                  ))}
                </div>

                <button
                  onClick={nextPage}
                  disabled={currentPage === totalPages}
                  className={styled.pageButton}
                >
                  بعدی →
                </button>
              </div>
            )}

            <div className={styled.pageInfo}>
              صفحه {currentPage} از {totalPages}
            </div>
          </>
        )}
      </div>
    </>
  );




}

export default Home;