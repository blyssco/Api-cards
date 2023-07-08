const containerDisplay = document.querySelector(".containerCards");

async function getData() {
  try {
    const response = await axios.get(
      "https://character-database.becode.xyz/characters"
    );
    const data = response.data;

    data.forEach((element) => {
      // create container for each char
      const displaySingleChar = document.createElement("article");
      displaySingleChar.className = "displayChar-container";

      // create content for each container

      // IMG and its content
      const imgSingleChar = document.createElement("img");
      imgSingleChar.className = "charImage";
      imgSingleChar.setAttribute(
        "src",
        `data:image/png;base64, ${element.image}`
      );
      imgSingleChar.setAttribute("alt", "image of the character");

      // SHORT DESCRIPTION OF CHARACTER AND ITS CONTENT
      const shortDescriptionSingleChar = document.createElement("p");
      shortDescriptionSingleChar.className = "short-description-character";
      shortDescriptionSingleChar.textContent = element.shortDescription;

      // NAME OF CHARACTER AND ITS CONTENT
      const nameSingleChar = document.createElement("p");
      nameSingleChar.className = "name-character";
      nameSingleChar.textContent = element.name;

      const descriptionOfCharacter = document.createElement("p");
      descriptionOfCharacter.className = "long-description";
      descriptionOfCharacter.textContent = element.description;

      // BUTTON SEE MORE
      const buttonSeeMoreChar = document.createElement("button");
      buttonSeeMoreChar.className = "seeMore-character";
      buttonSeeMoreChar.textContent = "See character";
      buttonSeeMoreChar.addEventListener("click", () => {
        // Store the selected character's ID in session storage
        sessionStorage.setItem("selectedCharacterId", element.id);

        // Navigate to the other page
        location.href = "./pages/singlePage/singlePage.html";
      });

      // APPEND EVERYTHING INTO THE DISPLAY CONTAINER
      displaySingleChar.append(
        imgSingleChar,
        nameSingleChar,
        shortDescriptionSingleChar,
        descriptionOfCharacter,
        buttonSeeMoreChar
      );

      // Append the char container into the chars container
      containerDisplay.appendChild(displaySingleChar);
    });
  } catch (error) {
    console.log(error);
  }
}

getData();

const buttonCreateChar = document.querySelector(".btn.long");
buttonCreateChar.addEventListener("click", () => {
  sessionStorage.clear();
  location.href = "./pages/createChar/createChar.html";
});

function searchBar() {
  const searchInput = document.getElementById("search");
  const cards = document.getElementsByClassName("name-character");
  const cardsContainer = document.getElementsByClassName(
    "displayChar-container"
  );

  searchInput.addEventListener("input", function () {
    const searchValue = searchInput.value.toLowerCase();

    Array.from(cardsContainer).forEach((container) => {
      const card = container.querySelector(".name-character");
      const cardName = card.innerText.toLowerCase();

      if (cardName.includes(searchValue)) {
        container.style.display = "flex";
      } else {
        container.style.display = "none";
      }
    });
  });
}

searchBar();

///comment