document.addEventListener('DOMContentLoaded', () => {
    const mainNavButtons = document.querySelectorAll('.nav-btn');
    const subNavButtons = document.querySelectorAll('.sub-btn');
    const backButtons = document.querySelectorAll('.back-to-difusion-btn');
    const sections = document.querySelectorAll('.content-section');

    // Función auxiliar para cambiar de sección
    function switchSection(targetId) {
        sections.forEach(sec => sec.classList.remove('active'));
        const targetSection = document.getElementById(targetId);
        if (targetSection) {
            targetSection.classList.add('active');
        }
    }

    // 1. Clic en el menú superior principal
    mainNavButtons.forEach(button => {
        button.addEventListener('click', () => {
            mainNavButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            const targetId = button.getAttribute('data-target');
            switchSection(targetId);
        });
    });

    // 2. Clic en los botones centrales de difusión
    subNavButtons.forEach(button => {
        button.addEventListener('click', () => {
            const targetId = button.getAttribute('data-target');
            switchSection(targetId);
        });
    });

    // 3. Clic en los botones de "Volver a Material de Difusión"
    backButtons.forEach(button => {
        button.addEventListener('click', () => {
            const targetId = button.getAttribute('data-target');
            switchSection(targetId);
        });
    });

    // 4. Mostrar / ocultar Valores con el botón "Ver más"
    const toggleValores = document.getElementById('toggle-valores');
    const valoresBlock = document.getElementById('valores-block');

    if (toggleValores && valoresBlock) {
        toggleValores.addEventListener('click', () => {
            const isVisible = valoresBlock.classList.toggle('visible');
            toggleValores.textContent = isVisible ? 'Ver menos ↑' : 'Ver más ↓';
            toggleValores.setAttribute('aria-expanded', isVisible);
        });
    }

    // 5. Manejo del formulario de contacto
    const registroForm = document.getElementById('registro-form');
    const successMessage = document.getElementById('success-message');

    if (registroForm) {
        registroForm.addEventListener('submit', (e) => {
            e.preventDefault();
            if (!registroForm.checkValidity()) {
                registroForm.reportValidity();
                return;
            }
            registroForm.reset();
            if (successMessage) {
                successMessage.classList.add('visible');
                setTimeout(() => successMessage.classList.remove('visible'), 6000);
            }
        });
    }

    // 6. Carrusel de galería
    const carousel = document.getElementById('galeria-carousel');

    if (carousel) {
        const slides = carousel.querySelectorAll('.carousel-slide');
        const prevBtn = carousel.querySelector('.carousel-btn.prev');
        const nextBtn = carousel.querySelector('.carousel-btn.next');
        const dotsContainer = carousel.querySelector('.carousel-dots');
        let currentIndex = 0;

        // Crear los puntos (dots) dinámicamente según el número de slides
        slides.forEach((_, i) => {
            const dot = document.createElement('button');
            dot.className = 'dot' + (i === 0 ? ' active' : '');
            dot.setAttribute('aria-label', `Ir a la imagen ${i + 1}`);
            dot.type = 'button';
            dot.addEventListener('click', () => goToSlide(i));
            dotsContainer.appendChild(dot);
        });

        const dots = dotsContainer.querySelectorAll('.dot');

        function goToSlide(index) {
            slides[currentIndex].classList.remove('active');
            dots[currentIndex].classList.remove('active');

            currentIndex = (index + slides.length) % slides.length;

            slides[currentIndex].classList.add('active');
            dots[currentIndex].classList.add('active');
        }

        prevBtn.addEventListener('click', () => goToSlide(currentIndex - 1));
        nextBtn.addEventListener('click', () => goToSlide(currentIndex + 1));
    }
});