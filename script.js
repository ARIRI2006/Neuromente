$(document).ready(function() {
    $('#mobile_btn').on('click', function (){
        $('#mobile_menu').toggleClass('active');
        $('#mobile_btn').find('i').toggleClass('fa-x');
    });
});

document.addEventListener("DOMContentLoaded", function() {
    var scrollRelato = document.getElementById("scrollRelato");
    
    scrollRelato.addEventListener("click", function(event) {
        event.preventDefault(); // Impede o comportamento padrão do link
        
        var targetElement = document.getElementById("part2"); // Obtém o elemento alvo
        
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop, // Rolagem até a posição do elemento alvo
                behavior: "smooth" // Rola suavemente
            });
        }
    });
});