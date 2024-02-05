const body = document.querySelector("body");
const langSwitcher = document.querySelector(".lang-switcher");

const translate = element => {
    const children = Array.from(element.children);
    if (children.length === 0)
        return;

    children.forEach(child => {
        translate(child);
        if (!child.attributes.ar)
            return;

        const selector = (child.tagName === "INPUT" || child.tagName === "TEXTAREA" ? "placeholder" : "innerHTML");
        const temp = child[selector];
        child[selector] = child.attributes.ar.value;
        child.attributes.ar.value = temp;
        child.classList.toggle("letter-spacing-none");

    });
}

const toggleDirection = (element, dir) => {
    const children = Array.from(element.children);
    if (children.length === 0)
        return;

    children.forEach(child => {
        toggleDirection(child, dir);
        const styles = getComputedStyle(child);
        if (styles.textAlign === "center")
            return;

        child.style.textAlign = dir;
        child.style.marginLeft = styles.marginRight;
        child.style.marginRight = styles.marginLeft;
    });
}

const feature = document.querySelector(".feature");
const handleTranslation = () => {
    const ltr = (document.documentElement.attributes.dir.value === "ltr");
    document.documentElement.setAttribute("dir", (ltr ? "rtl" : "ltr"));
    translate(body);
    toggleDirection(body, (ltr ? "right" : "left"));
    if (feature)
        feature.style.backgroundImage = `url(./assets/feature-${ltr ? "right" : "left"}.jpg)`;

    window.localStorage.setItem("ar", String(ltr));

}

if (window.localStorage.getItem("ar") === "true")
    handleTranslation();

langSwitcher.addEventListener("click", handleTranslation);

window.onload = () => {
    body.style.display = "block";
}