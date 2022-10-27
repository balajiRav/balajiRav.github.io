const quizData = [
    {
    question: "inside which HTML element of we put the JavaScript?",
    a: "<scripting>",
    b: "<script>",
    c: "<javascript>",
    d: "<js>",
    correct: "b",
    },
    {
    question: "where is the correct place to insert a JavaScript?",
    a: "Both the <head>section and the <body>section are correct",
    b: "the <head>section",
    c: "the <body>section ",
    d: "None of the above",
    correct: "a",
    },
    {
    question: `what is the correct syntax for referring to an external script "xxx.js"?`,
    a: `<script src="xxx.js">`,
    b: `<script name="xxx.js">`,
    c: `<script value="xxx.js">`,
    d: `<script href="xxx.js">`,
    correct: "a",
    },{
        question: `how do you write "Hello world" in an alert box ?`,
        a: `msgBOx("Hello world")`,
        b: `alertBOx("Hello world")`,
        c: `msg("Hello world")`, 
        d: `alert("Hello world")`, 
        correct: "d",
        },
        {
            question: `How do you create a function in JavaScript?`,
            a: `function:myFuntion()`,
            b: `function,myFuntion()`,
            c: `function myFuntion()`, 
            d: `function=myFuntion()`, 
            correct: "c",
            },
            {
           question: `How do you call a function named "myFunction"?`,
            a: `call myFuntion()`,
            b: `myFuntion()`,
            c: `return myFuntion()`, 
            d: `calling myFuntion()`, 
            correct: "b",
            }
    ];
    const quiz = document.getElementById("quiz");
    const answerElements = document.querySelectorAll(".answer");
    const questionElement = document.getElementById("question");
    const a_text = document.getElementById("a_text");
    const b_text = document.getElementById("b_text");
    const c_text = document.getElementById("c_text");
    const d_text = document.getElementById("d_text");
    const submitButton = document.getElementById("submit");
    let currentQuiz = 0;
    let score = 0;
    const deselectAnswers = () => {
    answerElements.forEach((answer) => (answer.checked = false));
    };
    const getSelected = () => {
    let answer;
    answerElements.forEach((answerElement) => {
    if (answerElement.checked) answer = answerElement.id;
    });
    return answer;
    };
    const loadQuiz = () => {
    deselectAnswers();
    const currentQuizData = quizData[currentQuiz];
    questionElement.innerText = currentQuizData.question;
    a_text.innerText = currentQuizData.a;
    b_text.innerText = currentQuizData.b;
    c_text.innerText = currentQuizData.c;
    d_text.innerText = currentQuizData.d;
    };
    loadQuiz();
    submitButton.addEventListener("click", () => {
    const answer = getSelected();
    if (answer) {
    if (answer === quizData[currentQuiz].correct) score++;
    currentQuiz++;
    if (currentQuiz < quizData.length) loadQuiz();
    else {
    quiz.innerHTML = `
    <h2>You answered ${score}/${quizData.length} questions correctly</h2>
    <button onclick="history.go(0)">Play Again</button>
    ` // location.reload() won't work in CodePen for security reasons;
    }
    }
    });