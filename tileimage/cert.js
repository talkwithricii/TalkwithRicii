// === Certification List ===
const certifications = [
  { title: "AI Fundamentals", image: "ai.png", desc: "Introduction to Artificial Intelligence" },
  { title: "Advanced Programming", image: "advance.png", desc: "Deep dive into programming concepts" },
  { title: "Data Analysis", image: "analysis.png", desc: "Working with data and insights" },
  { title: "C++ Mastery", image: "cpp.png", desc: "Mastering the C++ language" },
  { title: "Java Developer", image: "java.png", desc: "Full Java backend fundamentals" },
  { title: "Machine Learning", image: "ML.png", desc: "ML algorithms and data models" },
  { title: "Backend Development", image: "back.png", desc: "Server-side web development" },
  { title: "C# Essentials", image: "SHARp.png", desc: "C# programming essentials" },
  { title: "ASP.NET Web", image: "netasp.png", desc: ".NET and ASP web development" },
  { title: "Razor Pages", image: "razorpages.png", desc: "Dynamic web applications" },
  { title: "Intro to Coding", image: "intro.png", desc: "Starting point for programming" },
  { title: "Building Tech Projects", image: "building.png", desc: "Project architecture and deployment" },
  { title: "Sad but Certified ", image: "sad.png", desc: "Proof of dedication" },
];

// === DOM Elements ===
const certContainer = document.getElementById("certContainer");
const modal = document.getElementById("certModal");
const modalImg = document.getElementById("modalImg");
const captionText = document.getElementById("caption");
const closeBtn = document.querySelector(".close");

// === Create Tiles ===
certifications.forEach(cert => {
  const card = document.createElement("div");
  card.classList.add("cert-card");
  card.innerHTML = `
    <img src="${cert.image}" alt="${cert.title}">
    <div class="cert-info">
      <h2>${cert.title}</h2>
      <p>${cert.desc}</p>
    </div>
  `;
  // Open Modal on Click
  card.addEventListener("click", () => {
    modal.style.display = "block";
    modalImg.src = cert.image;
    captionText.innerHTML = `<strong>${cert.title}</strong><br>${cert.desc}`;
  });
  certContainer.appendChild(card);
});

// === Close Modal ===
closeBtn.onclick = () => modal.style.display = "none";
window.onclick = (e) => { if (e.target === modal) modal.style.display = "none"; };
