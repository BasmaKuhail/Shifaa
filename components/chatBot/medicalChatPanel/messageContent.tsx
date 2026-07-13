export function renderMessageContent(content: string) {
  return content.split(/(\*\*[^*]+\*\*)/g).map((part, index) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return <strong key={index}>{part.slice(2, -2)}</strong>;
    }

    return part;
  });
}

export function getMessageDirection(content: string) {
  return /[\u0600-\u06FF]/.test(content) ? "rtl" : "ltr";
}

