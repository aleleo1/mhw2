'use strict'
const check_path = 'images/checked.png';
const uncheck_path = 'images/unchecked.png';
run();
function run() {

    getChoiceArr().forEach((selector, selector_index) => {
        Array.from(selector.children).forEach((section, section_index) => {

            Array.from(section.children).forEach(
                elem => {
                    checked(elem, section_index, selector_index)
                }
            )
        })
    })

}


function getChoiceArr() {
    return Array.from(document.querySelectorAll('section.choice-grid'));
}

function checked(elem, index, s_index) {


    if (elem.classList.contains('checkbox')) {
        elem.onclick = function () {

            if (elem.getAttribute('src') === check_path) {
                elem.setAttribute('src', uncheck_path);
                elem.parentElement.classList.remove('chosen-section');

            }
            else {
                elem.setAttribute('src', check_path);
                elem.parentElement.classList.add('chosen-section');
                fixer(index, s_index);
                if (quizEnder()) {
                    console.log('QUIZ DONE');
                    block_all();
                    check_result();
                };




            }


        }
    }
    else {
        elem.addEventListener('click', function () {
            let parent = elem.parentElement;
            if (Array.from(parent.classList).includes('chosen-section')) {
                parent.classList.remove('chosen-section');
                elem.parentElement.getElementsByClassName('checkbox')[0].setAttribute('src', uncheck_path);

            }
            else {
                parent.classList.add('chosen-section');
                /*  console.log('///////', elem.parentElement.getElementsByClassName('checkbox')); */
                elem.parentElement.getElementsByClassName('checkbox')[0].setAttribute('src', check_path);
                fixer(index, s_index);
                if (quizEnder()) {
                    console.log('QUIZ DONE');
                    block_all();

                    check_result();
                };


            }
        })
    }
}

function fixer(index, s_index) {
    getChoiceArr().forEach((selector, ii) => {
        Array.from(selector.getElementsByClassName('checkbox')).forEach((checkbox, i) => {
            if (i !== index && ii === s_index) {
                checkbox.setAttribute('src', uncheck_path);
                if (Array.from(checkbox.parentElement.classList).includes('chosen-section')) {
                    checkbox.parentElement.classList.remove('chosen-section');
                }
            }
        })

    })
}

function block_all() {

    Array.from(document.querySelectorAll('img')).forEach(elem => {
        elem.replaceWith(elem.cloneNode(true));
    })

}

function restart() {
    Array.from(document.querySelectorAll('img')).forEach(elem => {
        if ((Array.from(elem.classList).includes('checkbox'))) {
            elem.setAttribute('src', uncheck_path);
        }
        else {
            elem.parentElement.classList.remove('chosen-section');
        }
    });
    let result = document.querySelector('#result');
    result.classList.remove('quiz-result');
    result.classList.add('not-show');
    run();
}

function check_result() {

    let arr = [];
    Array.from(document.querySelectorAll('div.chosen-section')).forEach(
        elem => {
            console.log(elem.dataset.choiceId)
            arr.push({ choice: elem.dataset.choiceId, num: elem.dataset.questionId })
        });
    let answer = arrChecker(arr);
    console.log(answer);
    console.log(RESULTS_MAP[answer.choice]);
    let result = document.querySelector('#result');
    result.classList.remove('not-show');
    result.classList.add('quiz-result');
    result.getElementsByTagName('h1')[0].innerText = RESULTS_MAP[answer.choice].title;
    result.getElementsByTagName('p')[0].innerText = RESULTS_MAP[answer.choice].contents;
    result.getElementsByTagName('button')[0].addEventListener('click', restart);

}

function arrChecker(arr) {
    console.log(arr)
    if (arr[0].choice === arr[1].choice || arr[0].choice === arr[2].choice) {
        return arr[0]
    }
    else {
        if (arr[1].choice === arr[2].choice) {
            return arr[1];
        }
        else {
            return arr[0];
        }
    }

}

function quizEnder() {
    return document.querySelectorAll('div.chosen-section').length === 3 ? true : false;
}
