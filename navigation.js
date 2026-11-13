const menuToggle = document.querySelector(".menu-toggle");
const primaryNav = document.querySelector(".primary-nav");
const navBackdrop = document.querySelector(".nav-backdrop");

if (menuToggle && primaryNav && navBackdrop) {
    const mobileNavigation = window.matchMedia("(max-width: 700px)");

    function setNavigationOpen(isOpen) {
        menuToggle.setAttribute("aria-expanded", String(isOpen));
        menuToggle.setAttribute("aria-label", isOpen ? "Close navigation" : "Open navigation");
        primaryNav.classList.toggle("is-open", isOpen);
        primaryNav.setAttribute("aria-hidden", String(mobileNavigation.matches && !isOpen));
        primaryNav.inert = mobileNavigation.matches && !isOpen;
        navBackdrop.hidden = !isOpen;
        document.body.classList.toggle("navigation-open", isOpen);

        if (isOpen) {
            primaryNav.querySelector("a").focus();
        } else if (mobileNavigation.matches) {
            menuToggle.focus();
        }
    }

    menuToggle.addEventListener("click", () => {
        setNavigationOpen(menuToggle.getAttribute("aria-expanded") !== "true");
    });

    navBackdrop.addEventListener("click", () => setNavigationOpen(false));

    primaryNav.addEventListener("click", (event) => {
        if (event.target instanceof HTMLAnchorElement && mobileNavigation.matches) {
            setNavigationOpen(false);
        }
    });

    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape" && menuToggle.getAttribute("aria-expanded") === "true") {
            setNavigationOpen(false);
        }

        if (event.key === "Tab" && menuToggle.getAttribute("aria-expanded") === "true") {
            const menuLinks = [...primaryNav.querySelectorAll("a")];
            const firstItem = menuLinks[0];
            const lastItem = menuToggle;

            if (event.shiftKey && document.activeElement === firstItem) {
                event.preventDefault();
                lastItem.focus();
            } else if (!event.shiftKey && document.activeElement === lastItem) {
                event.preventDefault();
                firstItem.focus();
            }
        }
    });

    mobileNavigation.addEventListener("change", (event) => {
        setNavigationOpen(false);
        primaryNav.setAttribute("aria-hidden", String(event.matches));
        primaryNav.inert = event.matches;
    });

    primaryNav.setAttribute("aria-hidden", String(mobileNavigation.matches));
    primaryNav.inert = mobileNavigation.matches;
}
