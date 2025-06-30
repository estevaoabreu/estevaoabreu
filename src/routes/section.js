export function setupSectionInteractions() {
    const imgcards = document.querySelectorAll(".imgcard");
    const articles = document.querySelectorAll("article");

    for (let i = 0; i < imgcards.length; i++) {
        imgcards[i].addEventListener("mouseover", function () {
            articles[i].classList.add("hover");
        });
        imgcards[i].addEventListener("mouseleave", function () {
            articles[i].classList.remove("hover");
        });
    }

    const toggles = document.querySelectorAll("section span");
    const cats = document.querySelectorAll("section p:first-child");
    const works = document.querySelectorAll(".works");

    for (let i = 0; i < toggles.length; i++) {
        cats[i].addEventListener("click", function () {
            if (toggles[i].textContent == "–") {
                toggles[i].textContent = "+";
            } else {
                toggles[i].textContent = "–";
            }
            works[i].classList.toggle("hidden");

            const parentSection = this.parentNode;
            const worksContainer = parentSection.querySelector(".works");
            if (worksContainer) {
                const relatedArticles = worksContainer.querySelectorAll("article");
                relatedArticles.forEach((article) => {
                    article.classList.toggle("hidden");
                });
            }
        });
    }
}