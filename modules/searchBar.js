// Create search bar
const searchBar = async () => {
  const searchInput = document.getElementById("search");
  const cardsContainer = document.getElementsByClassName(
    "displayChar-container"
  );

  searchInput.addEventListener("input", () => {
    searchBarFunctionality(searchInput, cardsContainer);
  });
};

// Search Bar functionality
const searchBarFunctionality = (input, containerMain) => {
  const searchValue = input.value.toLowerCase();

  Array.from(containerMain).forEach((container) => {
    const card = container.querySelector(".name-character");
    const cardName = card.innerText.toLowerCase();

    if (cardName.includes(searchValue)) {
      container.style.display = "flex";
    } else {
      container.style.display = "none";
    }
  });
};

export default searchBar;
