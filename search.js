"use strict";
// Cần đăng nhập mới có thể sử dụng được chức năng tìm kiếm
// --------------------------------------------------------
if (userActive) {
  const navPageNum = document.getElementById("nav-page-num");
  const inputQuery = document.getElementById("input-query");
  const btnSubmit = document.getElementById("btn-submit");

  const newsContainer = document.getElementById("news-container");
  const btnPrev = document.getElementById("btn-prev");
  const pageNum = document.getElementById("page-num");
  const btnNext = document.getElementById("btn-next");
  let totalResults = 0; //Tổng số trang tin đc trả về từ API
  let keywords = "";
  navPageNum.style.display = "none";

  // Tạo hàm search
  // --------------
  function find() {
    pageNum.textContent = "1";
    newsContainer.innerHTML = "";
    // Kiểm tra xem người dùng đã nhập keyword chưa?
    // --------------------------------------------
    if (inputQuery.value.trim().length === 0) {
      // Ẩn các nút Prev, Next và thông báo cho ng dùng nhập keyword
      // -----------------------------------------------------------
      navPageNum.style.display = "none";
      alert("Please input Keyword!");
    } else {
      keywords = inputQuery.value;
      // Gọi hàm này để hiển thị list News lên trang
      // -------------------------------------------
      getDataNewsByKeywords(keywords, 1);
    }
  }

  //   Bắt sự kiện nhấn nút Search
  // -----------------------------
  btnSubmit.addEventListener("click", find);

  // // Bắt sự kiện khi nhấn phím Enter
  // // -------------------------------
  // document.addEventListener("keydown", function (e) {
  //   if (e.key === "Enter") {
  //     find();
  //   }
  // });

  // Hàm lấy dữ liệu tin tức được tìm kiếm với từ khoá nhập vào
  // ----------------------------------------------------------
  async function getDataNewsByKeywords(keywords, page) {
    try {
      // Kết nối với API và lấy dữ liệu
      // ------------------------------
      const res = await fetch(
        `https://newsapi.org/v2/everything?q=${keywords}&page=${page}&pageSize=${userActive.pageSize}&apiKey=2636cd2a85814c77b66097b7c2f0eb7b`
      );
      const data = await res.json();
      // Báo lỗi truy cập quá 100lần/ngày
      // --------------------------------
      if (data.status === "error" && data.code === "rateLimited") {
        throw new Error(data.message);
      }
      // Báo lỗi khi không có bài viết nào được tìm thấy
      // ----------------------------------------------
      if (data.totalResults == 0) {
        // Ẩn các nút Prev và Next
        // ----------------------
        navPageNum.style.display = "none";
        throw new Error(
          "Không có bài nào phù hợp với từ khoá bạn nhập, Thử lại với từ khoá khác"
        );
      }
      // Báo lỗi khi chạy trực tiếp không chạy ứng dụng qua localHost (Live Server)
      // --------------------------------------------------------------------------
      if (data.status === "error" && data.code === "corsNotAllowed") {
        throw new Error(data.message);
      }
      // Hiển thị các nút Prev và Next khi dữ liệu trả về thành công
      // -----------------------------------------------------------
      navPageNum.style.display = "block";
      // Hiển thị danh sách các news được tìm thấy
      // ----------------------------------------
      displayNewsList(data);
    } catch (err) {
      // Bắt lỗi và thông báo cho người dùng
      // ----------------------------------
      alert("err.message");
    }
  }
  //   Hàm kiểm tra điều kiện, ẩn nút Prev
  // -----------------------------------
  function checkBtnPrev() {
    // Nếu ở trang nhất thì ẩn nút Prev
    // --------------------------------
    if (pageNum.textContent == 1) {
      btnPrev.style.display = "none";
    } else {
      btnPrev.style.display = "block";
    }
  }
  // Hàm kiểm tra điều kiện, và ẩn nút Next
  // ----------------------------------------
  function checkBtnNext() {
    // Nếu ở trang cuối thì ẩn nút Next
    // --------------------------------
    if (pageNum.textContent == Math.ceil(totalResults / userActive.pageSize)) {
      btnNext.style.display = "none";
    } else {
      btnNext.style.display = "block";
    }
  }
  // Bắt sự kiện vào nút Prev
  // ------------------------
  btnPrev.addEventListener("click", function () {
    // Gọi hàm này để lấy danh sách các tin trước đó
    // ---------------------------------------------
    getDataNewsByKeywords(keywords, --pageNum.textContent);
  });
  // Bắt sự kiện vào nút Next
  // ------------------------
  btnNext.addEventListener("click", function () {
    // Gọi hàm này để đi tới danh sách các tin tiếp theo
    // -------------------------------------------------
    getDataNewsByKeywords(keywords, ++pageNum.textContent);
  });
  // Hàm hiển thị danh sách các tin lên trang
  // ----------------------------------------
  function displayNewsList(data) {
    // Lấy giá trị cho biến totalResults
    totalResults = data.totalResults;
    // Kiểm tra xem đã ẩn các nút Next,Prev chưa?
    // -----------------------------------------
    checkBtnNext();
    checkBtnPrev();

    let html = "";
    // Tạo code HTML cho các tin để hiển thị
    // Gán ảnh no_image_available.jpg thay thế cho các ảnh không hiển thị đc
    // ---------------------------------------------------------------------
    data.articles.forEach(function (articles) {
      html += `
      <div class="card flex-row flex-wrap">
        <div class="card mb-3" style="">
          <div class="row no-gutters">
            <div class="col-md-4">
              <img class='card-img' src=${
                articles.urlToImage
                  ? articles.urlToImage
                  : "no_img_available.jpg"
              } alt='img'/>                
            </div>
            <div class="col-md-8">
              <div class="card-body">
                <h5>${articles.title}</h5>
                <p>${articles.description}</p>
                <button><a href=${
                  articles.url
                } target='_blank'>View</a></button>
              </div>  
            </div>
          </div>
        </div>    
      </div>
    `;
    });
    newsContainer.innerHTML = html;
  }
} else {
  alert("Please Login or Register!");
  window.location.href = "../index.html";
}
