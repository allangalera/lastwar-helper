function initializeTheme() {
    const theme = localStorage.getItem("theme") || (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light")
    
    document.documentElement.dataset.theme = theme;
    
    // Theme color
    const themeColorMeta = document
        .querySelector('meta[name="theme-color"]') ?? document.createElement('meta');
    themeColorMeta.name = "theme-color";
    if (theme === "dark") {
        themeColorMeta.content = "#020617"
        // meta.content = "oklch(12.9% 0.042 264.695)"
    } else {
        themeColorMeta.content = "#e2e8f0"
        // meta.content = "oklch(92.9% 0.013 255.508)"
    }
    document.getElementsByTagName('head')[0].appendChild(themeColorMeta);
    
    // Color scheme
    const colorSchemeMeta = document
        .querySelector('meta[name="color-scheme"]') ?? document.createElement('meta');
    colorSchemeMeta.name = "color-scheme";
    colorSchemeMeta.content = theme
    document.getElementsByTagName('head')[0].appendChild(colorSchemeMeta);
}

initializeTheme()