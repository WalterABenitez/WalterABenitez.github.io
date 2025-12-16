let menuVisible = false;
//Función que oculta o muestra el menu
function mostrarOcultarMenu(){
    if(menuVisible){
        document.getElementById("nav").classList ="";
        menuVisible = false;
    }else{
        document.getElementById("nav").classList ="responsive";
        menuVisible = true;
    }
}

function seleccionar(){
    //oculto el menu una vez que selecciono una opcion
    document.getElementById("nav").classList = "";
    menuVisible = false;
}
//Funcion que aplica las animaciones de las habilidades
function efectoHabilidades(){
    var skills = document.getElementById("skills");
    var distancia_skills = window.innerHeight - skills.getBoundingClientRect().top;
    if(distancia_skills >= 300){
        let habilidades = document.getElementsByClassName("progreso");
        habilidades[0].classList.add("javascript");
        habilidades[1].classList.add("htmlcss");
        habilidades[2].classList.add("photoshop");
        habilidades[3].classList.add("wordpress");
        habilidades[4].classList.add("drupal");
        habilidades[5].classList.add("comunicacion");
        habilidades[6].classList.add("trabajo");
        habilidades[7].classList.add("creatividad");
        habilidades[8].classList.add("dedicacion");
        habilidades[9].classList.add("proyect");
    }
}


//detecto el scrolling para aplicar la animacion de la barra de habilidades
window.onscroll = function(){
    efectoHabilidades();
} 
const projectCards = document.querySelectorAll('.project-card');

projectCards.forEach(card => {
  card.addEventListener('click', () => {
    card.classList.toggle('active');
  });
});
const form = document.querySelector('form');

form.addEventListener('submit', function (e) {
  e.preventDefault();

  const email = form.querySelector('input[type="email"]').value;

  if (email === '') {
    alert('Por favor completá el email');
  } else {
    alert('Formulario enviado correctamente');
    form.reset();
  }
});
const cards = document.querySelectorAll('.project-card');

cards.forEach(card => {
  card.addEventListener('click', () => {
    card.classList.toggle('active');
  });
});
const projectCards = document.querySelectorAll('.project-card');

projectCards.forEach(card => {
  card.addEventListener('click', () => {
    card.classList.toggle('active');
  });
});
const skillsSection = document.querySelector('#skills');
const progressBars = document.querySelectorAll('.barra-skill .progreso');

let skillsAnimated = false;

window.addEventListener('scroll', () => {
  const sectionTop = skillsSection.getBoundingClientRect().top;
  const screenHeight = window.innerHeight;

  if (sectionTop < screenHeight && !skillsAnimated) {
    progressBars.forEach(bar => {
      if (bar.classList.contains('basico')) {
        bar.style.width = '35%';
      }
      if (bar.classList.contains('intermedio')) {
        bar.style.width = '65%';
      }
      if (bar.classList.contains('avanzado')) {
        bar.style.width = '90%';
      }
    });

    skillsAnimated = true;
  }
});
