class Category{
    constructor(name,quizzes){
        this.name = name;
        this.quizzes = quizzes;
    }
}

class Quiz{
    constructor(name,questions){
        this.name = name;
        this.questions = questions;
    }
}

class Question{
    constructor(question,options,answer,level){
        this.quest = question;
        this.options = options;
        this.level = level;
        this.answer = answer;
    }
}

const r2 = document.querySelector("#r2");

var app = []
var data;
fetch("./quizz.json").then((res)=>{return res.json()}).then((ret)=>{data = ret}).then(()=>{makeClasses()})

function makeQuestions(object){
    let array = [];
    for (each in object){
        array.push(new Question(object[each]["Question"],object[each]["Options"],object[each]["Answer"],object[each]["Level"]))
    }
    return array;
}

function makeQuizzes(object){
    let array = [];
    for (each in object){
        array.push(new Quiz(each,makeQuestions(object[each])))
    }
    return array;
}

function renderScreen(){
    console.log(app);
    for (each of app){
        let elem = document.createElement("div")
        elem.setAttribute("class","category")
        elem.innerHTML = `<div class="categoryName">${each.name}</div>`
        for (each2 of each.quizzes){
            let elem2 = document.createElement("div")
            elem2.setAttribute("class","quizz");
            elem2.innerHTML = `<div class="quizzName">${each2.name}</div>`
            elem.appendChild(elem2)
            let level = document.createElement("div")
            level.setAttribute("class","level")
            let ez = document.createElement('div')
            ez.setAttribute("class","ez")
            ez.setAttribute("id",`${each.name}/${each2.name}/Easy`)
            ez.addEventListener('click',()=>{startQuiz(ez.id)});
            ez.innerHTML = "<div>Easy</div>"
            let med = document.createElement('div')
            med.setAttribute("class","med")
            med.setAttribute("id",`${each.name}/${each2.name}/Medium`)
            med.addEventListener('click',()=>{startQuiz(med.id)});
            med.innerHTML = "<div>Medium</div>"
            let hard = document.createElement('div')
            hard.setAttribute("class","hard")
            hard.setAttribute("id",`${each.name}/${each2.name}/Hard`)
            hard.addEventListener('click',()=>{startQuiz(hard.id)});
            hard.innerHTML = "<div>Hard</div>"
            level.appendChild(ez)
            level.appendChild(med)
            level.appendChild(hard)
            elem2.appendChild(level)
        }
        r2.appendChild(elem)
    }
}


function makeClasses(){
    for (each in data){
        app.push(new Category(each,makeQuizzes(data[each])))
    }
    
    renderScreen();
}

