var bookmarkName = document.getElementById("bookmarkName");
var bookmarkURL = document.getElementById("bookmarkURL");
var submitBtn = document.getElementById("submitBtn");
var bookmarkArray = [];

var tableContent = document.getElementById("tableContent");

var closeBtn = document.getElementById("closeBtn");

var bookmarkNameRegex = /^[A-Za-z0-9_]{3,}$/;
function nameIsValid() {
  if (bookmarkNameRegex.test(bookmarkName.value) == true) {
    bookmarkName.classList.add("is-valid");
    bookmarkName.classList.remove("is-invalid");

    return true;
  } else {
    bookmarkName.classList.add("is-invalid");
    bookmarkName.classList.remove("is-valid");

    return false;
  }
}
var bookmarkUrlRegex = /^[A-Za-z0-9_\.]{1,}\.[a-z]{2,3}$/;
function urlIsValid() {
  if (bookmarkUrlRegex.test(bookmarkURL.value) == true) {
    bookmarkURL.classList.add("is-valid");
    bookmarkURL.classList.remove("is-invalid");

    return true;
  } else {
    bookmarkURL.classList.add("is-invalid");
    bookmarkURL.classList.remove("is-valid");

    return false;
  }
}

closeBtn.onclick = function () {
  var element = document.getElementById("closeee");
  element.classList.add("d-none");
};

if (localStorage.getItem("bookmarkArray") == null) {
  bookmarkArray = [];
} else {
  bookmarkArray = JSON.parse(localStorage.getItem("bookmarkArray"));
  addedBookmarks();
}

submitBtn.onclick = function () {
  if (nameIsValid() && urlIsValid()) {
    var bookMark = {
      bookmarkName: bookmarkName.value,
      bookmarkURL: bookmarkURL.value,
    };
    bookmarkArray.push(bookMark);
    localStorage.setItem("bookmarkArray", JSON.stringify(bookmarkArray));
    addedBookmarks();
    clrData();
  } else {
    var element = document.getElementById("closeee");
    element.classList.remove("d-none");
  }
};

function addedBookmarks() {
  var addedBookmark = ``;
  for (i = 0; i < bookmarkArray.length; i++) {
    addedBookmark += `
    <tr>
            <td>${i + 1}</td>
            <td>${bookmarkArray[i].bookmarkName}</td>
            <td>
            <a href="https://www.${
              bookmarkArray[i].bookmarkURL
            }" target="_blank">
              <button class="btn btn-visit" >
                <i class="fa-solid fa-eye pe-2"></i>Visit
              </button>
              </a>
            </td>
            <td>
              <button onclick="deleteBookmark(${i})" class="btn btn-delete pe-2" >
                <i class="fa-solid fa-trash-can"></i>
                Delete
              </button>
            </td>
          </tr>
    `;
  }
  tableContent.innerHTML = addedBookmark;
}

function clrData() {
  bookmarkName.value = "";
  bookmarkURL.value = "";
  bookmarkName.classList.remove("is-valid");
  bookmarkURL.classList.remove("is-valid");
}

function deleteBookmark(index) {
  bookmarkArray.splice(index, 1);
  localStorage.setItem("bookmarkArray", JSON.stringify(bookmarkArray));
  addedBookmarks();
}
