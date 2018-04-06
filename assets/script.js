// Initialize Firebase
var config = {
    apiKey: "AIzaSyBWUYzIutZZKY9sO4brvq-Z_d6V3LLNpIs",
    authDomain: "train-3d7de.firebaseapp.com",
    databaseURL: "https://train-3d7de.firebaseio.com",
    projectId: "train-3d7de",
    storageBucket: "train-3d7de.appspot.com",
    messagingSenderId: "1079548070333"
};
firebase.initializeApp(config);

var database = firebase.database();

// Button for adding Trains
$("#addSubmit").on("click", function (event) {
    event.preventDefault();

    // Grabs user input
    var trainName = $("#name-input").val().trim();
    var destination = $("#destination-input").val().trim();
    var firstTrain = $("#first-train-input").val().trim(); //, "DD/MM/YY").format("X");
    var frequency = $("#frequency-input").val().trim();

    
    var firstTrainM = moment(firstTrain, "hh:mm").subtract(1, "years");
    console.log(firstTrainM);
    var now = moment();
    console.log(now);   

    var timeDifference = moment().diff(moment(firstTrainM), "minutes");
    console.log(timeDifference);

    var minWaiting = frequency - (timeDifference % frequency);
    console.log(minWaiting);
   
    var nextTrain = moment().add(minWaiting, "minutes");
    
    var arrivalTime = moment(nextTrain).format("hh:mm A");




    // Creates local "temporary" object for holding employee data
    var newTrain = {
        name: trainName,
        destination: destination,
        firstTrain: firstTrain,
        frequency: frequency,
        wait: minWaiting,
        arrival: arrivalTime,
    }
    
    // Uploads train data to the database
    database.ref().push(newTrain);

    // // Logs everything to console
    // console.log(newEmp.name);
    // console.log(newEmp.role);
    // console.log(newEmp.start);
    // console.log(newEmp.rate);

    // Clears all of the text-boxes
    $("#name-input").val("");
    $("#destination-input").val("");
    $("#first-train-input").val("");
    $("#frequency-input").val("");

});

// 3. Create Firebase event for adding employee to the database and a row in the html when a user adds an entry
database.ref().on("child_added", function (childSnapshot, prevChildKey) {

        // Store everything into a variable.
    var trainNameDB = childSnapshot.val().name;
    var destinationDB = childSnapshot.val().destination;
    var firstTrainDB = childSnapshot.val().firstTrain;
    var frequencyDB = childSnapshot.val().frequency;
    var waitDB = childSnapshot.val().wait;
    var arrivalTimeDB = childSnapshot.val().arrival;

    // Add each train's data into the table
    $("#train-table-body").append("<tr><td>" + trainNameDB + "</td><td>" + destinationDB + "</td><td>" +
        frequencyDB + "</td><td>" + arrivalTimeDB + "</td><td>" + waitDB + "</td></tr>");
});




    // Prettify the employee start
    //var empStartPretty = moment.unix(empStart).format("MM/DD/YY");
    // Calculate the months worked using hardcore math
    // To calculate the months worked
    //var empMonths = moment().diff(moment.unix(empStart, "X"), "months");
    //console.log(empMonths);

    // Calculate the total billed rate
    //var empBilled = empMonths * empRate;
    //console.log(empBilled);