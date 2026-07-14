// ======================================================
// MUNSoc Role Sorter
// Part 1 - Data & Questions
// ======================================================

// ---------- Screen Elements ----------
const landing = document.getElementById("landing");
const intro = document.getElementById("intro");
const nameScreen = document.getElementById("nameScreen");
const quizScreen = document.getElementById("quizScreen");
const thinkingScreen = document.getElementById("thinkingScreen");
const resultScreen = document.getElementById("resultScreen");

// ---------- Buttons ----------
const beginBtn = document.getElementById("beginBtn");
const continueIntro = document.getElementById("continueIntro");
const startQuiz = document.getElementById("startQuiz");
const restartBtn = document.getElementById("restartBtn");

// ---------- Quiz Elements ----------
const introText = document.getElementById("introText");
const userNameInput = document.getElementById("userName");

const questionText = document.getElementById("questionText");
const optionsContainer = document.getElementById("optionsContainer");
const currentQuestion = document.getElementById("currentQuestion");
const progressBar = document.getElementById("progressBar");

// ---------- Thinking ----------
const thinkingText = document.getElementById("thinkingText");

// ---------- Result ----------
const departmentName = document.getElementById("departmentName");
const departmentDescription = document.getElementById("departmentDescription");
const traitsList = document.getElementById("traitsList");

// Added these to prevent ReferenceErrors in your new animation logic
const chosenTitle = document.getElementById("chosenTitle");
const houseReveal = document.getElementById("houseReveal");
const resultCard = document.getElementById("resultCard");

// ======================================================
// GLOBAL STATE
// ======================================================

let userName = "";
let currentQuestionIndex = 0;
let selectedAnswers = [];

const scores = {
    pr: 0,
    tech: 0,
    creative: 0,
    hospitality: 0,
    operations: 0,
    documentation: 0,
    delegate: 0
};

// ======================================================
// DEPARTMENTS
// ======================================================

const departments = {
    pr: {
        title: "The House of Voices",
        subtitle: "Public Relations",
        description: "You naturally connect with people and know how to represent ideas with confidence. You're the face people remember after the event ends.",
        traits: [
            "Excellent communicator",
            "Confident around people",
            "Persuasive",
            "Natural networker"
        ]
    },
    tech: {
        title: "The Keepers of Systems",
        subtitle: "Technical Team",
        description: "Behind every seamless event is someone quietly making everything work. You thrive on solving problems before anyone notices them.",
        traits: [
            "Logical thinker",
            "Problem solver",
            "Calm under pressure",
            "System oriented"
        ]
    },
    creative: {
        title: "The Artisans of Vision",
        subtitle: "Creatives",
        description: "You believe ideas deserve beautiful execution. You enjoy turning concepts into visuals that people remember.",
        traits: [
            "Creative",
            "Detail oriented",
            "Visual thinker",
            "Imaginative"
        ]
    },
    hospitality: {
        title: "The Guardians of Experience",
        subtitle: "Hospitality",
        description: "You make people feel welcomed without asking for recognition. You notice what others need before they say a word.",
        traits: [
            "Reliable",
            "Empathetic",
            "People first",
            "Composed"
        ]
    },
    operations: {
        title: "The Architects of Order",
        subtitle: "Operations",
        description: "While others see chaos, you see a checklist. You enjoy making ambitious plans actually happen.",
        traits: [
            "Organised",
            "Responsible",
            "Leader",
            "Efficient"
        ]
    },
    documentation: {
        title: "The Chroniclers",
        subtitle: "Documentation",
        description: "Every unforgettable moment deserves to be preserved. You have an eye for capturing stories others miss.",
        traits: [
            "Observant",
            "Patient",
            "Storyteller",
            "Creative eye"
        ]
    },
    delegate: {
        title: "The Circle of Diplomats",
        subtitle: "Delegate Affairs",
        description: "You create meaningful connections and make people feel included. Conferences thrive because of people like you.",
        traits: [
            "Approachable",
            "Supportive",
            "Diplomatic",
            "Good listener"
        ]
    }
};

// ======================================================
// THINKING MESSAGES
// ======================================================

const thinkingMessages = [
    "Analyzing your choices...",
    "Interesting...",
    "You don't follow the crowd...",
    "Responsibility doesn't scare you...",
    "I sense ambition...",
    "There's more to you than meets the eye...",
    "You value precision...",
    "Almost there...",
    "One place calls to you...",
    "I know exactly where you belong..."
];

// ======================================================
// QUESTIONS
// ======================================================

const questions = [
    {
        question: "It's day one of a big event. Where are you?",
        options: [
            { text: "Talking to someone I just met and somehow ending up in a 20-minute conversation", scores: { pr: 3, delegate: 2, hospitality: 1 } },
            { text: "Checking whether everything is running according to plan", scores: { operations: 3, tech: 2, hospitality: 1 } },
            { text: "Adjusting small details that most people wouldn't notice", scores: { creative: 3, documentation: 2, operations: 1 } },
            { text: "Figuring out where the best spot in the venue is and settling there", scores: { hospitality: 2, delegate: 2, pr: 1 } }
        ]
    },
    {
        question: "Your friend group comes to you when they need...",
        options: [
            { text: "Energy and motivation", scores: { pr: 3, delegate: 2 } },
            { text: "The right words", scores: { pr: 2, documentation: 2, delegate: 1 } },
            { text: "A practical solution", scores: { operations: 3, tech: 2 } },
            { text: "A fresh perspective", scores: { creative: 3, documentation: 2 } }
        ]
    },
    {
        question: "Pick a Friday night.",
        options: [
            { text: "Meeting new people", scores: { pr: 3, delegate: 2 } },
            { text: "Learning something random for hours", scores: { tech: 3, documentation: 2 } },
            { text: "Working on a personal project", scores: { creative: 3, tech: 1 } },
            { text: "Spending time with a close group of friends", scores: { hospitality: 3, delegate: 2 } }
        ]
    },
    {
        question: "What's your biggest flex?",
        options: [
            { text: "People remember me after one conversation", scores: { pr: 3, delegate: 2 } },
            { text: "I notice details others miss", scores: { documentation: 3, creative: 2 } },
            { text: "I can turn an idea into something real", scores: { operations: 2, creative: 2, tech: 1 } },
            { text: "I stay calm when things get messy", scores: { operations: 3, hospitality: 2 } }
        ]
    },
    {
        question: "Someone messes up the plan last minute. You:",
        options: [
            { text: "Switch to an alternative without making a big deal out of it", scores: { operations: 3, hospitality: 1 } },
            { text: "Start contacting the right people immediately", scores: { pr: 3, delegate: 2 } },
            { text: "Adapt the situation so it still feels intentional", scores: { creative: 3, documentation: 2 } },
            { text: "Keep the group focused so nobody spirals", scores: { hospitality: 3, operations: 2 } }
        ]
    },
    {
        question: "Pick your villain arc:",
        options: [
            { text: "Becomes everyone's favorite contact", scores: { pr: 3, delegate: 2 } },
            { text: "Creates a system that makes everyone else look unprepared", scores: { tech: 3, operations: 2 } },
            { text: "Rebrands everything and somehow makes it cooler", scores: { creative: 3, documentation: 1 } },
            { text: "Runs things so efficiently people forget chaos ever existed", scores: { operations: 3, hospitality: 1 } }
        ]
    },
    {
        question: "What does your notes app look like?",
        options: [
            { text: "Neat and visually satisfying", scores: { creative: 3, documentation: 2 } },
            { text: "A collection of half-finished thoughts", scores: { creative: 2, tech: 1 } },
            { text: "Structured enough to survive an audit", scores: { operations: 3, tech: 2 } },
            { text: "Mostly reminders and quick ideas", scores: { hospitality: 2, delegate: 2 } }
        ]
    },
    {
        question: "You're at a MUN conference as a delegate. You're known for:",
        options: [
            { text: "Knowing people across committees", scores: { delegate: 3, pr: 2 } },
            { text: "Proposing unexpected solutions", scores: { tech: 3, operations: 1 } },
            { text: "Looking unusually prepared", scores: { operations: 3, documentation: 2 } },
            { text: "Helping discussions move forward", scores: { hospitality: 2, delegate: 3 } }
        ]
    },
    {
        question: "Ideal superpower:",
        options: [
            { text: "Make people instantly trust me", scores: { pr: 3, delegate: 2 } },
            { text: "Know exactly what's happening", scores: { operations: 3, tech: 2 } },
            { text: "Make things look effortlessly polished", scores: { creative: 3, documentation: 2 } },
            { text: "Build useful things on demand", scores: { tech: 3, operations: 2 } }
        ]
    },
    {
        question: "It's 2AM the night before the event. You are:",
        options: [
            { text: "Double-checking whether everything will actually work tomorrow", scores: { operations: 3, tech: 2 } },
            { text: "Making sure people are still committed", scores: { pr: 3, delegate: 2 } },
            { text: "Fixing tiny imperfections that only you can see", scores: { creative: 3, documentation: 2 } },
            { text: "Reviewing every possible point of failure", scores: { operations: 3, hospitality: 2 } }
        ]
    }
];

// ======================================================
// PART 2 - QUIZ ENGINE
// ======================================================

// ---------- Intro Text ----------
introText.innerHTML = `
Another aspiring delegate...<br><br>
Answer honestly.<br>
Trust the Hat.<br><br>
It already knows more than you think.
`;

// ======================================================
// SCREEN HELPERS
// ======================================================

function showScreen(screen) {
    const screens = [
        landing,
        intro,
        nameScreen,
        quizScreen,
        thinkingScreen,
        resultScreen
    ];

    screens.forEach(s => {
        s.classList.remove("active");
        s.classList.add("hidden");
    });

    screen.classList.remove("hidden");
    screen.classList.add("active");
}

// ======================================================
// START FLOW
// ======================================================

beginBtn.addEventListener("click", () => {
    showScreen(intro);
    setTimeout(() => {
        continueIntro.classList.remove("hidden");
    }, 600);
});

continueIntro.addEventListener("click", () => {
    showScreen(nameScreen);
});

startQuiz.addEventListener("click", () => {
    const name = userNameInput.value.trim();

    if (name === "") {
        alert("Please enter your name.");
        return;
    }

    userName = name;
    currentQuestionIndex = 0;
    selectedAnswers = [];

    Object.keys(scores).forEach(key => {
        scores[key] = 0;
    });

    showScreen(quizScreen);
    loadQuestion();
});

// ======================================================
// LOAD QUESTION
// ======================================================

function loadQuestion() {
    const q = questions[currentQuestionIndex];
    currentQuestion.textContent = currentQuestionIndex + 1;
    questionText.textContent = q.question;

    progressBar.style.width = ((currentQuestionIndex + 1) / questions.length) * 100 + "%";

    optionsContainer.innerHTML = "";

    q.options.forEach(option => {
        const button = document.createElement("button");
        button.className = "option";
        button.textContent = option.text;
        button.onclick = () => selectAnswer(option);
        optionsContainer.appendChild(button);
    });
}

// ======================================================
// SELECT ANSWER
// ======================================================

function selectAnswer(option) {
    selectedAnswers.push(option.text);

    // Weighted scoring
    Object.entries(option.scores).forEach(([dept, value]) => {
        scores[dept] += value;
    });

    currentQuestionIndex++;

    if (currentQuestionIndex < questions.length) {
        loadQuestion();
    } else {
        beginThinking();
    }
}

// ======================================================
// THINKING SCREEN
// ======================================================

let thinkingInterval;

function beginThinking() {
    showScreen(thinkingScreen);
    let index = 0;
    thinkingText.textContent = thinkingMessages[0];

    thinkingInterval = setInterval(() => {
        index++;
        if (index >= thinkingMessages.length) {
            clearInterval(thinkingInterval);
            revealResult();
            return;
        }

        thinkingText.style.opacity = 0;

        setTimeout(() => {
            thinkingText.textContent = thinkingMessages[index];
            thinkingText.style.opacity = 1;
        }, 250);
    }, 1400);
}

// ======================================================
// PART 3 - RESULTS, GOOGLE FORM & RESTART
// ======================================================

// ------------------------------------------------------
// Calculate Winner
// ------------------------------------------------------

function revealResult() {
    let winningDepartment = "";
    let highestScore = -1;

    for (const dept in scores) {
        if (scores[dept] > highestScore) {
            highestScore = scores[dept];
            winningDepartment = dept;
        }
    }

    const result = departments[winningDepartment];

    departmentName.innerHTML = `
        ${result.title}
        <br>
        <span style="font-size:1.2rem;font-family:'Cormorant Garamond', serif;color:#d9c28a;">
            ${result.subtitle}
        </span>
    `;

    departmentDescription.textContent = result.description;
    traitsList.innerHTML = "";

    result.traits.forEach(trait => {
        const li = document.createElement("li");
        li.textContent = trait;
        traitsList.appendChild(li);
    });

    showScreen(resultScreen);

    // Updated Animation and Staggered Reveal Logic
    chosenTitle.classList.add("hidden");
    houseReveal.classList.add("hidden");
    resultCard.classList.add("hidden");
    restartBtn.classList.add("hidden");

    setTimeout(() => {
        chosenTitle.classList.remove("hidden");
    }, 500);

    setTimeout(() => {
        houseReveal.classList.remove("hidden");
    }, 1800);

    setTimeout(() => {
        resultCard.classList.remove("hidden");
    }, 3000);

    setTimeout(() => {
        restartBtn.classList.remove("hidden");
    }, 3700);

    submitToGoogleForm(result.title);
}

// ------------------------------------------------------
// Google Forms Submission
// ------------------------------------------------------

function submitToGoogleForm(resultTitle) {
    const answers = selectedAnswers.join(" | ");
    const formURL = "https://docs.google.com/forms/d/e/1FAIpQLSfDRqhnx9b9XBFh2dieUhvzRDhli20TPIQWi-snUmd-ZCzS4A/formResponse";

    const formData = new FormData();
    formData.append("entry.1219241201", userName);
    formData.append("entry.320023305", answers);
    formData.append("entry.1247067037", resultTitle);

    fetch(formURL, {
        method: "POST",
        mode: "no-cors",
        body: formData
    }).catch(() => {
        console.log("Google Form submission skipped.");
    });
}

// ------------------------------------------------------
// Restart
// ------------------------------------------------------

restartBtn.addEventListener("click", () => {
    currentQuestionIndex = 0;
    selectedAnswers = [];
    userName = "";
    userNameInput.value = "";

    Object.keys(scores).forEach(key => {
        scores[key] = 0;
    });

    progressBar.style.width = "0%";
    showScreen(landing);
});

// ------------------------------------------------------
// Small Fade Effect for Thinking Text
// ------------------------------------------------------

thinkingText.style.transition = "opacity .3s ease";