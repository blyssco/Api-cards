import createElement from "../../modules/createElementFactory.js";
import appendChilds from "../../modules/appendChildren.js";

const fetchCharacterData = async () => {
  const containerToStore = document.querySelector(".container");
  const selectedCharacterId = sessionStorage.getItem("selectedCharacterId");

  try {
    const response = await axios.get(
      `https://character-database.becode.xyz/characters/${selectedCharacterId}`
    );
    const selectedCardData = await response.data;

    const displayedImage = createElement("img", "charImage", "", {
      src: `data:image/png;base64, ${selectedCardData.image}`,
      alt: "Character image",
    });

    const name = createElement("p", "name-character", selectedCardData.name);

    const shortDescription = createElement(
      "p",
      "short-description-character",
      selectedCardData.shortDescription
    );

    const description = createElement(
      "p",
      "long-description",
      selectedCardData.description
    );

    const divForButton = createElement("div", "buttons-container");

    const buttonToDeleteCard = createElement(
      "button",
      "delete-character",
      "Delete character"
    );
    buttonToDeleteCard.addEventListener("click", async () => {
      try {
        await axios.delete(
          `https://character-database.becode.xyz/characters/${selectedCharacterId}`
        );
        containerToStore.remove();
        window.location.href = "../../index.html";
      } catch (error) {
        console.log(error);
      }
    });

    const buttonToUpdate = createElement(
      "button",
      "update-character",
      "Update character"
    );
    buttonToUpdate.addEventListener("click", async () => {
      sessionStorage.setItem("selectedCharacterId", selectedCardData.id);
      window.location.href = "../../pages/createChar/createChar.html";
    });
    // Append Children
    appendChilds(
      containerToStore,
      displayedImage,
      name,
      shortDescription,
      description,
      divForButton
    );
    appendChilds(divForButton, buttonToUpdate, buttonToDeleteCard);
  } catch (error) {
    console.error(error);
  }
};

fetchCharacterData();
