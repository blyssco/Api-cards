// Function that will append all the childs
const appendChilds = (parent, ...childs) => {
  childs.forEach((child) => {
    parent.appendChild(child);
  });
};

export default appendChilds;
