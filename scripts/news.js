"use strict";
//Dùng câu lệnh điều kiện để bắt buộc người dùng tạo tài khoản mới có thể đọc đc tin tức trên trang
// ------------------------------------------------------------------------------------------------
if (userActive) {
  const newsContainer = document.getElementById("news-container");
  // const btnPrevH = document.getElementById("btn-prev-h");
  // const pageNumH = document.getElementById("page-num-h");
  // const btnNextH = document.getElementById("btn-next-h");
  const btnPrevF = document.getElementById("btn-prev");
  const pageNumF = document.getElementById("page-num");
  const btnNextF = document.getElementById("btn-next");

  let totalResults = 0; //Tổng số trang tin đc trả về từ API

  getDataNews("jp", 1);

  // Hàm lấy dữ liệu DataNews từ API và hiển thị list News ra ứng dụng
  // -----------------------------------------------------------------
  async function getDataNews(country, page) {
    try {
      // Kết nối với API và lấy dữ liệu
      // ------------------------------
      const res = await fetch(
        `https://newsapi.org/v2/top-headlines?country=${country}&category=${userActive.category}&pageSize=${userActive.pageSize}&page=${page}&apiKey=2636cd2a85814c77b66097b7c2f0eb7b`
      );
      const data = await res.json();
      // Báo lỗi truy cập quá 100lần/ngày
      // --------------------------------
      if (data.status === "error" && data.code === "rateLimited") {
        throw new Error(data.message);
      }
      // Báo lỗi khi chạy trực tiếp không chạy ứng dụng qua localHost (Live Server)
      // --------------------------------------------------------------------------
      if (data.status === "error" && data.code === "corsNotAllowed") {
        throw new Error(data.message);
      }
      // Gọi hàm để hiện thị danh sách tin tức
      // -------------------------------------
      displayNewsList(data);
    } catch (err) {
      //Bắt lỗi
      // Thông báo lỗi
      // -------------
      alert("Error: " + err.message);
    }
  }
  //   Hàm kiểm tra điều kiện ẩn và ẩn nút Previous
  // ----------------------------------------------
  function checkBtnPrev() {
    // Nếu ở trang nhất thì ẩn nút Prev
    // --------------------------------
    if (pageNumF.textContent == 1) {
      btnPrevF.style.display = "none";
    } else {
      // btnPrevH.style.display = "block";
      btnPrevF.style.display = "block";
    }
  }
  // Hàm kiểm tra điều kiện ẩn và ẩn nút Next
  // ----------------------------------------
  function checkBtnNext() {
    // Nếu ở trang cuối thì ẩn nút Next
    // --------------------------------
    if (
      // pageNumH.textContent == Math.ceil(totalResults / userActive.pageSize) ||
      pageNumF.textContent == Math.ceil(totalResults / userActive.pageSize)
    ) {
      // btnNextH.style.display = "none";
      btnNextF.style.display = "none";
    } else {
      // btnNextH.style.display = "block";
      btnNextF.style.display = "block";
    }
  }
  // Bắt sự kiện vào nút Prev
  // ------------------------
  btnPrevF.addEventListener("click", function () {
    // Gọi hàm này để lấy danh sách các tin trước đó
    // ---------------------------------------------
    getDataNews("jp", --pageNumF.textContent);
  });
  // Bắt sự kiện vào nút Next
  // ------------------------
  btnNextF.addEventListener("click", function () {
    // Gọi hàm này để đi tới danh sách các tin tiếp theo
    // -------------------------------------------------
    getDataNews("jp", ++pageNumF.textContent);
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
}
//Nếu chưa dăng nhập thì in thông báo để người dùng đăng nhập trước khi vào trang
// ----------------------------------------------------------------------------
else {
  alert("Vui lòng đăng nhập hoặc đăng ký để truy cập ứng dụng");
  window.location.href = "../index.html";
}
