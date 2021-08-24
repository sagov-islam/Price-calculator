"use strict"

const langBtn = document.querySelector('.header__select-lang-btn'),
      langList = document.querySelector('.header__lang-list'),
      svgArrow = document.querySelector('.svg-arrow'),
      btnSun = document.querySelector('.dark-theme'),
      btnMoon = document.querySelector('.white-theme'),
      head = document.querySelector('head');


// ---------------------------------------------------------------------------


const addBtn = document.querySelector('.header__button-add-task'),
      inputTask = document.querySelector('.header__input-task'),
      inputPrice = document.querySelector('.header__input-price'),
      taskList = document.querySelector('.tasks__list'),
      svgTask = document.querySelector('.error-svg-task'),
      svgPrice = document.querySelector('.error-svg-price');


const arrayTasks = [];
addBtn.addEventListener('click', () => {
    const taskValue = inputTask.value
    const priceValue = inputPrice.value;
    if (taskValue == '' && priceValue == '') {
        svgTask.classList.remove('hide')
        svgPrice.classList.remove('hide')
        inputTask.classList.add('input--error')
        inputPrice.classList.add('input--error')
        inputPrice.style.color = '#FF6161'
        inputTask.style.color = '#FF6161'
        inputTask.placeholder = 'Вы не ввели задачу'
        inputPrice.placeholder = 'Вы не ввели цену'
    } else if (taskValue == '') {
        svgTask.classList.remove('hide')
        inputTask.classList.add('input--error')
        inputTask.style.color = '#FF6161'
        inputTask.placeholder = 'Вы не ввели задачу'
    } else if (taskValue.length >= 32) {
        svgTask.classList.remove('hide')
        inputTask.classList.add('input--error')
        inputTask.value = ''
        inputTask.style.color = '#FF6161'
        inputTask.placeholder = 'Слишком длинное название'
    } else if (priceValue == '') {
        svgPrice.classList.remove('hide')
        inputPrice.classList.add('input--error')
        inputPrice.placeholder = 'Вы не ввели цену'
    } else if (isNaN(priceValue)) {
        svgPrice.classList.remove('hide')
        inputPrice.classList.add('input--error')
        inputPrice.value = ''
        inputPrice.style.color = '#FF6161'
        inputPrice.placeholder = 'Только цифры'
        
    }  else {
        inputPrice.value = ''
        inputTask.value = ''
        svgPrice.classList.add('hide')
        svgTask.classList.add('hide')
        inputPrice.classList.remove('input--error')
        inputTask.classList.remove('input--error')

        const task = document.createElement('li')
        arrayTasks[arrayTasks.length] = task
        task.classList.add('tasks-item')
        task.innerHTML = `
        <button class="tasks__btn-delete">
            <img src="img/delete.svg" alt="df">
        </button>
        <div class="tasks__item-content">
            <p class="tasks__item-title">${taskValue}</p>
            <div class="tasks__item-counter">
                <button class="tasks__item-counter-arrow">
                    <img src="img/minus.svg" alt="minus">
                </button>
                <div class="tasks__item-counter-numbers">1</div>
                <button class="tasks__item-counter-arrow">
                    <img src="img/plus.svg" alt="plus">
                </button>
            </div>
            <div class="tasks-item-price">
                <p>${priceValue}</p>
            </div>
        </div>`
    
    taskList.append(task)
    }
});





















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
