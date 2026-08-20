var bfsInterval = null;

function toggleBFSAnimation() {
    if (bfsInterval == null) {
        bfsInterval = startAnimation({elementId: 'bfsAnim', images: loadImages()});
    } else {
        clearInterval(bfsInterval);
        bfsInterval = null
    }
}

var bfsAlgoInt = null;

function toggleBFSAlgoAnim() {
  if (bfsAlgoInt == null) {
    bfsAlgoInt = startAnimation({elementId: 'bfsAlgoAnim', images: loadImagesAlg()});
  } else {
    clearInterval(bfsAlgoInt)
    bfsAlgoInt = null
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

function loadImagesAlg() {
  var img = []
  for (i = 1; i <= 67; i++) {
    if (i == 14 || i == 66) {
      continue;
    }
    img.push('img/bfs-algo/' +i+ '.png');
  }
  img.push('img/bfs-algo/67.png');
  img.push('img/bfs-algo/67.png');
  img.push('img/bfs-algo/67.png');
  return img
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