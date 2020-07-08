//Determine what page to execute JS for - come back to this)
var pageType = document.getElementsByTagName("BODY");

//declarge global vars for balance animations on home page
var workButton = document.getElementById('work-button');
var workCard = document.getElementById('work-card');
var lifeButton = document.getElementById('life-button');
var lifeCard = document.getElementById('life-card');
var bar = document.getElementById('bar')
var triangleButton = document.getElementById('balance-button')
var triangleTitle = document.getElementById('triangle-title')



//global vars for work page

var productButton = document.getElementById('productButton');
var marketingButton = document.getElementById('marketingButton');
var opsButton = document.getElementById('opsButton');
var productLIs = document.getElementsByClassName("productLI");
var marketingLIs = document.getElementsByClassName("marketingLI");
var opsLIs = document.getElementsByClassName("opsLI");
// console.log(opsLIs);


// set current page's menu item to be active by parsing URL of nav items
function setMenuItemActive() {
    var nav = document.getElementById('nav');
    var anchor = nav.getElementsByTagName('a');
    var current_page = window.location.pathname.split('/')[1];

        // loop through the "a" elements in the nav, stopping once
        for (var i = 0; i < anchor.length; i++) {
            var anchor_slug = anchor[i].href.split('/')[3];
            // console.log("anchor_slug = %o", anchor_slug);
            if (anchor_slug === current_page) {
                anchor[i].classList.add("active");
                break;
            }

        }
};
setMenuItemActive();


//determine which balance animation to select
if(workButton !== null){
    if (window.matchMedia("(max-width: 500px)").matches) {
    /* The viewport is less than, or equal to, 500 pixels wide */
        balanceAnimationMobile();
    }
    else {
    /* The viewport is greater than 500 pixels wide */
        balanceAnimationDesktop();
    }
}


//sets the traslations for mouse enter and leave for the work, life and balance buttons on the homepage
function balanceAnimationDesktop() {
    workButton.addEventListener("mouseenter",workDown);
    workButton.addEventListener("mouseleave",bothUp);
    lifeButton.addEventListener("mouseenter",lifeDown);
    lifeButton.addEventListener("mouseleave",bothUp);
    triangleButton.addEventListener("mouseenter",wobble);

    function workDown() {
        workCard.style.transform = "rotate(-3deg) translateY(12px) translateX(-6px)";
        lifeCard.style.transform = "rotate(-3deg) translateY(-12px) translateX(-6px)";
        bar.style.transform="rotate(-3deg) translateX(-1px)";
    }

    function bothUp() {
        workCard.style.transform = "rotate(0deg) translateY(0px) translateX(0px)";
        lifeCard.style.transform = "rotate(0deg) translateY(0px) translateX(0px)";
        bar.style.transform="rotate(0deg) translateX(0px)";
    }

    function lifeDown() {
        workCard.style.transform = "rotate(3deg) translateY(-12px) translateX(6px)";
        lifeCard.style.transform = "rotate(3deg) translateY(12px) translateX(6px)";
        bar.style.transform="rotate(3deg) translateX(1px)";

    }

    function wobble() {
        workDown();
        setTimeout(bothUp, 400);
        setTimeout(lifeDown, 800);
        setTimeout(bothUp, 1200);
    }


}


//different translations for stacked work and life cards on mobile
function balanceAnimationMobile() {
    workButton.addEventListener("click",workDown);
    lifeButton.addEventListener("click",lifeDown);
    triangleButton.addEventListener("click",wobble);
    triangleTitle.addEventListener("click",wobble); //Easter egg for click on the "Balance" title on Homepage

    function workDown() {
        workCard.style.transform = "rotate(-3deg) translateY(1px) translateX(-15px)";
        lifeCard.style.transform = "rotate(-3deg) translateY(1px) translateX(-6px)";
        bar.style.transform="rotate(-3deg)";
    }

    function bothUp() {
        workCard.style.transform = "rotate(0deg) translateY(0px) translateX(0px)";
        lifeCard.style.transform = "rotate(0deg) translateY(0px) translateX(0px)";
        bar.style.transform="rotate(0deg) translateX(0px)";
    }

    function lifeDown() {
        workCard.style.transform = "rotate(3deg) translateY(1px) translateX(15px)";
        lifeCard.style.transform = "rotate(3deg) translateY(1px) translateX(6px)";
        bar.style.transform="rotate(3deg)";

    }

    function wobble() {
        workDown();
        setTimeout(bothUp, 400);
        setTimeout(lifeDown, 800);
        setTimeout(bothUp, 1200);
    }

}

//highlights different sections of content on work page, w/ only one button active at a time
function workPageButtons() {

    productButton.addEventListener("click",productHighlight);
    marketingButton.addEventListener("click",marketingHighlight);
    opsButton.addEventListener("click",opsHighlight);

    function removeButtonClasses(){
        productButton.classList.remove("activeButton");
        marketingButton.classList.remove("activeButton");
        opsButton.classList.remove("activeButton");
    }

    function removeLIBackgrounds(){
        for (let item of productLIs) {
            item.classList.remove("activeLI")
        }

        for (let item of marketingLIs) {
            item.classList.remove("activeLI")
        }

        for (let item of opsLIs) {
            item.classList.remove("activeLI")
        }
    }

    function productHighlight(){
        removeButtonClasses();
        removeLIBackgrounds();
        productButton.classList.add("activeButton");
        for (let item of productLIs) {
            item.classList.add("activeLI")
        }
    }

    function marketingHighlight(){
        removeButtonClasses();
        removeLIBackgrounds();
        marketingButton.classList.add("activeButton");
        for (let item of marketingLIs) {
            item.classList.add("activeLI")
        }
    }

    function opsHighlight(){
        removeButtonClasses();
        removeLIBackgrounds();
        opsButton.classList.add("activeButton");
        for (let item of opsLIs) {
            item.classList.add("activeLI")
        }
    }
}

if(productButton !== null){
    workPageButtons();
}
