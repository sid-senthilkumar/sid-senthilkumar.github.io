export const blogPosts = {
  "mega-thread": {
    id: "mega-thread",
    title: "The Mega Thread 🧵",
    posts: [
      {
        id: "intro-post",
        content:
          "Welcome to my blog system! 👋 I'm experimenting with a new format: tweet-style posts in interconnected threads. Perfect for our short attention spans while maintaining depth through connections.",
        timestamp: "2024-01-15T10:00:00Z",
        linkedPosts: ["ai-genomics-1", "career-journey-1"],
        tags: ["meta", "introduction"],
        reactions: { likes: 12, retweets: 3, comments: 2 },
      },
      {
        id: "attention-span",
        content:
          "🧠 Why tweet-length content? Our brains are wired for quick consumption, but complex ideas need space to breathe. This format bridges that gap.",
        timestamp: "2024-01-15T10:05:00Z",
        linkedPosts: ["ux-design-1"],
        tags: ["psychology", "ux"],
        reactions: { likes: 8, retweets: 2, comments: 1 },
      },
      {
        id: "interconnected-knowledge",
        content:
          "💡 Knowledge isn't linear. Ideas branch, merge, and evolve. This threading system mirrors how we actually think and learn.",
        timestamp: "2024-01-15T10:10:00Z",
        linkedPosts: ["learning-systems-1"],
        tags: ["knowledge", "systems"],
        reactions: { likes: 15, retweets: 4, comments: 3 },
      },
    ],
  },

  "ai-genomics": {
    id: "ai-genomics",
    title: "AI in Genomics 🧬",
    posts: [
      {
        id: "ai-genomics-1",
        content:
          "🧬 AI is revolutionizing genomics faster than we can keep up. From protein folding to gene expression prediction, we're entering an era where computation meets biology at unprecedented scale.",
        timestamp: "2024-01-14T14:30:00Z",
        linkedPosts: ["protein-folding-1"],
        tags: ["AI", "genomics", "biotech"],
        reactions: { likes: 24, retweets: 8, comments: 5 },
      },
      {
        id: "ai-genomics-2",
        content:
          "🔬 The challenge isn't just processing the data—it's making it interpretable. A model that predicts gene function is useless if researchers can't understand WHY it made that prediction.",
        timestamp: "2024-01-14T14:35:00Z",
        linkedPosts: ["interpretable-ai-1"],
        tags: ["interpretability", "AI", "research"],
        reactions: { likes: 18, retweets: 6, comments: 4 },
      },
      {
        id: "ai-genomics-3",
        content:
          "📊 Multi-omics integration is where the magic happens. Combining genomics, transcriptomics, proteomics, and metabolomics gives us a holistic view of biological systems.",
        timestamp: "2024-01-14T14:40:00Z",
        linkedPosts: ["multi-omics-1"],
        tags: ["multi-omics", "systems-biology"],
        reactions: { likes: 22, retweets: 7, comments: 6 },
      },
    ],
  },

  "career-journey": {
    id: "career-journey",
    title: "Career Reflections 💼",
    posts: [
      {
        id: "career-journey-1",
        content:
          "💼 From tutoring kids to analyzing genomes—my career path wasn't linear. But every detour taught me something valuable about communication, problem-solving, and patience.",
        timestamp: "2024-01-13T09:15:00Z",
        linkedPosts: ["teaching-skills-1"],
        tags: ["career", "growth", "reflection"],
        reactions: { likes: 16, retweets: 3, comments: 7 },
      },
      {
        id: "career-journey-2",
        content:
          "🎓 UTD's MS in Bioinformatics was intense. But the real learning happened in the gaps—late nights debugging code, failed experiments that led to breakthroughs, collaborations that sparked new ideas.",
        timestamp: "2024-01-13T09:20:00Z",
        linkedPosts: ["grad-school-1"],
        tags: ["education", "UTD", "bioinformatics"],
        reactions: { likes: 14, retweets: 4, comments: 3 },
      },
      {
        id: "career-journey-3",
        content:
          "🌱 Currently at New York Botanics, bridging web development and biological data visualization. It's fascinating how front-end skills translate to making complex data accessible.",
        timestamp: "2024-01-13T09:25:00Z",
        linkedPosts: ["data-viz-1"],
        tags: ["current-work", "data-visualization"],
        reactions: { likes: 19, retweets: 5, comments: 4 },
      },
    ],
  },

  "protein-folding": {
    id: "protein-folding",
    title: "Protein Folding & AI 🔬",
    posts: [
      {
        id: "protein-folding-1",
        content:
          "🔬 AlphaFold changed everything. But it's not just about predicting structure—it's about understanding the relationship between sequence, structure, and function.",
        timestamp: "2024-01-12T16:20:00Z",
        linkedPosts: ["alphafold-impact-1"],
        tags: ["protein-folding", "AlphaFold", "DeepMind"],
        reactions: { likes: 31, retweets: 12, comments: 8 },
      },
      {
        id: "protein-folding-2",
        content:
          "⚡ The computational challenge is immense. Each protein has millions of possible conformations, but nature finds the right one in milliseconds. How?",
        timestamp: "2024-01-12T16:25:00Z",
        linkedPosts: ["computational-biology-1"],
        tags: ["computational-challenge", "biology"],
        reactions: { likes: 26, retweets: 9, comments: 6 },
      },
    ],
  },

  "learning-systems": {
    id: "learning-systems",
    title: "Learning & Knowledge Systems 📚",
    posts: [
      {
        id: "learning-systems-1",
        content:
          "📚 Traditional education is linear: A → B → C. But real understanding is networked: A connects to M, influences Q, contradicts F. This blog mimics that structure.",
        timestamp: "2024-01-11T11:30:00Z",
        linkedPosts: ["education-reform-1"],
        tags: ["learning", "education", "systems-thinking"],
        reactions: { likes: 21, retweets: 6, comments: 9 },
      },
      {
        id: "learning-systems-2",
        content:
          "🔗 The best insights come from unexpected connections. That's why I'm building this interconnected blog—to capture those 'aha!' moments when ideas click together.",
        timestamp: "2024-01-11T11:35:00Z",
        linkedPosts: ["creativity-1"],
        tags: ["insights", "connections", "creativity"],
        reactions: { likes: 17, retweets: 4, comments: 5 },
      },
    ],
  },

  "ux-design": {
    id: "ux-design",
    title: "UX for Science 🎨",
    posts: [
      {
        id: "ux-design-1",
        content:
          "🎨 Scientists are users too. The best research tools don't just work—they feel intuitive. Good UX can accelerate discoveries by removing friction from the research process.",
        timestamp: "2024-01-10T13:45:00Z",
        linkedPosts: ["scientific-tools-1"],
        tags: ["UX", "science", "tools", "research"],
        reactions: { likes: 23, retweets: 7, comments: 4 },
      },
      {
        id: "ux-design-2",
        content:
          "📱 Complexity doesn't have to mean complicated. The human genome has 3 billion base pairs, but a well-designed browser can make it feel navigable.",
        timestamp: "2024-01-10T13:50:00Z",
        linkedPosts: ["genome-browsers-1"],
        tags: ["complexity", "simplicity", "genomics"],
        reactions: { likes: 18, retweets: 5, comments: 3 },
      },
    ],
  },
};

export const threadConnections = {
  "mega-thread": ["ai-genomics", "career-journey", "learning-systems"],
  "ai-genomics": ["protein-folding", "career-journey"],
  "career-journey": ["learning-systems", "ux-design"],
  "protein-folding": ["ai-genomics"],
  "learning-systems": ["ux-design", "mega-thread"],
  "ux-design": ["career-journey", "learning-systems"],
};
