// Directions: TODO:
// create a timer
// animate the percentage of the circle based on the percent of the timing
window.onload = function(){
    // Global Variables
    const sliderContainer = document.querySelector('.slider_text-items');
    let sliderItems = document.querySelectorAll('.slider_text-item');
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
        
        animateTextOut(activeIndex);        

        // update index
        activeIndex += 1;
        if (activeIndex > (sliderItems.length - 1)) {
            // loop back to beginning
            activeIndex = 0;
        }

        // add active to new item
        sliderItems[activeIndex].classList.add('active');
        animateTextIn(activeIndex);

        // reset circles/animation
        resetCircles();
        runCircleAnimation(circleNext, direction);
        animateImages(direction);
    }

    // transition to previous slide
    function goToPrevious() {
        direction = 'previous';

        // remove active and add previous to old item
        /* sliderItems.forEach(function(el){
            el.classList.remove('active','previous');
        });
        sliderItems[activeIndex].classList.add('previous'); */
        animateTextOut(activeIndex);
        
        // update index
        activeIndex -= 1;
        if (activeIndex < 0) {
            // loop back to end
            activeIndex = sliderItems.length - 1;
        }

        // set active item
        sliderItems[activeIndex].classList.add('active');
        animateTextIn(activeIndex);

        // run animations
        resetCircles();
        runCircleAnimation(circlePrev, direction);
        animateImages(direction);
    }

    function changeClasses() {
        // remove active and add previous to old item
        sliderItems.forEach(function(el){
            el.classList.remove('active','previous');
        });
        sliderItems[activeIndex].classList.add('previous');
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

    function animateTextOut(index){
        var items = sliderItems[index].querySelectorAll('.animation-item');
        TweenMax.staggerTo(items, .7, {y: 20, opacity: 0, ease: Power4.easeOut, onComplete: changeClasses}, .1);
    }

    function animateTextIn(index) {
        var items = sliderItems[index].querySelectorAll('.animation-item');
        TweenMax.set(items, {y: 20, opacity: 0});
        TweenMax.staggerTo(items, 1, {y: 0, opacity: 1, ease: Power4.easeOut, delay: .3}, .2);
    }

    // animate images to correct item
    function animateImages(direction) {

    }

    // Call Initial functions
    setHeight();
    resetCircles();
    runCircleAnimation(circleNext, direction);

    /* 
    * on arrow clicks
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