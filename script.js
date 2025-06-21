const questions =[
    {
      question: "What HTML attribute is used to define inline JavaScript? ",
      answers:[
        {task:" onclick", correct:true},
        {task:" onload", correct:false},
        {task:"script ", correct:false},
        {task:"href", correct:false},
      ]

    },
   
    {
      question: "Which of the following are closures in Javascript?",
      answers:[
        {task:"Variable", correct:false},
        {task:"Function", correct:false},
        {task:"Object", correct:false},
        {task:"All of the above", correct:true},
      ]

    },
    {
      question: "Which of the following is not a Javascript framework?",
      answers:[
        {task:"React", correct:false},
        {task:"Vue", correct:false},
        {task:"Node", correct:false},
        {task:"Cassandra", correct:true},
      ]

    },
    {
      question: "Which of the following methods can be used to display data in some form using Javascript?",
      answers:[
        {task:"console.log()", correct:true},
        {task:"document.write()", correct:false},
        {task:"window.alert()", correct:false},
        {task:"All of the above", correct:false},
      ]

    },
    {
      question: "How can a datatype be declared to be a constant type?",
      answers:[
        {task:"var", correct:false},
        {task:"let", correct:false},
        {task:"const", correct:true},
        {task:"constant", correct:false},
      ]

    },
    {
      question: "How to stop an interval timer in Javascript?",
      answers:[
        {task:"clearTimer", correct:false},
        {task:"clearInterval", correct:true},
        {task:"intervalOver", correct:false},
        {task:"None of the above", correct:false},
      ]

    },
    {
      question: "What keyword is used to declare an asynchronous function in Javascript?",
      answers:[
        {task:"async", correct:true},
        {task:"await", correct:false},
        {task:"setTimeout", correct:false},
        {task:"None of the above", correct:false},
      ]

    },
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score =0;

function startQuiz(){
    currentQuestionIndex = 0;
    score =0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion(){
    resetButton();
    answerButtons.innerHTML = "";
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo =  currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + "." + currentQuestion.question;

    currentQuestion.answers.forEach( answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.task;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click",selectAnswer);
     })
}

function resetButton(){
    nextButton.style.display = "none";
    while (answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild);
    }
    
}

function selectAnswer(e) {
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if (isCorrect) {
        selectedBtn.classList.add("correct");
        score++;
    } else {
        selectedBtn.classList.add("incorrect");
    }

    Array.from(answerButtons.children).forEach( button => {
        if (button.dataset.correct === "true") {
            button.classList.add("correct");
        }
        button.disabled = true;
    });

    nextButton.style.display = "block";
}

function showScore() {
    resetButton();
    questionElement.innerHTML = `you score ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
}

function handleNextButton() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    }
    else{
        showScore();
    }
    
}

nextButton.addEventListener("click", () => {
    if (currentQuestionIndex< questions.length) {
        handleNextButton();
    }
    else{
        startQuiz();
    }
});

startQuiz();