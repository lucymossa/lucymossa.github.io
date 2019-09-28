var slideIndex = 1;
showSlides(slideIndex);
var url = document.querySelector("div p a");
console.log(url);

function currentSlide(n) {
    showSlides(slideIndex = n);
}

function showSlides(n) {
    var slides = document.getElementsByClassName("mySlides");
    
    if (n > slides.length) {slideIndex = 1}    
    if (n < 1) {slideIndex = slides.length}
    for (var i = 0; i < slides.length; i++) {
        slides[i].style.opacity = "0";  
    }
    slides[slideIndex-1].style.opacity = "1";
}

document.getElementById("prev").onclick = function(){
  showSlides(slideIndex -= 1);
  window.scrollTo(0, 0);
};

document.getElementById("next").onclick = function(){
  showSlides(slideIndex += 1);
  window.scrollTo(0, 0);
}