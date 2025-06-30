export function loadAnimation() {
    var hiddenElements = document.querySelectorAll('.begin');
    hiddenElements.forEach((el) => {
        setTimeout(() => {
            el.classList.remove('begin');
            el.classList.add('loaded');
        }, 1000);
    });
}