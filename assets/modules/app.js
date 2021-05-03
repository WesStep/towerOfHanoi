const RING_COUNT = 10;
const PLAY_AREA_COUNT = 3;
const ACCEPTABLE_KEYS = ['1', '2', '3'];

let availableDropZones = [];
let activeRing;
let sourcePlayArea;
let destinationPlayArea;
let rings = initRings();
let playAreas = initPlayAreas();
let dropZones = initDropZones();
let moving = false;

initKeyListeners();

function initRings() {
	let rings = []
	for (let i = 0; i < RING_COUNT; i++) {
		rings[i] = document.querySelector('#ring-' + (i + 1));
	}
	return rings;
}

function initPlayAreas() {
	let playAreas = [];
	for (let i = 0; i < PLAY_AREA_COUNT; i++) {
		playAreas[i] = document.querySelector('#play-area-' + (i + 1));
		playAreas[i].addEventListener('click', (e) => {e.preventDefault()}); // TODO: make this move rings also.
	}
	return playAreas;
}

function initDropZones() {
	let dropZones = [];
	for (let i = 0; i < PLAY_AREA_COUNT; i++) {
		dropZones[i] = {
			element: document.querySelector('#dropzone-' + (i + 1)),
			id: i + 1
		};
	}
	return dropZones;
}

function initKeyListeners() {
	document.addEventListener('keypress', (e) => {
		const key = e.key;
		if (ACCEPTABLE_KEYS.includes(key)) {
			const keyNumber = parseInt(key);
			const activePlayArea = playAreas[keyNumber - 1];
			if (!moving) {
				sourcePlayArea = activePlayArea;
				if(sourcePlayArea.querySelector('.ring')) {
					availableDropZones = dropZones.filter(dropzone => dropzone.id !== keyNumber);
					toggleDropZones();
					pickUpRing(sourcePlayArea);
					moving = !moving;
				}
			} else {
				destinationPlayArea = activePlayArea;
				toggleDropZones();
				availableDropZones = [];
				moveRing(keyNumber)
				moving = !moving;
			}
		}
	});
}

function toggleDropZones() {
	for (const activeDropzone of availableDropZones) {
		activeDropzone.element.classList.toggle('hidden');
	}
}

function pickUpRing(sourcePlayArea) {
	activeRing = sourcePlayArea.querySelector('.ring');
	// playAreas[sourcePlayAreaIndex].children.removeChild(activeRing);
}


function moveRing() {
	const postElement = destinationPlayArea.querySelector('.post');
	postElement.after(activeRing);
	activeRing = null;

	/*
	If the active drop zone doesn't have a movable ring, do nothing.
	Otherwise, take the top ring and move it to the destination drop zone if it is a legal move, meaning if there are
	no rings on the destination drop zone or if the highest ring on the pole is larger than the active ring.
	 */

}