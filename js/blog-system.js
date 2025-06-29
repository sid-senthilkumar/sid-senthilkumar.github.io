import { blogPosts, threadConnections } from "../user-data/blog-data.js";

class BlogSystem {
  constructor() {
    this.currentThread = "mega-thread";
    this.currentPostIndex = 0;
    this.autoScrollInterval = null;
    this.isAutoScrolling = false;
    this.scrollSpeed = 4000; // 4 seconds per post
    this.hoverTimeout = null;
    this.parallelThreadContainer = null;
  }

  init() {
    this.createBlogContainer();
    this.renderThread(this.currentThread);
    this.setupEventListeners();
    this.startAutoScroll();
  }

  createBlogContainer() {
    const mainContent = document.getElementById("colorlib-main");

    // Create blog section
    const blogSection = document.createElement("section");
    blogSection.className = "colorlib-blog blog-system-section";
    blogSection.setAttribute("data-section", "blog");
    blogSection.innerHTML = `
      <div class="colorlib-narrow-content">
        <div class="row animate-box" data-animate-effect="fadeInLeft">
          <div class="about-desc">
            <h1>Blog <span style="color: #f9bf3f">Threads</span></h1>
            <p>Tweet-style posts in interconnected threads. Hover over linked posts to explore parallel conversations.</p>
          </div>
        </div>
        <div class="blog-system-container">
          <div class="thread-selector">
            <select id="thread-dropdown" class="thread-dropdown">
              <option value="mega-thread">🧵 The Mega Thread</option>
              <option value="ai-genomics">🧬 AI in Genomics</option>
              <option value="career-journey">💼 Career Reflections</option>
              <option value="protein-folding">🔬 Protein Folding & AI</option>
              <option value="learning-systems">📚 Learning & Knowledge Systems</option>
              <option value="ux-design">🎨 UX for Science</option>
            </select>
          </div>
          <div class="thread-controls">
            <button id="prev-post" class="control-btn">⬅️ Previous</button>
            <button id="auto-scroll-toggle" class="control-btn auto-scroll-active">⏸️ Auto-scroll</button>
            <button id="next-post" class="control-btn">Next ➡️</button>
          </div>
          <div class="main-thread-container">
            <div id="current-thread" class="thread-display"></div>
          </div>
          <div id="parallel-thread" class="parallel-thread hidden"></div>
          <div class="thread-connections">
            <h3>Connected Threads</h3>
            <div id="connected-threads" class="connected-threads-list"></div>
          </div>
        </div>
      </div>
    `;

    // Insert before the footer section
    const footerSection =
      document.querySelector(".colorlib-footer").parentElement;
    footerSection.parentNode.insertBefore(blogSection, footerSection);
  }

  renderThread(threadId, highlightPostId = null) {
    const thread = blogPosts[threadId];
    if (!thread) return;

    const container = document.getElementById("current-thread");
    container.innerHTML = "";

    // Thread header
    const header = document.createElement("div");
    header.className = "thread-header";
    header.innerHTML = `
      <h2>${thread.title}</h2>
      <div class="thread-progress">
        <span class="current-post">${this.currentPostIndex + 1}</span> /
        <span class="total-posts">${thread.posts.length}</span>
      </div>
    `;
    container.appendChild(header);

    // Posts container
    const postsContainer = document.createElement("div");
    postsContainer.className = "posts-container";
    container.appendChild(postsContainer);

    thread.posts.forEach((post, index) => {
      const postElement = this.createPostElement(post, index, highlightPostId);
      postsContainer.appendChild(postElement);
    });

    this.renderConnectedThreads(threadId);
    this.updateVisiblePost();
  }

  createPostElement(post, index, highlightPostId = null) {
    const postDiv = document.createElement("div");
    postDiv.className = `blog-post ${index === this.currentPostIndex ? "active" : ""}`;
    if (post.id === highlightPostId) {
      postDiv.classList.add("highlighted");
    }
    postDiv.setAttribute("data-post-id", post.id);
    postDiv.setAttribute("data-index", index);

    const formattedDate = this.formatTimestamp(post.timestamp);
    const linkedPostsHtml = post.linkedPosts
      ? post.linkedPosts
          .map(
            (linkedId) =>
              `<span class="linked-post" data-linked-post="${linkedId}">@${linkedId}</span>`,
          )
          .join(" ")
      : "";

    postDiv.innerHTML = `
      <div class="post-content">
        <div class="post-text">${post.content}</div>
        ${linkedPostsHtml ? `<div class="linked-posts">${linkedPostsHtml}</div>` : ""}
        <div class="post-footer">
          <div class="post-meta">
            <span class="timestamp">${formattedDate}</span>
            <div class="tags">
              ${post.tags.map((tag) => `<span class="tag">#${tag}</span>`).join("")}
            </div>
          </div>
          <div class="post-reactions">
            <span class="reaction">❤️ ${post.reactions.likes}</span>
            <span class="reaction">🔄 ${post.reactions.retweets}</span>
            <span class="reaction">💬 ${post.reactions.comments}</span>
          </div>
        </div>
      </div>
    `;

    return postDiv;
  }

  renderConnectedThreads(currentThreadId) {
    const container = document.getElementById("connected-threads");
    container.innerHTML = "";

    const connections = threadConnections[currentThreadId] || [];
    connections.forEach((threadId) => {
      if (threadId !== currentThreadId) {
        const thread = blogPosts[threadId];
        const threadCard = document.createElement("div");
        threadCard.className = "connected-thread-card";
        threadCard.setAttribute("data-thread-id", threadId);
        threadCard.innerHTML = `
          <h4>${thread.title}</h4>
          <p>${thread.posts[0].content.substring(0, 100)}...</p>
          <span class="post-count">${thread.posts.length} posts</span>
        `;
        container.appendChild(threadCard);
      }
    });
  }

  setupEventListeners() {
    // Thread selection
    document
      .getElementById("thread-dropdown")
      .addEventListener("change", (e) => {
        this.switchThread(e.target.value);
      });

    // Navigation controls
    document.getElementById("prev-post").addEventListener("click", () => {
      this.navigatePost(-1);
    });

    document.getElementById("next-post").addEventListener("click", () => {
      this.navigatePost(1);
    });

    document
      .getElementById("auto-scroll-toggle")
      .addEventListener("click", () => {
        this.toggleAutoScroll();
      });

    // Connected thread navigation
    document.addEventListener("click", (e) => {
      if (e.target.closest(".connected-thread-card")) {
        const threadId = e.target
          .closest(".connected-thread-card")
          .getAttribute("data-thread-id");
        this.switchThread(threadId);
      }
    });

    // Linked post hover and click
    document.addEventListener(
      "mouseenter",
      (e) => {
        if (e.target.classList.contains("linked-post")) {
          this.showParallelThread(e.target.getAttribute("data-linked-post"));
        }
      },
      true,
    );

    document.addEventListener(
      "mouseleave",
      (e) => {
        if (e.target.classList.contains("linked-post")) {
          this.hideParallelThread();
        }
      },
      true,
    );

    document.addEventListener("click", (e) => {
      if (e.target.classList.contains("linked-post")) {
        const linkedPostId = e.target.getAttribute("data-linked-post");
        this.jumpToLinkedPost(linkedPostId);
      }
    });

    // Keyboard navigation
    document.addEventListener("keydown", (e) => {
      if (e.key === "ArrowLeft") {
        this.navigatePost(-1);
      } else if (e.key === "ArrowRight") {
        this.navigatePost(1);
      } else if (e.key === " ") {
        e.preventDefault();
        this.toggleAutoScroll();
      }
    });
  }

  showParallelThread(linkedPostId) {
    clearTimeout(this.hoverTimeout);

    this.hoverTimeout = setTimeout(() => {
      // Find which thread contains this post
      let targetThread = null;
      let targetPost = null;

      Object.values(blogPosts).forEach((thread) => {
        thread.posts.forEach((post) => {
          if (post.id === linkedPostId) {
            targetThread = thread;
            targetPost = post;
          }
        });
      });

      if (targetThread && targetPost) {
        const parallelContainer = document.getElementById("parallel-thread");
        parallelContainer.innerHTML = "";
        parallelContainer.classList.remove("hidden");

        const header = document.createElement("div");
        header.className = "parallel-thread-header";
        header.innerHTML = `
          <h3>Referenced in: ${targetThread.title}</h3>
          <button class="close-parallel">×</button>
        `;
        parallelContainer.appendChild(header);

        const postElement = this.createPostElement(targetPost, 0, linkedPostId);
        postElement.classList.add("parallel-post");
        parallelContainer.appendChild(postElement);

        // Close button
        header
          .querySelector(".close-parallel")
          .addEventListener("click", () => {
            this.hideParallelThread();
          });
      }
    }, 500); // 500ms delay before showing
  }

  hideParallelThread() {
    clearTimeout(this.hoverTimeout);
    const parallelContainer = document.getElementById("parallel-thread");
    parallelContainer.classList.add("hidden");
  }

  jumpToLinkedPost(linkedPostId) {
    // Find which thread contains this post
    Object.entries(blogPosts).forEach(([threadId, thread]) => {
      thread.posts.forEach((post, index) => {
        if (post.id === linkedPostId) {
          this.switchThread(threadId, index);
        }
      });
    });
  }

  switchThread(threadId, postIndex = 0) {
    this.pauseAutoScroll();
    this.currentThread = threadId;
    this.currentPostIndex = postIndex;
    document.getElementById("thread-dropdown").value = threadId;
    this.renderThread(threadId);
    this.startAutoScroll();
  }

  navigatePost(direction) {
    const thread = blogPosts[this.currentThread];
    const newIndex = this.currentPostIndex + direction;

    if (newIndex >= 0 && newIndex < thread.posts.length) {
      this.currentPostIndex = newIndex;
      this.updateVisiblePost();
    }
  }

  updateVisiblePost() {
    const posts = document.querySelectorAll(".blog-post");
    posts.forEach((post, index) => {
      post.classList.toggle("active", index === this.currentPostIndex);
    });

    // Update progress
    const currentSpan = document.querySelector(".current-post");
    if (currentSpan) {
      currentSpan.textContent = this.currentPostIndex + 1;
    }
  }

  startAutoScroll() {
    if (this.isAutoScrolling) return;

    this.isAutoScrolling = true;
    this.autoScrollInterval = setInterval(() => {
      const thread = blogPosts[this.currentThread];
      if (this.currentPostIndex < thread.posts.length - 1) {
        this.navigatePost(1);
      } else {
        // Loop back to start
        this.currentPostIndex = 0;
        this.updateVisiblePost();
      }
    }, this.scrollSpeed);

    document.getElementById("auto-scroll-toggle").innerHTML = "⏸️ Auto-scroll";
    document
      .getElementById("auto-scroll-toggle")
      .classList.add("auto-scroll-active");
  }

  pauseAutoScroll() {
    this.isAutoScrolling = false;
    if (this.autoScrollInterval) {
      clearInterval(this.autoScrollInterval);
      this.autoScrollInterval = null;
    }

    document.getElementById("auto-scroll-toggle").innerHTML = "▶️ Auto-scroll";
    document
      .getElementById("auto-scroll-toggle")
      .classList.remove("auto-scroll-active");
  }

  toggleAutoScroll() {
    if (this.isAutoScrolling) {
      this.pauseAutoScroll();
    } else {
      this.startAutoScroll();
    }
  }

  formatTimestamp(timestamp) {
    const date = new Date(timestamp);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  }
}

// Initialize blog system when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  window.blogSystem = new BlogSystem();
});

// Export for potential external use
export default BlogSystem;
