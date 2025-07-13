export const Footer = () => {
  return (
    <footer class="flex flex-col items-center gap-1 py-2">
      <p class="text-center">
        Made with ❤️ by © {new Date().getFullYear()} Aragantinis #1591
      </p>
      <p class="text-center">
        Not affiliated with{" "}
        <a href="https://www.lastwar.com/" rel="noreferrer">
          Last War: Survival
        </a>{" "}
        or First Fun.
      </p>
    </footer>
  );
};
