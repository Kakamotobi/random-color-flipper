const colorName = document.querySelector(".color-name");
const copyBtn = document.querySelector(".copy-btn");
const genColorBtn = document.querySelector(".gen-color-btn");
const hexBtn = document.querySelector("#hexBtn");
const rgbBtn = document.querySelector("#rgbBtn");
const hslBtn = document.querySelector("#hslBtn");

// ----------Event Listeners---------- //
genColorBtn.addEventListener("click", function () {
    const newColor = genRandomColor();
    document.body.style.backgroundColor = newColor.rgb();
    colorName.innerText = newColor.rgb();
});

hexBtn.addEventListener("click", function () {
    colorName.innerText = new Color(...currRGB).hex();
});

rgbBtn.addEventListener("click", function () {
    colorName.innerText = new Color(...currRGB).rgb();
});

hslBtn.addEventListener("click", function () {
    colorName.innerText = new Color(...currRGB).hsl();
});

copyBtn.addEventListener("click", copy);

// ----------Color Class---------- //
class Color {
    constructor(r, g, b) {
        this.r = r;
        this.g = g;
        this.b = b;
        this.calcHSL();
    }
    hex() {
        const { r, g, b } = this;
        return (
            "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)
        );
    }
    rgb() {
        const { r, g, b } = this;
        return `rgb(${r}, ${g}, ${b})`;
    }
    hsl() {
        const { h, s, l } = this;
        return `hsl(${h}, ${s}%, ${l}%)`;
    }
    calcHSL() {
        let { r, g, b } = this;
        r /= 255;
        g /= 255;
        b /= 255;

        let cmin = Math.min(r, g, b),
            cmax = Math.max(r, g, b),
            delta = cmax - cmin,
            h = 0,
            s = 0,
            l = 0;
        if (delta == 0) h = 0;
        else if (cmax == r) h = ((g - b) / delta) % 6;
        else if (cmax == g) h = (b - r) / delta + 2;
        else h = (r - g) / delta + 4;

        h = Math.round(h * 60);

        if (h < 0) h += 360;
        l = (cmax + cmin) / 2;

        s = delta == 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));

        s = +(s * 100).toFixed(1);
        l = +(l * 100).toFixed(1);

        this.h = h;
        this.s = s;
        this.l = l;
    }
}

// ----------Functions---------- //
let currRGB;
function genRandomColor() {
    const r = Math.floor(Math.random() * 255 + 1);
    const g = Math.floor(Math.random() * 255 + 1);
    const b = Math.floor(Math.random() * 255 + 1);
    currRGB = [r, g, b];
    return new Color(r, g, b);
}
function copy() {
    const clipboard = navigator.clipboard;
    clipboard.writeText(colorName.innerText).then(() => {
        // copyBtn.style.backgroundColor = "blue";
    });
}
