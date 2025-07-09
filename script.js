class EmojiQuiz {
    constructor() {
        this.questions = [
            {
                emoji: "🎯",
                question: "What does this emoji represent?",
                choices: ["Target/Bullseye", "Dart", "Goal", "Aim"],
                correct: 0
            },
            {
                emoji: "🚀",
                question: "What does this emoji symbolize?",
                choices: ["Speed", "Rocket", "Launch", "Space"],
                correct: 1
            },
            {
                emoji: "💡",
                question: "What does this emoji mean?",
                choices: ["Light", "Idea", "Bulb", "Bright"],
                correct: 1
            },
            {
                emoji: "🎉",
                question: "What does this emoji represent?",
                choices: ["Party", "Celebration", "Confetti", "Happy"],
                correct: 1
            },
            {
                emoji: "🔥",
                question: "What does this emoji mean?",
                choices: ["Fire", "Hot", "Lit", "Amazing"],
                correct: 3
            },
            {
                emoji: "👀",
                question: "What does this emoji express?",
                choices: ["Eyes", "Looking", "Interest", "Spying"],
                correct: 2
            },
            {
                emoji: "💪",
                question: "What does this emoji represent?",
                choices: ["Strength", "Muscle", "Power", "Flex"],
                correct: 0
            },
            {
                emoji: "🎵",
                question: "What does this emoji symbolize?",
                choices: ["Music", "Note", "Sound", "Melody"],
                correct: 0
            },
            {
                emoji: "🌈",
                question: "What does this emoji represent?",
                choices: ["Rainbow", "Color", "Diversity", "Hope"],
                correct: 0
            },
            {
                emoji: "⭐",
                question: "What does this emoji mean?",
                choices: ["Star", "Favorite", "Quality", "Rating"],
                correct: 0
            }
        ];
        
        this.currentQuestion = 0;
        this.score = 0;
        this.timeLeft = 60;
        this.timer = null;
        this.selectedAnswer = null;
        this.quizStarted = false;
        
        this.initializeEventListeners();
    }
    
    initializeEventListeners() {
        document.getElementById('start-btn').addEventListener('click', () => this.startQuiz());
        document.getElementById('next-btn').addEventListener('click', () => this.nextQuestion());
        document.getElementById('play-again-btn').addEventListener('click', () => this.resetQuiz());
        document.getElementById('share-btn').addEventListener('click', () => this.shareScore());
    }
    
    startQuiz() {
        this.quizStarted = true;
        this.showScreen('quiz-screen');
        this.startTimer();
        this.displayQuestion();
    }
    
    showScreen(screenId) {
        document.querySelectorAll('.screen').forEach(screen => {
            screen.classList.remove('active');
        });
        document.getElementById(screenId).classList.add('active');
    }
    
    startTimer() {
        this.timer = setInterval(() => {
            this.timeLeft--;
            document.getElementById('timer').textContent = `${this.timeLeft}s`;
            
            if (this.timeLeft <= 0) {
                this.endQuiz();
            }
        }, 1000);
    }
    
    displayQuestion() {
        const question = this.questions[this.currentQuestion];
        
        document.getElementById('current-emoji').textContent = question.emoji;
        document.getElementById('question-text').textContent = question.question;
        document.getElementById('question-counter').textContent = `Question ${this.currentQuestion + 1}/${this.questions.length}`;
        document.getElementById('score').textContent = `Score: ${this.score}`;
        
        // Update progress bar
        const progress = ((this.currentQuestion + 1) / this.questions.length) * 100;
        document.getElementById('progress-fill').style.width = `${progress}%`;
        
        // Create choice buttons
        const choicesContainer = document.getElementById('choices');
        choicesContainer.innerHTML = '';
        
        question.choices.forEach((choice, index) => {
            const choiceBtn = document.createElement('div');
            choiceBtn.className = 'choice';
            choiceBtn.textContent = choice;
            choiceBtn.addEventListener('click', () => this.selectAnswer(index));
            choicesContainer.appendChild(choiceBtn);
        });
        
        // Hide feedback
        document.getElementById('feedback').classList.remove('show');
    }
    
    selectAnswer(choiceIndex) {
        if (this.selectedAnswer !== null) return; // Prevent multiple selections
        
        this.selectedAnswer = choiceIndex;
        const choices = document.querySelectorAll('.choice');
        const question = this.questions[this.currentQuestion];
        
        choices.forEach((choice, index) => {
            choice.style.pointerEvents = 'none';
            
            if (index === question.correct) {
                choice.classList.add('correct');
            } else if (index === choiceIndex && choiceIndex !== question.correct) {
                choice.classList.add('incorrect');
            }
        });
        
        // Check if answer is correct
        if (choiceIndex === question.correct) {
            this.score++;
        }
        
        // Show feedback
        this.showFeedback(choiceIndex === question.correct);
    }
    
    showFeedback(isCorrect) {
        const feedback = document.getElementById('feedback');
        const feedbackMessage = document.getElementById('feedback-message');
        
        if (isCorrect) {
            feedbackMessage.textContent = '✅ Correct! Well done!';
            feedbackMessage.style.color = '#4CAF50';
        } else {
            const correctAnswer = this.questions[this.currentQuestion].choices[this.questions[this.currentQuestion].correct];
            feedbackMessage.textContent = `❌ Wrong! The correct answer was: ${correctAnswer}`;
            feedbackMessage.style.color = '#F44336';
        }
        
        feedback.classList.add('show');
    }
    
    nextQuestion() {
        this.selectedAnswer = null;
        this.currentQuestion++;
        
        if (this.currentQuestion >= this.questions.length) {
            this.endQuiz();
        } else {
            this.displayQuestion();
        }
    }
    
    endQuiz() {
        clearInterval(this.timer);
        this.showResults();
    }
    
    showResults() {
        const correctCount = this.score;
        const incorrectCount = this.questions.length - this.score;
        const timeUsed = 60 - this.timeLeft;
        
        document.getElementById('final-score-text').textContent = `Score: ${correctCount}/${this.questions.length}`;
        document.getElementById('correct-count').textContent = correctCount;
        document.getElementById('incorrect-count').textContent = incorrectCount;
        document.getElementById('final-time').textContent = `${timeUsed}s`;
        
        // Set performance message and emoji
        const performanceMessage = document.getElementById('performance-message');
        const scoreEmoji = document.getElementById('score-emoji');
        
        if (correctCount >= 9) {
            performanceMessage.innerHTML = '<h3>🏆 Amazing! You\'re an emoji master!</h3>';
            scoreEmoji.textContent = '🏆';
        } else if (correctCount >= 7) {
            performanceMessage.innerHTML = '<h3>🎯 Great job! You know your emojis well!</h3>';
            scoreEmoji.textContent = '🎯';
        } else if (correctCount >= 5) {
            performanceMessage.innerHTML = '<h3>👍 Good effort! Keep practicing!</h3>';
            scoreEmoji.textContent = '👍';
        } else {
            performanceMessage.innerHTML = '<h3>📚 Time to study up on emojis!</h3>';
            scoreEmoji.textContent = '📚';
        }
        
        this.showScreen('results-screen');
    }
    
    resetQuiz() {
        this.currentQuestion = 0;
        this.score = 0;
        this.timeLeft = 60;
        this.selectedAnswer = null;
        this.quizStarted = false;
        
        if (this.timer) {
            clearInterval(this.timer);
        }
        
        this.showScreen('start-screen');
    }
    
    shareScore() {
        const score = this.score;
        const total = this.questions.length;
        const message = `🎯 I scored ${score}/${total} on the Emoji Quiz Challenge! Can you beat my score?`;
        
        if (navigator.share) {
            navigator.share({
                title: 'Emoji Quiz Challenge',
                text: message,
                url: window.location.href
            });
        } else {
            // Fallback for browsers that don't support Web Share API
            const textArea = document.createElement('textarea');
            textArea.value = message;
            document.body.appendChild(textArea);
            textArea.select();
            document.execCommand('copy');
            document.body.removeChild(textArea);
            
            alert('Score copied to clipboard! Share it with your team!');
        }
    }
}

// Initialize the quiz when the page loads
document.addEventListener('DOMContentLoaded', () => {
    new EmojiQuiz();
});
