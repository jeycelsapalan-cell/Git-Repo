const generatorButton = document.getElementById("generator-button");
const palleteContainer = document.querySelector(".pallete-container");

generatorButton.addEventListener("click", generatePallete);

palleteContainer.addEventListener("click", function (e) {
    if (e.target.classList.contains("copy-button")) {
        const hexValue = e.target.previousElementSibling.textContent;
        navigator.clipboard.writeText(hexValue)
            .then(() => showCopySuccess(e.target))
            .catch((err) => console.log(err));
    } else if (e.target.classList.contains("color")) {
        const hexValue = e.target.nextElementSibling.querySelector(".hex-value").textContent;
        const copyButton = e.target.nextElementSibling.querySelector(".copy-button");
        navigator.clipboard.writeText(hexValue)
            .then(() => showCopySuccess(copyButton))
            .catch((err) => console.log(err));
    }
});

function showCopySuccess(copyButton) {
    copyButton.classList.remove("far", "fa-copy");
    copyButton.classList.add("fas", "fa-check");

    setTimeout(() => {
        copyButton.classList.remove("fas", "fa-check");
        copyButton.classList.add("far", "fa-copy");
    }, 1500)
}

function generatePallete() {
    const colors = [];

    for (let i = 0; i < 5; i++) {
        colors.push(generateRandomColor());
    }
    updatePalleteDisplay(colors);
}

function generateRandomColor() {
    const letters = "0123456789ABCDEF";
    let color = "#";

    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

function updatePalleteDisplay(colors) {
    const colorBoxes = document.querySelectorAll(".color-box");

    colorBoxes.forEach((box, index) => {
        const color = colors[index];
        const colorDiv = box.querySelector(".color");
        const hexValue = box.querySelector(".hex-value");

        colorDiv.style.backgroundColor = color;
        hexValue.textContent = color;
    });
}