import React, { useRef } from "react";
import { useVirtualizer } from "@tanstack/react-virtual";
import StoryItem from "./StoryItem";

export default function StoryList({ items = [] }) {
  const parentRef = useRef();
  const rowVirtualizer = useVirtualizer({
    count: items.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 80,
    overscan: 6,
  });

  return (
    <div ref={parentRef} style={{ height: "70vh", overflow: "auto" }}>
      <div
        style={{ height: rowVirtualizer.getTotalSize(), position: "relative" }}
      >
        {rowVirtualizer.getVirtualItems().map((virtualRow) => {
          const item = items[virtualRow.index];
          return (
            <div
              key={item?.id ?? virtualRow.index}
              style={{
                position: "absolute",
                top: virtualRow.start,
                left: 0,
                width: "100%",
              }}
            >
              <StoryItem item={item} />
            </div>
          );
        })}
      </div>
    </div>
  );
}
