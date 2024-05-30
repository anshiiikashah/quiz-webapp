const question = document.querySelector("#question")
const options = document.querySelector("#qOpts");
const quizPath = document.querySelector("#quizPath");
const quizTimer = document.querySelector("#timer");
const hourS = document.querySelector("#hourS")
const minS = document.querySelector("#minS")
const secS = document.querySelector("#secS")

class Progress {
    constructor(path) {
        this.path = [];
        this.report = [];
    }
    addQuestion(q, user, correctness, eta) {
        this.report.push([q, user, q.answer, eta, correctness])
    }
}

function choice(array) {
    return array[randint(0, array.length - 1)]
}

function randint(l, u) {
    return Math.floor(Math.random() * (u - l) + l);
}

function shuffle(array) {
    let copy = [];
    for (each of array) {
        copy.push(each)
    }
    let shuffled = [];
    let length = copy.length;
    for (let i = 0; i < length; i++) {
        let chosen = choice(copy);
        shuffled.push(chosen)
        copy.splice(copy.indexOf(chosen), 1);
    }
    return shuffled;
}




var qs;
var pathHere;
var n = 0;
var prog = new Progress(pathHere)

function startQuiz(path) {
    document.querySelector("#r1").style.display = "none"
    document.querySelector("#r2").style.display = "none"
    document.querySelector("#r3").style.display = "flex";
    pathHere = path
    let sysPath = path.split("/")

    let level = sysPath[2];
    let thisLevelQuestions = [];
    for (each of app) {
        if (each.name == sysPath[0]) {
            for (each2 of each["quizzes"]) {
                if (each2.name == sysPath[1]) {
                    for (each3 of each2["questions"]) {
                        if (each3.level == level) {
                            thisLevelQuestions.push(each3)
                        }
                    }
                }
            }
        }
    }
    if (thisLevelQuestions.length == 0) {
        alert("No questions");

        document.querySelector("#r1").style.display = "flex"
        document.querySelector("#r2").style.display = "flex"
        document.querySelector("#r3").style.display = "none";
    }
    else {

        qs = shuffle(thisLevelQuestions);
        renderQuestion(path, qs, 0);
    }
}

function renderQuestion(path, qs, n) {
    if (n == qs.length) {
        alert("Over");
        showProgress()
    }
    else {
        quizPath.innerHTML = path;
        showQuestion(qs[n])
    }
}

function showQuestion(q) {
    startTimer()
    question.innerHTML = `Q. ${q.quest}`;

    let allOpt = shuffle(q.options);
    let optNum = 1;
    let ansElem;
    for (each of allOpt) {
        let optionBox = document.createElement("div");
        optionBox.setAttribute("class", "optionBox");
        optionBox.setAttribute("id", each)
        optionBox.innerHTML = `${optNum}. ${each}`;
        optNum++;
        if (each == q.answer) {
            ansElem = optionBox;
        }
        optionBox.addEventListener('click', () => {
            let val = checkAnswer(optionBox.id, q, elapsedTime);
            if (val) {
                optionBox.style.backgroundColor = "rgb(75, 243, 75)";
                optionBox.style.color = "#000000";
            }
            else {
                optionBox.style.backgroundColor = "red";
                optionBox.style.color = "white";
                ansElem.style.backgroundColor = "rgb(75,243,75)";
                ansElem.style.color = "#000000";
            }
        })
        options.appendChild(optionBox)
    }
}


var interval;
var stopTimerBool = false;
var answered = false;
var elapsedTime;


function checkAnswer(a, q, time) {
    stopTimerBool = true;
    answered = true;
    renderControls();

    if (q.answer == a) {
        prog.addQuestion(q, a, true, time)
        return true;
    }
    else {
        prog.addQuestion(q, a, false, time)
        return false;
    }
}



function changeQuestion() {
    n++;
    elapsedTime = 0;
    stopTimerBool = false;
    answered = false;
    options.innerHTML = ""
    renderQuestion(pathHere, qs, n);
    renderControls()

}

function startTimer() {
    let dateObj = new Date();
    let init = [dateObj.getHours(), dateObj.getMinutes(), dateObj.getSeconds()];
    let initSec = (init[0] * 3600) + (init[1] * 60) + (init[2]);
    let currSecond = 0;
    interval = setInterval(() => {
        let newDate = new Date();
        let newSec = (newDate.getHours() * 3600) + (newDate.getMinutes() * 60) + (newDate.getSeconds());
        let secDiff = newSec - initSec;
        elapsedTime = secDiff;
        let hourDiff = Math.floor(secDiff / 3600);
        secDiff -= (hourDiff * 3600);
        let minDiff = Math.floor(secDiff / 60);
        secDiff -= (minDiff * 60);
        hourS.innerHTML = addZero(hourDiff);
        minS.innerHTML = addZero(minDiff);
        secS.innerHTML = addZero(secDiff);

        if (stopTimerBool) {
            clearInterval(interval)
        }
    }, 1000)
}

function addZero(n) {
    let array = String(n).split("");
    if (array.length == 1) {
        array.push("0");
        array.reverse();
    }
    return array.join("");
}


function renderControls() {
    if (answered) {
        document.querySelector("#nextButton").style.display = "block";
        document.querySelector("#skipButton").style.display = "none";
    }
    else {
        document.querySelector("#skipButton").style.display = "block";
        document.querySelector("#nextButton").style.display = "none";
    }
}

function showProgress(){
    
}