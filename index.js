module.exports = {
  displayData: require("./displayData"),
  generateImageContainer: require("./generateImageContainer"),
};

/**
 * @author Jinal Tandel
 * @description For display the explanations of the image
 * @param {*} event
 * @param {*} id
 */
function displayData(event, id) {
  document.addEventListener("DOMContentLoaded", () => {
    const target = document.getElementById(id);
    const explanations = document.querySelectorAll(`.${id}explanation`);
    target.addEventListener(event, () => {
      explanations.forEach((explanation) => {
        explanation.style.display = "block";
      });
    });
    target.addEventListener("mouseleave", () => {
      explanations.forEach((explanation) => {
        explanation.style.display = "none";
      });
    });
  });
}

/**
 * @author Jinal Tandel
 * @description create the HTML of image container with explanations data
 * @param {*} explanations
 * @param {*} imagePath
 * @param {*} imageId
 * @returns containerHTML
 */
function generateImageContainer(explanations, imagePath, imageId) {
  let count = 1;
  const container = document.createElement("div");
  container.id = "image-container";
  container.style.position = "relative";
  container.style.display = "inline-block";

  const image = document.createElement("img");
  image.src = imagePath;
  image.alt = "Image";
  image.id = imageId;

  container.appendChild(image);

  count++;
  explanations.forEach((explanation, index) => {
    const explanationDiv = document.createElement("div");
    explanationDiv.id = `${imageId}explanation-${index + 1}`;
    explanationDiv.className = "explanation ";
    explanationDiv.className += `${imageId}explanation`;

    if (explanation.labelPosition) {
      const transformedString = Object.entries(explanation.labelPosition)
        .map(([key, value]) => `${key}: ${value}`)
        .join(";");
      explanationDiv.style = transformedString;
    }

    const label = document.createElement("p");
    label.className = "label-name";
    label.textContent = explanation.label;

    const arrowLine = document.createElement("div");
    arrowLine.className = "arrow";
    const transformedObject = {};
    for (const key in explanation.arrowPosition) {
      const newKey = camelToKebab(key);
      transformedObject[newKey] = explanation.arrowPosition[key];
    }
    const transformedString = Object.entries(transformedObject)
      .map(([key, value]) => `${key}: ${value}`)
      .join(";");
    arrowLine.style = transformedString;

    explanationDiv.appendChild(label);
    explanationDiv.appendChild(arrowLine);

    container.appendChild(explanationDiv);
  });
  return container.outerHTML;
}

//For converting string from camelcase to Kebab
function camelToKebab(camelCaseString) {
  return camelCaseString.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase();
}

module.exports = displayData;
module.exports = generateImageContainer;
