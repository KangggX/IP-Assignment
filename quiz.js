function questions(quiz, question) {
    let daQuestion;

    if (quiz == "1") {
        if (question == "1") {
            daQuestion = "How does COVID-19 spread among us"
            return daQuestion
        } else {
            if (question == "2") {
                daQuestion = "What are some of the common symptoms of COVID-19?"
                return daQuestion
            } else {
                if (question == "3") {
                    daQuestion = "Can you tell when someone has COVID-19 without actual testing?"
                    return daQuestion
                } else {
                    if (question == "4") {
                        daQuestion = "Can washing your hands protect you from contracting COVID-19?"
                        return daQuestion
                    } else {
                        if (question == "5") {
                            daQuestion = "Which age group is more vulnerable to COVID-19?"
                            return daQuestion
                        }
                    }
                }
            }
        }
    } else {
        if (quiz == "2") {

        } else {
            if (quiz == "3") {

            } else {
                if (quiz == "4") {

                }
            }
        }
    }
}

// To "render" the quiz form design
function renderQuestions(id) {
    $("#questionnaire").show();
    $(".quiz__header h2").html("Question 1");

    if (id == "quiz-1") {
        quizOne(1);
    } else {
        if (id == "quiz-2") {
            quizTwo(1);
        } else {
            if (id == "quiz-3") {
                quizThree(1);
            } else {
                if (id == "quiz-4") {
                    quizFour(1);
                }
            }
        }
    }
}

function quizOne(qn) {
    if (qn == "1") {
        $(".quiz__question").html(questions(1, qn));
    }
}

function quizTwo() {
    
}

function quizThree() {
    
}

function quizFour() {
    
}

$("#quiz-1").add("#quiz-2").add("#quiz-3").add("#quiz-4").on("click", function() {
    renderQuestions(this.id);
});