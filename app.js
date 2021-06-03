const colorName = document.querySelector(".colorName");
const genColorBtn = document.querySelector("#genColorBtn");
const hexBtn = document.querySelector("#hexBtn");
const rgbBtn = document.querySelector("#rgbBtn");
const hslBtn = document.querySelector("#hslBtn");

// Generate Random Color
const genRandomColor = () => {
    const r = Math.floor(Math.random() * 255 + 1);
    const g = Math.floor(Math.random() * 255 + 1);
    const b = Math.floor(Math.random() * 255 + 1);
    return new Color(r, g, b);
};
