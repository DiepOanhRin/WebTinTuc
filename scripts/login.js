"use strict";
//
const inputUsername = document.getElementById("input-username");
const inputPassword = document.getElementById("input-password");
const btnSubmit = document.getElementById("btn-submit");

//  Bắt sự kiện với nút Login
btnSubmit.addEventListener("click", function () {
  // Kiểm tra xem người dùng đã nhập đủ Username và Password chưa?
  const isValidate = validate();
  if (isValidate) {
    // Tìm kiếm trong userArr thông tin user ngươi dùng nhập vào có hay không?
    const user = userArr.find(
      (item) =>
        item.username === inputUsername.value &&
        item.password === inputPassword.value
    );
    if (user) {
      alert("Đăng nhập thành công!");
      // Lưu thông tin user hiện đang đăng nhập trên trang
      // -------------------------------------------------
      saveToStorage("userActive", user);
      // chuyển hướng về trang chủ
      window.location.href = "../index.html";
    } else {
      alert("Thông tin đăng nhập không đúng,vui lòng kiểm tra lại");
    }
  }
});
// Hàm validate dữ liệu nhập vào cửa người dùng
// --------------------------------------------
function validate() {
  let isValidate = true;
  if (inputUsername.value === "") {
    alert("Please input Username!");
    isValidate = false;
  }
  if (inputPassword.value === "") {
    alert("Please input Password!");
    isValidate = false;
  }
  return isValidate;
}
