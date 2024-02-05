const img = document.querySelector("#fix-size");
const refImg = document.querySelector('[ref="size-ref"]');
const cards = Array.from(document.querySelectorAll("#cards .block"));
const resizeCards = cards => {
    const tallest = cards.reduce((prev, curr) => {
        return getComputedStyle(curr).height > getComputedStyle(prev).height ? curr : prev;
    });

    const tallestHeight = parseInt(getComputedStyle(tallest).height);
    cards.forEach(card => {
        const styles = getComputedStyle(card);
        card.style.paddingBottom = `${parseInt(styles.paddingBottom) + (tallestHeight - parseInt(styles.height))}px`;
    });
}

const resizeImg = (target, ref) => {
    target && ref && (target.style.height = `calc(100% - ${getComputedStyle(ref).height} - 3rem)`);
}

if (refImg)
    refImg.onload = () => {
        img.onload = () => {
            resizeImg(img, refImg);
        }
    };

window.addEventListener("load", () => {
    resizeImg(img, refImg);
    cards && cards.length && resizeCards(cards);

});

window.addEventListener("resize", () => resizeImg(img, refImg));

langSwitcher.addEventListener("click", () => {
    cards && cards.length && resizeCards(cards);
});


