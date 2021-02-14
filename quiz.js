function quizContent(id) {
    $("#questionnaire").show();
    $("#questionnaire .container").html(id);
}

$("#quiz-1").add("#quiz-2").add("#quiz-3").add("#quiz-4").on("click", function() {
    quizContent(this.id);
});