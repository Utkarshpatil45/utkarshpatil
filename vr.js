const webcam = document.getElementById("webcam");
const overlay = document.getElementById("overlay");
const ctx = overlay.getContext("2d");

let stream = null;
let detecting = false;

document.getElementById("startBtn").onclick = startDetection;
document.getElementById("stopBtn").onclick = stopDetection;

async function startDetection() {
    document.getElementById("status").innerText = "Status: Starting Camera...";

    stream = await navigator.mediaDevices.getUserMedia({ video: true });
    webcam.srcObject = stream;

    detecting = true;
    document.getElementById("status").innerText = "Status: Detecting Gestures...";

    detectLoop();
}

function stopDetection() {
    detecting = false;
    document.getElementById("status").innerText = "Status: Stopped";

    if (stream) {
        stream.getTracks().forEach(track => track.stop());
    }
}

async function detectLoop() {
    while (detecting) {
        ctx.clearRect(0, 0, overlay.width, overlay.height);

        // ---- PLACEHOLDER: run your gesture detection model here ----
        // Example: detectSwipe(), detectOpenHand(), detectPinch(), etc.

        // Example stub:
        const gesture = fakeGestureDetector();
        if (gesture) {
            handleGesture(gesture);
        }

        await new Promise(r => requestAnimationFrame(r));
    }
}

// --- Fake gesture detector (replace with real AI model) ---
function fakeGestureDetector() {
    // Randomly simulate a gesture every few seconds
    if (Math.random() < 0.005) {
        const gestures = ["swipe-left", "swipe-right", "open-hand"];
        return gestures[Math.floor(Math.random() * gestures.length)];
    }
    return null;
}

function handleGesture(gesture) {
    console.log("Gesture detected:", gesture);

    if (gesture === "swipe-right") {
        document.getElementById("status").innerText = "Gesture: Next Slide →";
    }
    if (gesture === "swipe-left") {
        document.getElementById("status").innerText = "Gesture: ← Previous Slide";
    }
    if (gesture === "open-hand") {
        document.getElementById("status").innerText = "Gesture: Open Hand (Pause)";
    }
}
