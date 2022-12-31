"use strict";

// Phải đăng nhập mới có thể thực hiện được chức năng
// --------------------------------------------------
if (userActive) {
  const todoList = document.getElementById("todo-list");
  const btnAdd = document.getElementById("btn-add");
  const inputTask = document.getElementById("input-task");

  displayTodoList();
  // Hàm hiển thị danh sách việc cần làm(todo list
  // ---------------------------------------------
  function displayTodoList() {
    let html = "";
    // Từ mảng todoArr lọc ra các todo task là của user đang đăng nhập để
    // ------------------------------------------------------------------
    todoArr
      .filter((todo) => todo.owner === userActive.username) //sau khi loc ta dc list nhiem vu cua ng dung dang nhap
      .forEach(function (todo) {
        html += `<li class=${todo.isDone ? "checked" : ""}>${
          todo.task
        }<span class='close'>x</span></li>
        `;
      });
    todoList.innerHTML = html;

    eventToggleTasks();
    eventDeleteTasks();
  }
  const addTitle = function () {
    // Kiểm tra xem người dùng đã nhập nội dung công việc vào form title chưa?
    // -----------------------------------------------------------------------
    if (inputTask.value.trim().length === 0) {
      alert("please input title!");
    } else {
      const todo = new Task(inputTask.value, userActive.username, false);
      // Thêm Task mới vào mảng todoArr
      // ------------------------------
      todoArr.push(todo);
      // Lưu vào localStorage
      // --------------------
      saveToStorage("todoArr", todoArr);
      // Hiển thị lại danh sách các nhiệm vụ
      // -----------------------------------
      displayTodoList();
      // reset dữ liệu trên form nhập
      // ----------------------------
      inputTask.value = "";
    }
  };
  // Bắt sự kiện nhấn nút add
  // ------------------------
  btnAdd.addEventListener("click", addTitle);

  // Nhấn nút Enter để thêm công việc
  // --------------------------------
  document.addEventListener("keydown", function (e) {
    // console.log(e.key);

    if (e.key === "Enter") {
      addTitle();
    }
  });

  // Bắt sự kiện nhấn vào Toggle Task
  // --------------------------------
  function eventToggleTasks() {
    // Lấy tất cả các phần tử li chứa thông tin của các task và bắt sự kiện trên từng phần tử li
    // --------------------------------------------------------------------
    document.querySelectorAll("#todo-list li").forEach(function (liEl) {
      liEl.addEventListener("click", function (e) {
        // Tránh nút Delete ra ==>để không bị chông sự kiện khi nhấn nút delete
        // --------------------------------------------------------------------
        if (e.target !== liEl.children[0]) {
          // toggle class checked
          // --------------------
          liEl.classList.toggle("checked");
          // Tìm Task vừa click vào toggle
          // ----------------------------
          const todo = todoArr.find(
            (todoItem) =>
              todoItem.owner === userActive.username &&
              todoItem.task === liEl.textContent.slice(0, -1) //Lấy nội dung text chứa task, loại bỏ dấu X
          );
          // Sau đó thay đổi thuộc tính isDone của nó
          // ----------------------------------------
          todo.isDone = liEl.classList.contains("checked") ? true : false;
          // Lưu vào LocalStorage
          // --------------------
          saveToStorage("todoArr", todoArr);
        }
      });
    });
  }
  // Bắt sự kiện xoá các Tasks
  // -------------------------
  function eventDeleteTasks() {
    // Lấy tất cả các phần tử li (nút X) và bắt sự kiện trên nút X đó
    // --------------------------------------------------------------
    document.querySelectorAll("#todo-list .close").forEach(function (closeEl) {
      closeEl.addEventListener("click", function () {
        // xác nhận xem người dùng muốn xoá mục không?
        // -------------------------------------------
        const isDelete = confirm("Bạn có muốn xoá mục này không?");
        if (isDelete) {
          // Tìm vị trí của task đã xoá trong mảng todoArr
          // ---------------------------------------------
          const index = todoArr.findIndex(
            (item) =>
              item.owner === userActive.username && //Xác nhận username và taskname
              item.task === closeEl.parentElement.textContent.slice(0, -1) //Dòng này để xác minh taskname và so sánh
          );
          // Xoá task đó ra khỏi mảng todoArr
          // --------------------------------
          todoArr.splice(index, 1);
          // Lưu vào localStorage
          // --------------------
          saveToStorage("todoArr", todoArr);
          // Hiển thị lại danh sách todolist
          // -------------------------------
          displayTodoList();
        }
      });
    });
  }
} //Nếu chưa đăng nhập thì in thông báo để người dùng đăng nhập để sử dụng chức năng
// --------------------------------------------------------------------------------
else {
  alert("Please login or Register!");
  window.location.href = "../index.html";
}
