const elCanvas = document.querySelector('#camera canvas'),
      elPlayer = document.querySelector('#camera video'),
      elOutput = document.querySelector('#camera img'),
      elButton = document.querySelector('#camera button');

const userMediaConstraints = { audio: false, video: true };

function initialize() {
    navigator.mediaDevices
        .getUserMedia(userMediaConstraints)
        .then((stream) => {
            elPlayer.srcObject = stream;
        })
        .catch((error) => {
            console.error("initialize failed", error);
        });
}

window.addEventListener("load", initialize, false);

elButton.addEventListener('click', () => {
    elCanvas.width = elPlayer.videoWidth;
    elCanvas.height = elPlayer.videoHeight;
    elCanvas.getContext("2d").drawImage(elPlayer, 0, 0);

    elOutput.src = elCanvas.toDataURL("image/webp");
    elOutput.classList.add("captured");
});