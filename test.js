const quiz1 = [
	{
		question: "How does COVID-19 spread among us?",
		answers: {
			a: "Through droplets that come from our body",
			b: "Sexual Fluids",
			c: "Water that is not clean",
            d: "All of the above"
		},
		correctAnswer: "a"
	},
	{
		question: "What are some of the common symptoms of COVID-19?",
		answers: {
			a: "Coughing",
			b: "Fever",
			c: " Feeling Tired",
            d: "All of the above "
		},
		correctAnswer: "d"
	},
    {
		question: "Can you tell when someone has COVID-19 without actual testing?",
		answers: {
			a: "No, not everyone will have symptoms when they contract Covid-19.",
			b: "Yes, it is easy to tell just by looking at how much the person coughs."
		},
		correctAnswer: "a"
	}
];

const quiz2 = [
	{
		question: "Are people with HIV at a higher risk of contracting COVID-19?",
		answers: {
			a: "Yes because people with HIVs have weak immune systems.",
			b: "No"
		},
		correctAnswer: "b"
	},
	{
		question: "When should Masks be worn?",
		answers: {
			a: "On public transport",
			b: "Confined or crowded places",
			c: "In shops and supermarkets",
            d: "All of the above "
		},
		correctAnswer: "d"
	},
    {
		question: "Is there a cure for COVID-19?",
		answers: {
			a: "No, but most people get better after a certain amount of time.",
			b: "Yes, Doctors have a cure."
		},
		correctAnswer: "a"
	}
];

const quiz3 = [
	{
		question: "Can washing your hands protect you from contracting COVID-19?",
		answers: {
			a: "Yes, only if you use soap or hand sanitizer.",
			b: "No, Washing your hands does not kill Covid-19."
		},
		correctAnswer: "a"
	},
    {
		question: "Which age group is more vulnerable to COVID-19?",
		answers: {
			a: "Older people and people with underlying health conditions",
			b: "Childrens",
			c: "Teenagers",
            d: "All of the above"
		},
		correctAnswer: "a"
	},
    {
		question: "Who in the general public needs to wear a mask when out in public places?",
		answers: {
			a: "People who are unwell or sick.",
			b: "People who are well and do not want to get sick.",
            c: "Old people.",
            d: "Everyone."
		},
		correctAnswer: "d"
	}
];

const quiz4 = [
	{
		question: "What kind of face mask do I need to wear?",
		answers: {
			a: "Fabric Masks",
			b: "N95 Masks",
            c: "Surgical Masks",
            d: "Scuba Masks"
		},
		correctAnswer: "a"
	},
    {
		question: "Which of the following is an example of Social Distancing?",
		answers: {
			a: "You minimize going to crowded places.",
			b: "You stop talking to people in your household.",
            c: "You stop speaking to your friends online."
		},
		correctAnswer: "a"
	},
    {
		question: "Why should you avoid touching your face?",
		answers: {
			a: "COVID-19 enters the body through the mouth, nose and eyes.",
			b: "Things you touch with your hands may possess an active virus on them.",
			c: "The virus is absorbed easily by the pores on your face.",
            d: "All of the above"
		},
		correctAnswer: "b"
	}
];

var quizContainer = $("#quiz");
var resultsContainer = $("#results");
var submitButton = $("#submit");
function generateQuiz(questions, quizContainer, resultsContainer, submitButton){
    renderQuestions(questions, quizContainer);
    
	function renderQuestions(questions, quizContainer){
	    var output = [];
	    var answers;

	    for (var i = 0; i < questions.length; i++) {
		    answers = [];

		    for (letter in questions[i].answers) {
		    	answers.push(
                    `<label class="option choice__option"><input type="radio" name="question${i}" value="${letter}">
                        <div class="option__letter">${letter}</div>
                        <div class="option__desc">${questions[i].answers[letter]}</div>
                        <div class="option__mask"></div>
                    </label>`
		    	);
		    };

		    output.push(
                `
                <div class="choice choice--wrapper">
                    <div class="choice__question">${questions[i].question}</div>
                    <div class="choice__answers">${answers.join('')}</div>
                </div>
                `
		    );
	    };
	    quizContainer.html(output.join(''));
	};

	function showResults(questions, resultsContainer){
	    var answerContainers = $(".choice .choice__answers");
	
	    var userAnswer = "";
	    var numCorrect = 0;
	
	    for (var i = 0; i < questions.length; i++) {

		    userAnswer = (answerContainers[i].querySelector(`input[name=question${i}]:checked`) || {}).value;
		
		    if (userAnswer === questions[i].correctAnswer) {
			    numCorrect++;
                console.log("hi1");
		    } else {
			    console.log("hi2");
		    };
	    };
    
    resultsContainer.html(`${numCorrect} out of ${questions.length}`);
	};

    submitButton.on("click", function() {
        showResults(questions, resultsContainer);
    });
}

$("#quiz1").add($("#quiz2")).add($("#quiz3")).add($("#quiz4")).on("click", function() {
    if (this.id == "quiz1") {
        generateQuiz(quiz1, quizContainer, resultsContainer, submitButton);
    } else {
        if (this.id == "quiz2") {
            generateQuiz(quiz2, quizContainer, resultsContainer, submitButton);
        } else {
            if (this.id == "quiz3") {
                generateQuiz(quiz3, quizContainer, resultsContainer, submitButton);
            } else {
                generateQuiz(quiz4, quizContainer, resultsContainer, submitButton);
            }
        }
    }
});