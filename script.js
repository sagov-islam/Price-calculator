"use strict"

const langBtn = document.querySelector('.header__select-lang-btn'),
      langList = document.querySelector('.header__lang-list'),
      svgArrow = document.querySelector('.svg-arrow'),
      btnSun = document.querySelector('.dark-theme'),
      btnMoon = document.querySelector('.white-theme'),
      head = document.querySelector('head');


// ---------------------------------------------------------------------------
const arrayTasks = [];
const arrayButtonsDelete = [];





function addTask(deleteTask) {
    const addBtn = document.querySelector('.header__button-add-task'),
        inputTask = document.querySelector('.header__input-task'),
        inputPrice = document.querySelector('.header__input-price'),
        taskList = document.querySelector('.tasks__list'),
        svgTask = document.querySelector('.error-svg-task'),
        svgPrice = document.querySelector('.error-svg-price');

    function inputAddError (input, svg, value) {
        input.classList.add('input--error');
        svg.classList.remove('hide');
        input.value = ''
        input.placeholder = value
    }

    function inputRemoveError (input, svg, placeholder) {
        input.classList.remove('input--error');
        svg.classList.add('hide');
        input.value = '';
        input.placeholder = placeholder;
    }

    function eventInput (input, svg) {
        input.addEventListener('input', () => {
            input.classList.remove('input--error')
            svg.classList.add('hide')
        });
    };
    
    eventInput(inputTask, svgTask);
    eventInput(inputPrice, svgPrice);

    addBtn.addEventListener('click', () => {
        let tValue = inputTask.value
        let pValue = inputPrice.value
        if (tValue == '') {
            inputAddError(inputTask, svgTask, 'Вы не ввели задачу');
        } else if (pValue == '') {
            inputAddError(inputPrice, svgPrice, 'Вы не ввели цену');
        } else if (tValue.length >= 32) {
            inputAddError(inputTask, svgTask, 'Слишком длинное название');
        } else if (isNaN(pValue)) {
            inputAddError(inputPrice, svgPrice, 'Только цифры');
        } else {
            inputRemoveError(inputTask, svgTask, 'Введите задачу');
            inputRemoveError(inputPrice, svgPrice, 'Введите число');

            const task = document.createElement('li');
            const btnDelete = document.createElement('button');
            task.classList.add('tasks-item');
            btnDelete.classList.add('tasks__btn-delete');

            task.innerHTML = `
            <div class="tasks__item-content">
                <p class="tasks__item-title">${tValue}</p>
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
                    <p>${pValue}</p>
                </div>
            </div>`;
            btnDelete.innerHTML = '<img src="img/delete.svg" alt="Button - delete">';
        
        task.prepend(btnDelete);
        taskList.append(task);

        arrayTasks[arrayTasks.length] = task;
        arrayButtonsDelete[arrayButtonsDelete.length] = btnDelete;
        }

        deleteTask()
        tasksLength()
    })
    

}
addTask(deleteTask)

function deleteTask() {
    arrayButtonsDelete.forEach((item, i) => {
        item.addEventListener('click', () => {
            arrayTasks[i].remove();
            tasksLength()
        });
    });
}

function tasksLength () {
    const task = document.querySelectorAll('.tasks-item');
    const sum = document.querySelector('.sidebar__sum');
    sum.innerHTML = task.length
}






















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
