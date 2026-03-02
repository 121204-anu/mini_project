const DEVICE_ID = "ANURAG_HOME_001";
const database = firebase.database();

const devices = [
    "LIGHT 1",
    "LIGHT 2",
    "LIGHT 3",
    "LIGHT 4"
];

window.onload = function () {

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

        // CLICK EVENT
        btn.addEventListener("click", function () {

            let isOff = btn.classList.contains("off");
            let newState = isOff ? 1 : 0;

            console.log("Writing to Firebase:", newState);

            database.ref(`users/${DEVICE_ID}/devices/device${index}`)
                .set(newState)
                .then(() => console.log("Write Success"))
                .catch(err => console.error(err));
        });

        // REALTIME UPDATE
        database.ref(`users/${DEVICE_ID}/devices/device${index}`)
        .on("value", function (snapshot) {

            let state = snapshot.val();

            console.log("Firebase Value:", state);

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
};
