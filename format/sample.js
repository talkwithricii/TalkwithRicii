// --- YouTube Player Setup ---
let player;
let playerReady = false;

function onYouTubeIframeAPIReady() {
  player = new YT.Player("player", {
    height: "420",
    width: "100%",
    videoId: "7S_tz1z_5bA",
    playerVars: { rel: 0, modestbranding: 1, playsinline: 1 },
    events: {
      onReady: () => { playerReady = true; },
      onError: (err) => console.warn("YouTube Player Error:", err)
    }
  });
}

function loadVideoSafe(videoId){
  if(playerReady && player && typeof player.loadVideoById==='function'){
    player.loadVideoById(videoId);
  } else { setTimeout(()=>loadVideoSafe(videoId),500);}
}

// --- Course Content Data ---
const contents=[
  {title:"1. Getting Started with MySQL",
   lessons:[
    {name:"Downloading SQL Installer", url:"https://www.youtube.com/embed/im2mocCGRsA", content:{title:"Installing MySQL", paragraph:"Learn to install MySQL.", code:"-- No SQL code\n<a href='#' class='exercise-link'>Installer Exercise</a>"}},
    {name:"Installing MySQL", url:"https://www.youtube.com/embed/KFIQ2gt7rvQ", content:{title:"Connecting", paragraph:"Connect using Workbench or CLI.", code:"-- No SQL code\n<a href='#' class='exercise-link'>Connect Exercise</a>"}}
   ]},

  {title:"2. Lazada-style E-commerce Database",
   lessons:[
    {name:"Create Database", url:"https://www.youtube.com/embed/SmM2XqJH0eE", content:{title:"Database Setup", paragraph:"Create tables and relations for e-commerce.", code:"CREATE DATABASE LazadaDB;\n<a href='#' class='exercise-link'>Create Database Exercise</a>"}}
   ]},

  {title:"3. LEFT JOIN",
   lessons:[
    {name:"LEFT JOIN QUERY", url:"https://www.youtube.com/embed/someID", content:{title:"LEFT JOIN - Include All Left Table", paragraph:"Retrieve all from left table.", code:"SELECT e.name, d.department_name FROM employees AS e LEFT JOIN departments AS d ON e.department_id = d.id;\n<a href='leftjoinpractice/leftjoin-practice.html' class='exercise-link'>LEFT JOIN Practice</a>"}}
   ]}
];

// --- Helper ---
function getVideoId(url){ const match=url.match(/(?:v=|\/)([0-9A-Za-z_-]{11})/); return match?match[1]:null; }

// --- Populate Course Contents ---
const courseContents=document.getElementById("course-contents");
const explanation=document.querySelector(".explanation");

contents.forEach(section=>{
  const div=document.createElement("div");
  div.classList.add("contents-section");

  const button=document.createElement("button");
  button.classList.add("toggle-btn");
  button.textContent=section.title;

  const list=document.createElement("ul");
  list.classList.add("lesson-list");

  section.lessons.forEach(lesson=>{
    const li=document.createElement("li");
    const link=document.createElement("a");
    link.href="#"; 
    link.classList.add("lesson-link");
    const span = document.createElement("span");
    span.textContent = lesson.name;
    link.appendChild(span);

    link.addEventListener("click", e=>{
      e.preventDefault();
      const videoId=getVideoId(lesson.url);
      if(videoId) loadVideoSafe(videoId);

      document.querySelectorAll(".lesson-link").forEach(l=>l.classList.remove("lesson-active"));
      link.classList.add("lesson-active");

      if(lesson.content){
        explanation.innerHTML=`
          <h2>${lesson.content.title}</h2>
          <p>${lesson.content.paragraph}</p>
          <h3>Example Query</h3>
          <div class="code-container"><pre>${lesson.content.code}</pre></div>
        `;
      }

      // Smooth scroll to explanation
      explanation.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });

    li.appendChild(link); list.appendChild(li);
  });

  button.addEventListener("click", ()=>{ list.style.display=list.style.display==='block'?'none':'block'; });
  div.appendChild(button); div.appendChild(list);
  courseContents.appendChild(div);
});

// --- Responsive iframe ---
window.addEventListener("resize", ()=>{
  if(player?.getIframe){ const iframe=player.getIframe(); iframe.style.height=window.innerWidth<600?"220px":"420px";}
});
