const User = require('../models/user');
const TelegrafInlineMenu = require('telegraf-inline-menu');

// let hideException = false;
const exception = new TelegrafInlineMenu(`You have special diet?`);
exception.setCommand('set_specialdiet');
exception.simpleButton('NO!', 'c', {
  doFunc: (ctx) => {
    // hideException = true;
    ctx.reply('Greit for you!\n' +
      'If you want to get new daily meal plan - choose command /get_plan');
  },
  // hide: () => hideException
});
exception.question('YES!', 'set_specialdiet', {
  uniqueIdentifier: 'b',
  questionText: 'What diet do you have?',
  setFunc: async (_ctx, key) => {
    hideException = true;
    await User.updateOne({ telegramId: _ctx.chat.id }, { diet: key });
    _ctx.reply('Changed!\n' +
      'If you want to get new daily meal plan - choose command /get_plan');
  },
  // hide: () => hideException
});

module.exports = exception;
