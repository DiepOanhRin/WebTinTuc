"use strict";
const loginModal = document.getElementById("login-modal");
const mainContent = document.getElementById("main-content");
const welcomeMessage = document.getElementById("welcome-message");
const btnLogout = document.getElementById("btn-logout");
displayHome();

// Hiển thị nội dung trên trang Home một cách hợp lý tuỳ vào trường hợp cụ thể
// ---------------------------------------------------------------------------
function displayHome() {
  // Nếu có người đăng nhập thì ẩn "LoginModal" và hiển thị "mainContent"
  // --------------------------------------------------------------------
  if (userActive) {
    loginModal.style.display = "none";
    mainContent.style.display = "block";
    // thêm thông báo "welComeMessage"
    welcomeMessage.textContent = `WelCome ${userActive.firstname}`;
  } else {
    loginModal.style.display = "block";
    mainContent.style.display = "none";
  }
}
// Bắt sự kiện vào nút Logout
// --------------------------
btnLogout.addEventListener("click", function () {
  const isLogout = confirm("You logout sure?");
  if (isLogout) {
    // Gán giá trị người dùng "userActive" bằng "null" với ý nghĩa rằng k có ai đang đăng nhập
    // ---------------------------------------------------------------------------------------
    userActive = null;
    // Cập nhật trạng thái vào localStorage
    // ------------------------------------
    saveToStorage("userActive", userActive);
    // Hiển thi lại trang "Home" với giao diện login và register
    // ---------------------------------------------------------
    displayHome();
  }
});
