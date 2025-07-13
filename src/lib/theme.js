const theme = localStorage.getItem("theme") || (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light")

document.documentElement.dataset.theme = theme;

const meta = document.createElement('meta');
meta.name = "theme-color";
if (theme === "dark") {
    meta.content = "oklch(12.9% 0.042 264.695)"
} else {
    meta.content = "oklch(92.9% 0.013 255.508)"
}
document.getElementsByTagName('head')[0].appendChild(meta);