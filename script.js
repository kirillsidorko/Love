// Define the desired answers for compatibility calculation
const desiredAnswers = {
    q1: 1, // Example answers; adjust according to your questions
    q2: 5,
    q3: 3,
    q4: 4,
    q5: 2
};

// Function to calculate the compatibility score
function calculateCompatibility(e) {
    e.preventDefault(); // Prevent the default form submission behavior

    let totalDifference = 0;
    let isAllAnswered = true;

    // Iterate over each question to calculate the total difference
    Object.keys(desiredAnswers).forEach(question => {
        const userAnswer = parseInt(document.querySelector(`input[name="${question}"]:checked`)?.value);
        if (!userAnswer) {
            isAllAnswered = false; // Mark as false if any question is unanswered
            return; // Skip further processing for this iteration
        }
        totalDifference += Math.abs(userAnswer - desiredAnswers[question]);
    });

    // Check if all questions were answered
    if (!isAllAnswered) {
        alert('Please answer all questions.');
        return;
    }

    // Calculate the compatibility score
    const score = Math.max(0, 100 - (totalDifference * 5)); // Adjust scoring as needed

    displayResults(score); // Display the calculated score
}

// Function to display the compatibility score and a message based on thresholds
function displayResults(score) {
    const resultsDiv = document.getElementById('results');
    let message;

    if (score >= 80) {
        message = `<strong>True Love!</strong> Your compatibility score is ${score}%.`;
    } else if (score >= 50) {
        message = `Possible friends. Your compatibility score is ${score}%.`;
    } else {
        message = `Run away! Your compatibility score is ${score}%.`;
    }

    resultsDiv.innerHTML = `<p>${message}</p>`;
}

// Add event listener to the form submission
document.getElementById('loveQuiz').addEventListener('submit', calculateCompatibility);
