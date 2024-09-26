const questions = [
    {
        question: "What does the typeof operator return in JavaScript?",
        answers: [
            {text: "A) It returns the value of a variable." , correct: false},
            {text: "B) It returns the data type of a variable." , correct: true},
            {text: "C) It checks if a variable is undefined." , correct: false},
            {text: "D) It converts the variable to a string." , correct: false},

        ]
    },
    {
        question: "Which of the following is a method to convert a string to an integer in JavaScript?",
        answers: [
            {text: "A) parseInt() " , correct: true},
            {text: "B) toString()" , correct: false},
            {text: "C) JSON.stringify()" , correct: false},
            {text: "D) join()" , correct: false},

        ]
    },
    {
        question: "What is the default value of an uninitialized variable in JavaScript?",
        answers: [
            {text: "A) 0" , correct: false},
            {text: "B) null" , correct: false},
            {text: "C) undefined " , correct: true},
            {text: "D) false" , correct: false},

        ]
    },
    {
        question: "Which of the following is NOT a JavaScript data type?",
        answers: [
            {text: "A) String" , correct: false},
            {text: "B) Number" , correct: false},
            {text: "C) Boolean" , correct: false},
            {text: "D) Character" , correct: true},

        ]
    },
    {
        question: "What will the Array.prototype.reduce() method do?",
        answers: [
            {text: "A) It filters the elements of an array." , correct: false},
            {text: "B) It transforms all elements into a single value by applying a function." , correct: true},
            {text: "C) It returns the length of the array." , correct: false},
            {text: "D) It sorts the array in ascending order." , correct: false},

        ]
    },
    {
        question: "What is the purpose of the Array.prototype.map() method in JavaScript?",
        answers: [
            {text: "A) It modifies the original array by removing elements based on a condition." , correct: false},
            {text: "B) It applies a function to each element of an array and creates a new array with the results." , correct: true},
            {text: "C) It filters an array by removing elements that don’t meet a condition." , correct: false},
            {text: "D) It adds new elements to the beginning of an array." , correct: false},

        ]
    }

];

const questionElement = document.getElementById("question");             //for question
const answerBtn = document.getElementById("answer-btn");                     //for answer
const nextBtn = document.getElementById("next-btn");                        //for display next button in every question

let  currentQuestionIndex = 0;                                //this index for changing question number
let score = 0;                                  // at the end total score 


function startQuize(){                                // when we start our quize it should point towards question whose index zero score 0

     currentQuestionIndex = 0;
      score = 0;
      nextBtn.innerHTML = "Next";                     // at the end we will change text for RESTART or REPLAY for this butn should be next 
      showQuestion();                         //this function for display another question
}

function showQuestion(){
    resetState();                                                   //to reset previous questions and answer
    let currentQuestion = questions[currentQuestionIndex];                            //question[index no]
    let questionNo = currentQuestionIndex + 1;                      //we need question no index 0 question will 1 & wise versa for this i have added +1
    questionElement.innerHTML = questionNo + "." + currentQuestion.question;         //update text with innerhtml


    //we hve to display answer of the correct question set
    currentQuestion.answers.forEach((answer) => {

  const button = document.createElement("button");  
  button.innerHTML = answer.text;
  button.classList.add("btn");
  answerBtn.appendChild(button);
if(answer.correct){
    button.dataset.correct = answer.correct;               //it will add the true or false from the dataset correct(false/true)
  }
  button.addEventListener("click" , selectAnswer)       //when we click on the answer btn this function select answer
    });
}


//it will remove all the previous answer
function  resetState(){           
nextBtn.style.display = "none";      
while(answerBtn.firstChild){        //it has child element we hve to remove that
    answerBtn.removeChild(answerBtn.firstChild);
    
}
}


function selectAnswer(e){
const selectedBtn = e.target;           //so whn we click on btn it will add the selected btn ellement in this variable 
const isCorrect = selectedBtn.dataset.correct === "true";

if(isCorrect){               //if dataset true then it will add correct
    selectedBtn.classList.add("correct");
    score++;             //it will increase the score with 1
}else{
    selectedBtn.classList.add("incorrect");

}


//it will automatically highlite answer in green colour
Array.from(answerBtn.children).forEach((button) => {   //for each button it will check the dataset if it's true it will add class name correct
if(button.dataset.correct === "true"){
    button.classList.add("correct");
}
button.disabled = true;         //after clicking first time it will disabled button
});
nextBtn.style.display = "block"     //it will display next ques
}


function  showScore(){
    resetState();      //to display the score we cll this reset function nd set of question we display score
    questionElement.innerHTML = `You Scored ${score} out of ${questions.length}!`;       //display que in que ele 
    nextBtn.innerHTML = "Play Again";
    nextBtn.style.display = "block"
}

function handleNextButton(){
    currentQuestionIndex++;              //IT WILL INCRESE THE QUESTION INDEX BY ONEWHEN WE CLICK ON NEXT BUTTON 
    if(currentQuestionIndex < questions.length){
        showQuestion()          //SHOW QUES WITH UPDATED QUESTION INDEX
                                 //if there is not another question then it will display score 
    }else{
        showScore();
    }
}


nextBtn.addEventListener("click",() => {       
 if(currentQuestionIndex < questions.length){     //it will check current index if currentindex less than no of question then we add handle button 
    handleNextButton()               
 }else{
    startQuize();            //suppose there will be no que and we click next btn it will RESTART the qize
 }
})
startQuize();