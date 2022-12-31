"use strict";
// Hàm lấy dữ liệu
// ---------------
function getFromStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}
// Hàm lưu dữ liệu
// ---------------
function saveToStorage(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}
// Lấy dữ liệu userArr từ localStorage
// -----------------------------------
const users = getFromStorage("userArr") ? getFromStorage("userArr") : [];
// Chuyển đổi về dạng Class Instance
const userArr = users.map((user) => parseUser(user));
// Lấy dữ liệu user đang dăng nhập
// -------------------------------
let userActive = getFromStorage("userActive")
  ? parseUser(getFromStorage("userActive"))
  : null;
// Lấy dữ liệu TodoArr từ localStorage
// -----------------------------------
const todos = getFromStorage("todoArr") ? getFromStorage("todoArr") : [];
// Chuyển đổi về dạng Class Instance
// ---------------------------------
const todoArr = todos.map((todo) => parseTask(todo));

// Hàm chuyển từ JS object sang Class Instance
// -------------------------------------------
function parseUser(userData) {
  const user = new User(
    userData.firstname,
    userData.lastname,
    userData.username,
    userData.password,
    // Thêm 2 thuôc tính để làm tính năng thứ 9
    // ----------------------------------------
    userData.pageSize,
    userData.category
  );
  return user;
}
// Hàm chuyển đổi từ JS Object sang Class Instance của Task Class
// --------------------------------------------------------------
function parseTask(taskData) {
  const task = new Task(taskData.task, taskData.owner, taskData.isDone);
  return task;
}
