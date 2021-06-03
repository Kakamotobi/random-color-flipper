const colorName = document.querySelector(".colorName");
const genColorBtn = document.querySelector("#genColorBtn");
const hexBtn = document.querySelector("#hexBtn");
const rgbBtn = document.querySelector("#rgbBtn");
const hslBtn = document.querySelector("#hslBtn");

// Generate Random Color
let currRGB;
const genRandomColor = () => {
    const r = Math.floor(Math.random() * 255 + 1);
    const g = Math.floor(Math.random() * 255 + 1);
    const b = Math.floor(Math.random() * 255 + 1);
    currRGB = [r, g, b];
    return new Color(r, g, b);
};

// Event Listeners
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

// Color Model Conversions
class Color {
    constructor(r, g, b) {
        this.r = r;
        this.g = g;
        this.b = b;
        this.calcHSL();
    }
    // Add methods to the prototype.
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
    // For hsl
    calcHSL() {
        let { r, g, b } = this;
        // Make r, g, and b fractions of 1
        r /= 255;
        g /= 255;
        b /= 255;

        // Find greatest and smallest channel values
        let cmin = Math.min(r, g, b),
            cmax = Math.max(r, g, b),
            delta = cmax - cmin,
            h = 0,
            s = 0,
            l = 0;
        if (delta == 0) h = 0;
        else if (cmax == r)
            // Red is max
            h = ((g - b) / delta) % 6;
        else if (cmax == g)
            // Green is max
            h = (b - r) / delta + 2;
        // Blue is max
        else h = (r - g) / delta + 4;

        h = Math.round(h * 60);

        // Make negative hues positive behind 360°
        if (h < 0) h += 360;
        // Calculate lightness
        l = (cmax + cmin) / 2;

        // Calculate saturation
        s = delta == 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));

        // Multiply l and s by 100
        s = +(s * 100).toFixed(1);
        l = +(l * 100).toFixed(1);

        // Assign h, s, l to the object instance so that we can reuse it.
        this.h = h;
        this.s = s;
        this.l = l;
    }
}
