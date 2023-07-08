import createElement from "./modules/createElementFactory.js";
import appendChilds from "./modules/appendChildren.js";
import searchBar from "./modules/searchBar.js";

const containerDisplay = document.querySelector(".containerCards");

const getDataFromApi = async () => {
  try {
    const response = await axios.get(
      "https://character-database.becode.xyz/characters"
    );
    const data = await response.data;

    data.forEach((element) => {
      // create container for each char
      const displaySingleChar = createElement(
        "article",
        "displayChar-container"
      );
      // create content for each container
      // IMG and its content
      const imgSingleChar = createElement("img", "charImage", "", {
        src: `data:image/png;base64, ${element.image}`,
        alt: "Character image",
      });

      // SHORT DESCRIPTION OF CHARACTER AND ITS CONTENT
      const shortDescriptionSingleChar = createElement(
        "p",
        "short-description-character",
        element.shortDescription
      );
      // NAME OF CHARACTER AND ITS CONTENT
      const nameSingleChar = createElement("p", "name-character", element.name);
      // DESCRIPTION OF CHAR AND ITS CONTENT
      const descriptionOfCharacter = createElement(
        "p",
        "long-description",
        element.description
      );
      // BUTTON SEE MORE
      const buttonSeeMoreChar = createElement(
        "button",
        "seeMore-character",
        "See character"
      );
      buttonSeeMoreChar.addEventListener("click", () => {
        // Store the selected character's ID in session storage
        sessionStorage.setItem("selectedCharacterId", element.id);

        // Navigate to the other page
        location.href = "./pages/singlePage/singlePage.html";
      });

      // Append the char container into the chars container
      appendChilds(containerDisplay, displaySingleChar);

      // APPEND EVERYTHING INTO THE DISPLAY CONTAINER

      appendChilds(
        //Parent
        displaySingleChar,
        //Childs
        imgSingleChar,
        nameSingleChar,
        shortDescriptionSingleChar,
        descriptionOfCharacter,
        buttonSeeMoreChar
      );
    });
  } catch (error) {
    console.log(error);
  }
};

getDataFromApi();

const buttonCreateChar = document.querySelector(".btn.long");
buttonCreateChar.addEventListener("click", () => {
  sessionStorage.clear();
  location.href = "./pages/createChar/createChar.html";
});

searchBar();
