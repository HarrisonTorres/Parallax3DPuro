  const parallax = document.querySelectorAll('.parallax');

  let clientX = 0;
  let clientY = 0;

  mouseMouvent = (event) => {
      
  }
  
  function throttle(func, delay) {
    let timeoutId;
    let lastExecTime = 0;
  
    return function (...args) {
      const currentTime = new Date().getTime();
  
      if (currentTime - lastExecTime > delay) {
        clearTimeout(timeoutId);
        lastExecTime = currentTime;
        func.apply(this, args);
      } else {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
          lastExecTime = currentTime;
          func.apply(this, args);
        }, delay);
      }
    };
  }
  
  // Exemplo de uso
  const handleMouseMove = throttle(function (event) {
    // Lógica do mousemove aqui
    clientX = event.clientX - window.innerWidth / 2;
      clientY = event.clientY - window.innerHeight / 2;
      console.log(parallax);

      parallax.forEach((el) => {

        if (el) {
          let speedx = el.dataset.speedx;
          let speedy = el.dataset.speedy;
          let speedz = el.dataset.speedz;
          let rotate = el.dataset.rotate;
          
          console.log('speed', speedx, speedy, speedz, rotate);

          let rotadeDegree = 0;
          rotadeDegree = (clientX / (window.innerWidth / 2)) * 20;
  
          let isInLeft = 0;
          isInLeft =
            parseFloat(getComputedStyle(el).left) < window.innerWidth / 2
              ? 1
              : -1;
          let zValue = 0;
          zValue =
            (clientX - parseFloat(getComputedStyle(el).left)) * isInLeft * 0.1;
  
          el.style.transform = `translateX(calc(-50% + ${
            -clientX * speedx
          }px)) translateY(calc(-50% + ${
            -clientY * speedy
          }px)) perspective(2300px) translateZ(${zValue * speedz}px) rotateY(${
            rotadeDegree * rotate
          }deg)`;
        }
      });
  }, 150);
  
  
  window.addEventListener("mousemove", handleMouseMove);
  