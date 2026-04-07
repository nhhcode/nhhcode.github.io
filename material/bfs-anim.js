var myInterval = null

function toggleBFSAnimation() {
    if (myInterval == null) {
        myInterval = startAnimation({elementId: 'bfsAnim', images: loadImages()});
    } else {
        clearInterval(myInterval);
        myInterval = null
    }
}

function loadImages() {
    return [
    'img/bfs/bfs-01.png',
    'img/bfs/bfs-02.png',
    'img/bfs/bfs-03.png',
    'img/bfs/bfs-04.png',
    'img/bfs/bfs-05.png',
    'img/bfs/bfs-06.png',
    'img/bfs/bfs-07.png',
    'img/bfs/bfs-08.png',
    'img/bfs/bfs-09.png',
    'img/bfs/bfs-10.png',
    'img/bfs/bfs-11.png'
  ];
}

function startAnimation({
  elementId,
  images,
  fps = 1,
  loop = true
}) {
  const img = document.getElementById(elementId);

  let index = 0;
  const frameDuration = 1000 / fps;

  const timer = setInterval(() => {
    img.src = images[index];
    index++;

    if (index >= images.length) {
      if (loop) {
        index = 0;
      } else {
        clearInterval(timer);
      }
    }
  }, frameDuration);

  return timer; // allows stopping later
}