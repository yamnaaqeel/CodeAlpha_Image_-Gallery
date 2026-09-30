const galleryItems = document.querySelectorAll(".gallery-item");
const filterButtons = document.querySelectorAll(".filter-btn");

const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightbox-img");
const lightboxTitle = document.getElementById("lightbox-title");
const lightboxCategory = document.getElementById("lightbox-category");

const closeBtn = document.querySelector(".close-btn");
const nextBtn = document.querySelector(".next-btn");
const prevBtn = document.querySelector(".prev-btn");

let visibleItems = [];
let currentIndex = 0;


// ================= FILTER =================

filterButtons.forEach(button => {

    button.addEventListener("click", () => {

        filterButtons.forEach(btn => {
            btn.classList.remove("active");
        });

        button.classList.add("active");

        const filter = button.dataset.filter;

        galleryItems.forEach(item => {

            if (
                filter === "all" ||
                item.dataset.category === filter
            ) {
                item.style.display = "block";
            } else {
                item.style.display = "none";
            }

        });

    });

});


// ================= OPEN LIGHTBOX =================

galleryItems.forEach(item => {

    item.addEventListener("click", () => {

        visibleItems = [...galleryItems].filter(
            element => element.style.display !== "none"
        );

        currentIndex = visibleItems.indexOf(item);

        openLightbox();

    });

});


function openLightbox() {

    const item = visibleItems[currentIndex];

    const image = item.querySelector("img");
    const title = item.querySelector("h3");
    const category = item.querySelector("span");

    lightboxImg.src = image.src;
    lightboxImg.alt = image.alt;

    lightboxTitle.textContent = title.textContent;
    lightboxCategory.textContent = category.textContent;

    lightbox.classList.add("show");

    document.body.style.overflow = "hidden";
}


// ================= NEXT =================

nextBtn.addEventListener("click", () => {

    currentIndex++;

    if (currentIndex >= visibleItems.length) {
        currentIndex = 0;
    }

    openLightbox();

});


// ================= PREVIOUS =================

prevBtn.addEventListener("click", () => {

    currentIndex--;

    if (currentIndex < 0) {
        currentIndex = visibleItems.length - 1;
    }

    openLightbox();

});


// ================= CLOSE =================

closeBtn.addEventListener("click", closeLightbox);

lightbox.addEventListener("click", (e) => {

    if (e.target === lightbox) {
        closeLightbox();
    }

});


function closeLightbox() {

    lightbox.classList.remove("show");

    document.body.style.overflow = "auto";

}


// ================= KEYBOARD =================

document.addEventListener("keydown", (e) => {

    if (!lightbox.classList.contains("show")) {
        return;
    }

    if (e.key === "Escape") {
        closeLightbox();
    }

    if (e.key === "ArrowRight") {
        nextBtn.click();
    }

    if (e.key === "ArrowLeft") {
        prevBtn.click();
    }

});