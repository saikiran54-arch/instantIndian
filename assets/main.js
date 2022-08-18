
// show menu
const showMenu = (toggleId,navId) =>{
    const toogle = document.getElementById(toggleId),
    nav = document.getElementById(navId);

    if(toogle && nav){
        toogle.addEventListener('click',()=>{
            nav.classList.toggle('show-menu');
        })
    };
}
showMenu('nav-toggle','nav-menu');


// remove menu
const navLink = document.querySelectorAll('.nav__link')

function linkAction(){
    const navMenu = document.getElementById('nav-menu')
    // When we click on each nav__link, we remove the show-menu class
    navMenu.classList.remove('show-menu')
}
navLink.forEach(n => n.addEventListener('click', linkAction))


// swiper products
let swiperProducts = new Swiper(".products__container", {
    spaceBetween: 30,
    loop: 'true',

    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
    },
});


// customer feeedback slider
function initParadoxWay() {
    "use strict";
   
    if ($(".testimonials-carousel").length > 0) {
        var j2 = new Swiper(".testimonials-carousel .swiper-container", {
            preloadImages: false,
            slidesPerView: 1,
            spaceBetween: 20,
            loop: true,
            grabCursor: true,
            mousewheel: false,
            centeredSlides: true,
            pagination: {
                el: '.tc-pagination',
                clickable: true,
                dynamicBullets: true,
            },
            navigation: {
                nextEl: '.listing-carousel-button-next',
                prevEl: '.listing-carousel-button-prev',
            },
            breakpoints: {
                1024: {
                    slidesPerView: 3,
                },
                
            }
        });
    }
    
// bubbles -----------------
    
    
    setInterval(function () {
        var size = randomValue(sArray);
        $('.bubbles').append('<div class="individual-bubble" style="left: ' + randomValue(bArray) + 'px; width: ' + size + 'px; height:' + size + 'px;"></div>');
        $('.individual-bubble').animate({
            'bottom': '100%',
            'opacity': '-=0.7'
        }, 4000, function () {
            $(this).remove()
        });
    }, 350);
    
}

//   Init All ------------------
$(document).ready(function () {
    initParadoxWay();
});


// insiprational menu
let brand_item = document.getElementById('brand_item');
let btn_brands_left = document.getElementById('btn_brands_left');
let btn_brands_right = document.getElementById('btn_brands_right');
 
btn_brands_left.addEventListener('click' , () => {
brand_item.scrollLeft += 170;
 
    if (brand_item.scrollLeft > 0) {
        btn_brands_right.style.display = "flex";
    } else {
        btn_brands_right.style.display = "none";
    }
    if (brand_item.scrollLeft > 800) {
        btn_brands_left.style.display = "none";
    }else {
        btn_brands_left.style.display = "flex";
    }
})
btn_brands_right.addEventListener('click' , () => {
    brand_item.scrollLeft -= 170;
    btn_brands_left.style.display = "flex";
    if (brand_item.scrollLeft > 0) {
        btn_brands_right.style.display = "flex";
    } else {
        btn_brands_right.style.display = "none";
    }
})
