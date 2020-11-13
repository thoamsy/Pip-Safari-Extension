browser.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.video) {
    const PipButton = document.createElement('button');
    PipButton.textContent = 'Enter PiP';
    PipButton.addEventListener('click', () => {
      request.video.requestPictureInPicture().then(() => {
        PipButton.textContent = 'Exit PiP';
      });
    });
    // request.video.parentElement.append(PipButton);
    PipButton.style.position = 'relative';
    PipButton.style.zIndex = 10;

    sendResponse({ PipButton });
  }
  sendResponse({ message: 'nothing' });
});
