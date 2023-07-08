// Function that creates a new element
const createElement = (
  element,
  className,
  textContent = "",
  attributes = { src: "", alt: "" }
) => {
  const newElement = document.createElement(element);
  newElement.className = className;
  newElement.textContent = textContent;
  newElement.setAttribute("src", attributes.src);
  newElement.setAttribute("alt", attributes.alt);

  return newElement;
};

export default createElement;
