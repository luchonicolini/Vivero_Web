"use client";

import { useConsulta } from "@/context/ConsultaContext";

export default function A11yAnnouncer() {
  const { announcedMessage } = useConsulta();

  return (
    <div
      role="status"
      aria-live="polite"
      aria-atomic="true"
      className="sr-only"
    >
      {announcedMessage}
    </div>
  );
}
