import rosetta from 'rosetta';

export const i18n = rosetta({
  en: {
    intro: {
        welcome: 'Hi, I\'m Andry!',
        text: 'I am a Front End developper',
        contact: "Let's get in touch",
        other: 'Something else'
    },
    // support(obj) {
    //   let hour = Math.floor(Math.random() * 3) + 9;
    //   let str = `For questions, I'm available on ${obj.date.toLocaleDateString()}`;
    //   str += `, any time after ${hour}:00.`
    //   return str;
    // }
    },
  fr: {
    intro: {
        welcome: 'Bonjour, je suis Andry',
        text: 'Je suis un développeur Front End',
        contact: 'Contactez-moi',
        other: 'Autre texte'
    },
    // support(obj) {
    //   let hour = Math.floor(Math.random() * 3) + 9;
    //   let str = `For questions, I'm available on ${obj.date.toLocaleDateString()}`;
    //   str += `, any time after ${hour}:00.`
    //   return str;
    // }
  }    
});