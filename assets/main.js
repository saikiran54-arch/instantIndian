
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

