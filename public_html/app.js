// Directions: TODO:
// create a timer
// animate the percentage of the circle based on the percent of the timing
window.onload = function(){
    // Global Variables
    const sliderContainer = document.querySelector('.slider_text-items');
    let sliderItems = document.querySelectorAll('.slider_text-item');
    let sliderImages = document.querySelectorAll('.slider_image');
    const nextArrow = document.querySelector('.arrow-next');
    const prevArrow = document.querySelector('.arrow-prev');
    let circleNext = document.querySelector('.arrow-next circle.animator');
    let circlePrev = document.querySelector('.arrow-prev circle.animator');
    const circum = circleNext.getBBox().width * Math.PI;
    let activeIndex = 0;
    let direction = 'next';
    // time to change slide in seconds
    let timer = 7;


    // Set minimum height of slider section
    function setHeight() {
        let h = 0;
        sliderItems.forEach(function(el) { h = h <= el.offsetHeight ? el.offsetHeight : h; });
        sliderContainer.setAttribute('style', 'min-height: ' + h + 'px');
    }

    // transition to next slide
    function goToNext() {
        direction = 'next';
        
        // animate old text out
        animateTextOut(activeIndex);

        // remove classes
        sliderItems.forEach(function(el){
            el.classList.remove('active','previous');
        });
        sliderItems[activeIndex].classList.add('previous');
        sliderImages.forEach(function(el){
            el.classList.remove('active');
        });

        // update index
        activeIndex += 1;
        if (activeIndex > (sliderItems.length - 1)) {
            // loop back to beginning
            activeIndex = 0;
        }

        // add active to new item
        sliderItems[activeIndex].classList.add('active');
        sliderImages[activeIndex].classList.add('active');
        animateTextIn(activeIndex);

        // reset circles/run animation
        resetCircles();
        runCircleAnimation(circleNext, direction);
    }

    // transition to previous slide
    function goToPrevious() {
        direction = 'previous';

        // animate old text out
        animateTextOut(activeIndex);

        // remove classes
        sliderItems.forEach(function(el){
            el.classList.remove('active','previous');
        });
        sliderItems[activeIndex].classList.add('previous');

        sliderImages.forEach(function(el){
            el.classList.remove('active');
        });
        
        // update index
        activeIndex -= 1;
        if (activeIndex < 0) {
            // loop back to end
            activeIndex = sliderItems.length - 1;
        }

        // add active to new item
        sliderItems[activeIndex].classList.add('active');
        sliderImages[activeIndex].classList.add('active');
        animateTextIn(activeIndex);

        // reset circles/run animation
        resetCircles();
        runCircleAnimation(circlePrev, direction);
    }

    // remove active and previous classes add previous to old item
    function changeClasses() {
        
    }

    // reset circles stroke positions
    function resetCircles() {
        // TODO: reset both circles at once
        TweenMax.set(circlePrev, {strokeDashoffset: circum});
        TweenMax.set(circleNext, {strokeDashoffset: circum});
        circleNext.setAttribute('style', 'stroke-dasharray: ' + circum + 'px; stroke-dashoffset: ' + -circum + 'px;');
        circlePrev.setAttribute('style', 'stroke-dasharray: ' + circum + 'px; stroke-dashoffset: ' + -circum + 'px;');
    }

    // animate circle svg to end state then run the slide transition
    function runCircleAnimation(circle, direction) {
        TweenMax.to(circle, timer, {strokeDashoffset: 0, ease: 'linear', onComplete: direction == 'previous' ? goToPrevious : goToNext});
    }

    // text animation out
    function animateTextOut(index){
        var items = sliderItems[index].querySelectorAll('.animation-item');
        TweenMax.staggerTo(items, .7, {y: 20, opacity: 0, ease: Power4.easeOut, onComplete: changeClasses}, .1);
    }

    // text animation in
    function animateTextIn(index) {
        var items = sliderItems[index].querySelectorAll('.animation-item');
        TweenMax.set(items, {y: 20, opacity: 0});
        TweenMax.staggerTo(items, .7, {y: 0, opacity: 1, ease: Power4.easeOut, delay: .2}, .2);
    }

    // animate images to correct item
    /* function animateImages(direction) {
        // stagger boxes over images
        // change images
        // change box direction
        // stagger boxes out
    } */

    // Call Initial functions
    setHeight();
    resetCircles();
    runCircleAnimation(circleNext, direction);

    /* 
    * event listeners
    */
    nextArrow.addEventListener('click', function() {
        goToNext();
    });
    prevArrow.addEventListener('click', function() {
        goToPrevious();
    });

    /*
        On Window resize:
        animate line to correct position
    */
    window.onresize = function(){
        setHeight();
    };
};