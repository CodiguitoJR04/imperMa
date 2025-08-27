// Hacemos que una función de carga que aplicará estilos predefinidos
document.addEventListener("DOMContentLoaded", function() {
    // Cargamos la libreria gsap scrollTrigger
    gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);
    
    // Aplicar estilos a los elementos con el ID "cajas-servicios"
    let cajas = document.querySelectorAll('.container-fluid');
    for(let i=0; i<cajas.length; i++){
        // Ocultar con animación
        if(i === 3 || i === 5) {
            gsap.set(cajas[i], {
                display: 'none',
                opacity: 0,
                scale: 0.8
            });
        }
    }
    
    // Inyectar estilos para el cursor de escritura
    const style = document.createElement('style');
    style.textContent = `
        .typing-cursor {
            display: inline-block;
            margin-left: 2px;
            font-weight: bold;
            animation: blink 0.7s infinite;
        }
        @keyframes blink {
            0%, 100% { opacity: 1; }
            50% { opacity: 0; }
        }
    `;
    document.head.appendChild(style);
    
    // Animaciones para textos al cargar
    animarTextosIniciales();
    
    // Configurar animaciones con scroll para todos los textos
    configurarAnimacionesScrollTexto();
});

// Función para animar textos al cargar la página
function animarTextosIniciales() {
    // Animación para títulos
    gsap.fromTo('h1, h2, h3, .title-one-modal, .title-card-service', {
        y: 50,
        opacity: 0
    }, {
        duration: 1,
        y: 0,
        opacity: 1,
        stagger: 0.2,
        ease: "power2.out"
    });
    
    // Animación para párrafos
    gsap.fromTo('p', {
        y: 30,
        opacity: 0
    }, {
        duration: 1,
        y: 0,
        opacity: 1,
        stagger: 0.1,
        delay: 0.3,
        ease: "power2.out"
    });
    
    // Animación para enlaces
    gsap.fromTo('a', {
        y: 20,
        opacity: 0
    }, {
        duration: 0.8,
        y: 0,
        opacity: 1,
        stagger: 0.05,
        delay: 0.5,
        ease: "power2.out"
    });
    
    // Animación para botones
    gsap.fromTo('.btn', {
        scale: 0.8,
        opacity: 0
    }, {
        duration: 0.8,
        scale: 1,
        opacity: 1,
        stagger: 0.1,
        delay: 0.6,
        ease: "back.out(1.7)"
    });
    
    // Animación para imágenes
    gsap.fromTo('.img-card img', {
        scale: 1.2,
        opacity: 0
    }, {
        duration: 1.2,
        scale: 1,
        opacity: 1,
        stagger: 0.15,
        delay: 0.4,
        ease: "power2.out"
    });
}

// Función para configurar animaciones de texto durante el scroll
function configurarAnimacionesScrollTexto() {
    // Animación para todos los encabezados durante el scroll
    gsap.utils.toArray('h1, h2, h3').forEach((heading, i) => {
        // Solo animar elementos que están visibles
        if (heading.offsetParent !== null) {
            gsap.fromTo(heading, {
                y: 100,
                opacity: 0,
                rotationX: -45
            }, {
                y: 0,
                opacity: 1,
                rotationX: 0,
                duration: 1,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: heading,
                    start: "top 90%",
                    end: "bottom 20%",
                    toggleActions: "play none none reverse",
                    markers: false
                }
            });
            
            // Si es un h2 o h3, agregar animación de escritura
            if (heading.tagName === 'H2' || heading.tagName === 'H3') {
                animarEscritura(heading);
            }
        }
    });
    
    // Animación para párrafos durante el scroll
    gsap.utils.toArray('p').forEach((paragraph, i) => {
        if (paragraph.offsetParent !== null) {
            gsap.fromTo(paragraph, {
                y: 50,
                opacity: 0
            }, {
                y: 0,
                opacity: 1,
                duration: 0.8,
                scrollTrigger: {
                    trigger: paragraph,
                    start: "top 85%",
                    end: "bottom 20%",
                    toggleActions: "play none none reverse"
                }
            });
        }
    });
    
    // Animación para enlaces durante el scroll
    gsap.utils.toArray('a').forEach((link, i) => {
        if (link.offsetParent !== null) {
            gsap.fromTo(link, {
                y: 30,
                opacity: 0
            }, {
                y: 0,
                opacity: 1,
                duration: 0.6,
                scrollTrigger: {
                    trigger: link,
                    start: "top 90%",
                    end: "bottom 20%",
                    toggleActions: "play none none reverse"
                }
            });
        }
    });
    
    // Animación para elementos con la clase 'cajas-servicios'
    gsap.utils.toArray('.cajas-servicios').forEach((section, i) => {
        gsap.fromTo(section, {
            y: 100,
            opacity: 0
        }, {
            y: 0,
            opacity: 1,
            duration: 1,
            ease: "power2.out",
            scrollTrigger: {
                trigger: section,
                start: "top 80%",
                end: "bottom 20%",
                toggleActions: "play none none reverse"
            }
        });
    });
    
    // Animación para imágenes durante el scroll
    gsap.utils.toArray('.img-card').forEach((imgContainer, i) => {
        gsap.fromTo(imgContainer, {
            x: i % 2 === 0 ? -50 : 50,
            opacity: 0
        }, {
            x: 0,
            opacity: 1,
            duration: 1,
            scrollTrigger: {
                trigger: imgContainer,
                start: "top 80%",
                end: "bottom 20%",
                toggleActions: "play none none reverse"
            }
        });
    });
    
    // Animación para botones durante el scroll
    gsap.utils.toArray('.btn').forEach((btn, i) => {
        gsap.fromTo(btn, {
            scale: 0.8,
            opacity: 0
        }, {
            scale: 1,
            opacity: 1,
            duration: 0.6,
            scrollTrigger: {
                trigger: btn,
                start: "top 85%",
                end: "bottom 20%",
                toggleActions: "play none none reverse"
            }
        });
    });
}

// Función optimizada para animación de escritura en h2 y h3
function animarEscritura(elemento) {
    const textoOriginal = elemento.textContent;
    const duracion = Math.min(textoOriginal.length * 40, 2000); // Limitar duración máxima
    
    // Guardar el texto original y limpiar el elemento
    elemento.setAttribute('data-original-text', textoOriginal);
    elemento.textContent = "";
    
    // Crear efecto de cursor
    const cursor = document.createElement("span");
    cursor.className = "typing-cursor";
    cursor.textContent = "|";
    elemento.appendChild(cursor);
    
    // Usar GSAP para la animación de escritura
    let caracteresMostrados = 0;
    const timeline = gsap.timeline({
        scrollTrigger: {
            trigger: elemento,
            start: "top 90%",
            end: "bottom 20%",
            toggleActions: "play none none none"
        }
    });
    
    timeline.to({}, {
        duration: duracion / 1000,
        onUpdate: function() {
            const progreso = this.progress();
            const nuevosCaracteres = Math.floor(textoOriginal.length * progreso);
            
            if (nuevosCaracteres > caracteresMostrados) {
                // Añadir nuevos caracteres
                for (let i = caracteresMostrados; i < nuevosCaracteres; i++) {
                    elemento.insertBefore(document.createTextNode(textoOriginal[i]), cursor);
                }
                caracteresMostrados = nuevosCaracteres;
            }
        },
        onComplete: function() {
            // Asegurar que se muestra todo el texto
            elemento.textContent = textoOriginal;
        }
    });
}

const mostrarSiguienteModal = (numero) => {
    console.log(numero);
    
    let modales = document.querySelectorAll('.container-fluid');
    
    // Animación para ocultar el modal actual
    if(numero === undefined) {
        gsap.to(modales[2], {
            duration: 0.5,
            opacity: 0,
            scale: 0.8,
            onComplete: function() {
                modales[2].style.display = 'none';
                // Mostrar el siguiente modal con animación
                modales[3].style.display = 'block';
                gsap.fromTo(modales[3], 
                    { opacity: 0, scale: 0.8 },
                    { duration: 0.5, opacity: 1, scale: 1, ease: "back.out(1.7)" }
                );
                
                // Reconfigurar animaciones de scroll para los nuevos elementos visibles
                setTimeout(function() {
                    ScrollTrigger.refresh();
                    configurarAnimacionesScrollTexto();
                }, 100);
            }
        });
    }
    
    switch (numero) {
        case 1:
            gsap.to(modales[4], {
                duration: 0.5,
                opacity: 0,
                scale: 0.8,
                onComplete: function() {
                    modales[4].style.display = 'none';
                    // Mostrar el siguiente modal con animación
                    modales[5].style.display = 'block';
                    gsap.fromTo(modales[5], 
                        { opacity: 0, scale: 0.8 },
                        { duration: 0.5, opacity: 1, scale: 1, ease: "back.out(1.7)" }
                    );
                    
                    // Reconfigurar animaciones de scroll para los nuevos elementos visibles
                    setTimeout(function() {
                        ScrollTrigger.refresh();
                        configurarAnimacionesScrollTexto();
                    }, 100);
                }
            });
            break;
        default:
            break;
    }
}

const regresarModal = (numero) => {
    let modales = document.querySelectorAll('.container-fluid');
    
    // Animación para ocultar el modal actual
    if(numero === undefined) {
        gsap.to(modales[3], {
            duration: 0.5,
            opacity: 0,
            scale: 0.8,
            onComplete: function() {
                modales[3].style.display = 'none';
                // Mostrar el modal anterior con animación
                modales[2].style.display = 'block';
                gsap.fromTo(modales[2], 
                    { opacity: 0, scale: 0.8 },
                    { duration: 0.5, opacity: 1, scale: 1, ease: "back.out(1.7)" }
                );
                
                // Reconfigurar animaciones de scroll para los nuevos elementos visibles
                setTimeout(function() {
                    ScrollTrigger.refresh();
                    configurarAnimacionesScrollTexto();
                }, 100);
            }
        });
    }
    
    if(numero == 1) {
        gsap.to(modales[5], {
            duration: 0.5,
            opacity: 0,
            scale: 0.8,
            onComplete: function() {
                modales[5].style.display = 'none';
                // Mostrar el modal anterior con animación
                modales[4].style.display = 'block';
                gsap.fromTo(modales[4], 
                    { opacity: 0, scale: 0.8 },
                    { duration: 0.5, opacity: 1, scale: 1, ease: "back.out(1.7)" }
                );
                
                // Reconfigurar animaciones de scroll para los nuevos elementos visibles
                setTimeout(function() {
                    ScrollTrigger.refresh();
                    configurarAnimacionesScrollTexto();
                }, 100);
            }
        });
    }
}

// Asegurar que las animaciones se actualicen cuando la ventana cambie de tamaño
window.addEventListener('resize', function() {
    setTimeout(function() {
        ScrollTrigger.refresh();
    }, 500);
});