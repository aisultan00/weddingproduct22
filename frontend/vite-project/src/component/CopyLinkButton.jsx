import { useState } from "react";

const CopyLinkButton = () => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Ошибка копирования: ", err);
    }
  };

  return (
    <button
      onClick={handleCopy}
      style={{
        margin: "10px 0px 0px 5px",
        padding: "10px 20px",
        borderRadius: "12px",
        border: "none",
        background: copied
          ? "linear-gradient(90deg, #A5B4FC 0%, #F0ABFC 100%)"
          : "linear-gradient(90deg, #6366F1 0%, #D946EF 100%)",
        color: "#fff",
        cursor: "pointer",
        transition: "filter 0.2s ease, transform 0.05s ease",
        boxShadow: "0 6px 18px rgba(99,102,241,0.35)",
      }}
      onMouseDown={(e) => (e.currentTarget.style.transform = 'translateY(1px)')}
      onMouseUp={(e) => (e.currentTarget.style.transform = 'translateY(0)')}
      onMouseLeave={(e) => (e.currentTarget.style.transform = 'translateY(0)')}
    >
      {copied ? "Скопировано!" : "Копировать ссылку"}
    </button>
  );
};

export default CopyLinkButton;
