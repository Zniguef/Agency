// Check If There's Local Storage Color Option
let mainColors = localStorage.getItem("color-option");

if (mainColors !== null) {
  document.documentElement.style.setProperty("--main-color", mainColors);

  // Remove Active class From All Colors List Item

  document.querySelectorAll(".colors-list li").forEach((element) => {
    element.classList.remove("active");

    // Add Active Class On Element With Data-Color === Local Storage Item
    if (element.dataset_color === mainColors) {
      // Add Active Class
      element.classList.add("active");
    }
  });

  // Add Active Class On Element With Data-Color === Local Storage Item
}

// Random Background Option
let backgroundOption = true;

// Variable To Control The background Interval
let backgroundInterval;

// Chek If There's Local Storage Random Background Item
let backgroundLocalItem = localStorage.getItem("background_option");

// Chek If Random Background Local Storage Is Not EMpty
if (backgroundLocalItem !== null) {
  if (backgroundLocalItem === "true") {
    backgroundOption = true;
  } else {
    backgroundOption = false;
  }

  // Remove Active Class From All Span
  document.querySelectorAll(".random-backgrounds span").forEach((element) => {
    element.classList.remove("active");
  });

  if (backgroundLocalItem === "true") {
    document.querySelector(".random-backgrounds .yes").classList.add("active");
  } else {
    document.querySelector(".random-backgrounds .no").classList.add("active");
  }
}

// Toggle Spin Class On Icon

document.querySelector(".toggle-settings .fa-gear").onclick = function () {
  // Toggle Class Fa-spin For Rotation On Self
  this.classList.toggle("fa-spin");

  // Toggle Open On Main Settings Box
  document.querySelector(".settings-box").classList.toggle("open");
};

// Swith Colors
const colorsLi = document.querySelectorAll(".colors-list li");

// Loop On All List Items
colorsLi.forEach((li) => {
  // Click On Every List Items
  li.addEventListener("click", (e) => {
    // Set Color On Root
    document.documentElement.style.setProperty(
      "--main-color",
      e.target.dataset.color
    );

    // Set Color On LOcal Storage
    localStorage.setItem("color-option", e.target.dataset.color);

    handleActive(e);
  });
});

// Swith Random Background Option
const randomBackEl = document.querySelectorAll(".random-backgrounds span");

// Loop On All spans
randomBackEl.forEach((span) => {
  // Click On Every span
  span.addEventListener("click", (e) => {
    handleActive(e);

    if (e.target.dataset.background === "yes") {
      backgroundOption = true;
      //console.log(backgroundOption);
      randomizeImds();
      localStorage.setItem("background_option", true);
    } else {
      backgroundOption = false;
      // console.log(backgroundOption);
      clearInterval(backgroundInterval);
      localStorage.setItem("background_option", false);
    }
  });
});

// Select Landing Page Element

let landingPage = document.querySelector(".landing-page");

// Get Array Of Imgs

let imgsArray = ["01.jpg", "02.jpg", "03.jpg", "04.jpg", "05.jpg"];

// Functiond To Randomiz Imgs
function randomizeImds() {
  if (backgroundOption === true) {
    backgroundInterval = setInterval(() => {
      // Get Random Number

      let randomNumber = Math.floor(Math.random() * imgsArray.length);

      // Change Background Image Url

      landingPage.style.backgroundImage =
        'url("imgs/' + imgsArray[randomNumber] + ' ")';
    }, 1000);
  }
}

randomizeImds();

// Select Skills Selector

let ourSkills = document.querySelector(".skills");

window.onscroll = function () {
  // Skills Offset Top
  let skillsOffsetTop = ourSkills.offsetTop;

  // this.console.log(skillsOffsetTop);

  // Skills Outer Height
  let skillsOuterHeight = ourSkills.offsetHeight;

  // Window Height
  let windowHeight = this.innerHeight;

  // Window Scroll Top
  let windowScrollTop = this.pageYOffset;

  if (windowScrollTop > skillsOffsetTop + skillsOuterHeight - windowHeight) {
    let allSkills = document.querySelectorAll(
      ".skill-box .skill-progress span"
    );

    allSkills.forEach((skill) => {
      skill.style.width = skill.dataset.progress;
    });
  }
};

// Creat Popup With The Img

let ourGallery = document.querySelectorAll(".gallery img");

ourGallery.forEach((img) => {
  img.addEventListener("click", (e) => {
    // Creat Overlay Element
    let overlay = document.createElement("div");

    // Add  Class The Overlay
    overlay.className = "popup-overlay";

    // Apend Overlay To The Body
    document.body.appendChild(overlay);

    // Creat The Popup Box
    let popupBox = document.createElement("div");

    // Add Class To The Popup Box
    popupBox.className = "popup-box";

    if (img.alt !== null) {
      // Creat Heading
      let imgHeading = document.createElement("h3");

      // Creat Text For Heading
      let imgText = document.createTextNode(img.alt);

      // Append The Text To Heading
      imgHeading.appendChild(imgText);

      // Append Heading To The  Popup Box
      popupBox.appendChild(imgHeading);
    }

    // Creat The Img
    let popupImage = document.createElement("img");

    // Set Img Source
    popupImage.src = img.src;

    // Add Image To Popup Box
    popupBox.appendChild(popupImage);

    // Append Popup Box To The Body
    document.body.appendChild(popupBox);

    // Creat Close Span
    let closeButton = document.createElement("span");

    // Creat The Close Button Text
    let closeButtonText = document.createTextNode("X");

    // Append Text The Close Button
    closeButton.appendChild(closeButtonText);

    // Add Class The Close Button
    closeButton.className = "close-button";

    // Add Close Button To THe Popup Box
    popupBox.appendChild(closeButton);
  });
});

// Close Popup
document.addEventListener("click", function (e) {
  if (e.target.className == "close-button") {
    // Remove The Current Popup
    e.target.parentNode.remove();

    // Remove Overlay
    document.querySelector(".popup-overlay").remove();
  }
});

// Selece All Bullets
const allBullets = document.querySelectorAll(".nav-bullets .bullet");

// Selece All Links
const allLinks = document.querySelectorAll(".links a");

function scrollToSomeWher(elements) {
  // Selece All Links

  elements.forEach((element) => {
    element.addEventListener("click", (e) => {
      e.preventDefault();

      document.querySelector(e.target.dataset.section).scrollIntoView({
        behavior: "smooth",
      });
    });
  });
}
scrollToSomeWher(allBullets);
scrollToSomeWher(allLinks);

// Handle Active State

function handleActive(ev) {
  // Remove Active class From All Childrens
  ev.target.parentElement.querySelectorAll(".active").forEach((element) => {
    element.classList.remove("active");
  });

  // Add Active Class On Self
  ev.target.classList.add("active");
}

let bulletsSpan = document.querySelectorAll(".bullets-option span");

let bulletsContainer = document.querySelector(".nav-bullets");

let bulletLocalItem = localStorage.getItem("bullets-option");

if (bulletLocalItem !== null) {
  bulletsSpan.forEach((span) => {
    span.classList.remove("active");
  });

  if (bulletLocalItem === "block") {
    bulletsContainer.style.display = "block";
    document.querySelector(".bullets-option .yes").classList.add("active");
  } else {
    bulletsContainer.style.display = "none";
    document.querySelector(".bullets-option .no").classList.add("active");
  }
}

bulletsSpan.forEach((span) => {
  span.addEventListener("click", (e) => {
    if (span.dataset.display === "show") {
      bulletsContainer.style.display = "block";
      localStorage.setItem("bullets-option", "block");
    } else {
      bulletsContainer.style.display = "none";
      localStorage.setItem("bullets-option", "none");
    }

    handleActive(e);
  });
});

// Reset Buton

document.querySelector(".reset-options").onclick = function () {
  // localStorage.clear();
  localStorage.removeItem("bullets-option");
  localStorage.removeItem("background_option");
  localStorage.removeItem("color-option");

  // Reload Window
  window.location.reload();
};

// Togle Menu
let toggleBtn = document.querySelector(".toggle-menu");
let tLinks = document.querySelector(".links");

toggleBtn.onclick = function (e) {
  // Stop Propagation
  e.stopPropagation();

  // Toggle Class "menu-active" On Button
  this.classList.toggle("menu-active");

  // Toggle Class "open" On Links
  tLinks.classList.toggle("open");
};

// Click Anywhere Outside Menu and Toggle button
document.addEventListener("click", (e) => {
  if (e.target !== toggleBtn && e.target !== tLinks) {
    // Chek If Menu Is Open
    if (tLinks.classList.contains("open")) {
      // Toggle Class "menu-active" On Button
      toggleBtn.classList.toggle("menu-active");

      // Toggle Class "open" On Links
      tLinks.classList.toggle("open");
    }
  }
});

// Stop Propagation On Menu
tLinks.onclick = function (e) {
  e.stopPropagation();
};
