import React, { useEffect, useState } from "react";
import StoryList from "../components/StoryList";

export default function Dashboard() {
  const [stories, setStories] = useState([]);

  useEffect(() => {
    let mounted = true;

    fetch("/api/topstories?limit=200")
      .then((r) => r.json())
      .then((data) => {
        if (mounted) {
          setStories(data.filter(Boolean));
        }
      })
      .catch(console.error);

    return () => {
      mounted = false;
    };
  }, []);

  return (
    <section>
      <img
        data-testid="hero-image"
        src="https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=1200"
        srcSet="
          https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=600 600w,
          https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=1200 1200w
        "
        width="1200"
        height="500"
        alt="News Hero"
        style={{
          width: "100%",
          height: "auto",
          borderRadius: "12px",
          marginBottom: "20px",
        }}
      />

      <h1>Top Stories</h1>

      <StoryList items={stories} />
    </section>
  );
}