"use strict";
const inputFirstname = document.getElementById("input-firstname");
const inputLastname = document.getElementById("input-lastname");
const inputUsername = document.getElementById("input-username");
const inputPassword = document.getElementById("input-password");
const inputPasswordConfirm = document.getElementById("input-password-confirm");
const btnSubmit = document.getElementById("btn-submit");

//  Bắt sự kiện nhấn nút Register
// ------------------------------
btnSubmit.addEventListener("click", function () {
  // Lấy dữ liệu nhập vào từ người dùng chuyển vào form
  // --------------------------------------------------
  const user = new User(
    inputFirstname.value,
    inputLastname.value,
    inputUsername.value,
    inputPassword.value
  );
  // Check validate
  // --------------
  const isValidate = validate(user);
  if (isValidate) {
    // Thêm "user" vào mảng userArr
    userArr.push(user);
    // Lưu dữ liệu(update dữ liệu) xuống localStorage
    saveToStorage("userArr", userArr);
    alert("Đăng ký thành công !");
    // Điều hướng sang trang Login
    window.location.href = "../pages/login.html";
  }
});
// Hàm 'validate' thông tin đăng ký của người dùng nhập vào form. Hàm trả về true nếu hợp lệ và false nếu không hợp lệ
// ------------------------------------------------------------------------------------------------------
function validate(user) {
  let isValidate = true;
  // Không trường nào bị bỏ trống
  // ----------------------------
  if (user.firstname.trim().length === 0) {
    alert("Please input first name!");
    isValidate = false;
  }
  if (user.lastname.trim().length === 0) {
    alert("Please input last name!");
    isValidate = false;
  }
  if (user.username.trim().length === 0) {
    alert("Please input user name!");
    isValidate = false;
  }
  // "Password" không sử dụng phương thức trim().length===0 như các trường input trên bởi vì Dấu cách cũng là kí tự hợp lệ thoả mãn yêu cầu.
  // -----------------------------------------------
  if (user.password === "") {
    alert("Please input Password!");
    isValidate = false;
  }
  if (inputPasswordConfirm.value === "") {
    alert("Please input Confirm Password!");
    isValidate = false;
  }
  // Username không đc trùng với Username của người khác
  // ---------------------------------------------------
  if (
    // Nếu tồn tại username nào đó trùng với username người dùng nhập thì báo lỗi
    // --------------------------------------------------------------------------
    !userArr.every((item) => (item.username !== user.username ? true : false))
    // dùng every để duyệt qua từng phần tử trong mảng
    // -----------------------------------------------
  ) {
    alert("User Name đã tồn tại!");
    isValidate = false;
  }
  // Password and Confirm Password phải giống nhau
  // ---------------------------------------------
  if (inputPasswordConfirm.value !== user.password) {
    alert("Password và Confirm Password phải giống nhau!");
    isValidate = false;
  }
  // Password phải có nhiều hơn 8 kí tự
  // ----------------------------------
  if (user.password.length < 9) {
    alert("Password phải nhiều hơn 8 kí tự!");
    isValidate = false;
  }
  return isValidate;
}
