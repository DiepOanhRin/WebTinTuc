"use strict";
// Nếu người dùng đăng nhập vào tài khoản thì mới có thể thiết lập đc cài đặt này
// ------------------------------------------------------------------------------
if (userActive) {
  const inputPageSize = document.getElementById("input-page-size");
  const inputCategory = document.getElementById("input-category");
  const btnSubmit = document.getElementById("btn-submit");

  btnSubmit.addEventListener("click", function () {
    if (validate()) {
      // Cập nhật lại userActive
      // -----------------------
      userActive.pageSize = Number.parseInt(inputPageSize.value);
      userActive.category = inputCategory.value;
      // save in LocalStorage
      // --------------------
      saveToStorage("userActive", userActive);
      // Cập nhật lại mảng userArr
      // -------------------------
      const index = userArr.findIndex(
        (userItem) => userItem.username === userActive.username
      );
      userArr[index] = userActive;
      saveToStorage("userArr", userArr);

      // Reset lại form đăng nhập và báo cáo cài đặt thành công
      // ------------------------------------------------------
      alert("Thiết lập thành công");
      inputPageSize.value = "";
      inputCategory.value = "General";
    }
  });
  // Hàm validate dữ liệu nhập vào của người dùng
  // --------------------------------------------
  function validate() {
    let isValidate = true;
    // Kiểm tra inputPageSiZe
    // ----------------------
    if (inputPageSize.value < 1) {
      alert("Số tin hiển thị phải lớn hơn 0");
      isValidate = false;
    }
    if (Number.isNaN(Number.parseInt(inputPageSize.value))) {
      alert("News per page không hợp lệ!");
      isValidate = false;
    }
    // Kiểm tra inputCategory
    // ----------------------
    if (inputCategory.value === "") {
      alert("Please input news Category!");
      isValidate = false;
    }
    return isValidate;
  }
} //Nếu chưa đăng nhập thì thông báo cho người dùng đăng nhập vào
else {
  alert("Please Login or Register");
  window.location.href = "../index.html";
}
