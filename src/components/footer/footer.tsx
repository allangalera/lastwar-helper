export const Footer = () => {
  return (
    <footer class="flex flex-col items-center gap-1 py-2">
      <p class="text-balance text-center">
        Made with ❤️ by © {new Date().getFullYear()} Aragantinis #1591 and
        Scarmoon #1589
      </p>
      <p class="text-center text-balance">
        Not affiliated with{" "}
        <a href="https://www.lastwar.com/" rel="noreferrer">
          Last War: Survival
        </a>{" "}
        or First Fun.
      </p>
    </footer>
  );
};
