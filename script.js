let defaultNames = [
    "LIGHT 1",
    "SOCKET 2",
    "SOCKET 3",
    "LIGHT 4",
    "SOCKET 5",
    "SOCKET 6"
];

let deviceNames = defaultNames;
let deviceStates = [0,0,0,0,0,0];

let container = document.getElementById("devices");

deviceNames.forEach((name, index) => {

    container.innerHTML += `
        <div class="card">
            <h3>${name}</h3>

            <label class="switch">
                <input type="checkbox" id="toggle${index}" 
                       onchange="toggle(${index})">
                <span class="slider"></span>
            </label>
        </div>
    `;
});

function toggle(num) {

    let toggleBtn = document.getElementById("toggle" + num);
    let state = toggleBtn.checked ? 1 : 0;

    console.log("Device " + num + " State: " + state);

    // 🔥 Update Firebase
    database.ref("devices/device" + num)
        .set(state)
        .then(() => {
            console.log("Firebase Updated Successfully");
        })
        .catch((error) => {
            console.error("Firebase Error:", error);
        });
}