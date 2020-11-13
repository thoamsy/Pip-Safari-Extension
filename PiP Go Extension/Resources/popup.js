/*
See LICENSE folder for this sample’s licensing information.

Abstract:
Script that runs after clicking the extension's toolbar button.
*/
function addPipButton() {
  // Use optional permissions to request access to www.example.com.
  browser.permissions.request(
    { origins: ['https://www.example.com/', 'https://youtube.com'] },
    (granted) => {
      if (granted) {
        // Share Sea Creator's info to example.com.
        alert('yes!');
      }
    },
  );
}

document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('pip').addEventListener('click', addPipButton);
});

console.log('Hello World!', browser);
