let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
let duration = [6, 7, 8, 9, 5, 6, 4];

let $ = function(id) { return document.querySelector("#" + id); };

document.addEventListener("DOMContentLoaded", function() {
    // Event handler for form submission
    $("user_details_form").addEventListener("submit", function(event) {
        event.preventDefault(); // Prevent default form submission
        // Get the values from the form
        let username = $("username_input").value;
        let age = parseInt($("age_input").value);
        // Validate the age input
        if (isNaN(age) || age < 5 || age > 120) {
            alert("Please enter a valid age between 5 and 120.");
            return;
        }
        // Display the user information
        alert("Username: " + username + "\nAge: " + age);
    });

    // Event handler for updating sleep duration
    $("update_sleep_button").addEventListener("click", updateSleep);

    // Event handler for calculating average, minimal, and maximal sleep durations
    $("average_sleep_button").addEventListener("click", showAverageMinMaxSleep);

    // Event handler for displaying sleep durations less than 5 hours
    $("track_sleep_button").addEventListener("mouseover", displaySleepDuration);
});

// Function to update sleep duration
function updateSleep() {
    // Get the selected day
    let selectedDay = document.querySelector('input[name="day"]:checked');

    // Get the sleep duration entered by the user
    let sleepDurationInput = $("sleep_duration_input").value;

    // Check if sleep duration is entered
    if (!sleepDurationInput.trim()) {
        alert("Enter a valid number for sleep duration");
        $("sleep_duration_input").value = ""; // Clear the input field
        return;
    }

    // Parse sleep duration into an integer
    let sleepDuration = parseInt(sleepDurationInput);

    // Validate if sleep duration is a valid number
    if (isNaN(sleepDuration) || sleepDuration < 0) {
        alert("Enter a valid positive number for sleep duration");
        return;
    }

    // Find the index of the selected day in the 'days' array
    let index = days.indexOf(selectedDay.value);

    // Update the sleep duration for the selected day in the 'duration' array
    duration[index] = sleepDuration;

    // Show an alert confirming the updated sleep duration
    alert("Your updated sleep duration is " + sleepDuration + " hrs on " + selectedDay.value);
}

// Function to calculate average, minimal, and maximal sleep durations for the week
function showAverageMinMaxSleep() {
    // Calculate total sleep duration for the week
    let totalSleep = duration.reduce((acc, curr) => acc + curr, 0);
    
    // Calculate average sleep duration
    let averageSleep = totalSleep / days.length;
    
    // Find minimal sleep duration
    let minSleep = Math.min(...duration);
    
    // Find maximal sleep duration
    let maxSleep = Math.max(...duration);
    
    // Display the results inside the input field
    let averageSleepInput = $("average_sleep_input");
    averageSleepInput.value = "Average sleep duration for this week: " + averageSleep.toFixed(2) + " hrs (Min: " + minSleep + " hrs, Max: " + maxSleep + " hrs)";
    
    // Apply style using JavaScript
    averageSleepInput.style.color = "green";
    averageSleepInput.style.borderColor = "red";
}

// Function to display sleep durations less than 5 hours
function displaySleepDuration() {
    // Get the username entered by the user
    let username = $("username_input").value;

    // Paragraph to display the username
    let usernameParagraph = document.createElement("p");
    usernameParagraph.textContent = "Hello " + username + "! You slept less than " + 5 + " hours on these days!";

    // Table to display days with sleep less than 5 hours
    let sleepTable = document.createElement("table");
    sleepTable.innerHTML = "<tr><th>Day</th><th>Sleep Duration (hrs)</th></tr>";

    // Find days with sleep less than 5 hours
    for (let i = 0; i < days.length; i++) {
        if (duration[i] < 5) {
            let row = sleepTable.insertRow();
            let cellDay = row.insertCell(0);
            let cellDuration = row.insertCell(1);
            cellDay.textContent = days[i];
            cellDuration.textContent = duration[i];
        }
    }

    // Clear previous content
    $("result_here").innerHTML = "";

    // Append username paragraph and sleep table to the result div
    $("result_here").appendChild(usernameParagraph);
    $("result_here").appendChild(sleepTable);
}
