const User = require('../models/user');
const countCallories = require('../calloryCounter');
const TelegrafInlineMenu = require('telegraf-inline-menu');

let hideChange = false;
const change = new TelegrafInlineMenu(`Do you want to change some info?`);
change.setCommand('change_myinfo');
change.simpleButton('NO!', 'g', {
  doFunc: (ctx) => {
    hideChange = true;
    ctx.reply('Cool!\n' +
      'If you want to get new daily meal plan - choose command /get_plan');
  }
});
change.question('YES!', 'change_myinfo', {
  uniqueIdentifier: 'h',
  questionText: 'Write your age, height, weight,level of activity(from 0(min) to 4(max)) and sex',
  setFunc: async (_ctx, key) => {
    const arrText = key.split(',');
    if (arrText.length < 5) {
      _ctx.reply(`You should write 5 
      parameters`);
    } else {
      hideChange = true;
      try {
        arrText.forEach((item, index) => {
          if (item != 'male' && item != 'female')
            arrText[index] = Number(item);
        });
        const calor = countCallories(arrText[0], arrText[1], arrText[2], arrText[3], arrText[4])
        await User.updateOne({ telegramId: ctx.chat.id }, {
          sex: arrText[4],
          age: arrText[0],
          height: arrText[1],
          weight: arrText[2],
          activity: arrText[3],
          calories: calor
        });
      } catch (error) { }
      _ctx.reply(
        'Changed!\n' +
        'If you want to get new daily meal plan - choose command /get_plan'
      );
    }
  },
  hide: () => hideChange
})

module.exports = change;
