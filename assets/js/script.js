const carouselElement = document.querySelector('#carouselExample');
  const carousel = new bootstrap.Carousel(carouselElement, {
    interval: 5000,
    ride: 'carousel',
    wrap: true, // aseguramos que reinicie tras la última imagen
    pause: false // evita que se detenga con hover
  });