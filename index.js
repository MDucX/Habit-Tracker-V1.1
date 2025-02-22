// CURRENT DATE
var date = new Date();

// VARABLES OF DATE
var currentMonth = date.getMonth(); // Month - 1
var currentDays = date.getDay(); // Day of th week
var currentDate = date.getDate(); // Current Day
var currentYear = date.getFullYear(); // Year

// Months
var months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "August",
    "September",
    "October",
    "November",
    "December",
];

// Set current month
var title = document.getElementById("title");
title.innerHTML = months[currentMonth]

// Update calendar info
let habitTtile = document.getElementById("habitTitle");
var tempHabit = "Habit";
var temp = localStorage.getItem(tempHabit);
if (temp == null || temp == "false") {
    localStorage.setItem(tempHabit, "false");
}
else{
    habitTtile.innerHTML = localStorage.getItem(tempHabit);
}
habitTtile.onclick = function () {
    let habit = prompt("What's your habit?", habitTtile.innerHTML);
    if (habit.length == 0) {
        habitTtile.innerHTML = "Click to set your habit";
        localStorage.setItem(tempHabit, "Click to set your habit");
    }
    else {
        habitTtile.innerHTML = habit;
        localStorage.setItem(tempHabit, habit);
    }
}

// Set The Total Days
var daysInTheMonthList = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
var daysInThisMonth = daysInTheMonthList[currentMonth];

var daysCompleted = 0;
var totalDays = document.getElementById("totalDays");
totalDays.innerHTML = `0/${daysInThisMonth}`;

// Setup the calendar days
var dayCount = 0;
var rowCount = 0;
var days = document.getElementsByClassName("days");
for (var i = 0; i < days.length; i++){
    var day = days[rowCount].getElementsByClassName("day");
    for (var j = 0; j < day.length; j++){
        if (dayCount < daysInThisMonth) {
            day[j].innerHTML = dayCount + 1;
            day[j].setAttribute("id", "day" + (dayCount + 1))
            day[j].setAttribute("style", "display: normal;")

            // Set current date
            if (dayCount == currentDate - 1) {
                day[j].setAttribute("style", "border:2px solid black;")
            }

            dayCount++;
        }
        else {
            day[j].innerHTML = "";
            day[j].setAttribute("style", "display: none;")
        }
    }
    rowCount++;
}

// Initialize Completed Array
var completed = new Array(31);
for (var i = 0; i < dayCount; i++){
    var tempString =
        "" + (currentMonth + 1) + "-" + (i + 1) + "-" + currentYear;
    console.log("Storing Date: " + tempString);
    var tempDay = localStorage.getItem(tempString);
    console.log(tempDay);
    if (tempDay == null || tempDay == "false") {
        localStorage.setItem(tempString, "false");
    }
    else if (tempDay == "true") {
        daysCompleted++;
    }
    totalDays.innerHTML = `${daysCompleted}/${daysInThisMonth}`;
}

console.log("completed array " + completed);
console.log("total days completed " + daysCompleted);


// Check Storage And Update Completed Array
for (var i = 0; i < currentDate; i++){
    var tempString =
        "" + (currentMonth + 1) + "-" + (i + 1) + "-" + currentYear;
    var chosenDay = localStorage.getItem(tempString);
    var chosenDayDiv = document.getElementById(`day${i + 1}`);
    if (chosenDay === "false") {
        chosenDayDiv.style.backgroundColor = "rgb(207, 207, 207)";
        if (i === currentDate - 1) {
            chosenDayDiv.style.backgroundColor = "white";
        }
        else {
            document.getElementById(`day${i + 1}`).classList.add("missed-day");
        }
    }
    else if (chosenDay === "true") {
        chosenDayDiv.style.backgroundColor = "rgb(93, 195, 199)";
    }
}

// Update Completed on Calendar
var dayDivs = document.querySelectorAll(".day");
for (var i = 0; i < currentDate; i++){
    dayDivs[i].onclick = function (e) {
        var num = e.target.innerText;
        var selectedDate = document.getElementById(e.target.id);
        var tempString =
            "" + (currentMonth + 1) + "-" + num + "-" + currentYear;
        if (localStorage.getItem(tempString) === "false") {
            document.getElementById(`day${num}`).classList.remove("missed-day");
            selectedDate.style.backgroundColor = "rgb(93, 195, 199)";
            localStorage.setItem(tempString, true);
            daysCompleted++;
        }
        else if (localStorage.getItem(tempString) === "true") {
            if (num == currentDate) {
                selectedDate.style.backgroundColor = "white";
                localStorage.setItem(tempString, false);
                daysCompleted--;
            }
            else {
                document.getElementById(`day${num}`).classList.add("missed-day");
                selectedDate.style.backgroundColor = "rgb(207, 207, 207)";
                localStorage.setItem(tempString, false);
                daysCompleted--;
            }
        }
        totalDays.innerHTML = `${daysCompleted}/${daysInThisMonth}`;
        if (daysCompleted === currentDate) {
            alert("Great Progress");
        }
    }
}

// Reset Button
var resetBtn = document.getElementById("reset-btn");
resetBtn.onclick = function () {
    for (var i = 0; i < dayCount; i++){
        var tempString =
            "" + (currentMonth + 1) + "-" + (i + 1) + "-" + currentYear;
        localStorage.setItem(tempString, "false");
        var curDay = document.getElementById(`day${i + 1}`);
        if (i < currentDate - 1) {
            document.getElementById(`day${i + 1}`).classList.add("missed-day");
            curDay.style.backgroundColor = "rgb(207, 207, 207)";
        }
        else {
            curDay.style.backgroundColor = "white";
        }
    }
    daysCompleted = 0;
    totalDays.innerHTML = `${daysCompleted}/${daysInThisMonth}`;
}

window.onload = function() {
    document.body.classList.add('loaded');
};