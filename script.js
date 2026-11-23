
const trains = [
    {
        number: "12002",
        name: "Bhopal Shatabdi",
        type: "Shatabdi Express",
        status: "Demo: On time",
        runningDays: "Monday to Saturday",
        stations: [
            { name: "New Delhi", arrival: "--", departure: "06:00" },
            { name: "Agra Cantt", arrival: "07:50", departure: "07:52" },
            { name: "Gwalior", arrival: "09:10", departure: "09:12" },
            { name: "Bhopal", arrival: "14:00", departure: "--" }
        ]
    },
    {
        number: "12137",
        name: "Punjab Mail",
        type: "Express",
        status: "Demo: Delayed by 15 minutes",
        runningDays: "Daily",
        stations: [
            { name: "Mumbai CST", arrival: "--", departure: "19:35" },
            { name: "Khandwa", arrival: "03:20", departure: "03:25" },
            { name: "Bhopal", arrival: "07:10", departure: "07:15" },
            { name: "Delhi", arrival: "18:00", departure: "--" }
        ]
    },
    {
        number: "12627",
        name: "Karnataka Express",
        type: "Express",
        status: "Demo: On time",
        runningDays: "Tuesday, Thursday, Sunday",
        stations: [
            { name: "Bengaluru", arrival: "--", departure: "19:20" },
            { name: "Guntakal", arrival: "01:30", departure: "01:35" },
            { name: "Nagpur", arrival: "12:00", departure: "12:05" },
            { name: "New Delhi", arrival: "10:30", departure: "--" }
        ]
    }
];

// Connect to HTML elements
const searchBox = document.getElementById("trainSearch");
const searchButton = document.getElementById("searchButton");
const result = document.getElementById("result");

// Search function
function searchTrain() {

    const searchValue = searchBox.value.trim().toLowerCase();

    if (searchValue === "") {
        result.innerHTML =
            "<p>Please enter a train name or number.</p>";
        return;
    }

    const foundTrain = trains.find(function(train) {
        return train.number === searchValue ||
               train.name.toLowerCase().includes(searchValue);
    });

    if (foundTrain) {

        let stationRows = "";

        foundTrain.stations.forEach(function(station) {
            stationRows += `
                <tr>
                    <td>${station.name}</td>
                    <td>${station.arrival}</td>
                    <td>${station.departure}</td>
                </tr>
            `;
        });

        const statusClass = foundTrain.status.toLowerCase().includes("delayed")
            ? "delayed"
            : "on-time";

        result.innerHTML = `
            <div class="train-card">

                <div class="train-card-header">
                    <div>
                        <h2>${foundTrain.name}</h2>
                        <p class="train-number">
                            Train No. ${foundTrain.number}
                        </p>
                    </div>

                    <span class="status-badge ${statusClass}">
                        ${foundTrain.status.replace("Demo: ", "")}
                    </span>
                </div>

                <div class="train-details">

                    <div class="detail-item">
                        <span>TRAIN TYPE</span>
                        <strong>${foundTrain.type}</strong>
                    </div>

                    <div class="detail-item">
                        <span>OPERATING DAYS</span>
                        <strong>${foundTrain.runningDays}</strong>
                    </div>

                    <div class="detail-item">
                        <span>FROM</span>
                        <strong>${foundTrain.stations[0].name}</strong>
                    </div>

                    <div class="detail-item">
                        <span>TO</span>
                        <strong>${foundTrain.stations[foundTrain.stations.length - 1].name}</strong>
                    </div>

                    <div class="detail-item">
                        <span>INTERMEDIATE STOPS</span>
                        <strong>${Math.max(0, foundTrain.stations.length - 2)}</strong>
                    </div>

                </div>

                <h3 class="schedule-heading">Route & Schedule</h3>

                <div class="table-container">
                    <table>
                        <tr>
                            <th>Station</th>
                            <th>Arrival</th>
                            <th>Departure</th>
                        </tr>
                        ${stationRows}
                    </table>
                </div>

                <p class="demo-note">
                    Demo information – not live railway data
                </p>

            </div>
        `;

    } else {
        result.innerHTML =
            "<p>Sorry! No train found. Please check the train name or number and try again.</p>";
    }
}

// Search button click
searchButton.addEventListener("click", searchTrain);

// Search when Enter key is pressed
searchBox.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        searchTrain();
    }
});
