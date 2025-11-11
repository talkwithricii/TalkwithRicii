const tabs = document.querySelectorAll('.tab-button');
const containers = document.querySelectorAll('.category-container');
const searchInput = document.getElementById('searchInput');
const noResults = document.getElementById('noResults');

// Tab switching
tabs.forEach(btn => {
  btn.addEventListener('click', () => {
    tabs.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    const target = btn.dataset.target;
    containers.forEach(c => c.classList.remove('active'));
    document.getElementById(target).classList.add('active');
    searchInput.value = "";
    filterTopics("");
  });
});

// Search filtering
searchInput.addEventListener('input', e => {
  filterTopics(e.target.value.toLowerCase());
});

function filterTopics(query) {
  const visibleContainer = document.querySelector('.category-container.active');
  const tiles = visibleContainer.querySelectorAll('.topic-tile');
  let visibleCount = 0;

  tiles.forEach(tile => {
    const text = tile.innerText.toLowerCase();
    if (text.includes(query)) {
      tile.style.display = "block";
      visibleCount++;
    } else {
      tile.style.display = "none";
    }
  });

  noResults.classList.toggle('hidden', visibleCount > 0);
}
