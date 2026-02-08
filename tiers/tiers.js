document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Seleccionamos los elementos
    const container = document.querySelector('.snap-container');
    const sections = document.querySelectorAll('.tier-section');
    const dots = document.querySelectorAll('.timeline-dot');

    // 2. Función lógica para iluminar el punto correcto
    const highlightDot = () => {
        let activeId = null;

        // Revisamos todas las secciones para ver cuál está "enfocada"
        sections.forEach(section => {
            const rect = section.getBoundingClientRect();

            // Si la parte superior de la sección está en la zona "activa" de la pantalla
            // (Entre -250px y 250px respecto al tope)
            if (rect.top > -250 && rect.top < 250) {
                activeId = section.getAttribute('id');
                
                // Ya que estamos, activamos la animación de entrada
                section.classList.add('animate-in');
            }
        });

        // 3. Actualizamos la barra lateral (UNA SOLA VEZ para evitar parpadeos)
        if (activeId) {
            dots.forEach(dot => {
                // Si el data-target coincide con el ID activo, ponemos 'active', si no, lo quitamos
                if (dot.dataset.target === activeId) {
                    dot.classList.add('active');
                } else {
                    dot.classList.remove('active');
                }
            });
        }
    };

    // 4. Escuchar el evento de scroll en el contenedor principal
    // (Usamos el contenedor .snap-container, no window, porque es el que tiene el scroll)
    if (container) {
        container.addEventListener('scroll', highlightDot);
    }

    // 5. Configurar los clics en los puntos para navegar
    dots.forEach(dot => {
        dot.addEventListener('click', () => {
            const targetId = dot.dataset.target;
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({ behavior: 'smooth' });
                // Pequeño truco: forzamos el chequeo después de 0.5s para asegurar que se ilumine al llegar
                setTimeout(highlightDot, 500); 
            }
        });
    });

    // 6. Ejecutar al inicio para iluminar el primer punto
    highlightDot();
});