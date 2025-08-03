import { useEffect, useState } from "react";

export default function useViewportPageSize() {
  const [pageSize, setPageSize] = useState(6);

  useEffect(() => {
    const calculatePageSize = () => {
      const viewportHeight = window.innerHeight;
      const availableHeight = viewportHeight - 240;
      const rowHeight = 60;
      const calculatedSize = Math.max(
        3,
        Math.floor(availableHeight / rowHeight)
      );
      setPageSize(Math.min(calculatedSize, 15));
    };

    calculatePageSize();
    window.addEventListener("resize", calculatePageSize);

    return () => window.removeEventListener("resize", calculatePageSize);
  }, []);

  return pageSize;
}
