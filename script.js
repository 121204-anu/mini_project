// 🔐 Permanent Device ID
const DEVICE_ID = "ANURAG_HOME_001";

const database = firebase.database();

// Default device names
const defaultNames = [
    "LIGHT 1",
    "SOCKET 2",
    "SOCKET 3",
    "LIGHT 4",
    "SOCKET 5",
    "SOCKET 6"
];

// Wait until page loads
window.onload = function () {

    const container = document.getElementById("devices");

    defaultNames.forEach((name, index) => {

        container.innerHTML += `
            <div class="card">
                <h3>${name}</h3>
                <label class="switch">
                    <input type="checkbox" id="toggle${index}">
                    <span class="slider"></span>
                </label>
            </div>
        `;

        // Toggle event
        document.getElementById("toggle" + index)
            .addEventListener("change", function () {
                updateDeviceState(index, this.checked ? 1 : 0);
            });

        // 🔄 Real-time listener
        database.ref(`users/${DEVICE_ID}/devices/device${index}`)
            .on("value", function (snapshot) {
                let value = snapshot.val();
                document.getElementById("toggle" + index).checked = (value === 1);
            });
    });
};


// 🔥 Update Firebase
function updateDeviceState(deviceNumber, state) {

    database.ref(`users/${DEVICE_ID}/devices/device${deviceNumber}`)
        .set(state)
        .then(() => {
            console.log("Device " + deviceNumber + " Updated:", state);
        })
        .catch((error) => {
            console.error("Firebase Error:", error);
        });
}
