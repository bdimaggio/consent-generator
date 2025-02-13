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
import transcript from './consenttext1.json' with { type: 'json' };
const mainContent = document.getElementById('main-content');
const itemDelay = 150;
const textDelay = 25;
async function playTranscript(transcript) {
  for (const item of transcript) {
    await new Promise(resolve => setTimeout(resolve, itemDelay)); // Delay 50ms

    // Show timestamp and speaker (assuming they exist)
    const timestamp = item.timestamp.start && item.timestamp.end ? `${item.timestamp.start} - ${item.timestamp.end}`: "N/A";
    const speaker = item.speaker || '';
    const p = document.createElement('p');
    mainContent.appendChild(p);
    const timestampBox = document.createElement('span'); 
    timestampBox.className = 'timestamp';
    timestampBox.innerText = timestamp;
    p.appendChild(timestampBox);
    const speakerBox = document.createElement('span');
    speakerBox.className = 'speaker';
    speakerBox.innerText = speaker; //item.speaker;
    p.appendChild(speakerBox);

    const textBox = document.createElement('span');
    textBox.className = 'text';
    p.appendChild(textBox);
    const text = item.text || "";
    for (let i = 0; i < text.length; i++) {
      await new Promise(resolve => setTimeout(resolve, textDelay));
      textBox.append(text[i]);
      
      // Todo: allow user to scroll up to see older text. Continue autoscroll behavior if user is at the bottom.
      mainContent.scrollTop = mainContent.scrollHeight;
      
    }
  }
}

playTranscript(transcript);
