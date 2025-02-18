/**
 * "About" popup stuff.
 */
function openPopup(e) {
  e.preventDefault();

  // Create a scrim
  const scrim = document.createElement('div');
  scrim.id = 'scrim';
  document.body.appendChild(scrim);

  // Create a popup
  const popup = document.createElement('div');
  popup.id = 'popup';

  // Create a popup inner
  const popupInner = document.createElement('div');
  popupInner.id = 'popup-inner';

  // Create a popup content and copy the sidebar content into it
  const popupContent = document.getElementById('sidebar');
  popupInner.innerHTML = popupContent.innerHTML;
  popup.appendChild(popupInner);

  // Add the popup to the body and show the scrim
  document.body.appendChild(popup);
  scrim.style.display = 'block';
  scrim.addEventListener('click', closePopup);
}

function closePopup() {
  // Remove the popup and scrim
  document.getElementById("popup").remove();
  document.getElementById("scrim").remove();
}

// Add event listener to the about link
document.querySelector('#about-link a').addEventListener("click", openPopup);

/**
 * Add Transcript Entry
 * 
 * @param {Object} item - The transcript item to add.
 * @param {string} item.speaker - The speaker.
 * @param {string} item.text - The text to display.
 * @param {Object} item.timestamp - The timestamp.
 * @param {string} item.timestamp.start - The start timestamp.
 * @param {string} item.timestamp.end - The end timestamp.
 * @param {number} textDelay - The delay between characters.
 * 
 * @returns {Promise} - A promise that resolves when the text is displayed.
 */
async function addTranscriptEntry({ speaker = 'N/A', text = "", timestamp = { start: '', end: '' } }, textDelay = 50) {
  // Get the main content element
  const mainContent = document.getElementById('main-content');
  
  // Create a new paragraph element and append it to the main content
  const p = document.createElement('p');
  mainContent.appendChild(p);
  
  // Create a timestamp box
  const timestampBox = document.createElement('span'); 
  timestampBox.className = 'timestamp';
  timestampBox.innerText = timestamp.start && timestamp.end ? `${timestamp.start} - ${timestamp.end}`: "N/A";
  p.appendChild(timestampBox);

  // Create a speaker box
  const speakerBox = document.createElement('span');
  speakerBox.className = 'speaker';
  speakerBox.innerText = speaker;
  p.appendChild(speakerBox);

  // Create a text box
  const textBox = document.createElement('span');
  textBox.className = 'text';
  p.appendChild(textBox);

  // Show text with 50ms delay per character
  for (let i = 0; i < text.length; i++) {
    await new Promise(resolve => setTimeout(resolve, textDelay));
    textBox.append(text[i]);
    mainContent.scrollTop = mainContent.scrollHeight;
  }
}

/**
 * Teletype behavior.
 */
import transcript from './consenttext1.json' with { type: 'json' };
const itemDelay = 150;
const textDelay = 25;

async function playTranscript(transcript) {
  for (const item of transcript) {
    await new Promise(resolve => setTimeout(resolve, itemDelay));
    await addTranscriptEntry(item, textDelay); // Add the transcript entry
  }
}

playTranscript(transcript);
