const DEVICE_ID = "ANURAG_HOME_001";
const database = firebase.database();

const devices = [
    "LIGHT 1",
    "SOCKET 2",
    "SOCKET 3",
    "LIGHT 4",
    "SOCKET 5",
    "SOCKET 6"
];

window.onload = function () {

    document.getElementById("apiKeyDisplay")
        .innerText = firebase.app().options.apiKey;

    const container = document.getElementById("devices");

    devices.forEach((name, index) => {

        container.innerHTML += `
            <div class="card">
                <h3>${name}</h3>
                <label class="switch">
                    <input type="checkbox" id="toggle${index}">
                    <span class="slider"></span>
                </label>
            </div>
        `;

        document.getElementById("toggle" + index)
            .addEventListener("change", function () {

                let state = this.checked ? 1 : 0;

                database.ref(`users/${DEVICE_ID}/devices/device${index}`)
                    .set(state);
            });

        database.ref(`users/${DEVICE_ID}/devices/device${index}`)
            .on("value", function (snapshot) {
                let value = snapshot.val();
                document.getElementById("toggle" + index).checked = (value === 1);
            });
    });

    const speedSlider = document.getElementById("speedControl");
    const speedText = document.getElementById("speedValue");

    speedSlider.addEventListener("input", function () {
        let speed = parseInt(this.value);
        speedText.innerText = speed;

        database.ref(`users/${DEVICE_ID}/fanSpeed`)
            .set(speed);
    });

    database.ref(`users/${DEVICE_ID}/fanSpeed`)
        .on("value", function (snapshot) {
            let value = snapshot.val();
            if (value !== null) {
                speedSlider.value = value;
                speedText.innerText = value;
            }
        });
};
