let imageContainer = document.querySelector('#imageContainer');
let heroImage = document.querySelector('#heroImage');

function checkScrollDirectionIsUp(e) {
    if (e.wheelDelta) {
      return e.wheelDelta > 0;
    }
    return e.deltaY < 0;
  }

window.addEventListener('wheel', (e) => {
    if(this.scrollY > 0) {
        if (checkScrollDirectionIsUp(e)) {
            if (heroImage.offsetWidth > window.innerWidth * 0.4) {
                heroImage.style.width = heroImage.offsetWidth - 200 + 'px';
            }
        } else {
            if (heroImage.offsetWidth < window.innerWidth - 200) {
                heroImage.style.width = heroImage.offsetWidth + 200 + 'px';
            }
        }
    }   
})