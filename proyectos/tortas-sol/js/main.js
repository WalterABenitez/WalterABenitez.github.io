console.log("JS cargado");

const reveals = document.querySelectorAll(".reveal");

function revealOnScroll() {
  reveals.forEach(element => {
    const windowHeight = window.innerHeight;
    const elementTop = element.getBoundingClientRect().top;
    const elementVisible = 120;

    if (elementTop < windowHeight - elementVisible) {
      element.classList.add("active");
    }
  });
}

window.addEventListener("scroll", revealOnScroll);
revealOnScroll();
const heroImage = document.querySelector(".hero-image img");

document.addEventListener("mousemove", e => {
  const x = (window.innerWidth / 2 - e.clientX) / 25;
  const y = (window.innerHeight / 2 - e.clientY) / 25;

  if (heroImage) {
    heroImage.style.transform = `translate(${x}px, ${y}px)`;
  }
});
