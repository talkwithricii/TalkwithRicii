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
    title: "1. Getting Started with C++",
    lessons: [
      {
        name: "Installing C++ Compiler",
        url: "https://www.youtube.com/embed/VIDEOID1",
        content: {
          title: "Setup C++ Environment",
          paragraph: "Learn to install a C++ compiler and IDE (Code::Blocks, Visual Studio, or VS Code).",
          code: "// No code for installation\n<a href='#' class='exercise-link'>Setup Exercise</a>"
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
  title: "4. 2D Arrays",
  lessons: [
    { 
      name: "Declaring and Printing a 2D Array", 
      url: "https://youtu.be/bxDVW0kUryA?si=ajwBWrfQIv4CwIbh", 
      content: { 
        title: "Declaring and Printing a 2D Array", 
        paragraph: "Problem: Create a 2D array (matrix) with 2 rows and 3 columns. Initialize it with numbers and print all elements in a grid format using nested loops.", 
        code: `#include <iostream>
using namespace std;

int main() {
    int matrix[2][3] = {
        {1, 2, 3},
        {4, 5, 6}
    };

    // Printing the 2D array
    for (int i = 0; i < 2; i++) {            // rows
        for (int j = 0; j < 3; j++) {        // columns
            cout << matrix[i][j] << " ";
        }
        cout << endl;
    }

    return 0;
}
<a href='#' class='exercise-link'>2D Array Exercise</a>`
      } 
    },

   { 
  name: "User Input for 2D Array", 
  url: "https://youtu.be/ez30uPuhIeA?si=t6Afsan1TAyYzOjQ", 
  content: { 
    title: "User Input for 2D Array", 
    paragraph: "Problem: Write a program that allows the user to input values into a 2x3 2D array. After entering all elements, display the array in grid form.", 
    code: `#include <iostream>
using namespace std;

int main() {
    int scores[2][3];

    cout << "Enter 6 numbers:\\n";  
    for (int i = 0; i < 2; i++) {
        for (int j = 0; j < 3; j++) {
            cout << "Enter value for row " << i << ", col " << j << ": ";
            cin >> scores[i][j];
        }
    }

    cout << "\\nYou entered:\\n";
    for (int i = 0; i < 2; i++) {
        for (int j = 0; j < 3; j++) {
            cout << scores[i][j] << " ";
        }
        cout << endl;
    }

    return 0;
}` 
  } 
},

  { 
  name: "Summing All Elements", 
  url: "https://youtu.be/vJWyfMziglg?si=Oy05qlDqSY6UsEVs", 
  content: { 
    title: "Summing All Elements", 
    paragraph: "Problem: Given a 2D array of integers, calculate and display the total sum of all its elements using nested loops.", 
    code: `#include <iostream>
using namespace std;

int main() {
    int arr[2][3] = {
        {5, 10, 15},
        {20, 25, 30}
    };
    int sum = 0;

    for (int i = 0; i < 2; i++) {
        for (int j = 0; j < 3; j++) {
            sum += arr[i][j];
        }
    }

    cout << "Total sum = " << sum << endl;
    return 0;
}` 
  } 
},

{ 
  name: "Cinema Seat Ratings", 
  url: "https://youtu.be/your-video-link", 
  content: { 
    title: "Cinema Seat Ratings", 
    paragraph: "Problem: A cinema has a small theater with 3 rows and 4 seats per row. Each value in a 2D array represents the audience rating (1–10) for that seat. The program should display the ratings in a table, calculate the average rating per row, and find the highest rating overall.", 
    code: `#include <iostream>
using namespace std;

int main() {
    int ratings[3][4] = {
        {8, 7, 9, 6},
        {5, 9, 7, 8},
        {6, 6, 8, 9}
    };

    cout << "Cinema Ratings:\\n";
    int highest = 0;

    for (int i = 0; i < 3; i++) {   // rows
        int sum = 0;

        for (int j = 0; j < 4; j++) {   // columns
            cout << ratings[i][j] << " ";
            sum += ratings[i][j];

            if (ratings[i][j] > highest)
                highest = ratings[i][j];
        }
        cout << endl;
        double avg = (double)sum / 4;
        cout << "Average rating for Row " << i + 1 << ": " << avg << endl;
    }

    cout << "Highest single rating: " << highest << endl;

    return 0;
}`,

    visualization: `
<table border="1" style="border-collapse: collapse; text-align:center;">
  <tr>
    <th>Row</th><th>Seat 1</th><th>Seat 2</th><th>Seat 3</th><th>Seat 4</th><th>Row Average</th>
  </tr>
  <tr>
    <td>1</td><td>8</td><td>7</td><td>9</td><td>6</td><td>7.5</td>
  </tr>
  <tr>
    <td>2</td><td>5</td><td>9</td><td>7</td><td>8</td><td>7.25</td>
  </tr>
  <tr>
    <td>3</td><td>6</td><td>6</td><td>8</td><td>9</td><td>7.25</td>
  </tr>
</table>

<p><b>Highest rating = 9</b></p>
` 
  } 
},

{ 
  name: "Ticket Price Table", 
  url: "https://youtu.be/your-video-link", 
  content: { 
    title: "Ticket Price Table", 
    paragraph: "Problem: SM Cinema sells tickets with different prices based on seat type: Regular = ₱300, VIP = ₱500, Balcony = ₱700. Use a 3x3 2D array to store seat types. Ask the user to input seat types (R, V, B) and calculate total sales. Display the seat table and the total sales amount.", 
    code: `#include <iostream>
using namespace std;

int main() {
    const int ROWS = 3;
    const int COLS = 3;
    char seats[ROWS][COLS];
    int totalSales = 0;

    // Ticket prices
    const int PRICE_REGULAR = 300;
    const int PRICE_VIP = 500;
    const int PRICE_BALCONY = 700;

    // Input seat types
    cout << "Enter seat types (R=Regular, V=VIP, B=Balcony) for 3x3 grid:\\n";
    for (int i = 0; i < ROWS; i++) {
        for (int j = 0; j < COLS; j++) {
            cout << "Seat [" << i+1 << "][" << j+1 << "]: ";
            cin >> seats[i][j];

            // Convert lowercase input to uppercase
            if (seats[i][j] >= 'a' && seats[i][j] <= 'z')
                seats[i][j] = seats[i][j] - 'a' + 'A';

            // Add ticket price to total sales
            if (seats[i][j] == 'R')
                totalSales += PRICE_REGULAR;
            else if (seats[i][j] == 'V')
                totalSales += PRICE_VIP;
            else if (seats[i][j] == 'B')
                totalSales += PRICE_BALCONY;
            else {
                cout << "Invalid seat type! Counting as 0.\\n";
            }
        }
    }

    // Display seat table
    cout << "\\nTicket Price Table:\\n";
    for (int i = 0; i < ROWS; i++) {
        for (int j = 0; j < COLS; j++) {
            cout << seats[i][j] << "\\t";
        }
        cout << endl;
    }

    cout << "\\nTotal Sales: ₱" << totalSales << endl;

    return 0;
}` 
  } 
},

{ 
  name: "Cinema Seat Reservation System", 
  url: "https://youtu.be/your-video-link", 
  content: { 
    title: "Cinema Seat Reservation System", 
    paragraph: "Problem: Implement a simple seat reservation system for a 5x5 cinema. Each seat is represented by 0 (empty) or 1 (taken). Allow the user to select a seat by row and column, mark it as taken, and display the updated seating chart.", 
    code: `#include <iostream>
using namespace std;

int main() {
    const int ROWS = 5;
    const int COLS = 5;
    int seats[ROWS][COLS] = {0}; // 0 = empty, 1 = taken

    int row, col;

    cout << "Current Seating Chart (0 = empty, 1 = taken):\\n";
    for (int i = 0; i < ROWS; i++) {
        for (int j = 0; j < COLS; j++) {
            cout << seats[i][j] << " ";
        }
        cout << endl;
    }

    // Ask user for seat to book
    cout << "\\nEnter the row (1-5) of the seat you want to book: ";
    cin >> row;
    cout << "Enter the column (1-5) of the seat you want to book: ";
    cin >> col;

    // Check if input is valid
    if (row < 1 || row > ROWS || col < 1 || col > COLS) {
        cout << "Invalid seat number!\\n";
        return 1;
    }

    // Check if seat is already taken
    if (seats[row-1][col-1] == 1) {
        cout << "Sorry, that seat is already taken.\\n";
    } else {
        seats[row-1][col-1] = 1; // mark as taken
        cout << "Seat booked successfully!\\n";
    }

    // Display updated seating chart
    cout << "\\nUpdated Seating Chart:\\n";
    for (int i = 0; i < ROWS; i++) {
        for (int j = 0; j < COLS; j++) {
            cout << seats[i][j] << " ";
        }
        cout << endl;
    }

    return 0;
}` 
  } 
},


{ 
//  name: "Movie Seat Reservation System", 
  url: "https://youtu.be/your-video-link", 
  content: { 
    title: "Movie Seat Reservation System", 
    paragraph: "Problem: Manage seat reservations for three movies ('Avengers', 'Inception', 'Titanic'), each with three showtimes. Use a 2D array to store the number of available seats per showtime. Display all movies with seat availability, let the user select a movie and timeslot, decrement the seat count if available, and show the updated seat chart.", 
    code: `#include <iostream>
#include <string>
using namespace std;

int main() {
    int movies = 3;        // number of movies
    int timeslots = 3;     // number of showtimes
    int maxSeats = 5;      // seats per showtime

    // Movie names
    string movieNames[] = {"Avengers", "Inception", "Titanic"};

    // 2D array: seats[movie][timeslot], initially all seats available
    int seats[3][3];
    for (int i = 0; i < movies; i++) {
        for (int j = 0; j < timeslots; j++) {
            seats[i][j] = maxSeats;
        }
    }

    int choiceMovie, choiceTime;

    // Display movies and timeslots
    cout << "Movies and Available Seats:\\n";
    for (int i = 0; i < movies; i++) {
        cout << i+1 << ". " << movieNames[i] << ": ";
        for (int j = 0; j < timeslots; j++) {
            cout << "Slot " << j+1 << " [" << seats[i][j] << "]  ";
        }
        cout << endl;
    }

    // Ask user to choose movie and timeslot
    cout << "\\nChoose a movie (1-" << movies << "): ";
    cin >> choiceMovie;
    choiceMovie--; // adjust for 0-indexed array

    cout << "Choose a timeslot (1-" << timeslots << "): ";
    cin >> choiceTime;
    choiceTime--; // adjust for 0-indexed array

    // Reserve a seat if available
    if (seats[choiceMovie][choiceTime] > 0) {
        seats[choiceMovie][choiceTime]--;
        cout << "Seat reserved successfully!\\n";
    } else {
        cout << "Sorry, no seats available for this showtime.\\n";
    }

    // Print updated seat chart
    cout << "\\nUpdated Movie Seats:\\n";
    for (int i = 0; i < movies; i++) {
        cout << i+1 << ". " << movieNames[i] << ": ";
        for (int j = 0; j < timeslots; j++) {
            cout << "Slot " << j+1 << " [" << seats[i][j] << "]  ";
        }
        cout << endl;
    }

    return 0;
}` 
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
