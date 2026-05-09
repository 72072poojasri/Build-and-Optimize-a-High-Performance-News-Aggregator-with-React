import React from "react";

export default function StoryItem({ item }) {
  if (!item) return null;
  return (
    <article className="story" style={{ padding: 12 }}>
      <a href={item.url || "#"} target="_blank" rel="noreferrer">
        <h3 style={{ margin: 0 }}>{item.title}</h3>
      </a>
      <div style={{ fontSize: 12, color: "#666" }}>
        by {item.by} — {new Date(item.time * 1000).toLocaleString()}
      </div>
    </article>
  );
}
