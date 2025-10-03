// SLIDER THIRD SECTION
document.querySelectorAll(".marquee").forEach(marquee => {
  const content = marquee.querySelector(".marquee-content");
  const clone = content.cloneNode(true);
  marquee.appendChild(clone);
});