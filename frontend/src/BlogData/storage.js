const STORAGE_KEY = "upskillr_blogs";

const INITIAL_DATA = [
  {
    id: 1,
    title: "The Future of Generative AI in Education",
    author: "Dr. Sarah Chen",
    category: "AI",
    content: "Artificial Intelligence is reshaping how we learn and teach. From personalized learning paths to automated grading, the possibilities are endless. In this post, we explore the latest trends in generative AI models like GPT-4 and Claude, and how they can be leveraged to create more engaging educational experiences...",
    createdAt: new Date("2023-10-15"),
  },
  {
    id: 2,
    title: "Mastering React Hooks",
    author: "Alex Rivera",
    category: "Coding",
    content: "Hooks were a game-changer when introduced in React 16.8. They allow you to use state and other React features without writing a class. We'll dive deep into useState, useEffect, and create custom hooks to simplify your component logic. Understanding the dependency array is crucial for performance...",
    createdAt: new Date("2023-11-02"),
  },
  {
    id: 3,
    title: "Deep Work: Rules for Focused Success",
    author: "James Clear",
    category: "Productivity",
    content: "In a distracted world, the ability to focus without distraction is a superpower. Deep work is the ability to master hard things quickly. This article outlines four rules to help you cultivate deep work habits and achieve more in less time.",
    createdAt: new Date("2023-12-10"),
  }
];

export const blogStorage = {
  getAll: () => {
    try {
      const data = localStorage.getItem(STORAGE_KEY);
      if (!data) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_DATA));
        return INITIAL_DATA;
      }
      return JSON.parse(data, (key, value) => {
        if (key === 'createdAt') return new Date(value);
        return value;
      });
    } catch (e) {
      console.error("Failed to load blogs", e);
      return [];
    }
  },

  add: (blog) => {
    const blogs = blogStorage.getAll();
    const newBlog = {
      ...blog,
      id: Date.now(),
      createdAt: new Date(),
    };
    
    const updatedBlogs = [newBlog, ...blogs];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedBlogs));
    return newBlog;
  }
};
