"use strict";
let newUrl = "https://reqres.in/api/users?page=1";
let section = document.querySelector(".filter");
let usersArray = [];
let input = document.getElementById("search");

async function asyncFetch() {
  try {
    let response = await fetch(newUrl);
    if (response.status !== 200) {
      throw new Error("Server is offline");
    }
    let newData = await response.json();
    return newData;
  } catch (error) {
    console.log("Error data:", error.message);
    throw error;
  }
}

asyncFetch()
  .then(function (recieved) {
    recieved.data.forEach((item) => {
      let userUl = document.createElement("ul");
      let userLi = document.createElement("li");
      section.appendChild(userUl);
      userUl.appendChild(userLi);
      userLi.innerText = item.first_name + " " + item.last_name + " ";
      usersArray.push(userLi);
      let avatar = document.createElement("img");
      avatar.setAttribute("src", item.avatar);
      userLi.appendChild(avatar);
    });
  })
  .catch(function (error) {
    console.log("Server error");
  });

function filter(search) {
  usersArray.forEach((item) => {
    if (item.innerText.toLowerCase().includes(search.toLowerCase())) {
      item.classList.remove("hide");
    } else {
      item.classList.add("hide");
    }
  });
}
input.addEventListener("keyup", function (event) {
  filter(input.value.trim(""));
});

// slider

let slideArrowL = document.querySelector(".left-arrow");
let slideArrowR = document.querySelector(".right-arrow");
let sliderIndex = 0;
let sliders = [
  {
    id: 1,
    imageUrl:
      "https://images.unsplash.com/photo-1619410283995-43d9134e7656?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fHByb2dyYW1taW5nfGVufDB8fDB8fHww",
  },
  {
    id: 2,
    imageUrl:
      "https://images.unsplash.com/photo-1624953587687-daf255b6b80a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cHl0aG9uJTIwY29kZXxlbnwwfHwwfHx8MA%3D%3D&w=1000&q=80",
  },
  {
    id: 3,
    imageUrl:
      "https://cdna.artstation.com/p/assets/images/images/010/311/492/large/louis-charavner-programming.jpg?1523753222",
  },
  {
    id: 4,
    imageUrl:
      "https://wallpaperboat.com/wp-content/uploads/2019/10/programming-14.jpg",
  },
];

function createPhotos() {
  let div = document.createElement("div");
  let img = document.createElement("img");
  img.setAttribute("src", sliders[sliderIndex].imageUrl);
  img.classList.add("sliders");
  document.querySelector(".slider-input").appendChild(div);
  div.appendChild(img);
}

createPhotos();

slideArrowR.addEventListener("click", function () {
  document.querySelector(".slider-input").innerHTML = "";
  createPhotos();
  if (sliderIndex == sliders.length - 1) {
    return;
  }
  sliderIndex++;
});

slideArrowL.addEventListener("click", function () {
  document.querySelector(".slider-input").innerHTML = "";
  createPhotos();
  if (sliderIndex == 0) {
    return;
  }
  sliderIndex--;
});
