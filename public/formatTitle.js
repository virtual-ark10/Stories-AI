const formatTitle = (userText) => {
    userText = userText.trim();
    

    const titleMatch = userText.match(/\*\*Title:\s*(.+?)\*\*/i);
    let title = titleMatch ? titleMatch[1].trim() : "Untitled";

    return title;
}

//const input = "**!The Canopy Cafe!**\n\nThe rain hadn’t completely stopped, leaving a slick sheen on the expansive awning of the Canopy Cafe. It felt perfectly fitting. It was 2008, and everything felt… hopeful. I was nervously clutching my lukewarm latte, watching "

export default formatTitle;