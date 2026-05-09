import React, { useEffect, useState } from "react";
import StoryList from "../components/StoryList";

export default function Dashboard() {
  const [stories, setStories] = useState([]);
  useEffect(() => {
    let mounted = true;
    fetch("/api/topstories?limit=200")
      .then((r) => r.json())
      .then((data) => {
        if (mounted) setStories(data.filter(Boolean));
      })
      .catch(console.error);
    return () => (mounted = false);
  }, []);

  return (
    <section>
      <h1>Top Stories</h1>
      <StoryList items={stories} />
    </section>
  );
}
