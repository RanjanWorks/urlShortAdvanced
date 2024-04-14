const Links = JSON.parse(localStorage.getItem("link") || "[]");
let ShortBtn = document.getElementById("shortbtn");
let urlInput = document.getElementById("urlinput");
let TitleInput = document.getElementById("title");
let form = document.getElementById("form");
let linkContainer = document.querySelector(".links");

const spinner = `    <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
    width="40px" height="40px" viewBox="0 0 40 40" enable-background="new 0 0 40 40" xml:space="preserve">
 <path opacity="0.2" fill="#000" d="M20.201,5.169c-8.254,0-14.946,6.692-14.946,14.946c0,8.255,6.692,14.946,14.946,14.946
     s14.946-6.691,14.946-14.946C35.146,11.861,28.455,5.169,20.201,5.169z M20.201,31.749c-6.425,0-11.634-5.208-11.634-11.634
     c0-6.425,5.209-11.634,11.634-11.634c6.425,0,11.633,5.209,11.633,11.634C31.834,26.541,26.626,31.749,20.201,31.749z"/>
 <path fill="#fff" d="M26.013,10.047l1.654-2.866c-2.198-1.272-4.743-2.012-7.466-2.012h0v3.312h0
     C22.32,8.481,24.301,9.057,26.013,10.047z">
   <animateTransform attributeType="xml"
       attributeName="transform"
       type="rotate"
       from="0 20 20"
       to="360 20 20"
       dur="0.5s"
       repeatCount="indefinite"/>
 </path>
</svg>`;

form.addEventListener("submit", (e) => {
  e.preventDefault();
  FetchData();
});

function displayLinks() {
  document.querySelectorAll(".card").forEach((li) => li.remove());
  let reversedLinks = [...Links].reverse();
  reversedLinks.forEach((item, id) => {
    let newLink = ` <div class="card">
<a href="${item.link}" target="_blank">${item.link}</a>
    <div>
    <i id="cp" onclick="copyThisLink(this,'${item.link}')" class="material-icons">content_copy</i>
     <i  id="cp" onclick="deleteLink(${id})" class="material-icons">delete</i>
    </div>     
  </div>`;
    linkContainer.insertAdjacentHTML("beforeend", newLink);
  });
}

displayLinks();

function deleteLink(id) {
  Links.splice(id, 1);
  localStorage.setItem("link", JSON.stringify(Links));
  displayLinks();
}

function copyThisLink(elem, link) {
  navigator.clipboard.writeText(link);
  console.log(elem);
  elem.innerHTML = "check";
  setTimeout(() => {
    elem.innerHTML = "content_copy";
  }, 4000);
}

function addLinks(link) {
  let newLink = { link };
  Links.push(newLink);
  localStorage.setItem("link", JSON.stringify(Links));
  displayLinks();
}

let model = document.querySelector("dialog");
var cleave = new Cleave("#title", {
  prefix: "https://1pt.co/",
});

function openModel() {
  model.showModal();
}
function closeModel() {
  model.close();
}

// ShortBtn.innerHTML = spinner

function FetchData() {
  if (!urlInput.value) return;
  ShortBtn.innerHTML = spinner;
  let mainUrl = urlInput.value;
  let newUrl = TitleInput.value.split("/")[3];
  let API = `https://csclub.uwaterloo.ca/~phthakka/1pt/addURL.php?url=${mainUrl}&cu=${newUrl}`;

  fetch(API)
    .then((res) => res.json())
    .then((data) => {
      if (data.status === 201) {
        let url = "https://1pt.co/" + data.short;
        addLinks(url);
        urlInput.value = "";
        ShortBtn.innerHTML = "Shorten";
        TitleInput.value = "";
      } else {
        confirm("This Url is taken try diffrent one");
      }
    });
}
