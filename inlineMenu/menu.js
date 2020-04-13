const User = require('../models/user');
const countCallories = require('../calloryCounter');
const TelegrafInlineMenu = require('telegraf-inline-menu');

let hideMenu = false;
const menu = new TelegrafInlineMenu((ctx) => `Daily meal planner <3`);
menu.setCommand('start');
menu.question('Let`s start!', 'start', {
  uniqueIdentifier: 'a',
  questionText: 'Write your age, height, weight,level of activity(from 0(min) to 4(max)) and sex',
  setFunc: async (_ctx, key) => {
    const arrText = key.split(',');
    if (arrText.length < 5) {
      _ctx.reply(`You should write 5 
      parameters`);
    } else {
      hideMenu = true;
      try {
        const calor = countCallories(Number(arrText[0]), Number(arrText[1]), Number(arrText[2]), arrText[3], arrText[4]);
        console.log(calor, arrText);
        await User.create({
          telegramId: _ctx.chat.id,
          firstName: _ctx.chat.first_name,
          sex: arrText[4],
          age: Number(arrText[0]),
          height: Number(arrText[1]),
          weight: Number(arrText[2]),
          activity: arrText[3],
          calories: calor,
          purpose: 'maintain'
        });
      } catch (error) { }
      _ctx.reply(
        'If you have any special diet - choose command /set_specialdiet\n' +
        'If you don`t eat some food - choose command /set_exception'
      );
    }
  },
  hide: () => hideMenu
})

module.exports = menu;
