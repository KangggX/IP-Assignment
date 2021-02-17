// Quiz 1 questions and answers
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

// Quiz 2 questions and answers
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

// Quiz 3 questions and answers
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

// Quiz 4 questions and answers
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

// Check if user is signed in or not
firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      $("#auth-modal-state").hide();
    } else {
      // No user is signed in.
      $("#auth-modal-state").css("display", "flex");
    }
});

var quizContent = $("#quiz");
var submitButton = $("#submit");
var currentQuiz;
function generateQuiz(questions, quizContent, quizID, submitButton) {
    renderQuestions(questions, quizContent);
    
	function renderQuestions(questions, quizContent) {
	    let output = [];
	    let answers;

	    for (var i = 0; i < questions.length; i++) {
		    answers = [];

		    for (letter in questions[i].answers) {
		    	answers.push(
                    `<label class="option choice__option">
					<input type="radio" name="question${i}" value="${letter}">
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
	    quizContent.html(output.join('')).attr("id", `quiz ${quizID}`);
		currentQuiz = quizID;
	};

	function generatePoints(questions) {
	    let userAnswer;
	    let pointsEarned = 0;
	
	    for (var i = 0; i < questions.length; i++) {
			userAnswer = ($(`.choice .choice__answers input[name=question${i}]:checked`) || {}).val();
		
		    if (userAnswer === questions[i].correctAnswer) {
			    pointsEarned++;
                console.log("hi1");
		    } else {
			    console.log("hi2");
		    };
	    };
		console.log(pointsEarned);
    
    	return pointsEarned;
	};

	function emptyQuestionsCheck() {
		let userAnswer;
		let emptyQuestions = 0;

		for (var i = 0; i < questions.length; i++) {
			userAnswer = ($(`.choice .choice__answers input[name=question${i}]:checked`) || {}).val();
			if (userAnswer == undefined) {
				emptyQuestions++;
			};
		};
		
		return emptyQuestions
	}

    submitButton.on("click", function(e) {
		if (emptyQuestionsCheck() >= 1) {
			e.preventDefault();
			console.log("failure");

		} else {
			$("#selection").delay(100).show(0);
			$("#questionnaire").delay(100).hide(0);

			if (currentQuiz == "quiz-1") {
				db.collection("users").doc(`${localStorage["user-id"]}`).update({
					globalPoints: firebase.firestore.FieldValue.increment(`${generatePoints(questions)}`),
					localPoints: firebase.firestore.FieldValue.increment(`${generatePoints(questions)}`),
					qComplete1: true
				});
			} else {
				if (currentQuiz == "quiz-2") {
					db.collection("users").doc(`${localStorage["user-id"]}`).update({
						globalPoints: firebase.firestore.FieldValue.increment(`${generatePoints(questions)}`),
						localPoints: firebase.firestore.FieldValue.increment(`${generatePoints(questions)}`),
						qComplete2: true
					});
				} else {
					if (currentQuiz == "quiz-3") {
						db.collection("users").doc(`${localStorage["user-id"]}`).update({
							globalPoints: firebase.firestore.FieldValue.increment(`${generatePoints(questions)}`),
							localPoints: firebase.firestore.FieldValue.increment(`${generatePoints(questions)}`),
							qComplete3: true
						});
					} else {
						if (currentQuiz == "quiz-4") {
							db.collection("users").doc(`${localStorage["user-id"]}`).update({
								globalPoints: firebase.firestore.FieldValue.increment(`${generatePoints(questions)}`),
								localPoints: firebase.firestore.FieldValue.increment(`${generatePoints(questions)}`),
								qComplete4: true
							});
						}
					}
				}
			}
		};
    });
}

function quizCompleted() {
	$("#completed-modal-state").css("display", "flex").hide().fadeIn(200);
	$(window).on("click", function(e) {
		if (e.target.id == "completed-modal-state") {
			$("#completed-modal-state").fadeOut(200);
		}
	});
}

$("#quiz1").add($("#quiz2")).add($("#quiz3")).add($("#quiz4")).on("click", function() {
	
	// This entire if else statement is to check whether or not users have completed the specified quiz. If they have completed the quiz, they won't be able to access it
    if (this.id == "quiz1") {
		db.collection("users").doc(`${localStorage["user-id"]}`).get().then((doc) => {
			if (doc.data().qComplete1 === false) {
				$("#selection").delay(20).hide(0);
				$("#questionnaire").delay(20).show(0);
				generateQuiz(quiz1, quizContent, "quiz-1", submitButton);
			} else {
				quizCompleted();
			}
		});
        
    } else {
        if (this.id == "quiz2") {
            db.collection("users").doc(`${localStorage["user-id"]}`).get().then((doc) => {
				if (doc.data().qComplete2 === false) {
					$("#selection").delay(100).hide(0);
					$("#questionnaire").delay(100).show(0);
					generateQuiz(quiz2, quizContent, "quiz-2", submitButton);
				} else {
					quizCompleted();
				}
			});
        } else {
            if (this.id == "quiz3") {
                db.collection("users").doc(`${localStorage["user-id"]}`).get().then((doc) => {
					if (doc.data().qComplete3 === false) {
						$("#selection").delay(100).hide(0);
						$("#questionnaire").delay(100).show(0);
						generateQuiz(quiz3, quizContent, "quiz-3", submitButton);
					} else {
						quizCompleted();
					}
				});
            } else {
				
                db.collection("users").doc(`${localStorage["user-id"]}`).get().then((doc) => {
					if (doc.data().qComplete4 === false) {
						$("#selection").delay(100).hide(0);
						$("#questionnaire").delay(100).show(0);
						generateQuiz(quiz4, quizContent, "quiz-4", submitButton);
					} else {
						quizCompleted();
					}
				});
            }
        }
    }
});

$("#quiz-back").on("click", function() {
	$("#selection").delay(100).show(0);
	$("#questionnaire").delay(100).hide(0);
});