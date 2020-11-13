const video = document.querySelector('video');
const PipButton = document.createElement('button');
PipButton.textContent = 'Enter PiP';
PipButton.className = 'ytd-subscribe-button-renderer';
PipButton.addEventListener('click', () => {
  PipButton.disabled = true;
  if (document.pictureInPictureElement === video) {
    document.exitPictureInPicture();
    video.play = true;
    PipButton.disabled = false;
  } else {
    video.requestPictureInPicture().finally(() => {
      PipButton.disabled = false;
    });
  }
});

video.addEventListener('leavepictureinpicture', () => {
  PipButton.textContent = 'Enter Pip';
});
video.addEventListener('enterpictureinpicture', (event) => {
  PipButton.textContent = 'Exit Pip';
});

PipButton.style.position = 'relative';
PipButton.style.zIndex = 10;
PipButton.style.width = '100px';
video.parentElement.append(PipButton);
