const RING_COUNT = 10;
const POST_COUNT = 3;
const PLAY_AREA_COUNT = 3;

let draggedRing;

let rings = [];
initRings();

let posts = [];
initPosts();

let playAreas = [];
initPlayAreas();

initDraggableElements();

function initRings() {
	for (let i = 0; i < RING_COUNT; i++) {
		rings[i] = document.querySelector('#ring-' + (i + 1));
	}
};

function initPosts() {
	for (let i = 0; i < POST_COUNT; i++) {
		posts[i] = document.querySelector('#post-' + (i + 1));
	}
	posts[0] = [...rings];
}

function initPlayAreas() {
	for (let i = 0; i < PLAY_AREA_COUNT; i++) {
		playAreas[i] = document.querySelector('#play-area-' + (i + 1));
		playAreas[i].addEventListener('dragenter', (e) => {e.preventDefault()});
		playAreas[i].addEventListener('dragover', (e) => {e.preventDefault()});
	}
}

function initDraggableElements() {
	rings[0].setAttribute('draggable', true);
	document.addEventListener('drag', () => {}, false);
	document.addEventListener('dragstart', (e) => {
		draggedRing = e.target;
	}, false);
	document.addEventListener('dragend', (e) => {
		e.preventDefault();
	}, false);
	document.addEventListener('drop', moveRing, false);
}

function moveRing(e) {
	e.preventDefault();
	if (e.target.className === 'post') {
		const origin = draggedRing.parentNode;
		const destination = e.target.parentNode;
		console.dir(origin.children);
		console.dir(destination.firstElementChild);
		origin.removeChild(draggedRing);
		if (origin.children[1]) {
			origin.children[1].setAttribute('draggable', true);
		}
		destination.firstElementChild.after(draggedRing);
	}
}