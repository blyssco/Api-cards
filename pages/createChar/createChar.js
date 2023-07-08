const createCharForm = document.querySelector("#createNewChar");
// Form inputs
const imageForm = document.querySelector("#image");
const nameForm = document.querySelector("#name");
const shortDescriptionForm = document.querySelector("#shortDescription");
const descriptionForm = document.querySelector("#description");
const displayImg = document.querySelector(".displayImage");
// Select the input element with the ID "image"
const uploadImg = document.getElementById("image");
// Get (if there's any) the id of the current character
const id = sessionStorage.getItem("selectedCharacterId");

// Delete or populate form according to if there's an Id or not
const populateForm = async () => {
  if (id !== null) {
    const response = await axios.get(
      `https://character-database.becode.xyz/characters/${id}`
    );
    const data = response.data;
    nameForm.value = data.name;
    shortDescriptionForm.value = data.shortDescription;
    descriptionForm.value = data.description;
  } else {
    nameForm.value = "";
    shortDescriptionForm.value = "";
    descriptionForm.value = "";
  }
};

// When page load display image and populate form (if theres any img/form value)
window.addEventListener("load", async () => {
  const response = await fetch(
    `https://character-database.becode.xyz/characters/${id}`
  );
  const data = await response.json();
  displayImg.style.backgroundImage = `url(data:image/png;base64,${data.image})`;

  populateForm();
});

// When there's a change in the img input display it
imageForm.addEventListener("change", () => {
  readImage(imageForm);
});

// Function to read the selected image file and return the base64-encoded image data
const readImage = async (file) => {
  const fileType = file.files[0];
  // Check if the file is an image by verifying its MIME type
  if (fileType) {
    if (fileType.type && !fileType.type.startsWith("image/")) {
      throw new Error("File is not an image.");
    } else {
      // Create a Promise to handle the asynchronous file reading
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (e) => {
          displayImg.style.backgroundImage = `url(${e.target.result})`;
          resolve(displayImg.style.backgroundImage.split(",")[1]);
        };
        reader.onerror = () => {
          reject(new Error("Error occurred while reading the file."));
        };
        reader.readAsDataURL(fileType);
      });
    }
  } else {
    return displayImg.style.backgroundImage.split(",")[1];
  }
};

// Function to populate the form data and convert the selected image to base64 format
const populateDataObj = async () => {
  // Collect all form data
  const allFormData = new FormData(createCharForm);
  // Convert form data to a regular object
  const data = Object.fromEntries(allFormData);
  if (id === null) {
    try {
      const convertedValue = await readImage(uploadImg);
      data.image = convertedValue;
    } catch (error) {
      console.error(error);
    }
  }
  return data;
};

// Add a submit event listener to the form
createCharForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  if (id !== null) {
    const obj = await populateDataObj();
    const image = await readImage(uploadImg);
    obj.image = image;
    try {
      const obj = await populateDataObj();
      const image = await readImage(uploadImg);
      obj.image = image;
      const response = await fetch(
        `https://character-database.becode.xyz/characters/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(obj),
        }
      );
      if (response.ok) {
        const responseData = await response.data;
        console.log(responseData);
        window.location.href = "../../index.html";
      }
    } catch (error) {
      console.log(`There has been an error: ${error}`);
    }
  } else {
    // Store the return value of populateDataObj which is a object with the form values
    const obj = await populateDataObj();
    try {
      const response = await fetch(
        "https://character-database.becode.xyz/characters",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(obj),
        }
      );
      // Check if it was accepted by the API
      if (response.ok) {
        const responseData = await response.json();
        console.log(responseData);
        window.location.href = "../../index.html";
      }
    } catch (error) {
      console.log(`There has been an error, ${error}!`);
    }
  }
});
