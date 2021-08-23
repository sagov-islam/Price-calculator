"use strict"

const langBtn = document.querySelector('.header__select-lang-btn'),
      langList = document.querySelector('.header__lang-list'),
      svgArrow = document.querySelector('.svg-arrow'),
      btnSun = document.querySelector('.dark-theme'),
      btnMoon = document.querySelector('.white-theme'),
      head = document.querySelector('head');


// ---------------------------------------------------------------------------


function selectLang() {
    langBtn.addEventListener('click', () => {
        langList.classList.toggle('hide');
        langBtn.classList.toggle('shadow');
        svgArrow.classList.toggle('rotate');
    });
    
    langList.addEventListener('click', (event) => {
        if (event.target.id == 'eng') {
            location.href = 'eng-version.html';

        } else if (event.target.id == 'ru') {
            location.href = 'index.html'
        }
    });


    function closeLangListWhenClickWindow () {
        window.addEventListener('click', (e) => {
            const event = e.target;
            if (event.id !== 'select-lang' && event.id !== 'lang-span' && event.id !== 'svg-arrow') {
                langList.classList.add('hide');
                svgArrow.classList.remove('rotate')
            }
        });
    }
    closeLangListWhenClickWindow()

}
selectLang();


function selectThem() {
    function removeAndAdd(remove, add) {
        remove.classList.remove('hide')
        add.classList.add('hide')
    }
    btnMoon.addEventListener('click', () => {
        removeAndAdd(btnSun,btnMoon)
        const link = document.createElement('link')
        link.id = 'dark-theme';
        link.rel = 'stylesheet';
        link.href = 'css/dark-mode.css';
        head.append(link);
    });
    btnSun.addEventListener('click', () => {
        removeAndAdd(btnMoon,btnSun)
        const darkTheme = document.querySelector('#dark-theme')
        darkTheme.remove();
    });
}
selectThem();
