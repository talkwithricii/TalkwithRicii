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

function loadVideoSafe(videoId){
  if(playerReady && player && typeof player.loadVideoById==='function'){
    player.loadVideoById(videoId);
  } else { setTimeout(()=>loadVideoSafe(videoId),500);}
}

// --- Course Content Data ---
const contents = [
  {
    title: "1. Adaptive Programming Tutor (APT)",
    lessons: [
{
  name: "Setting Up MongoDB Atlas",
  url: "https://www.youtube.com/embed/VIDEOID_MONGODB",
  content: {
    title: "Setting Up MongoDB Atlas for Your Learning System",
    paragraph: `
      This lesson will guide you through creating your MongoDB Atlas account, building
      your free cluster, setting up your database user, and creating your first database
      and collections for our adaptive Learning Management System (LMS).
    `
  }
},


      
      {
        name: "Hello World Program",
        url: "https://www.youtube.com/embed/VIDEOID2",
        content: {
          title: "Your First C++ Program",
          paragraph: "Write a simple Hello World program in C++.",
          code: `#include <iostream>
using namespace std;

int main() {
    cout << "Hello World!" << endl;
    return 0;
}
<a href='#' class='exercise-link'>Hello World Exercise</a>`
        }
      }
    ]
  },
  {
    title: "2. Basics of C++",
    lessons: [
      {
        name: "Variables and Data Types",
        url: "https://www.youtube.com/embed/VIDEOID3",
        content: {
          title: "Variables in C++",
          paragraph: "Learn different data types and how to declare variables.",
          code: `int age = 21;
double salary = 45000.50;
char grade = 'A';
string name = "Maria";
<a href='#' class='exercise-link'>Variables Exercise</a>`
        }
      },
      {
        name: "Operators and Expressions",
        url: "https://www.youtube.com/embed/VIDEOID4",
        content: {
          title: "Using Operators",
          paragraph: "Perform arithmetic, relational, and logical operations.",
          code: `int a = 5, b = 3;
cout << "Sum: " << a + b << endl;
cout << "Product: " << a * b << endl;
<a href='#' class='exercise-link'>Operators Exercise</a>`
        }
      }
    ]
  },
  {
    title: "3. Control Structures",
    lessons: [
      {
        name: "If-Else Statements",
        url: "https://www.youtube.com/embed/VIDEOID5",
        content: {
          title: "Conditional Statements",
          paragraph: "Use if, else if, and else to control program flow.",
          code: `int score = 85;
if(score >= 90) cout << "A";
else if(score >= 75) cout << "B";
else cout << "C";
<a href='#' class='exercise-link'>If-Else Exercise</a>`
        }
      },
      {
        name: "Loops in C++",
        url: "https://www.youtube.com/embed/VIDEOID6",
        content: {
          title: "For, While, Do-While Loops",
          paragraph: "Repeat actions using loops in C++.",
          code: `for(int i=1; i<=5; i++){
    cout << "Count: " << i << endl;
}
<a href='#' class='exercise-link'>Loops Exercise</a>`
        }
      }
    ]
  },
  {
    title: "4. Functions and OOP",
    lessons: [
      {
        name: "Functions",
        url: "https://www.youtube.com/embed/VIDEOID7",
        content: {
          title: "Writing Functions",
          paragraph: "Define and call functions to organize your code.",
          code: `int add(int x, int y){
    return x + y;
}
cout << add(5, 3);
<a href='#' class='exercise-link'>Functions Exercise</a>`
        }
      },
      {
        name: "Classes and Objects",
        url: "https://www.youtube.com/embed/VIDEOID8",
        content: {
          title: "Object-Oriented Programming",
          paragraph: "Learn how to create classes and objects in C++.",
          code: `class Person {
public:
    string name;
    int age;
};
Person p1;
p1.name = "Maria";
p1.age = 21;
<a href='#' class='exercise-link'>OOP Exercise</a>`
        }
      }
    ]
  }
];

// --- Helper ---
function getVideoId(url){ const match = url.match(/(?:v=|\/)([0-9A-Za-z_-]{11})/); return match?match[1]:null; }

// --- Populate Course Contents ---
const courseContents = document.getElementById("course-contents");
const explanation = document.querySelector(".explanation");

contents.forEach(section => {
  const div = document.createElement("div");
  div.classList.add("contents-section");

  const button = document.createElement("button");
  button.classList.add("toggle-btn");
  button.textContent = section.title;

  const list = document.createElement("ul");
  list.classList.add("lesson-list");

  section.lessons.forEach(lesson => {
    const li = document.createElement("li");
    const link = document.createElement("a");
    link.href = "#";
    link.classList.add("lesson-link");
    const span = document.createElement("span");
    span.textContent = lesson.name;
    link.appendChild(span);

    link.addEventListener("click", e => {
      e.preventDefault();
      const videoId = getVideoId(lesson.url);
      if(videoId) loadVideoSafe(videoId);

      document.querySelectorAll(".lesson-link").forEach(l => l.classList.remove("lesson-active"));
      link.classList.add("lesson-active");

      if(lesson.content){
        explanation.innerHTML = `
          <h2>${lesson.content.title}</h2>
          <p>${lesson.content.paragraph}</p>
          <h3>Example Code</h3>
          <div class="code-container"><pre>${lesson.content.code}</pre></div>
        `;
      }

      explanation.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });

    li.appendChild(link);
    list.appendChild(li);
  });

  button.addEventListener("click", () => { list.style.display = list.style.display==='block'?'none':'block'; });
  div.appendChild(button);
  div.appendChild(list);
  courseContents.appendChild(div);
});

// --- Responsive iframe ---
window.addEventListener("resize", () => {
  if(player?.getIframe){
    const iframe = player.getIframe();
    iframe.style.height = window.innerWidth < 600 ? "220px" : "420px";
  }
});
