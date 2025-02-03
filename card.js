document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("popup").classList.add("active");

    const images = {
        243: ['https://nfcard.github.io/login/adnan.png', 'https://nfcard.github.io/login/adbk.png'],
        678: ['https://nfcard.github.io/login/ritu.png', 'https://nfcard.github.io/login/rtbk.png'],
        567: ['https://nfcard.github.io/login/taj.png', 'https://nfcard.github.io/login/tajbk.png'],
        789: ['https://nfcard.github.io/login/rifat.png', 'https://nfcard.github.io/login/rfbk.png'],
        143: ['https://nfcard.github.io/login/sadik.png', 'https://nfcard.github.io/login/sdbk.png'],
        375: ['https://nfcard.github.io/login/juba.png', 'https://nfcard.github.io/login/jubabk.png'],
        267: ['https://nfcard.github.io/login/ruhul.png', 'https://nfcard.github.io/login/rhbk.png'],
        743: ['https://nfcard.github.io/login/m1.png', 'https://nfcard.github.io/login/m1bk.png'],
        643: ['https://nfcard.github.io/login/m2.png', 'https://nfcard.github.io/login/m2bk.png'],
        549: ['https://nfcard.github.io/login/m3.png', 'https://nfcard.github.io/login/m3bk.png']
    };

    const secureData = JSON.parse(localStorage.getItem('secureData'));
    const id = secureData.id || '1';

    if (images[id]) {
        document.getElementById('slide1').src = images[id][0];
        document.getElementById('slide2').src = images[id][1];
        xyz();

        let slideIndex = 1;
        showSlides(slideIndex);

        function plusSlides(n) {
            showSlides(slideIndex += n);
        }

        function showSlides(n) {
            let i;
            let slides = document.getElementsByClassName("mySlides");
            if (n > slides.length) { slideIndex = 1 }
            if (n < 1) { slideIndex = slides.length }
            for (i = 0; i < slides.length; i++) {
                slides[i].style.display = "none";
            }
            slides[slideIndex - 1].style.display = "block";
        }

        document.querySelector('.prev').addEventListener('click', function() {
            plusSlides(-1);
        });

        document.querySelector('.next').addEventListener('click', function() {
            plusSlides(1);
        });
    } else {
        xyz(),
        document.getElementById("cardsonly").style.display = 'none';
    }

    function xyz() {
        setTimeout(() => {
            document.getElementById("popup").classList.remove("active");
        }, 1000);
    }
});
