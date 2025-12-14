// Shuffled images
const images = [
    { src: "images/2-s.avif", url: "working-on-it.html" },
    { src: "images/310-s.avif", url: "working-on-it.html" },
    { src: "images/acontecimento-s.avif", url: "working-on-it.html" },
    { src: "images/baixa-mar-s.avif", url: "working-on-it.html" },
    { src: "images/chair-1.avif", url: "working-on-it.html" },
    { src: "images/clove-s.avif", url: "working-on-it.html" },
    { src: "images/feminismo-s.avif", url: "working-on-it.html" },
    { src: "images/hoje1-s.avif", url: "working-on-it.html" },
    { src: "images/idea-number-2.jpg", url: "working-on-it.html" },
    { src: "images/incerta-des-s.avif", url: "working-on-it.html" },
    { src: "images/love-me-not-s.avif", url: "working-on-it.html" },
    { src: "images/natureza-s.avif", url: "working-on-it.html" },
    { src: "images/quarantaine-s.avif", url: "working-on-it.html" },
    { src: "images/rendo-me-s.avif", url: "working-on-it.html" },
    { src: "images/sand-mountain-s.avif", url: "working-on-it.html" },
    { src: "images/sit-s.avif", url: "working-on-it.html" },
    { src: "images/sol-poente-s.avif", url: "working-on-it.html" },
    { src: "images/stick-caldas-s.avif", url: "working-on-it.html" },    
];

const container = document.getElementById("image-container");
const main = document.querySelector("main");

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

const shuffledImages = shuffleArray([...images]);
let maxBottom = 0;
let loadedCount = 0;

const viewportHeight = window.innerHeight;
const extraVerticalSpace = viewportHeight * 1.5;

shuffledImages.forEach(item => {
  const img = new Image();
  img.src = item.src;
  img.style.position = "absolute";
  img.style.cursor = "pointer";

  img.onclick = () => {
    window.open(item.url, "_blank");
  };

  img.onload = () => {
    container.appendChild(img);

    const imgWidth = img.offsetWidth;
    const imgHeight = img.offsetHeight;
    const containerWidth = container.clientWidth;

    const x = Math.random() * Math.max(containerWidth - imgWidth, 0);
    const y = Math.random() * extraVerticalSpace;

    img.style.left = `${x}px`;
    img.style.top = `${y}px`;

    const bottom = y + imgHeight;
    if (bottom > maxBottom) maxBottom = bottom;
    container.style.height = `${maxBottom + 50}px`;

    loadedCount++;
    if (loadedCount === shuffledImages.length) main.style.visibility = "visible";
  };

  img.onerror = () => console.warn(`Image not found: ${item.src}`);
});

window.addEventListener("resize", () => {
    let maxH = 0;
    const imgs = container.querySelectorAll("img");
    imgs.forEach(img => {
    const containerWidth = container.clientWidth;
    const imgWidth = img.offsetWidth;
    const imgHeight = img.offsetHeight;

    const x = Math.random() * Math.max(containerWidth - imgWidth, 0);
    const y = Math.random() * extraVerticalSpace;

    img.style.left = `${x}px`;
    img.style.top = `${y}px`;

    const bottom = y + imgHeight;
    if (bottom > maxH) maxH = bottom;
    });
    container.style.height = `${maxH + 50}px`;
});

// Overlay logic
const hamburger = document.getElementById("hamburger");
const overlayContainer = document.getElementById("overlay-container");
const overlay = document.getElementById("overlay");

function lockScroll() {
    const y = window.scrollY;
    document.documentElement.classList.add("no-scroll");
    document.body.classList.add("no-scroll");

    document.body.style.position = "fixed";
    document.body.style.top = `-${y}px`;
    document.body.style.left = "0";
    document.body.style.right = "0";

    document.body.dataset.scrollY = y;
}

function unlockScroll() {
    const y = parseInt(document.body.dataset.scrollY || "0", 10);

    document.documentElement.classList.remove("no-scroll");
    document.body.classList.remove("no-scroll");

    document.body.style.position = "";
    document.body.style.top = "";
    document.body.style.left = "";
    document.body.style.right = "";

    window.scrollTo(0, y);
}

function closeOverlay() {
    hamburger.classList.remove("active");
    overlay.classList.remove("active");
    overlayContainer.style.display = "none";
    document.body.classList.remove("menu-open");
    unlockScroll();
}

hamburger.addEventListener("click", () => {
    const willOpen = !document.body.classList.contains("menu-open");
    if (willOpen) {
    // OPEN
    overlayContainer.style.display = "block";
    overlay.classList.add("active");
    document.body.classList.add("menu-open");
    hamburger.classList.add("active"); // hamburger transformation into X
    
    lockScroll();
    } else {
    // CLOSE
    closeOverlay();         // ensures unlockScroll() runs
    }
});

// Close only if clicking the background, not the menu
overlayContainer.addEventListener("click", (e) => {
    if (e.target === overlayContainer) closeOverlay();
});

overlay.addEventListener("click", (e) => {
    const link = e.target.closest("a");
    if (link) closeOverlay();
});