class VideoGrid {
  constructor() {
    this.videoData = [
      {
        title: "Funny Clip",
        category: "funny",
        embedCode: `<iframe src="https://short.icu/o0NhhPW6b" loading="lazy" allowfullscreen></iframe>`,
      },
      {
        title: "Anime Battle",
        category: "anime",
        embedCode: `<iframe src="https://short.icu/hbp8rxgHS" loading="lazy" allowfullscreen></iframe>`,
      },
      {
        title: "Entertainment Show",
        category: "entertainment",
        embedCode: `<iframe src="https://hqq.ac/e/MkticXNHZng4TzRFaVQ3U3FXdjYzQT09" height="450" width="720" webkitAllowFullScreen mozallowfullscreen allowfullscreen frameborder="0" scrolling="no"></iframe>`,
      },
      {
        title: "Short Series",
        category: "short series",
        embedCode: `<iframe src="https://short.icu/34PgkYOqh" loading="lazy" allowfullscreen></iframe>`,
      },
    ];

    this.grid = document.getElementById("videoGrid");
    this.searchInput = document.getElementById("videoSearch");
    this.categoryButtons = document.querySelectorAll(".category-btn");
    this.currentCategory = "all";
    this.visibleVideos = 2;

    this.initializeEventListeners();
    this.loadVideos();
  }

  initializeEventListeners() {
    this.searchInput.addEventListener("input", () => this.loadVideos());
    this.categoryButtons.forEach((btn) => {
      btn.addEventListener("click", (e) => this.handleCategoryFilter(e));
    });
    window.addEventListener("scroll", () => {
      if (
        window.innerHeight + window.scrollY >=
        document.body.offsetHeight - 200
      ) {
        this.loadMoreVideos();
      }
    });
  }

  createVideoCard(video) {
    const card = document.createElement("div");
    card.className = "video-card";
    card.innerHTML = `
        <div class="video-thumbnail">${video.embedCode}</div>
        <div class="video-info">
          <h3 class="video-title">${video.title}</h3>
        </div>
      `;
    return card;
  }

  loadVideos() {
    const query = this.searchInput.value.toLowerCase();
    const filteredVideos = this.videoData.filter(
      (video) =>
        (this.currentCategory === "all" ||
          video.category === this.currentCategory) &&
        video.title.toLowerCase().includes(query)
    );

    this.grid.innerHTML = "";
    filteredVideos.slice(0, this.visibleVideos).forEach((video) => {
      this.grid.appendChild(this.createVideoCard(video));
    });
  }

  loadMoreVideos() {
    this.visibleVideos += 2;
    this.loadVideos();
  }

  handleCategoryFilter(e) {
    this.categoryButtons.forEach((btn) => btn.classList.remove("active"));
    e.target.classList.add("active");
    this.currentCategory = e.target.dataset.category;
    this.visibleVideos = 2;
    this.loadVideos();
  }
}

document.addEventListener("DOMContentLoaded", () => new VideoGrid());
