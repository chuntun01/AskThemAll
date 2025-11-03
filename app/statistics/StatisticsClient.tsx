"use client";

import {useSearchParams} from "next/navigation";
import {Suspense} from "react";

function StatsContent() {
  const params = useSearchParams();
  const view = params.get("view") || "default";

  return <p>Đang xem chế độ: {view}</p>;
}

export default function StatsClient() {
  return (
    <Suspense fallback={<p>Đang tải...</p>}>
      <StatsContent />
    </Suspense>
  );
}
