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
        habilidades[0].classList.add("HTML");
        habilidades[1].classList.add("css");
        habilidades[2].classList.add("javascript");
        habilidades[3].classList.add("React");
        habilidades[4].classList.add("SQL");
        habilidades[5].classList.add("Canva");
        habilidades[6].classList.add("Comunicación");
        habilidades[7].classList.add("Trabajo en equipo");
        habilidades[8].classList.add("Dedicación");
        habilidades[9].classList.add("Creatividad");
        habilidades[10].classList.add("Proyect Management");
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
