const { saved_questions } = require("./models");
saved_questions.destroy({ where: {} }).then((del) => console.log(del));
