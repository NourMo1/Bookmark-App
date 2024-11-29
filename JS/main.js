// Initializing Variables
var bookmarkNameInput = document.getElementById("bookmarkName");
var websiteURLInput = document.getElementById("websiteURL");
var fisrtCell = document.getElementById("first");
var lastCell = document.getElementById("last");
var bookmarksArray = [];
// Local Storage
if (localStorage.getItem("bookmarks") !== null) {
    bookmarksArray = JSON.parse(localStorage.getItem("bookmarks"));
    displayBookmark();
}
// Add Borders
if (bookmarksArray.length == 0){
    fisrtCell.classList.add("border-bottom-left");
    lastCell.classList.add("border-bottom-right");
} else {
    fisrtCell.classList.remove("border-bottom-left");
    lastCell.classList.remove("border-bottom-right");
}
// Add Fun (Joker)
function addBookmark() {
    if (validateInputs(bookmarkName) && validateInputs(websiteURL)) {
        var bookmarks = {
            siteName: bookmarkNameInput.value,
            url: websiteURLInput.value,
        };
        bookmarksArray.push(bookmarks);
        localStorage.setItem("bookmarks", JSON.stringify(bookmarksArray));
        clearForm();
        displayBookmark();
    }
    fisrtCell.classList.remove("border-bottom-left");
    lastCell.classList.remove("border-bottom-right");
}
// Clear Fun
function clearForm() {
    bookmarkNameInput.value = "";
    websiteURLInput.value = "";
}
// Display Fun
function displayBookmark() {
    var tableRowData = "";
    for (var i = 0; i < bookmarksArray.length; i++) {
        tableRowData +=
        `
        <tr>
            <td>${i + 1}</td>
            <td>${bookmarksArray[i].siteName}</td>
            <td><button onclick="visitSite(${i})" class="visit-btn secondary-btn"><i class="fa-regular fa-eye"></i> Visit</button></td>
            <td><button onclick="deleteBookmark(${i})" class="delete-btn secondary-btn"><i class="fa-solid fa-trash"></i> Delete</button></td>
        </tr>
        ` 
    }
    document.getElementById("tableContent").innerHTML = tableRowData;
}
// Delete Fun
function deleteBookmark(i) {
    bookmarksArray.splice(i, 1);
    localStorage.setItem("bookmarks", JSON.stringify(bookmarksArray));
    displayBookmark();
    if (i == 0) {
        fisrtCell.classList.add("border-bottom-left");
        lastCell.classList.add("border-bottom-right");
    }
}
// Visit Fun
function visitSite(i) {
    open(bookmarksArray[i].url);
}
// Validate Form 
function validateInputs(input) {
    var regex = {
        bookmarkName: /^[a-zA-Z]{2,}/,
        websiteURL: /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/,
    };
    var isValid = regex[input.id].test(input.value);
    if (isValid) {
        input.classList.add("is-valid");
        input.classList.remove("is-invalid");
        input.nextElementSibling.classList.replace("d-block", "d-none");
    }
    else {
        input.classList.add("is-invalid");
        input.classList.remove("is-valid");
        input.nextElementSibling.classList.replace("d-none", "d-block");
    }
    return isValid;
}