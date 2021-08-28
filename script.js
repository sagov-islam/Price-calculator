"use strict"

const langBtn = document.querySelector('.header__select-lang-btn'),
      langList = document.querySelector('.header__lang-list'),
      svgArrow = document.querySelector('.svg-arrow'),
      btnSun = document.querySelector('.dark-theme'),
      btnMoon = document.querySelector('.white-theme'),
      head = document.querySelector('head');


// ---------------------------------------------------------------------------
const arrayTasks = [];
let counterNum = [];
const counterPrice = [];
let priceArrayNumber = [];


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
        if (tValue == '' && pValue == '') {
            inputAddError(inputTask, svgTask, 'Вы не ввели задачу');
            inputAddError(inputPrice, svgPrice, 'Вы не ввели цену');
        } else if (tValue == '' && isNaN(pValue)) {
            inputAddError(inputPrice, svgPrice, 'Только цифры');
            inputAddError(inputTask, svgTask, 'Вы не ввели задачу');
        } else if (tValue == '') {
            inputAddError(inputTask, svgTask, 'Вы не ввели задачу');
        } else if (pValue == '') {
            inputAddError(inputPrice, svgPrice, 'Вы не ввели цену');
        } else if (tValue.length >= 32) {
            inputAddError(inputTask, svgTask, 'Слишком длинное название');
        } else if (isNaN(pValue)) {
            inputAddError(inputPrice, svgPrice, 'Только цифры');
        } else {
            inputRemoveError(inputTask, svgTask, 'Название задачи');
            inputRemoveError(inputPrice, svgPrice, 'Цена');

            const task = document.createElement('li');
            task.classList.add('tasks-item');

            task.innerHTML = `
            <button class="tasks__btn-delete">
                <img src="img/delete.svg" alt="Button - delete">
            </button>
            <div class="tasks__item-content">
                <p class="tasks__item-title">${tValue}</p>
                <div class="tasks__item-counter">
                    <button class="tasks__item-counter-arrow minus">
                        <img src="img/minus.svg" alt="minus">
                    </button>
                    <div class="tasks__item-counter-numbers">1</div>
                    <button class="tasks__item-counter-arrow plus">
                        <img src="img/plus.svg" alt="plus">
                    </button>
                </div>
                <div class="tasks-item-price">
                    <p>${pValue}</p>
                </div>
            </div>`;
        taskList.append(task);
        arrayTasks[arrayTasks.length] = task;
        tolocal()
        counter()
        AddAllCounterNumInArray()
        priceAddition()
        }
        deleteTask()
        tasksLength()
    })
}
addTask(deleteTask)




// LocalStorage
const list = document.querySelector('.tasks__list');
let tasks;
function tolocal() {
    tasks = list.innerHTML;
    localStorage.setItem('tasks', tasks)
}
if (localStorage.getItem('tasks')) {
    list.innerHTML = localStorage.getItem('tasks')
    deleteTask()
    tasksLength()
    AddAllCounterNumInArray()
    priceAddition()
}




// Delete Tasks
function deleteTask() {
    const buttonsDelete = document.querySelectorAll('.tasks__btn-delete');
    buttonsDelete.forEach((item, i) => {
        const tasks = document.querySelectorAll('.tasks-item');
        item.addEventListener('click', () => {
            tasks[i].remove();
            delete counterNum[i]
            delete priceArrayNumber[i]
            priceAddition()
            tasksLength()
            tolocal()
        });
    });
}
deleteTask()



// Task Length
function tasksLength () {
    const task = document.querySelectorAll('.tasks-item');
    const sum = document.querySelector('.sidebar__sum');
    sum.innerHTML = task.length
}




// Select Language
function selectLang() {
    langBtn.addEventListener('click', () => {
        langList.classList.toggle('hide');
        langBtn.classList.toggle('shadow');
        svgArrow.classList.toggle('rotate');
    });
    langList.addEventListener('click', (event) => {
        if (event.target.id == 'eng') {
            location.href = 'index-eng.html';

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
                langBtn.classList.remove('shadow');
            }
        });
    }
    closeLangListWhenClickWindow()
}
selectLang();






// Select Theme
function selectThem() {
    function removeAndAdd(remove, add) {
        remove.classList.remove('hide')
        add.classList.add('hide')
    }
    function addDarkTheme() {
        removeAndAdd(btnSun,btnMoon)
        const link = document.createElement('link')
        link.id = 'dark-theme';
        link.rel = 'stylesheet';
        link.href = 'css/dark-mode.css';
        head.append(link);
        localStorage.setItem('themes', 'dark-theme') 
    }

    btnMoon.addEventListener('click', addDarkTheme);
    btnSun.addEventListener('click', () => {
        removeAndAdd(btnMoon,btnSun)
        const darkTheme = document.querySelector('#dark-theme')
        darkTheme.remove();
        localStorage.setItem('themes', 'white-theme')
    });

    if (localStorage.getItem('themes') == 'dark-theme') { addDarkTheme() }
}
selectThem();




// Counter
function AddAllCounterNumInArray() {
    const countersList = document.querySelectorAll('.tasks__item-counter-numbers');
    countersList.forEach((item,i) => {
        counterNum[i] = +item.innerHTML
    });
}
AddAllCounterNumInArray()

function counter() {
    list.innerHTML = localStorage.getItem('tasks')
    deleteTask()

    let minus = document.querySelectorAll('.minus')
    let plus = document.querySelectorAll('.plus')
    let counters = document.querySelectorAll('.tasks__item-counter-numbers')

    // PLUS
   plus.forEach(( item, i ) => {
        item.addEventListener('click', () => {
            counterNum[i] += 1
            counters[i].textContent = counterNum[i]
            priceAddition()
            tolocal()
        });
   });

    // MINUS
    minus.forEach((item, i) => {
        item.addEventListener('click', () => {
            counterNum[i] -= 1
            ifCounterSmallerThanZero(i)
            counters[i].textContent = counterNum[i]
            console.log(counterNum);
            priceAddition()
            tolocal()
        });
    });

    function ifCounterSmallerThanZero(i) {
        if (counterNum[i] < 1) {
            counterNum[i] = 0
        }
    }
}
counter()




// Result
function priceAddition() {
    const sidebarResult = document.querySelector('.sidebar__result');
    let result = 0
    const priceArray = document.querySelectorAll('.tasks-item-price p');
    priceArray.forEach((item, i) => {
        priceArrayNumber[i] = parseInt(item.innerHTML)
    });
    counterNum.forEach((item,i) => {
        result += (priceArrayNumber[i] * item)
    })
    sidebarResult.innerHTML = result
    if (sidebarResult.innerHTML.length >= 17) {
        sidebarResult.style.fontSize = '15px'
    }
}