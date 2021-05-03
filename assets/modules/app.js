const RING_COUNT = 10;
const PLAY_AREA_COUNT = 3;
const ACCEPTABLE_KEYS = ['1', '2', '3'];

let activeRing;
let activePlayArea;
let availableDropZones = [];
let destinationPlayArea;
let dropZones = initDropZones();
let keyNumber;
let moving = false;
let playAreas = initPlayAreas();
let rings = initRings();
let sourcePlayArea;

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
		if (ACCEPTABLE_KEYS.includes(e.key)) {
			initMoveValues(e);
			if (!moving) {
				sourcePlayArea = activePlayArea;
				if(sourcePlayArea.querySelector('.ring')) {
					availableDropZones = dropZones.filter(dropzone => dropzone.id !== keyNumber);
					toggleDropZones();
					pickUpRing();
					moving = !moving;
				}
			} else {
				destinationPlayArea = activePlayArea;
				toggleDropZones();
				availableDropZones = [];
				placeRing(keyNumber)
				moving = !moving;
			}
		}
	});
}

function initMoveValues(e) {
	keyNumber = parseInt(e.key);
	activePlayArea = playAreas[keyNumber - 1];
}

function toggleDropZones() {
	for (const activeDropzone of availableDropZones) {
		activeDropzone.element.classList.toggle('hidden');
	}
}

function pickUpRing() {
	activeRing = sourcePlayArea.querySelector('.ring');
	activePlayArea.removeChild(activeRing);
}

function placeRing() {
	const postElement = destinationPlayArea.querySelector('.post');
	postElement.after(activeRing);
	activeRing = null;
}