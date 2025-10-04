// SLIDER THIRD SECTION
document.querySelectorAll(".marquee").forEach(marquee => {
  const content = marquee.querySelector(".marquee-content");
  const clone = content.cloneNode(true);
  marquee.appendChild(clone);
});

// TESTIMONI 
document.querySelectorAll(".testi-scroll").forEach(scroll => {
  const track = scroll.querySelector(".testi-track");
  if (track) {
    const clone = track.cloneNode(true);
    scroll.appendChild(clone);
  }
});


// SLIDER FOOD


document.addEventListener('DOMContentLoaded', function() {
  const carousel = document.querySelector('.food-carousel');
  const nextBtn = document.querySelector('.custom-next');
  const prevBtn = document.querySelector('.custom-prev');

  const cardWidth = document.querySelector('.card-food').offsetWidth + 16; // width + gap
  const visibleCards = 3; // jumlah card penuh yang mau kelihatan
  let currentIndex = 0;

  nextBtn.addEventListener('click', () => {
    if (currentIndex < carousel.children.length - visibleCards) {
      currentIndex++;
      carousel.style.transform = `translateX(-${cardWidth * currentIndex}px)`;
    }
  });

  prevBtn.addEventListener('click', () => {
    if (currentIndex > 0) {
      currentIndex--;
      carousel.style.transform = `translateX(-${cardWidth * currentIndex}px)`;
    }
  });
});

