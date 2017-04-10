//function BasicCard(front, back) {
//    this.front = front;
//    this.back = back;

//}

//function ClozeCard(text, cloze) {

//}
//var firstPresident = new BasicCard(
//    "Who was the first president of the United States?", "George Washington");
//console.log(firstPresident.front);
//console.log(firstPresident.back);


//CLI interface
//On run:
//    create card objecs with properties
//    display them back
var questions = require("./questions");
var BasicCard = require("./BasicCard");
var ClozeCard = require("./ClozeCard");
var inquirer = require("inquirer");
var counter = 0;
var basic = [];
var clozed = [];
var correct = 0;

for (i = 0; i < questions.basicQuestions.length; i++) {
    var basiccard = new BasicCard(questions.basicQuestions[i].front, questions.basicQuestions[i].back);
    basic.push(basiccard);
}

for (j = 0; j < questions.clozeQuestions.length; j++) {
    var clozecard = new ClozeCard(questions.clozeQuestions[j].full, questions.clozeQuestions[j].cloze);
    clozed.push(clozecard);
}

function game() {
    inquirer.prompt([
        //This will be the user choice for Basic or Clozed questions
        {
            type: "list",
            message: "What type of flashcards would you like?",
            choices: ["Basic", "Clozed"],
            name: "input"
        }
    ]).then(function(data) {
        if (data.input === "Basic") {
            easy();
        } else {
            difficult();
        }
    });
}

function difficult() {
    inquirer.prompt([{
        type: "input",
        message: clozed[counter].partial + "\nAnswer:",
        name: "userGuess"
    }]).then(function(answer) {
        if (answer.userGuess === clozed[counter].cloze) {
            console.log("Correct");
            correct++;
        } else {
            console.log("Incorrect");
        }
        if (counter < clozed.length - 1) {
            counter++;
            difficult();
        } else {
            console.log("Game Over");
            console.log("You got: " + correct + " out of " + clozed.length + " Right");
            playagain();


        }
    });
}

function easy() {
    inquirer.prompt([{
        type: "input",
        message: basic[counter].front + "\nAnswer:",
        name: "userInput"
    }]).then(function(answer) {
        if (answer.userInput === basic[counter].back) {
            console.log("Correct");
            correct++;
        } else {
            console.log("Incorrect");
        }
        if (counter < basic.length - 1) {
            counter++
            easy();
        } else {
            console.log("Game Over");
            console.log("You got: " + correct + " out of " + basic.length + " Right");
            playagain();
        }
    })
}

function playagain() {
    inquirer.prompt([{
        type: "list",
        message: "Would you like to play again?",
        choices: ["Yes", "No"],
        name: "decision"
    }]).then(function(information) {
        if (information.decision === "Yes") {
            game();
        } else {
            console.log("Thanks for playing have a wonderful day");
        }
    })
}



game();
