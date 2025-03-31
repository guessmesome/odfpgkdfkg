document.addEventListener('DOMContentLoaded', function() {
    // Обработка ввода ссылок
    const linkInputs = document.querySelectorAll('.link-input input');
    const applyButtons = document.querySelectorAll('.apply-btn');
    const products = document.querySelectorAll('.product');
    
    // Слайдеры изображений
    const dots = document.querySelectorAll('.dot');
    
    // Функция для переключения слайдов
    function switchSlide(productId, slideIndex) {
        const slides = document.querySelectorAll(`#product${productId} .image-slider img`);
        const productDots = document.querySelectorAll(`#product${productId} .dot`);
        
        slides.forEach(slide => slide.classList.remove('active'));
        productDots.forEach(dot => dot.classList.remove('active'));
        
        slides[slideIndex].classList.add('active');
        productDots[slideIndex].classList.add('active');
    }
    
    // Обработчик клика по точкам слайдера
    dots.forEach(dot => {
        dot.addEventListener('click', function() {
            const productId = this.closest('.product').id.replace('product', '');
            const slideIndex = parseInt(this.getAttribute('data-index'));
            switchSlide(productId, slideIndex);
        });
    });
    
    // Автоматическое переключение слайдов
    let slideIntervals = {};
    
    function startSlideShow(productId) {
        if (slideIntervals[productId]) {
            clearInterval(slideIntervals[productId]);
        }
        
        let currentSlide = 0;
        const slides = document.querySelectorAll(`#product${productId} .image-slider img`);
        
        slideIntervals[productId] = setInterval(() => {
            currentSlide = (currentSlide + 1) % slides.length;
            switchSlide(productId, currentSlide);
        }, 3000);
    }
    
    // Запускаем слайдшоу для всех продуктов
    for (let i = 1; i <= 4; i++) {
        startSlideShow(i);
    }
    
    // Обработка ввода ссылок
    linkInputs.forEach(input => {
        input.addEventListener('input', function() {
            const productId = this.getAttribute('data-product');
            const applyBtn = document.querySelector(`.apply-btn[data-product="${productId}"]`);
            const product = document.getElementById(`product${productId}`);
            
            if (this.value.trim() !== '') {
                applyBtn.classList.remove('disabled');
                product.classList.add('active');
            } else {
                applyBtn.classList.add('disabled');
                product.classList.remove('active');
            }
        });
    });
    
    // Обработка клика по кнопке
    applyButtons.forEach(button => {
        button.addEventListener('click', function() {
            if (!this.classList.contains('disabled')) {
                const productId = this.getAttribute('data-product');
                const input = document.querySelector(`.link-input input[data-product="${productId}"]`);
                const url = input.value.trim();
                
                if (url) {
                    // Анимация нажатия
                    this.classList.add('clicked');
                    setTimeout(() => {
                        this.classList.remove('clicked');
                        
                        // Переход по ссылке
                        window.open(url, '_blank');
                    }, 300);
                }
            }
        });
    });
    
    // Анимированное открытие/закрытие продукта при клике
    products.forEach(product => {
        product.addEventListener('click', function(e) {
            // Игнорируем клики по кнопкам и инпутам
            if (e.target.tagName === 'BUTTON' || e.target.tagName === 'INPUT') {
                return;
            }
            
            // Переключаем класс expanded
            this.classList.toggle('expanded');
            
            // Перезапускаем слайдшоу
            const productId = this.id.replace('product', '');
            startSlideShow(productId);
        });
    });
    
    // Обработка загрузки изображений
    const imageFiles = document.querySelectorAll('.image-file');
    const productSelect = document.getElementById('product-select');
    
    imageFiles.forEach(input => {
        input.addEventListener('change', function() {
            const file = this.files[0];
            if (!file) return;
            
            const reader = new FileReader();
            const productId = productSelect.value;
            const slideIndex = parseInt(this.getAttribute('data-index'));
            
            reader.onload = function(e) {
                const imgElement = document.querySelector(`#product${productId} .image-slider img:nth-child(${slideIndex + 1})`);
                imgElement.src = e.target.result;
                
                // Показать загруженное изображение
                switchSlide(productId, slideIndex);
            };
            
            reader.readAsDataURL(file);
        });
    });
    
    // Анимация при наведении на продукты
    products.forEach(product => {
        product.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
            this.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.15)';
        });
        
        product.addEventListener('mouseleave', function() {
            this.style.transform = '';
            this.style.boxShadow = '';
        });
    });
    
    // Анимация при клике на кнопку
    applyButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            // Добавляем эффект нажатия
            this.style.transform = 'scale(0.98)';
            
            setTimeout(() => {
                this.style.transform = '';
            }, 200);
        });
    });
}); 