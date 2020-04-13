const User = require('../models/user');
const TelegrafInlineMenu = require('telegraf-inline-menu');

// let hideType = false;
const type = new TelegrafInlineMenu(`What is your purpose?`);
type.setCommand('set_typeofplan');
type.simpleButton('Lose weight!', 'lose', {
  doFunc: async (ctx) => {
    const user = await User.findOne({ telegramId: ctx.chat.id });
    const newCalories = user.calories - 250;
    await User.updateOne({ telegramId: ctx.chat.id }, { calories: newCalories, purpose: 'lose' })
    // hideException = true;
    ctx.reply('I believe in you!\n' +
      'Your purpose were changed!\n' +
      'If you want to get new daily meal plan - choose command /get_plan');
  },
  // hide: () => hideException
});
type.simpleButton('Gain weight!', 'gain', {
  doFunc: async (ctx) => {
    const user = await User.findOne({ telegramId: ctx.chat.id });
    const newCalories = user.calories + 250;
    await User.updateOne({ telegramId: ctx.chat.id }, { calories: newCalories, purpose: 'gain' })
    // hideException = true;
    ctx.reply('I believe in you!\n' +
      'Your purpose were changed!\n' +
      'If you want to get new daily meal plan - choose command /get_plan');
  },
  // hide: () => hideException
});
type.simpleButton('Maintain weight!', 'maintain', {
  doFunc: async (ctx) => {
    const user = await User.findOne({ telegramId: ctx.chat.id });
    let newCalories = 0;
    if (user.calories === 'gain') {
      newCalories = user.calories - 250;
    } if (user.calories === 'lose') {
      newCalories = user.calories + 250;
    }
    await User.updateOne({ telegramId: ctx.chat.id }, { calories: newCalories, purpose: 'maintain' })
    // hideException = true;
    ctx.reply('Your purpose were changed!\n' +
      'If you want to get new daily meal plan - choose command /get_plan');
  },
  // hide: () => hideException
});

module.exports = type;
