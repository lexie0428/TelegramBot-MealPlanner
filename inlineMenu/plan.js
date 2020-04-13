const fetch = require('cross-fetch');
const User = require('../models/user');
const TelegrafInlineMenu = require('telegraf-inline-menu');

const plan = new TelegrafInlineMenu(`For getting daily plan for you - click the button`);
plan.setCommand('get_plan');
plan.simpleButton('Get plan!', 'd', {
  doFunc: async (ctx) => {
    const user = await User.findOne({ telegramId: ctx.chat.id });
    const hrefs = [];
    const meals = [];
    let nutrients = 0;
    await fetch(
      `https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/mealplans/generate?timeFrame=day&targetCalories=${user.calories}&diet=${user.diet}&exclude=${user.exceptions}`,
      {
        method: 'GET',
        headers: {
          'x-rapidapi-host': 'spoonacular-recipe-food-nutrition-v1.p.rapidapi.com',
          'x-rapidapi-key': '99d2bc2f27msh29e5bdde481eea8p1947abjsnb6872fabc5dd'
        }
      }
    )
      .then(async (response) => {
        const res = await response.json();
        nutrients = res.nutrients;
        res.meals.forEach((item) => meals.push(item));
      })
      .catch((err) => {
        console.log(err);
      });

    for (let i = 0; i < 3; i++) {
      await fetch(`https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/${meals[i].id}/information`, {
        "method": "GET",
        "headers": {
          "x-rapidapi-host": "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com",
          "x-rapidapi-key": "99d2bc2f27msh29e5bdde481eea8p1947abjsnb6872fabc5dd"
        }
      })
        .then(async (response) => {
          const res = await response.json();
          hrefs.push(res.sourceUrl);
        })
        .catch(err => {
          console.log(err);
        });
    }
    ctx.replyWithHTML(`<strong>Breakfast</strong>\n` +
      `${meals[0].title}\n` +
      `${hrefs[0]}\n` +
      `cooking time: ${meals[0].readyInMinutes} min\n\n` +
      `<strong>Lunch</strong>\n` +
      `${meals[1].title}\n` +
      `${hrefs[1]}\n` +
      `cooking time: ${meals[1].readyInMinutes} min\n\n` +
      `<strong>Dinner</strong>\n` +
      `${meals[2].title}\n` +
      `${hrefs[2]}\n` +
      `cooking time: ${meals[2].readyInMinutes} min\n\n` +
      `<strong>Calories:</strong> ${nutrients.calories} (recommended ${user.calories})\n` +
      `<strong>Protein:</strong> ${nutrients.protein}\n` +
      `<strong>Fat:</strong> ${nutrients.fat}\n` +
      `<strong>Carbohydrates:</strong> ${nutrients.carbohydrates}\n\n\n` +
      `if you want to get all commands - /help`
    );
  }
});

module.exports = plan;
