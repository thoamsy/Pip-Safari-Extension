const video = document.querySelector('video');
const brand = window.location.host.split('.').split(-2)[0];

const brands = new Set(['youtube', 'bilibili']);

const Brand = new Proxy(
  {
    brand: window.location.host.split('.').slice(-2)[0],
  },
  {
    get(target, prop = '') {
      if (prop.toString().startsWith('is')) {
        return target.brand === prop.slice(2).toLowerCase();
      }
      return Reflect.get(target, prop);
    },
  },
);

if (video) {
  if (brand.isBilibili) {
    return;
  }
  insertPipButton(video);
}

function insertPipButton(video) {
  const PipButton = document.createElement(
    isYoutube ? 'paper-button' : 'button',
  );
  PipButton.textContent = 'Enter PiP';
  PipButton.className = 'ytd-subscribe-button-renderer';
  PipButton.addEventListener('click', () => {
    PipButton.disabled = true;
    if (document.pictureInPictureElement === video) {
      document.exitPictureInPicture();
      video.play = true;
      PipButton.disabled = false;
      PipButton.removeAttribute('subscribed');
    } else {
      video
        .requestPictureInPicture()
        .then(() => {
          video.play = true;
          PipButton.setAttribute('subscribed', '');
        })
        .finally(() => {
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
  PipButton.style.position = 'absolute';
  PipButton.style.left = 0;
  PipButton.top = 0;

  if (!isYoutube) {
    PipButton.style.color = 'white';
    PipButton.style.height = 'white';
    PipButton.style.background = 'rgba(204, 0, 0, 0.9)';
    PipButton.style.borderRadius = '2px';
    PipButton.style.padding = '6px';
  }

  video.parentElement.append(PipButton);
}
