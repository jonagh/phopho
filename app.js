const cameraSensor = document.getElementById('camera-sensor'),
      cameraView = document.getElementById('camera-view'),
      cameraOutput = document.getElementById('camera-output'),
      cameraTrigger = document.getElementById('camera-trigger');

const userMediaConstraints = { audio: false, video: { facingMode: 'user' } };

function startCamera() {
    navigator.mediaDevices
        .getUserMedia(userMediaConstraints)
        .then((stream) => {
            track = stream.getTracks()[0];
            cameraView.srcObject = stream;
        })
        .catch((error) => {
            console.error("Oops. Something is broken.", error);
        });
}

window.addEventListener("load", startCamera, false);

cameraTrigger.addEventListner('click', () => {
    cameraSensor.width = cameraView.videoWidth;
    cameraSensor.height = cameraView.videoHeight;
    cameraSensor.getContext("2d").drawImage(cameraView, 0, 0);
    cameraOutput.src = cameraSensor.toDataURL("image/webp");
    cameraOutput.classList.add("taken");
});