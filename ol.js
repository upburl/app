document.getElementById("popup").classList.add("active");
  
function fetchData() {
            
  fetch(`${dgistart}/1TbR0ZfpsHLCA4MRiBA5holK5Yz1Kkv5JGXBSZxw03Dc/${dgih}`)
    .then(e => e.text())
    .then(e => {
      var t = new DOMParser()
        .parseFromString(e, "text/html")
        .querySelectorAll("table")[0].rows[3].cells[3];
     document.getElementById("popup").classList.remove("active");
             document.getElementById("balance").innerHTML = (t.innerText || t.textContent).trim();
    })
    .catch(e => console.error("Error fetching data:", e));
}

window.onload = fetchData;
const images = [
    "https://nfcard.github.io/ol/imgx1.png",
    "https://nfcard.github.io/ol/chout.jpg",
  "https://nfcard.github.io/ol/img.jpg"
];

const container = document.querySelector('.gif-container');
const imgElement = container.querySelector('img');
imgElement.style.display = 'none';

const slider = document.createElement('div');
container.appendChild(slider);

let currentIndex = 0;
let isDragging = false;
let startPosition = 0;
let currentTranslate = 0;
let prevTranslate = 0;
let slideInterval;
const borderRadius = "25px";
const gap = 10; // Gap between images

function getImageWidth() {
    return container.clientWidth * 0.838; // 70% of container width (showing 30% of the next image)
}

// Apply container styles dynamically
Object.assign(container.style, {
    overflow: "hidden",
    position: "relative",
    width: "100%",
    borderRadius: borderRadius,
    height: "auto",
    touchAction: "pan-y"
});

Object.assign(slider.style, {
    display: "flex",
    width: "max-content",
    transition: "transform 0.5s ease-in-out",
    position: "relative",
    left: "0"
});

// Create images dynamically
function createImages() {
    slider.innerHTML = ""; // Clear previous images

    images.forEach((src, index) => {
        let img = document.createElement("img");
        img.src = src;
        Object.assign(img.style, {
            width: `${getImageWidth()}px`,
            flexShrink: "0",
            userSelect: "none",
            borderRadius: borderRadius
        });

        if (index < images.length - 1) {
            img.style.marginRight = `${gap}px`; // Keep gap for all except last image
        }

        slider.appendChild(img);
    });

    // Fix last image position (Remove right gap)
    let lastImage = slider.lastChild;
    if (lastImage) {
        lastImage.style.marginRight = "0"; // No gap at the right side
    }
}

// Function to update slide position
function setPositionByIndex() {
    let totalImages = images.length;
    let imageWidth = getImageWidth();
    
  if (currentIndex === totalImages - 1) {
    currentTranslate = -currentIndex * (imageWidth + gap) + (container.clientWidth - imageWidth);
} else {
    currentTranslate = -currentIndex * (imageWidth + gap);
}
  
    prevTranslate = currentTranslate;
    slider.style.transition = "transform 0.5s ease-in-out";
    slider.style.transform = `translateX(${currentTranslate}px)`;
}

// Auto slideshow with seamless reset
function startSlideshow() {
    slideInterval = setInterval(() => {
        if (currentIndex < images.length - 1) {
            currentIndex++;
            setPositionByIndex();
        } else {
            setTimeout(() => {
                slider.style.transition = "none";
                currentIndex = 0; // Move back to first image instantly
                setPositionByIndex();
                setTimeout(() => {
                    slider.style.transition = "transform 0.5s ease-in-out"; // Restore transition
                }, 200);
            }, 2000); // WAIT 5 SECONDS before resetting
        }
    }, 6000);
}

// Stop slideshow on manual touch and restart it
function resetSlideshow() {
    clearInterval(slideInterval);
    startSlideshow();
}

// Dragging logic
function touchStart(e) {
    isDragging = true;
    startPosition = e.touches[0].clientX;
    slider.style.transition = "none";
}

function touchMove(e) {
    if (!isDragging) return;
    const currentPosition = e.touches[0].clientX;
    currentTranslate = prevTranslate + (currentPosition - startPosition);
    slider.style.transform = `translateX(${currentTranslate}px)`;
}

function touchEnd() {
    isDragging = false;
    const movedBy = currentTranslate - prevTranslate;

    if (movedBy < -50 && currentIndex < images.length - 1) {
        currentIndex++;
    } else if (movedBy > 50 && currentIndex > 0) {
        currentIndex--;
    }

    setPositionByIndex();
    resetSlideshow();
}

// Handle resizing
window.addEventListener("resize", () => {
    createImages();
    setPositionByIndex();
});

// Attach event listeners
container.addEventListener("touchstart", touchStart);
container.addEventListener("touchmove", touchMove);
container.addEventListener("touchend", touchEnd);

// Initialize images and start slideshow
createImages();
setTimeout(() => {
    setPositionByIndex();
    startSlideshow();
}, 200);
