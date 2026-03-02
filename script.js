const DEVICE_ID = "ANURAG_HOME_001";
const database = firebase.database();

const devices = [
    "LIGHT 1",
    "LIGHT 2",
    "LIGHT 3",
    "LIGHT 4"
];

window.onload = function () {

    document.getElementById("apiKeyDisplay")
        .innerText = firebase.app().options.apiKey;

    const container = document.getElementById("devices");

    devices.forEach((name, index) => {

        container.innerHTML += `
            <div class="light-card">
                <h3>${name}</h3>
                <button class="light-btn off"
                    id="light${index}">
                    OFF
                </button>
            </div>
        `;

        const btn = document.getElementById("light" + index);

        // Click event
        btn.addEventListener("click", function () {

            let newState = btn.classList.contains("off") ? 1 : 0;

            database.ref(`users/${DEVICE_ID}/devices/device${index}`)
                .set(newState);
        });

        // Realtime update
        database.ref(`users/${DEVICE_ID}/devices/device${index}`)
        .on("value", function (snapshot) {

            let state = snapshot.val();

            if (state === 1) {
                btn.classList.remove("off");
                btn.classList.add("on");
                btn.innerText = "ON";
            } else {
                btn.classList.remove("on");
                btn.classList.add("off");
                btn.innerText = "OFF";
            }
        });
    });

    // Fan realtime
    database.ref(`users/${DEVICE_ID}/fanSpeed`)
    .on("value", function(snapshot){

        const knob = document.getElementById("knob");
        let speed = snapshot.val();

        if(speed === 0) knob.style.transform = "rotate(-90deg)";
        if(speed === 1) knob.style.transform = "rotate(-30deg)";
        if(speed === 2) knob.style.transform = "rotate(30deg)";
        if(speed === 3) knob.style.transform = "rotate(90deg)";
    });

};

// Set fan speed
function setSpeed(level) {

    database.ref(`users/${DEVICE_ID}/fanSpeed`)
        .set(level);
}
