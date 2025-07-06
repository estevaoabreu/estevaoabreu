export function setupSectionInteractions() {

    const imgcards = document.querySelectorAll(".imgcard");
    imgcards.forEach(imgcard => {
        const parentArticle = imgcard.closest("article");
        if (parentArticle) {
            imgcard.addEventListener("mouseover", () => parentArticle.classList.add("hover"));
            imgcard.addEventListener("mouseleave", () => parentArticle.classList.remove("hover"));
        }
    });

    const categoryTitles = document.querySelectorAll("section p:first-child");
    categoryTitles.forEach(title => {
        title.addEventListener("click", () => {
            const parentSection = title.closest("section");
            if (!parentSection) return;

            const toggleSpan = parentSection.querySelector("span");
            const worksContainer = parentSection.querySelector(".works");

            if (toggleSpan) {
                toggleSpan.textContent = toggleSpan.textContent === "–" ? "+" : "–";
            }

            if (worksContainer) {
                worksContainer.classList.toggle("hidden");

                const relatedArticles = worksContainer.querySelectorAll("article");
                relatedArticles.forEach(article => {
                    article.classList.toggle("hidden");
                });
            }
        });
    });
}