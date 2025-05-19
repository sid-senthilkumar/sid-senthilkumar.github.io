import {
  bio,
  skills,
  education,
  experience,
  footer,
} from "./user-data/data.js";

import { URLs } from "./user-data/urls.js";

const { gitRepo } = URLs;

async function fetchBlogsFromMedium(url) {
  try {
    const response = await fetch(url);
    const { items } = await response.json();
    populateBlogs(items, "blogs");
  } catch (error) {
    throw new Error(
      `Error in fetching the blogs from Medium profile: ${error}`
    );
  }
}

async function fetchReposFromGit(url) {
  try {
    const response = await fetch(url);
    const items = await response.json();
    if (!items || !Array.isArray(items)) {
      console.error('Invalid response format from GitHub API');
      return;
    }
    populateRepo(items, "repos");
  } catch (error) {
    console.error(`Error in fetching the repos: ${error}`);
  }
}

function mapBasicResponse(basics) {
  if (!basics) return;
  
  const {
    name,
    label,
    image,
    email,
    phone,
    url,
    summary,
    profiles,
    headline,
    blog,
    yearsOfExperience,
    username,
    locationAsString,
    region,
    karma,
    id,
    followers,
    following,
    picture,
    website,
  } = basics;

  // Update title if name is available
  if (name) {
    document.title = name;
  }
}

function populateBio(items, id) {
  const bioTag = document.getElementById(id);
  items.forEach((bioItem) => {
    const p = getElement("p", null);
    p.innerHTML = bioItem;
    bioTag.append(p);
  });
}

// --- Skills rendering: supports category headings and easy extensibility ---
function populateSkills(items, id) {
  const skillsTag = document.getElementById(id);
  skillsTag.innerHTML = '';
  items.forEach((item) => {
    const card = getElement("div", "card-bounce skill-card");
    card.style.display = "flex";
    card.style.flexDirection = "column";
    card.style.alignItems = "center";
    const colonIdx = item.indexOf(":");
    if (colonIdx !== -1) {
      const heading = item.slice(0, colonIdx);
      const rest = item.slice(colonIdx + 1).trim();
      // Heading as centered h3, content below
      const h3 = document.createElement("h3");
      h3.className = "skill-heading";
      h3.textContent = heading;
      card.appendChild(h3);
      const content = document.createElement("div");
      content.className = "skill-content";
      content.textContent = rest;
      content.style.textAlign = "center";
      card.appendChild(content);
    } else {
      card.textContent = item;
    }
    skillsTag.append(card);
  });
}
// --- End skills rendering ---

function populateBlogs(items, id) {
  const projectdesign = document.getElementById(id);
  const count = 3; // Number of blogs to display

  for (let i = 0; i < count; i++) {
      // Create a wrapper for the blog card
      const blogCard = document.createElement("div");
      blogCard.className = "blog-card";
      blogCard.style = `
          display: flex;
          flex-direction: column;
          border-radius: 12px;
          padding: 16px;
          font-size: 14px;
          background: linear-gradient(135deg, rgb(255, 221, 153), rgb(249, 191, 63));
          box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
          min-height: 150px;
          cursor: pointer;
      `;

      // Wrap the card content in an anchor tag
      const blogLink = document.createElement("a");
      blogLink.href = items[i].link;
      blogLink.target = "_blank";
      blogLink.style = "text-decoration: none; color: black; display: block;";

      blogCard.appendChild(blogLink);

      // Blog Title
      const blogTitle = document.createElement("h4");
      blogTitle.className = "blog-heading";
      blogTitle.innerHTML = items[i].title;
      blogTitle.style = "margin: 0 0 8px; font-size: 18px; font-weight: bold;";
      blogLink.appendChild(blogTitle);

      // Publish Date
      const pubDateEle = document.createElement("p");
      pubDateEle.className = "publish-date";
      pubDateEle.innerHTML = getBlogDate(items[i].pubDate);
      pubDateEle.style = "margin: 0 0 12px; font-size: 12px; color: #555;";
      blogLink.appendChild(pubDateEle);

      // Blog Description
      const blogDescription = document.createElement("p");
      blogDescription.className = "blog-description";
      const html = items[i].content;
      const [, doc] = /<p>(.*?)<\/p>/g.exec(html) || [];
      blogDescription.innerHTML = doc;
      blogDescription.style = "margin: 0 0 12px; font-size: 12px; color: #000;";
      blogLink.appendChild(blogDescription);

      // Categories (Tags)
      const categoriesDiv = document.createElement("div");
      categoriesDiv.style = "display: flex; gap: 8px; margin-top: 12px;";

      for (const category of items[i].categories) {
          const badge = document.createElement("span");
          badge.className = "badge";
          badge.innerHTML = category;
          badge.style = `
              font-size: 12px;
              padding: 4px 8px;
              background-color: #007acc;
              color: white;
              border-radius: 4px;
          `;
          categoriesDiv.appendChild(badge);
      }

      blogLink.appendChild(categoriesDiv);

      // Append the blog card to the container
      projectdesign.appendChild(blogCard);
  }
}

function populateRepo(items, id) {
  const projectdesign = document.getElementById(id);
  const count = Math.min(4, items.length); // Adjust this count based on the number of repos you want to display

  // Set up a wrapper div to hold repo cards in rows of 2
  const rowWrapper = document.createElement("div");
  rowWrapper.style =
    "display: flex; flex-wrap: wrap; gap: 16px; justify-content: space-between;";
  projectdesign.appendChild(rowWrapper);

  for (let i = 0; i < count; i++) {
    // Create elements for each repo card
    const repoCard = document.createElement("div");
    repoCard.className = "repo-card card-bounce";
    repoCard.style = `
          flex: 1 0 48%;  /* Two cards in one row */
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          border-radius: 12px;
          padding: 16px;
          font-size: 14px;
          background: linear-gradient(135deg, #ffdd99, #f9bf3f);
          box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
          transition: transform 0.2s ease-in-out;
          cursor: pointer;
      `;

    // Make the card clickable by wrapping the content inside an anchor tag
    const repoLink = document.createElement("a");
    repoLink.href = items[i].html_url || `https://github.com/sid-senthilkumar/${items[i].name}`;
    repoLink.target = "_blank";
    repoLink.style =
      "text-decoration: none; color: black; display: block; height: 100%;";

    repoCard.appendChild(repoLink);

    // Repository name
    const repoName = document.createElement("h4");
    repoName.className = "repo-heading";
    repoName.innerHTML = items[i].name;
    repoName.style = "margin: 0; font-size: 18px; font-weight: bold;";
    repoLink.appendChild(repoName);

    // Repository description
    const repoDescription = document.createElement("p");
    repoDescription.className = "repo-description";
    repoDescription.innerHTML = items[i].description || "No description available";
    repoDescription.style = "margin-top: 8px; font-size: 12px; color: #555;";
    repoLink.appendChild(repoDescription);

    // Stats row (Language, Stars, Forks)
    const statsRow = document.createElement("div");
    statsRow.style = `
          display: flex; 
          align-items: center; 
          gap: 16px; 
          margin-top: 12px; 
          font-size: 12px; 
          color: #666;
      `;

    // Language
    if (items[i].language) {
      const languageDiv = document.createElement("div");
      languageDiv.style = "display: flex; align-items: center; gap: 4px;";
      languageDiv.innerHTML = `
          <span style="width: 8px; height: 8px; background-color: #666; border-radius: 50%; display: inline-block;"></span>
          ${items[i].language}
      `;
      statsRow.appendChild(languageDiv);
    }

    // Stars
    const starsDiv = document.createElement("div");
    starsDiv.style = "display: flex; align-items: center; gap: 4px;";
    starsDiv.innerHTML = `
          <img src="https://img.icons8.com/ios-filled/16/666666/star--v1.png" alt="Stars">
          ${items[i].stargazers_count || 0}
      `;
    statsRow.appendChild(starsDiv);

    // Forks
    const forksDiv = document.createElement("div");
    forksDiv.style = "display: flex; align-items: center; gap: 4px;";
    forksDiv.innerHTML = `
          <img src="https://img.icons8.com/ios-filled/16/666666/code-fork.png" alt="Forks">
          ${items[i].forks_count || 0}
      `;
    statsRow.appendChild(forksDiv);

    repoLink.appendChild(statsRow);

    // Add the repo card to the row wrapper
    rowWrapper.appendChild(repoCard);
  }
}

function populateExp_Edu(items, id) {
  let mainContainer = document.getElementById(id);
  mainContainer.innerHTML = '';
  for (let i = 0; i < items.length; i++) {
    let spanTimelineSublabel = document.createElement("span");
    spanTimelineSublabel.className = "timeline-sublabel";
    spanTimelineSublabel.innerHTML = items[i].subtitle;

    let spanh2 = document.createElement("span");
    spanh2.innerHTML = items[i].duration;

    let h2TimelineLabel = document.createElement("h2");
    h2TimelineLabel.innerHTML = items[i].title;
    h2TimelineLabel.append(spanh2);

    let divTimelineLabel = document.createElement("div");
    divTimelineLabel.className = "timeline-label card-bounce";
    divTimelineLabel.append(h2TimelineLabel);
    divTimelineLabel.append(spanTimelineSublabel);

    for (let j = 0; j < items[i].details.length; j++) {
      let pTimelineText = document.createElement("p");
      pTimelineText.className = "timeline-text";
      pTimelineText.innerHTML = "&blacksquare; " + items[i].details[j];
      divTimelineLabel.append(pTimelineText);
    }

    let divTags = document.createElement("div");
    for (let j = 0; j < items[i].tags.length; j++) {
      let spanTags = document.createElement("span");
      spanTags.className = "badge";
      spanTags.innerHTML = items[i].tags[j];
      divTags.append(spanTags);
    }
    divTimelineLabel.append(divTags);

    let iFa = document.createElement("i");
    iFa.className = "fa fa-" + items[i].icon;

    let divTimelineIcon = document.createElement("div");
    divTimelineIcon.className = "timeline-icon color-2";
    divTimelineIcon.append(iFa);

    let divTimelineEntryInner = document.createElement("div");
    divTimelineEntryInner.className = "timeline-entry-inner";
    divTimelineEntryInner.append(divTimelineIcon);
    divTimelineEntryInner.append(divTimelineLabel);

    let article = document.createElement("article");
    article.className = "timeline-entry animate-box";
    article.append(divTimelineEntryInner);

    mainContainer.append(article);
  }
}

function populateLinks(items, id) {
  let footer = document.getElementById(id);

  items.forEach(function (item) {
    if (item.label !== "copyright-text") {
      let span = document.createElement("span");
      span.className = "col";

      let p = document.createElement("p");
      p.className = "col-title";
      p.innerHTML = item.label;
      span.append(p);

      let nav = document.createElement("nav");
      nav.className = "col-list";

      let ul = document.createElement("ul");
      item.data.forEach(function (data) {
        let li = document.createElement("li");
        let a = document.createElement("a");
        if (data.link) {
          a.href = data.link;
          a.target = "_blank";
        }
        if (data.func) {
          a.setAttribute("onclick", data.func);
        }
        a.innerHTML = data.text;

        li.append(a);
        ul.append(li);
      });
      nav.append(ul);
      span.append(nav);
      footer.append(span);
    }

    if (item.label === "copyright-text") {
      let div = document.createElement("div");
      div.className = "copyright-text no-print";
      item.data.forEach(function (copyright) {
        let p = document.createElement("p");
        p.innerHTML = copyright;
        div.append(p);
      });
      footer.append(div);
    }
  });
}

function getElement(tagName, className) {
  let item = document.createElement(tagName);
  item.className = className;
  return item;
}

function getBlogDate(publishDate) {
  const elapsed = Date.now() - Date.parse(publishDate);

  // Time conversions in milliseconds
  const msPerSecond = 1000;
  const msPerMinute = msPerSecond * 60;
  const msPerHour = msPerMinute * 60;
  const msPerDay = msPerHour * 24;
  const msPerMonth = msPerDay * 30;
  const msPerYear = msPerDay * 365;

  if (elapsed < msPerMinute) {
    const seconds = Math.floor(elapsed / msPerSecond);
    return `${seconds} seconds ago`;
  } else if (elapsed < msPerHour) {
    const minutes = Math.floor(elapsed / msPerMinute);
    return `${minutes} minutes ago`;
  } else if (elapsed < msPerDay) {
    const hours = Math.floor(elapsed / msPerHour);
    return `${hours} hours ago`;
  } else if (elapsed < msPerMonth) {
    const days = Math.floor(elapsed / msPerDay);
    return days == 1 ? `${days} day ago` : `${days} days ago`;
  } else if (elapsed < msPerYear) {
    const months = Math.floor(elapsed / msPerMonth);
    return months == 1 ? `${months} month ago` : `${months} months ago`;
  } else {
    const years = Math.floor(elapsed / msPerYear);
    return years == 1 ? `${years} year ago` : `${years} years ago`;
  }
}

// Initialize the page
window.addEventListener("load", async () => {
  try {
    console.log("Page loaded, starting initialization...");
    console.log("Bio data:", bio);
    console.log("Skills data:", skills);
    console.log("Experience data:", experience);
    console.log("Education data:", education);
    
    // Populate bio
    console.log("Populating bio...");
    populateBio(bio, "bio");
    
    // Populate skills
    console.log("Populating skills...");
    populateSkills(skills, "skills");
    
    // Populate experience
    console.log("Populating experience...");
    populateExp_Edu(experience, "experience");
    
    // Populate education
    console.log("Populating education...");
    populateExp_Edu(education, "education");
    
    // Populate footer
    console.log("Populating footer...");
    populateLinks(footer, "footer");
    
    // Fetch GitHub data
    console.log("Fetching GitHub data...");
    await fetchReposFromGit(gitRepo);
    
    console.log("Initialization complete!");
  } catch (error) {
    console.error("Error initializing page:", error);
  }
});
