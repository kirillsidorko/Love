let currentQuestionIndex = 0;
const questions = [
    { text: "Broccoli is delicious.", correct: 1 },
    { text: "I enjoy long walks on the beach.", correct: 5 },
    { text: "Watching movies is a great way to relax.", correct: 3 },
    { text: "I prefer tea over coffee.", correct: 4 },
    { text: "I think that learning new languages is important.", correct: 2 }
];
const userAnswers = [];
const compatibilityScores = [];

function displayQuestion(questionIndex) {
    const question = questions[questionIndex];
    document.getElementById("questionText").textContent = question.text;
    const optionsContainer = document.getElementById("optionsContainer");
    optionsContainer.innerHTML = ""; 

    for (let i = 1; i <= 5; i++) {
        const option = document.createElement("input");
        option.type = "radio";
        option.name = "questionOption";
        option.value = i;
        const label = document.createElement("label");
        label.appendChild(option);
        label.appendChild(document.createTextNode(`${i}`));
        optionsContainer.appendChild(label);
    }
}

function nextQuestion() {
    const selectedOption = document.querySelector('input[name="questionOption"]:checked');
    if (!selectedOption) {
        alert("Please select an option.");
        return;
    }
    const selectedValue = parseInt(selectedOption.value);
    userAnswers[currentQuestionIndex] = selectedValue;
    const scoreDifference = Math.abs(selectedValue - questions[currentQuestionIndex].correct);
    compatibilityScores[currentQuestionIndex] = 100 - (scoreDifference * 20); // Each point of difference reduces compatibility by 20%

    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        displayQuestion(currentQuestionIndex);
    } else {
        showResults();
    }
}

function showResults() {
    document.getElementById("quizContainer").style.display = "none";
    const resultsDiv = document.getElementById("results");
    resultsDiv.style.display = "block";
    let summary = "<h2>Compatibility Summary:</h2>";
    compatibilityScores.forEach((score, index) => {
        summary += `<p>Question ${index + 1}: ${score}% compatible.</p>`;
    });
    const totalScore = compatibilityScores.reduce((a, b) => a + b, 0) / compatibilityScores.length;
    summary += `<p><strong>Your total compatibility score is: ${totalScore.toFixed(2)}%</strong></p>`;
    resultsDiv.innerHTML = summary;
}

displayQuestion(currentQuestionIndex);
