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