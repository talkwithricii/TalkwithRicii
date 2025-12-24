// --- YouTube Player Setup ---
let player;
let playerReady = false;

function onYouTubeIframeAPIReady() {
  player = new YT.Player("player", {
    height: "420",
    width: "100%",
    videoId: "",
    playerVars: { rel: 0, modestbranding: 1, playsinline: 1 },
    events: {
      onReady: () => { playerReady = true; },
      onError: (err) => console.warn("YouTube Player Error:", err)
    }
  });
}

function loadVideoSafe(videoId) {
  if (playerReady && player?.loadVideoById) {
    player.loadVideoById(videoId);
  } else {
    setTimeout(() => loadVideoSafe(videoId), 500);
  }
}

// Extract Video ID
function getVideoId(url) {
  const match = url.match(/(?:v=|\/)([0-9A-Za-z_-]{11})/);
  return match ? match[1] : null;
}

// --- Course Content Data ---
const contents = [
  {
    title: "1. Getting Started with Node.js",
    lessons: [
      { name: "Download Node.js", url: "https://youtu.be/bILyyFznUWg?si=12-eJNecsbRGwm0N" },
      { name: "Installation of Node.js", url: "https://youtu.be/biTta-Tnqmc?si=1KREyTUx-EuPRrg3" },
      { name: "Test Version", url: "https://youtu.be/xJ8t2VwFljA?si=045zjiGbiKhVc3TL" },
      { name: "Creating Full React Project", url: "https://youtu.be/_xdNbQ06cTA?si=il3ycaGEAlqHj4EU" },
      { name: "Bypass PowerShell to Create Project", url: "https://youtu.be/33EaItUbqO8?si=1tsG4Jk1vt6xBkF2" }
    ]
  },

  {
    title: "Building a Registration Form in React",
    lessons: [
     { name: "Importing Libraries", url: "https://youtu.be/AADB2aeo8iE" },
      { name: "Creating Function", url: "https://youtu.be/gJADP6eLsTY" },
      { name: "Sending and Response", url: "https://youtu.be/bD-9Hlj6N80" },
      { name: "Form", url: "https://youtu.be/4ITl37ESex4" },
     


    ]
  }
];

// Populate Contents
const courseContents = document.getElementById("course-contents");
const explanation = document.querySelector(".explanation");
const videoContainer = document.getElementById("video-player");

contents.forEach(section => {
  const sectionDiv = document.createElement("div");
  sectionDiv.classList.add("contents-section");

  const button = document.createElement("button");
  button.classList.add("toggle-btn");
  button.textContent = section.title;

  const ul = document.createElement("ul");
  ul.classList.add("lesson-list");

  section.lessons.forEach(lesson => {
    const li = document.createElement("li");
    const link = document.createElement("a");

    link.href = "#";
    link.classList.add("lesson-link");
    link.innerHTML = `<span>${lesson.name}</span>`;

    link.addEventListener("click", e => {
      e.preventDefault();

      // Load video
      const id = getVideoId(lesson.url);
      if (id) loadVideoSafe(id);

      // Highlight active item
      document.querySelectorAll(".lesson-link").forEach(l => l.classList.remove("lesson-active"));
      link.classList.add("lesson-active");

      // If no explanation → clear panel + scroll to video
      if (!lesson.content) {
        explanation.innerHTML = "";
        videoContainer.scrollIntoView({ behavior: "smooth", block: "start" });
        return;
      }

      // If explanation exists → show explanation
      explanation.innerHTML = `
        <h2>${lesson.content.title}</h2>
        <p>${lesson.content.paragraph}</p>
        <h3>Example Code</h3>
        <div class="code-container"><pre>${lesson.content.code}</pre></div>
      `;

      // Scroll to explanation (not code)
      explanation.scrollIntoView({ behavior: "smooth", block: "start" });
    });

    li.appendChild(link);
    ul.appendChild(li);
  });

  button.addEventListener("click", () => {
    ul.style.display = ul.style.display === "block" ? "none" : "block";
  });

  sectionDiv.appendChild(button);
  sectionDiv.appendChild(ul);

  courseContents.appendChild(sectionDiv);
});

// Responsive iframe
window.addEventListener("resize", () => {
  if (player?.getIframe) {
    const iframe = player.getIframe();
    iframe.style.height = window.innerWidth < 600 ? "220px" : "420px";
  }
});
