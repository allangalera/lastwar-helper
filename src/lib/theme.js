const theme = localStorage.getItem("theme") || (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light")

document.documentElement.dataset.theme = theme;

const meta = document.createElement('meta');
meta.name = "theme-color";
if (theme === "dark") {
    meta.cotent = "#020617"
} else {
    meta.cotent = "#e2e8f0"
}
document.getElementsByTagName('head')[0].appendChild(meta);