const API_URL = 'https://www.themealdb.com/api/json/v1/1';

const searchForm = document.getElementById('search-form');
const mealBoxContainer = document.getElementById('meal-box-container');
const mealBoxTemplate = document.getElementById('meal-box-template');
const mealBoxModal = document.getElementById('meal-box-modal');

const getMealsByKeyword = (keyword) => {
    return fetch(`${API_URL}/search.php?s=${keyword}`)
        .then(res => res.json())
        .then(data => data.meals);
};

const getMealById = (id) => {
    return fetch(`${API_URL}/lookup.php?i=${id}`)
        .then(res => res.json())
        .then(data => data.meals[0]);
};

const displayMeals = () => {
    searchForm.addEventListener('submit', async function(event) {
        event.preventDefault();

        let keyword = document.getElementById('search').value;
        let meals = await getMealsByKeyword(keyword);

        meals.forEach(meal => {
            let mealBox = mealBoxTemplate.content.cloneNode(true);

            mealBox.querySelector('.card-img-top').src = meal.strMealThumb;
            mealBox.querySelector('.card-title').innerHTML = meal.strMeal;
            mealBox.querySelector('.card-link').setAttribute('onClick', 'displayMealDetail(' + meal.idMeal + ')');
            mealBoxContainer.appendChild(mealBox);
        });
    });
};

const displayMealDetail = async(id) => {
    let meal = await getMealById(id);

    mealBoxModal.querySelector('.meal-img').src = meal.strMealThumb;
    mealBoxModal.querySelector('.meal-title, .modal-title').innerHTML = meal.strMeal;
    mealBoxModal.querySelector('.meal-category').innerHTML = '<b>Category: </b>' + meal.strCategory;
    mealBoxModal.querySelector('.meal-tags').innerHTML = '<b>Tags: </b>' + meal.strTags;
    mealBoxModal.querySelector('.meal-cuisine').innerHTML = '<b>Cuisine: </b>' + meal.strArea;
    mealBoxModal.querySelector('.meal-desc').innerHTML = '<b>Description: </b>' + meal.strInstructions;
};


displayMeals();