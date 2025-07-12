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
        margin:"10px 0px 0px 5px",
        padding: "10px 20px",
        borderRadius: "10px",
        border: "none",
        backgroundColor: copied ? "#B388FF" : "#7C4DFF",
        color: "#fff",
        cursor: "pointer",
        transition: "background 0.3s",
      }}
    >
      {copied ? "Скопировано!" : "Копировать ссылку"}
    </button>
  );
};

export default CopyLinkButton;
