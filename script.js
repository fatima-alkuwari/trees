const sidebar = document.querySelector("#sidebar");
const mainContentContainer = document.querySelector("#content");

//? hamburgerMenu

//? array
const leafBtns = [];

//! create BTNS and CONTENT
const createMainContent = (object) => {
  mainContentContainer.innerHTML = "";
  if (object.title) {
    const title = document.createElement("h2");
    title.innerText = object.title;
    mainContentContainer.appendChild(title);
  }

  if (object.img) {
    const img = document.createElement("img");
    img.classList.add("mainContent-img");

    img.src = object.img;

    mainContentContainer.appendChild(img);
  }
  if (object.description) {
    const description = document.createElement("p");
    description.innerText = object.description;
    mainContentContainer.appendChild(description);
  }
};

const createSidebarBtn = (object) => {
  const btn = document.createElement("div");
  btn.classList.add("btn-leaf");
  btn.setAttribute("content", object.contentId);

  const img = document.createElement("img");
  img.classList.add("sidebar-img");
  img.src = object.path;

  btn.appendChild(img);

  sidebar.appendChild(btn);

  leafBtns.push(btn);
};

const displayMainContent = async (contentID) => {
  const response = await fetch("./content.json");
  const content = await response.json();

  content.forEach((e) => {
    if (e.id === contentID) {
      createMainContent(e);
    }
  });
};

const fetchBtnData = () => {
  fetch("./sidebar.json")
    .then((res) => res.json())
    .then((obj) => {
      for (let i = 0; i < obj.length; i++) {
        createSidebarBtn(obj[i]);
      }
      leafBtns[0].classList.add("gray-leaf");
      displayMainContent("1");
    })
    .catch((err) => console.log(err));
};

//! FETCH BTNS AND DISPLAY THEM
fetchBtnData();

//? Add event listeners on buttons and display the main content when clicked
sidebar.addEventListener("click", (e) => {
  if (e.target.classList.value === "btn-leaf") {
    const contentID = e.target.getAttribute("content");
    e.target.classList.add("gray-leaf");

    displayMainContent(contentID);
  }
});
