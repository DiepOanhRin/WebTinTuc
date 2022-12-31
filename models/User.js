"use strict";
// Class User để đại diện thông tin của người dùng
// -----------------------------------------------
class User {
  constructor(
    firstname,
    lastname,
    username,
    password,

    pageSize = 10, // Giá trị mặc định khi không đc khai báo
    category = "business" //Giá trị mặc định khi không đc khai báo
  ) {
    this.firstname = firstname;
    this.lastname = lastname;
    this.username = username;
    this.password = password;

    // 2 thuộc tính thêm vào để làm yêu cầu bài 9==> cá nhân hoá luôn phần cài đặt trang tin cho riêng từng User
    // ----------------------------------------------------------------------------------------------------
    this.pageSize = pageSize;
    this.category = category;
  }
}
// Class task để chứa các thông tin về Task trong Todo List
// --------------------------------------------------------
class Task {
  constructor(task, owner, isDone) {
    this.task = task;
    this.owner = owner;
    this.isDone = isDone;
  }
}
