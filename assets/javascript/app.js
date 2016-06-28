var config = {
    apiKey: "AIzaSyAKTSAPXBpURyrjFPisCbiAW1KkKnNwwZA",
    authDomain: "week-7-assignment.firebaseapp.com",
    databaseURL: "https://week-7-assignment.firebaseio.com",
    storageBucket: "week-7-assignment.appspot.com",
	};
	firebase.initializeApp(config);


var trainData = firebase.database().ref()


$('#newTrainButton').on('click', function(){

var trainName= $("#trainNameInput").val().trim();
var destinationName= $("#destinationInput").val().trim();
var firstTrainTime= $("#trainTimeInput").val().trim();
var frequency= $("#frequencyInput").val().trim();


var newTrainData={
	name:trainName,
	destination:destinationName,
	firstTime:firstTrainTime,
	frequencyTrain:frequency
}


trainData.push(newTrainData);

	console.log(newTrainData.name);
	console.log(newTrainData.destination); 
	console.log(newTrainData.firstTime);
	console.log(newTrainData.frequencyTrain);


	//alert("Train successfully added");

	
	$("#trainNameInput").val("");
	$("#destinationInput").val("");
	$("#trainTimeInput").val("");
	$("#frequencyInput").val("");

		
	return false;

});

trainData.on("child_added", function(childSnapshot,prevChildKey){

	console.log(childSnapshot.val());   


		var tFrequency =$("#frequencyInput").val().trim(); 
		var firstTrainTime = $("#trainTimeInput").val().trim(); 


		var firstTimeConverted = moment(firstTrainTime,"hh:mm").subtract(1, "years");
		console.log(firstTimeConverted);


		var currentTime = moment(); 
		console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm")); 

		
		var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
		console.log("DIFFERENCE IN TIME: " + diffTime);


		var tRemainder = diffTime % tFrequency; 
		console.log(tRemainder);

	
		var tMinutesTillTrain = tFrequency - tRemainder;  
		console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

		 
		var nextTrain = moment().add(tMinutesTillTrain, "minutes")
		var y=moment(nextTrain).format("hh:mm");
		console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"))
		var x=$('#trainTable');
		x.append($('<tr/>')
			.append($('<td/>').text(childSnapshot.val().name))
			.append($('<td/>').text(childSnapshot.val().destination))
			.append($('<td/>').text(childSnapshot.val().firstTime))
			.append($('<td/>').text(childSnapshot.val().frequencyTrain))
			.append($('<td/>').text(y))
			.append($('<td/>').text(tMinutesTillTrain)));


});