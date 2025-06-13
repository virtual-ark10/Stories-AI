const formatCompletion = (inputText) => {
    inputText = inputText.trim();
    if(inputText.startsWith('"') && inputText.endsWith('"')) {
        inputText = inputText.slice(1, -1);
    }

    // const titleMatch = inputText.match(/^Title:\s*(.+)/);
    // let title = titleMatch ? titleMatch[1].trim() : "Untitled";

    inputText = inputText.replace(/^Title:\s*.+\n\n/, "")

    let finalText = inputText.split("\\n\\n").map(paragraph => `<p>${paragraph}</p>`).join("\n")

    inputText = finalText.replace(/\*(.*?)\*/g, "<b>$1</b>");

    return {inputText}

}

export default formatCompletion