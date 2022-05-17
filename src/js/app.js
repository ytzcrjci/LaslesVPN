// selects
//https://www.geeksforgeeks.org/how-to-detect-the-change-in-divs-dimension/
//https://stackoverflow.com/questions/6492683/how-to-detect-divs-dimension-changed
let selects = document.querySelectorAll('.button-select');
selects.forEach((select) =>{
    select.addEventListener('click', (e)=>{
        selects.forEach((select) => {
            select.classList.remove('selected');
            let card = select.closest('.section-plan-cards-card').classList.remove('active');
        });     
        e.target.classList.add('selected');
        let card = select.closest('.section-plan-cards-card').classList.add('active');
    })
})
//hamburger
let hamburger = document.querySelector('.hamburger').addEventListener('click', () =>{
    let slidePanel = document.querySelector('.slide-panel');
    slidePanel.classList.toggle('active');
    let hamburger = document.querySelector('.hamburger');
    hamburger.classList.toggle('active');
    let body = document.querySelector('body');
    body.classList.toggle('stop-scroll');
})
//slider
let boxWidth = document.querySelector('.slider-box');
let track = document.querySelector('.track')
let windowWidth = window.innerWidth;
let boxes = document.querySelectorAll('.slider-box');
let dots = document.querySelectorAll('.slider-wrapper-dots div');
let prev = document.querySelector('#prev');
let next = document.querySelector('#next');
let currentSlide = 0;
let slidesCount = dots.length;
function changeSlide(nextSlide) {
    dots.forEach((dot, key) => {
        if (key === nextSlide) {
            dot.classList.add("active");
        } else {
            dot.classList.remove("active");
        }
    });   
    boxes.forEach((box, key) =>{
        if (key === nextSlide) {
            box.classList.add("active");
        } else {
            box.classList.remove("active");
        }
    })
    track.style.transform = 'translateX(-' + (boxWidth.offsetWidth + 50)*nextSlide + 'px)';
    window.addEventListener('resize', ()=>{
        track.style.transform = 'translateX(-' + (boxWidth.offsetWidth + 50)*nextSlide + 'px)';
    });
}
for(let i=0; i<slidesCount; i++){
    dots[i].addEventListener('click', ()=>{
        currentSlide = i;
        changeSlide(currentSlide);
    }) 
}
prev.addEventListener('click', () => {
    currentSlide = Math.max(currentSlide - 1, 0);
    changeSlide(currentSlide);
})
next.addEventListener('click', () => {
    currentSlide = Math.min(currentSlide + 1, slidesCount - 1);
    changeSlide(currentSlide);
})