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
		// playAreas[i].addEventListener('click', (e) => {e.preventDefault()}); TODO: make this move rings also.
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
				if(sourcePlayArea.querySelector('.rings .ring')) {
					availableDropZones = dropZones.filter(dropzone => dropzone.id !== keyNumber);
					toggleDropZones();
					pickUpRing();
					moving = !moving;
				}
			} else {
				destinationPlayArea = activePlayArea;
				toggleDropZones();
				placeRing()
				availableDropZones = [];
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
	activeRing = sourcePlayArea.querySelector('.rings .ring');
	activePlayArea.querySelector('.rings').removeChild(activeRing);
}

function placeRing() {
	const ringsElement = destinationPlayArea.querySelector('.rings');
	const topRing = destinationPlayArea.querySelector('.rings .ring');
	if (postIsEmpty() || !postIsEmpty() && activeRingIsSmaller(topRing)) {
		ringsElement.prepend(activeRing);
	} else {
		returnRingBack();
	}
	activeRing = null;
}

function postIsEmpty() {
	return destinationPlayArea.querySelector('.rings .ring') === null;
}

function activeRingIsSmaller(topRing) {
	return parseInt(topRing.dataset.id) > parseInt(activeRing.dataset.id);
}

function returnRingBack() {
	sourcePlayArea.querySelector('.rings').prepend(activeRing);
}