let  formBox = ""
let  nextBtn = ""
let  prevBtn = ""
let  inputGroup = ""
let  inputField = ""
let  inputLabel = ""
let  inputProgress = ""
let  progress = ""

// Questions Array
let position = 0;
window.addEventListener('load', () => {
    formBox = document.querySelector('#form-box');
    nextBtn = document.querySelector('#next-btn');
    prevBtn = document.querySelector('#prev-btn');
    inputGroup = document.querySelector('#input-group');
    inputField = document.querySelector('#input-field');
    inputLabel = document.querySelector('#input-label');
    inputProgress = document.querySelector('#input-progress');
    progress = document.querySelector('#progress-bar');

    nextBtn.addEventListener('click', ()=>{
        validate()
    });

    prevBtn.addEventListener('click' , ()=>{
        if(position){
            position--
            getQuestion()   
        }


        getQuestion()
    })
    inputField.addEventListener('keyup', e => {
        if (e.keyCode == 13) {
            validate();
        }
    });

    hideQuestion()
    const btnShowContact = document.getElementById('btnShowContact')
    const formbox = document.getElementById('form-box')
    btnShowContact.onclick = () => {
        position = 0;
        btnShowContact.classList.toggle("d-none")
        formbox.classList.toggle('close')
        getQuestion()
    }
})

const questions = [
    { question: 'Introduzca su nombre', name: "ipName" },
    { question: 'Email o Teléfono', name: "ipContact" },
    { question: 'Introduzca su Mensaje', name: "ipMsg" },
];

// Transition Times
const shakeTime = 100; // Shake Transition Time
const switchTime = 200; // Transition Between Questions


// Get Question From Array & Add To Markup
function getQuestion() {
    // Get Current Question
    inputLabel.innerHTML = questions[position].question;
    // Get Current Type
    inputField.type = questions[position].type || 'text';
    // Get Current Answer
    inputField.value = questions[position].answer || '';
    // Focus On Element
    inputField.focus();

    // Set Progress Bar Width - Variable to the questions length
    progress.style.width = (position * 100) / questions.length + '%';

    // Add User Icon OR Back Arrow Depending On Question
    prevBtn.className = position ? 'fas fa-arrow-left' : 'fas fa-user';

    showQuestion();
}

// Display Question To User
function showQuestion() {
    inputGroup.style.opacity = 1;
    inputProgress.style.transition = '';
    inputProgress.style.width = '100%';
}

// Hide Question From User
function hideQuestion() {
    inputGroup.style.opacity = 0;
    inputLabel.style.marginLeft = 0;
    inputProgress.style.width = 0;
    inputProgress.style.transition = 'none';
    inputGroup.style.border = null;
}

// Transform To Create Shake Motion
function transform(x, y) {
    formBox.style.transform = `translate(${x}px, ${y}px)`;
}

// Validate Field
function validate() {
    // Make Sure Pattern Matches If There Is One
    if (!inputField.value.match(questions[position].pattern || /.+/)) {
        inputFail();
    } else {
        inputPass();
    }
}

// Field Input Fail
function inputFail() {
    formBox.className = 'error';
    // Repeat Shake Motion -  Set i to number of shakes
    for (let i = 0; i < 6; i++) {
        setTimeout(transform, shakeTime * i, ((i % 2) * 2 - 1) * 20, 0);
        setTimeout(transform, shakeTime * 6, 0, 0);
        inputField.focus();
    }
}

// Field Input Passed
function inputPass() {
    formBox.className = '';
    setTimeout(transform, shakeTime * 0, 0, 10);
    setTimeout(transform, shakeTime * 1, 0, 0);

    // Store Answer In Array
    questions[position].answer = inputField.value;

    // Increment Position
    position++;

    // If New Question, Hide Current and Get Next
    if (questions[position]) {
        hideQuestion();
        getQuestion();
    } else {
        // Remove If No More Questions
        hideQuestion();
        formBox.classList.toggle('close');
        progress.style.width = '100%';

        // Form Complete
        formComplete();
    }
}

// All Fields Complete - Show h1 end
function formComplete() {
    //   Recoger los valores, vaciar los inputs y enviar al Server


    const h1 = document.createElement('h1');
    h1.classList.add('end');
    h1.appendChild(
        document.createTextNode(
            `Gracias ${questions[0].answer
            } Serás contactado en breve`
        )
    );
    const payload = new FormData()
    let size = questions.length
    for (let i = 0; i < size; i++) {
        const { name, answer } = questions[i]
        questions[i].answer = ''
        payload.set(name, answer)
    }

    send_msg(payload)
    setTimeout(() => {
        formBox.parentElement.appendChild(h1);
        setTimeout(() => (h1.style.opacity = 1), 50);
        setTimeout(() => {
            formBox.parentElement.removeChild(h1)
            document.getElementById("btnShowContact").classList.toggle("d-none")
        }, 8000);
    }, 1000);
}


const send_msg = (arg) => {
    fetch('/user/add_msg', {
        method: 'POST',
        body: arg
    })
}