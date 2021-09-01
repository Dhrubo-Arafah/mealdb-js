const allMeals = document.getElementById('meals')
const input = document.querySelector('input')
const button = document.querySelector('button')

document.addEventListener("DOMContentLoaded", defaultMeal())

function defaultMeal(){
    fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i= `)
            .then(res => res.json())
            .then(data => {
                meals = data.meals
                allMeals.textContent = ''
                 spinnerToggler('d-none')
                    for (const meal of meals) {
                        let item = Object.values(meal)
                        newMeal(item[0], item[1])
                    }
            })
        }

button.addEventListener('click', e => {
    e.preventDefault();
    item = input.value.trim();
    if (item == '') {
        alert('Field is empty')
    } else {
        fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?s=${item}`)
            .then(res => res.json())
            .then(data => {
                meals = data.meals
                if (meals === null) {
                    alert('Search Not Found')
                }
                else {
                    allMeals.textContent = ''
                    spinnerToggler('d-none')
                    for (const meal of meals) {
                        let item = Object.values(meal)
                        newMeal(item[0], item[1])
                        
                    }
                }
            });
            input.value='';
    }
})

function alert(text) {
    allMeals.innerHTML = `
    <div class="alert alert-danger alert-dismissible fade show d-flex align-items-center mx-auto ps-3 pe-1 rounded" role="alert" >
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-exclamation-triangle-fill flex-shrink-0 me-2" viewBox="0 0 16 16" role="img" aria-label="Warning:">
            <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
        </svg>
        <div class="mx-auto w-100">
            ${text}
        </div>
        <button type="button" onclick="defaultMeal()" class="btn rounded-circle mx-auto" data-bs-dismiss="alert"><i class="fas fa-times text-danger"></i></button>
    </div>`
}

function newMeal(head, img) {
    let singleMeal = document.createElement('div')
    singleMeal.classList.add('col')
    let inner = document.createElement('div')
    inner.classList.add('shadow-sm', 'rounded', 'p-3', 'text-center')
    let heading = document.createElement('h4')
    heading.classList.add('mt-2')
    heading.innerText = head
    let image = document.createElement('img')
    image.classList.add('w-100', 'rounded')
    image.setAttribute('src', `${img}`)
    inner.appendChild(image)
    inner.appendChild(heading)
    singleMeal.appendChild(inner)
    allMeals.appendChild(singleMeal)
}

function spinnerToggler(value){
    document.querySelector('#loader').classList.add(`${value}`, 'loader')
}