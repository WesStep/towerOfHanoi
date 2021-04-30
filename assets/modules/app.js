const RING_COUNT = 10;
const POST_COUNT = 3;
const PLAY_AREA_COUNT = 3;

let draggedRing;
let active = false;
let currentX;
let currentY;
let initialX;
let initialY;
let xOffset = 0;
let yOffset = 0;
let rings = [];
let posts = [];
let playAreas = [];

initRings();
initPosts();
initPlayAreas();
initDraggableElements();

function initRings() {
	for (let i = 0; i < RING_COUNT; i++) {
		rings[i] = document.querySelector('#ring-' + (i + 1));
	}
}

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
	rings[0].classList.add('draggable');
	// Init drag events for ring 1
	rings[0].addEventListener("touchstart", dragStart, false);
	rings[0].addEventListener("touchend", dragEnd, false);
	rings[0].addEventListener("touchmove", drag, false);

	rings[0].addEventListener("mousedown", dragStart, false);
	rings[0].addEventListener("mouseup", dragEnd, false);
	rings[0].addEventListener("mousemove", drag, false);
}

const ringIsDraggable = e => rings.includes(e.target) && e.target.classList.contains('draggable');

function dragStart(e) {
	if (!ringIsDraggable(e)) {
		return;
	}

	active = true;
	draggedRing = e.target;

	if (e.type === 'touchstart') {
		initialX = e.touches[0].clientX - xOffset;
		initialY = e.touches[0].clientY - yOffset;
	} else {
		initialX = e.clientX - xOffset;
		initialY = e.clientY - yOffset;
	}
}

function dragEnd(e) {
	console.log(e.target);
	if (e.target.className === 'play-area' || e.target.className === 'post') {
		const origin = draggedRing.parentNode;
		const destination = (e.target.className === 'play-area') ? e.target : e.target.parentElement;
		origin.removeChild(draggedRing);
		if (origin.children[1]) {
			origin.children[1].setAttribute('draggable', true);
		}
		destination.firstElementChild.after(draggedRing);
	}
}

const setTranslate = (xPos, yPos, el) => el.style.transform = "translate3d(" + xPos + "px, " + yPos + "px, 0)";


function drag(e) {
	if (active) {
		e.preventDefault();

		if (e.type === 'touchmove') {
			currentX = e.touches[0].clientX - initialX;
			currentY = e.touches[0].clientY - initialY;
		} else {
			currentX = e.clientX - initialX;
			currentY = e.clientY - initialY;
		}

		xOffset = currentX;
		yOffset = currentY;

		setTranslate(currentX, currentY, draggedRing);
	}
}