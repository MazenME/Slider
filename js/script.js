let imgList = Array.from(document.querySelectorAll('.card img'));
let lightbox = document.querySelector('.lightbox');
let image = document.querySelector('.card img');
let imageWall = document.querySelector('.lightbox .image');
let nextSlide = document.getElementById('nextSlide');
let prevSlide = document.getElementById('prevSlide');
let closeSlider = document.getElementById('closeSlider');

let paginationDots = Array.from(document.querySelectorAll('.dot'));



let currentImageIndex;
let isPaused = false;
let autoSlideInterval;

let startX = 0;
let startY = 0;
let endX = 0;
let endY = 0;


function updateDots() {
    paginationDots.forEach((dot) => {
        dot.classList.remove('active');
    });
    paginationDots[currentImageIndex].classList.add('active');
}



for (let i = 0; i < imgList.length; i++) {
    imgList[i].addEventListener('click', (e) => {
        let imgSrc = e.target.getAttribute('src');
        lightbox.classList.add('show');
        imageWall.style.backgroundImage = `url(${imgSrc})`;
        currentImageIndex = imgList.indexOf(e.target);

        updateDots()

    }
    );
}

function nextSlido() {
    currentImageIndex++;
    if (currentImageIndex == imgList.length) {
        currentImageIndex = 0;
    }
    imageWall.style.backgroundImage = `url(${imgList[currentImageIndex].getAttribute('src')})`;

    updateDots()
}
function prevSlido() {
    currentImageIndex--;
    if (currentImageIndex < 0) {
        currentImageIndex = imgList.length - 1;
    }
    imageWall.style.backgroundImage = `url(${imgList[currentImageIndex].getAttribute('src')})`;

    updateDots()
}

nextSlide.addEventListener('click', nextSlido);
prevSlide.addEventListener('click', prevSlido);


closeSlider.addEventListener('click', () => {
    lightbox.classList.remove('show');
});


autoSlideInterval = setInterval(nextSlido, 4000);

imageWall.addEventListener('mouseenter', () => {
    clearInterval(autoSlideInterval);
    isPaused = true;
});

imageWall.addEventListener('mouseleave', () => {
    if (!isPaused) return;
    autoSlideInterval = setInterval(nextSlido, 4000);
    isPaused = false;
});




imageWall.addEventListener('touchstart', (e) => {
    startX = e.touches[0].clientX;
    startY = e.touches[0].clientY;
});

imageWall.addEventListener('touchmove', (e) => {
    endX = e.touches[0].clientX;
    endY = e.touches[0].clientY;
});

imageWall.addEventListener('touchend', () => {
    let diffX = startX - endX;
    let diffY = startY - endY;

    if (Math.abs(diffX) > Math.abs(diffY)) {
        if (diffX > 50) {
            nextSlido();
        } else if (diffX < -50) {
            prevSlido();
        }
    }
});


paginationDots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        imageWall.style.backgroundImage = `url(${imgList[index].getAttribute('src')})`;
        currentImageIndex = index;

        paginationDots.forEach((dot) => {
            dot.classList.remove('active');
        });
        dot.classList.toggle('active');

    });
});


