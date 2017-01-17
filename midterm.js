var database = firebase.database();

var questionArray =[
	"Microscopic droplets or particles that can either have a warming or cooling effect",
	"Decline in soil quality and productivity",
	
];
var answerArray = [
	["Aerosols", "Greenhouse Gases", "Carbon Dioxide", "Ash"],
	["Land Degredation", "Erosion", "Weathering", "Soil Degredation"],
];
var correctAnswers = [
	"Aerosols", "Soil Degredation",
];
var selectedAnswers = [];
var questionCounter = 0;
var numberCorrect = 0;
var correctCounter = 0;

$( document ).ready(function() {
    displayProgress();
    displayQuestion();
    displayAnswers();
});
var displayQuestion = function() {
	document.getElementById("questionText").innerHTML = questionArray[questionCounter]; 
}
var displayAnswers = function(){
	$("input").removeAttr("checked");
	var answers = answerArray[questionCounter];
	for (var i = 0; i < answers.length; i++) {
		var answerText = answers[i];
		var choiceName = "choice" + (i+1);
		document.getElementById(choiceName).innerHTML = answerText;
	}
}

var displayProgress = function() {
	var QNumb = questionCounter + 1;
	var QProgress = QNumb + "/" + questionArray.length;
	document.getElementById("QuestionNumber").innerHTML = QProgress;
}

var buttonClicked = function () {
	var radioButtons = document.getElementsByClassName("radioButton");
	var checkedFlag = false;
	for (var i = 0; i < radioButtons.length; i++){
		var currentButton = radioButtons[i];
		if(currentButton.checked == true){
			var checkedFlag = true;
			var choiceName = "choice" + (i+1);
			var selection = document.getElementById(choiceName).innerHTML
			selectedAnswers.push(selection);
			if(selection == correctAnswers[i]){
				correctCounter++;
			}
			break;
		}else{
			confirm("Please Select an Answer");
		return;
		}
	}
		
	console.log(correctCounter);
	questionCounter++;
	if (questionCounter >= questionArray.length){
		collectData();
	}
	displayQuestion();
	displayAnswers();
	displayProgress();
}

var collectData = function(){
	var outputObject = {};
	for(var i = 0; i < selectedAnswers.length; i++){
		var outputValue = 0;
		if(answerArray.indexOf(selectedAnswers[i]) == correctAnswers[i]){
			outputValue = 1;
		}
		var ouputKey = "question" + 1;
		outputObject[outputKey] = outputValue;
	}
	sendData(outputObject);
}
var sendData = function(opobj) {
	var newPostKey = firebase.database().ref().child('responses').push().key;
	var updates = {};
  	updates['/responses/' + newPostKey] = opobj;
  	firebase.database().ref().update(updates);
}