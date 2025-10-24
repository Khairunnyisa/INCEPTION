// NAVBAR
let menuIcon = document.querySelector('#menu-icon')
let navbar = document.querySelector('.navbar')

menuIcon.onclick = () => {
  menuIcon.classList.toggle('bx-x')
  navbar.classList.toggle('active')
}

window.onscroll = () => {
  menuIcon.classList.remove('bx-x')
  navbar.classList.remove('active')
}

// SLIDER THIRD SECTION
document.querySelectorAll(".marquee").forEach(marquee => {
  const content = marquee.querySelector(".marquee-content");
  const clone = content.cloneNode(true);
  marquee.appendChild(clone);
});

// SLIDER FOOD

document.addEventListener('DOMContentLoaded', function() {
  const carousel = document.querySelector('.food-carousel');
  const nextBtn = document.querySelector('.custom-next');
  const prevBtn = document.querySelector('.custom-prev');

  const cardWidth = document.querySelector('.card-food').offsetWidth + 16; // width + gap
  const visibleCards = 3; 
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

// TESTIMONI 
document.querySelectorAll(".testi-scroll").forEach(scroll => {
  const track = scroll.querySelector(".testi-track");
  if (track) {
    const clone = track.cloneNode(true);
    scroll.appendChild(clone);
  }
});

// FILTER MENU
const sortSelect = document.getElementById("sort");
const menuContainer = document.querySelector("#menu .row");
const menuCards = Array.from(menuContainer.querySelectorAll(".col-12.col-md-6.col-lg-4"));

sortSelect.addEventListener("change", () => {
  const value = sortSelect.value;

  let sortedCards = menuCards.slice();

  if (value === "Harga Tertinggi - Rendah") {
    sortedCards.sort((a, b) => {
      const priceA = parseInt(a.querySelector("h3").textContent.replace("Rp","").replace(".",""));
      const priceB = parseInt(b.querySelector("h3").textContent.replace("Rp","").replace(".",""));
      return priceB - priceA;
    });
  } else if (value === "Harga Terendah - Tinggi") {
    sortedCards.sort((a, b) => {
      const priceA = parseInt(a.querySelector("h3").textContent.replace("Rp","").replace(".",""));
      const priceB = parseInt(b.querySelector("h3").textContent.replace("Rp","").replace(".",""));
      return priceA - priceB;
    });
  } else if (value === "Abjad A-Z") {
    sortedCards.sort((a, b) => {
      const nameA = a.querySelector("h4").textContent.toLowerCase();
      const nameB = b.querySelector("h4").textContent.toLowerCase();
      return nameA.localeCompare(nameB);
    });
  } else if (value === "Abjad Z-A") {
    sortedCards.sort((a, b) => {
      const nameA = a.querySelector("h4").textContent.toLowerCase();
      const nameB = b.querySelector("h4").textContent.toLowerCase();
      return nameB.localeCompare(nameA);
    });
  }

  menuContainer.innerHTML = "";
  sortedCards.forEach(card => menuContainer.appendChild(card));
});