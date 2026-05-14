const seedArticles = [
  {
    title: "Why Knowledge Catalogs Matter for AI Readiness",
    topic: "AI Readiness",
    excerpt:
      "A practical look at why discoverable, governed knowledge becomes a foundation for teams preparing to use AI well.",
    date: "Medium",
    readTime: "5 min read",
    url: "https://medium.com/@sakshisaxena241097/why-knowledge-catalogs-matter-for-ai-readiness-b7bdcb313b6f",
    body:
      "This article frames knowledge catalogs as more than documentation. They help teams make enterprise knowledge searchable, governed, and reusable, which becomes especially important when AI systems need trusted context."
  },
  {
    title: "The Data Engineering Journey — Phase 1: Rethinking Data Ingestion in the ELT Era",
    topic: "Data Engineering",
    excerpt:
      "A cloud-native, ELT-first view of ingestion patterns, schema evolution, observability, and resilient data acquisition.",
    date: "Apr 11, 2025",
    readTime: "6 min read",
    url: "https://medium.com/@sakshisaxena241097/the-data-engineering-journey-phase-1-rethinking-data-ingestion-in-the-elt-era-9565430afd30",
    body:
      "The article explores data ingestion as a strategic design surface rather than a preprocessing step, covering ELT architecture, batch and streaming modes, schema drift, quality checks, and failure isolation."
  },
  {
    title: "Building a Streaming Data Pipeline with Apache Spark and Apache Cassandra",
    topic: "Streaming",
    excerpt:
      "A walkthrough of a streaming pipeline using Spark, Cassandra, Kafka, Docker, Airflow, Python, and supporting JARs.",
    date: "Jun 20, 2024",
    readTime: "6 min read",
    url: "https://medium.com/@sakshisaxena241097/building-a-streaming-data-pipeline-with-apache-spark-and-apache-cassandra-d98a8874fdf0",
    body:
      "This project article walks through the technical stack and setup for a streaming data pipeline, including containerized services, Cassandra setup, Airflow orchestration, and Spark-based processing from Kafka into Cassandra."
  }
];

const themeKey = "sakshi-portfolio-theme";
const state = {
  topic: "All",
  search: "",
  articles: []
};

const articleGrid = document.querySelector("[data-articles]");
const featured = document.querySelector("[data-featured]");
const searchInput = document.querySelector("[data-search]");
const tabs = document.querySelectorAll("[data-topic]");
const reader = document.querySelector("[data-reader]");
const readerClose = document.querySelector("[data-reader-close]");
const aboutTabs = document.querySelectorAll("[data-about-tab]");
const aboutPanel = document.querySelector("[data-about-panel]");
const topicJumps = document.querySelectorAll("[data-topic-jump]");
const pipelineNodes = document.querySelectorAll("[data-node]");
const nodeDetail = document.querySelector("[data-node-detail]");
const stackTabs = document.querySelectorAll("[data-stack]");
const stackPanel = document.querySelector("[data-stack-panel]");
const counters = document.querySelectorAll("[data-count]");
const topologyCanvas = document.querySelector("[data-topology]");
const commandPalette = document.querySelector("[data-command-palette]");
const commandOpen = document.querySelector("[data-command-open]");
const commandClose = document.querySelector("[data-command-close]");
const commandTargets = document.querySelectorAll("[data-command-target]");
const readinessChips = document.querySelectorAll("[data-readiness]");
const readinessDetail = document.querySelector("[data-readiness-detail]");
const quoteTicker = document.querySelector("[data-quote-ticker]");
let topologyFrameId;

const aboutContent = {
  build: {
    title: "Cloud-native data platforms",
    body:
      "I like the architecture layer where ingestion, orchestration, metadata, quality, and governance have to work together before AI can be genuinely useful."
  },
  explain: {
    title: "Technical clarity for complex systems",
    body:
      "I break down data engineering, AI readiness, and streaming systems so architecture choices feel concrete, practical, and easier to evaluate."
  },
  explore: {
    title: "The bridge between data and AI",
    body:
      "I am especially curious about how teams prepare their knowledge, pipelines, and operating models so AI tools can be grounded in trusted context."
  }
};

const pipelineContent = {
  ingest: {
    title: "Ingest with reliability",
    body: "Design ingestion around schema contracts, replayability, source isolation, and clear failure handling.",
    tags: ["schema drift", "observability", "backfills"]
  },
  process: {
    title: "Transform with intent",
    body: "Use Spark, PySpark, and ELT patterns to keep transformation logic testable, modular, and cost-aware.",
    tags: ["PySpark", "ELT", "orchestration"]
  },
  store: {
    title: "Store for scale and access",
    body: "Choose storage models around query patterns, latency needs, governance boundaries, and downstream consumers.",
    tags: ["BigQuery", "Cassandra", "lakehouse"]
  },
  govern: {
    title: "Govern the context layer",
    body: "Make metadata, lineage, quality checks, and policy controls visible enough for humans and AI systems to trust.",
    tags: ["lineage", "quality", "metadata"]
  },
  serve: {
    title: "Serve useful data products",
    body: "Turn architecture into dashboards, applications, AI context, and decision surfaces that teams can use repeatedly.",
    tags: ["BI", "semantic layer", "AI context"]
  }
};

const stackContent = {
  programming: {
    path: "~/portfolio/skills/programming",
    title: "Python · PySpark · SQL · Java",
    body: "Core languages for pipeline logic, transformations, services, and analytical problem solving.",
    level: 88
  },
  systems: {
    path: "~/portfolio/skills/data-systems",
    title: "Spark · Kafka · Cassandra · BigQuery",
    body: "Distributed processing, streaming foundations, wide-column storage, and analytical warehouse patterns.",
    level: 86
  },
  cloud: {
    path: "~/portfolio/skills/cloud-devops",
    title: "GCP · AWS · Azure · Docker · Terraform",
    body: "Cloud-native deployment, infrastructure automation, orchestration, and reproducible data environments.",
    level: 82
  },
  analytics: {
    path: "~/portfolio/skills/analytics",
    title: "Tableau · Power BI · Grafana · Data Studio",
    body: "Dashboards and observability views that turn platform signals into decisions people can act on.",
    level: 78
  }
};

const readinessContent = {
  metadata: {
    title: "Metadata as the control plane",
    body: "AI systems need governed context: definitions, ownership, freshness, and trusted retrieval paths."
  },
  quality: {
    title: "Quality before automation",
    body: "Data quality rules, anomaly checks, and profiling make downstream decisions less fragile."
  },
  lineage: {
    title: "Lineage for impact awareness",
    body: "Column-level traceability helps teams understand what changes, what breaks, and what can be trusted."
  },
  access: {
    title: "Access with clear boundaries",
    body: "Architecture should make the right data reachable while keeping policy, security, and compliance visible."
  }
};

const famousTechQuotes = [
  { author: "Alan Kay", quote: "The best way to predict the future is to invent it." },
  { author: "Grace Hopper", quote: "The most dangerous phrase is, ‘We’ve always done it this way.’" },
  { author: "Steve Jobs", quote: "Technology alone is not enough." },
  { author: "Tim Berners-Lee", quote: "The Web does not just connect machines, it connects people." },
  { author: "Donald Knuth", quote: "Premature optimization is the root of all evil." },
  { author: "Edsger Dijkstra", quote: "Simplicity is prerequisite for reliability." },
  { author: "Linus Torvalds", quote: "Talk is cheap. Show me the code." },
  { author: "Ada Lovelace", quote: "That brain of mine is something more than merely mortal; as time will show." }
];

function escapeHTML(value) {
  return value.replace(
    /[&<>"']/g,
    (character) =>
      ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;"
      })[character]
  );
}

function loadArticles() {
  state.articles = [...seedArticles];
}

function getVisibleArticles() {
  const query = state.search.trim().toLowerCase();
  return state.articles.filter((article) => {
    const matchesTopic = state.topic === "All" || article.topic === state.topic;
    const matchesSearch =
      !query ||
      article.title.toLowerCase().includes(query) ||
      article.excerpt.toLowerCase().includes(query) ||
      article.topic.toLowerCase().includes(query);

    return matchesTopic && matchesSearch;
  });
}

function articleMarkup(article, index) {
  return `
    <article class="article-card" tabindex="0" role="button" data-index="${index}" aria-label="Read ${escapeHTML(article.title)}">
      <div>
        <span class="article-topic">${escapeHTML(article.topic)}</span>
        <h3>${escapeHTML(article.title)}</h3>
        <p>${escapeHTML(article.excerpt)}</p>
      </div>
      <div class="article-meta">
        <span>${escapeHTML(article.date)}</span>
        <span>${escapeHTML(article.readTime)}</span>
      </div>
      ${article.url ? '<span class="medium-hint">Read on Medium</span>' : ""}
    </article>
  `;
}

function render() {
  const visible = getVisibleArticles();
  const [first, ...rest] = visible;

  if (!first) {
    featured.innerHTML = "";
    articleGrid.innerHTML = `<div class="empty-state">No articles match this view yet.</div>`;
    return;
  }

  featured.innerHTML = `
    <div class="featured-inner">
      <div>
        <span class="article-topic">${escapeHTML(first.topic)}</span>
        <h3>${escapeHTML(first.title)}</h3>
        <p>${escapeHTML(first.excerpt)}</p>
      </div>
      <div class="article-meta">
        <span>${escapeHTML(first.date)}</span>
        <span>${escapeHTML(first.readTime)}</span>
      </div>
      ${first.url ? '<span class="medium-hint">Read on Medium</span>' : ""}
    </div>
  `;
  featured.tabIndex = 0;
  featured.setAttribute("role", "button");
  featured.setAttribute("aria-label", `Read ${first.title}`);
  featured.dataset.index = "0";

  articleGrid.innerHTML = rest.map((article, index) => articleMarkup(article, index + 1)).join("");
}

function openReader(article) {
  document.querySelector("[data-reader-topic]").textContent = article.topic;
  document.querySelector("[data-reader-title]").textContent = article.title;
  document.querySelector("[data-reader-meta]").textContent = `${article.date} · ${article.readTime}`;
  document.querySelector("[data-reader-body]").innerHTML = `
    <p>${escapeHTML(article.body)}</p>
    <p>${escapeHTML(article.excerpt)}</p>
    ${
      article.url
        ? `<a class="primary-link reader-link" href="${escapeHTML(article.url)}" target="_blank" rel="noopener">Read full article on Medium</a>`
        : "<p>This is where the full essay can grow: argument, examples, links, references, and a closing note that gives readers something durable to carry away.</p>"
    }
  `;
  reader.classList.add("is-open");
  reader.setAttribute("aria-hidden", "false");
  readerClose.focus();
}

function handleArticleOpen(event) {
  const card = event.target.closest("[data-index]");
  if (!card) return;
  const visible = getVisibleArticles();
  openReader(visible[Number(card.dataset.index)]);
}

function setTheme(theme) {
  document.documentElement.dataset.theme = theme;
  localStorage.setItem(themeKey, theme);
}

function drawTopology() {
  if (!topologyCanvas) return;
  if (topologyFrameId) window.cancelAnimationFrame(topologyFrameId);
  const context = topologyCanvas.getContext("2d");
  const ratio = window.devicePixelRatio || 1;
  const bounds = topologyCanvas.getBoundingClientRect();
  topologyCanvas.width = Math.floor(bounds.width * ratio);
  topologyCanvas.height = Math.floor(bounds.height * ratio);
  context.setTransform(ratio, 0, 0, ratio, 0, 0);

  const nodes = Array.from({ length: 26 }, (_, index) => ({
    x: (bounds.width * ((index * 37) % 100)) / 100,
    y: (bounds.height * ((index * 53) % 100)) / 100,
    r: 2 + (index % 4),
    speed: 0.28 + (index % 5) * 0.04
  }));

  function frame(time) {
    context.clearRect(0, 0, bounds.width, bounds.height);
    context.lineWidth = 1;

    nodes.forEach((node, index) => {
      const x = node.x + Math.sin(time / 1400 + index) * 18 * node.speed;
      const y = node.y + Math.cos(time / 1600 + index) * 14 * node.speed;

      for (let next = index + 1; next < nodes.length; next += 1) {
        const other = nodes[next];
        const ox = other.x + Math.sin(time / 1400 + next) * 18 * other.speed;
        const oy = other.y + Math.cos(time / 1600 + next) * 14 * other.speed;
        const distance = Math.hypot(x - ox, y - oy);
        if (distance < 170) {
          context.strokeStyle = `rgba(159, 227, 188, ${0.18 - distance / 1100})`;
          context.beginPath();
          context.moveTo(x, y);
          context.lineTo(ox, oy);
          context.stroke();
        }
      }

      context.fillStyle = index % 3 === 0 ? "rgba(217, 164, 65, 0.78)" : "rgba(112, 189, 179, 0.7)";
      context.beginPath();
      context.arc(x, y, node.r, 0, Math.PI * 2);
      context.fill();
    });

    topologyFrameId = window.requestAnimationFrame(frame);
  }

  topologyFrameId = window.requestAnimationFrame(frame);
}

function setCommandPalette(open) {
  commandPalette.classList.toggle("is-open", open);
  commandPalette.setAttribute("aria-hidden", String(!open));
}

function renderQuoteTicker() {
  if (!quoteTicker) return;
  const shuffled = [...famousTechQuotes].sort(() => Math.random() - 0.5).slice(0, 5);
  const doubled = [...shuffled, ...shuffled];
  quoteTicker.innerHTML = doubled
    .map((item) => `<span>${escapeHTML(item.author.toUpperCase())} ▲ “${escapeHTML(item.quote)}”</span>`)
    .join("");
}

loadArticles();
render();
renderQuoteTicker();

document.addEventListener("scroll", () => {
  document.querySelector("[data-header]").classList.toggle("is-scrolled", window.scrollY > 40);
});

tabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    tabs.forEach((item) => item.classList.remove("is-active"));
    tab.classList.add("is-active");
    state.topic = tab.dataset.topic;
    render();
  });
});

aboutTabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    const content = aboutContent[tab.dataset.aboutTab];
    aboutTabs.forEach((item) => item.classList.remove("is-active"));
    tab.classList.add("is-active");
    aboutPanel.innerHTML = `
      <h3>${escapeHTML(content.title)}</h3>
      <p>${escapeHTML(content.body)}</p>
    `;
  });
});

topicJumps.forEach((chip) => {
  chip.addEventListener("click", () => {
    const topic = chip.dataset.topicJump;
    const matchingTab = Array.from(tabs).find((tab) => tab.dataset.topic === topic);
    if (!matchingTab) return;

    tabs.forEach((item) => item.classList.remove("is-active"));
    matchingTab.classList.add("is-active");
    state.topic = topic;
    state.search = "";
    searchInput.value = "";
    render();
    document.querySelector("#articles").scrollIntoView({ behavior: "smooth" });
  });
});

pipelineNodes.forEach((node) => {
  node.addEventListener("click", () => {
    const content = pipelineContent[node.dataset.node];
    pipelineNodes.forEach((item) => item.classList.remove("is-active"));
    node.classList.add("is-active");
    nodeDetail.innerHTML = `
      <p class="kicker">Selected node</p>
      <h3>${escapeHTML(content.title)}</h3>
      <p>${escapeHTML(content.body)}</p>
      <div class="detail-tags">
        ${content.tags.map((tag) => `<span>${escapeHTML(tag)}</span>`).join("")}
      </div>
    `;
  });
});

stackTabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    const content = stackContent[tab.dataset.stack];
    stackTabs.forEach((item) => item.classList.remove("is-active"));
    tab.classList.add("is-active");
    stackPanel.innerHTML = `
      <p class="console-path">${escapeHTML(content.path)}</p>
      <h3>${escapeHTML(content.title)}</h3>
      <p>${escapeHTML(content.body)}</p>
      <div class="stack-meter" aria-hidden="true"><span style="width: ${content.level}%"></span></div>
    `;
  });
});

readinessChips.forEach((chip) => {
  chip.addEventListener("click", () => {
    const content = readinessContent[chip.dataset.readiness];
    readinessChips.forEach((item) => item.classList.remove("is-active"));
    chip.classList.add("is-active");
    readinessDetail.innerHTML = `
      <h3>${escapeHTML(content.title)}</h3>
      <p>${escapeHTML(content.body)}</p>
    `;
  });
});

commandOpen.addEventListener("click", () => setCommandPalette(true));
commandClose.addEventListener("click", () => setCommandPalette(false));
commandPalette.addEventListener("click", (event) => {
  if (event.target === commandPalette) setCommandPalette(false);
});

commandTargets.forEach((item) => {
  item.addEventListener("click", () => {
    setCommandPalette(false);
    document.querySelector(item.dataset.commandTarget).scrollIntoView({ behavior: "smooth" });
  });
});

window.addEventListener("keydown", (event) => {
  if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
    event.preventDefault();
    setCommandPalette(true);
  }
  if (event.key === "Escape" && commandPalette.classList.contains("is-open")) {
    setCommandPalette(false);
  }
});

const counterObserver = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      const counter = entry.target;
      const target = Number(counter.dataset.count);
      let current = 0;
      const step = Math.max(1, Math.ceil(target / 34));
      const timer = window.setInterval(() => {
        current = Math.min(target, current + step);
        counter.textContent = current;
        if (current === target) window.clearInterval(timer);
      }, 28);
      observer.unobserve(counter);
    });
  },
  { threshold: 0.7 }
);

counters.forEach((counter) => counterObserver.observe(counter));
drawTopology();
window.addEventListener("resize", drawTopology);

searchInput.addEventListener("input", (event) => {
  state.search = event.target.value;
  render();
});

document.addEventListener("click", handleArticleOpen);
document.addEventListener("keydown", (event) => {
  if ((event.key === "Enter" || event.key === " ") && event.target.matches("[data-index]")) {
    event.preventDefault();
    const visible = getVisibleArticles();
    openReader(visible[Number(event.target.dataset.index)]);
  }

  if (event.key === "Escape" && reader.classList.contains("is-open")) {
    reader.classList.remove("is-open");
    reader.setAttribute("aria-hidden", "true");
  }
});

readerClose.addEventListener("click", () => {
  reader.classList.remove("is-open");
  reader.setAttribute("aria-hidden", "true");
});

reader.addEventListener("click", (event) => {
  if (event.target === reader) {
    reader.classList.remove("is-open");
    reader.setAttribute("aria-hidden", "true");
  }
});

document.querySelector("[data-theme-toggle]").addEventListener("click", () => {
  const nextTheme = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
  setTheme(nextTheme);
});

setTheme(localStorage.getItem(themeKey) || "light");
