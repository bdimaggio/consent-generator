/**
 * "About" popup stuff.
 */
function openPopup(e) {
  e.preventDefault();
  const scrim = document.createElement('div');
  scrim.id = 'scrim';
  document.body.appendChild(scrim);
  const popup = document.createElement('div');
  popup.id = 'popup';
  const popupInner = document.createElement('div');
  popupInner.id = 'popup-inner';
  const popupContent = document.getElementById('sidebar');
  popupInner.innerHTML = popupContent.innerHTML;
  popup.appendChild(popupInner);
  document.body.appendChild(popup);
  scrim.style.display = 'block';
  scrim.addEventListener('click', closePopup);
}

function closePopup() {
  document.getElementById("popup").remove();
  document.getElementById("scrim").remove();
}

document.querySelector('#about-link a').addEventListener("click", openPopup);

/**
 * Teletype behavior.
 */
// import data from './consenttext1.json' with { type: 'json' };
// const textDelay = 50;
// const metadataDelay = 150;
// const contentWrapper = document.getElementById('content-wrapper');
// let intervalID;
// data.forEach((item, index) => {
//   if (intervalID !== undefined) {
//     clearInterval(intervalID);
//   }
//   if (index === data.length - 1) {
//     // Got through all the data elements; don't set another interval.
//     return;
//   }

//   // Plunk in the paragraph.
//   const p = document.createElement('p');
//   contentWrapper.appendChild(p);
//   // Add timestamp.
//   intervalID = setInterval(() => {
//     const timestamp = document.createElement('span');
//     timestamp.className = 'timestamp';
//     timestamp.innerText = `${item.timestamp.start} - ${item.timestamp.end}`;
//     p.appendChild(timestamp);

//   }, metadataDelay);  
// });

import data from './consenttext1.json' with { type: 'json' };
const delay = 50;
let index = 0;




data.forEach((item, index) => {
  const p = document.createElement('p');
  document.getElementById('content-wrapper').appendChild(p);
  const timestamp = document.createElement('span'); 
  timestamp.className = 'timestamp';
  timestamp.innerText = `${item.timestamp.start} - ${item.timestamp.end}`;
  p.appendChild(timestamp);
  const speaker = document.createElement('span');
  speaker.className = 'speaker';
  speaker.innerText = item.speaker;
  p.appendChild(speaker);
  const box = document.createElement('span');
  box.className = 'text';
  p.appendChild(box);
  let textIndex = 0;
  const dribble = () => {
    box.append(item.text[textIndex]);
    textIndex++;
    if (textIndex >= text.length) {
      clearInterval(intervalID);
    }
  }
  const intervalID = setInterval(dribble, delay);
});
