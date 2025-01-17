const article = document.querySelector("article");
const svg = `<svg width="25px" height="25px" viewBox="0 0 1024 1024" class="icon" version="1.1" xmlns="http://www.w3.org/2000/svg"><path d="M789.333333 853.333333H234.666667l-128 128V256c0-70.4 57.6-128 128-128h554.666666c70.4 0 128 57.6 128 128v469.333333c0 70.4-57.6 128-128 128z" fill="#2196F3"></path><path d="M469.333333 426.666667h85.333334v234.666666h-85.333334z" fill="#FFFFFF"></path><path d="M512 320m-42.666667 0a42.666667 42.666667 0 1 0 85.333334 0 42.666667 42.666667 0 1 0-85.333334 0Z" fill="#FFFFFF"></path></svg>`

if (article) {
    const text = article?.textContent?.split('\n').map(line => line.trim()).filter(line => line.length > 0).join(' ');
    fetch('https://api.openai.com/v1/chat/completions', {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer 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`,
        },
        body: JSON.stringify({
            model: "gpt-3.5-turbo",
            messages: [
                {
                    role: "system",
                    content: "You are an AI which rtake input as text conent of a webpage then output summary under 250 characters."
                },
                {
                    role: "user",
                    content: text,
                },
            ],
        }),
    }).then((res) => res.json()).then((data) => {
        const summaryDiv = document.createElement("div")
        summaryDiv.innerText = data.choices[0].message.content
        summaryDiv.style.cssText = 'display: none; position: absolute; width:500px; background-color:blue; border-radius:24px; padding:10px; background: rgb(9, 9, 121); background: linear-gradient(10deg, rgba(9, 9, 121, 1) 2%, rgba(9, 9, 121, 1) 11%, rgba(9, 25, 132, 1) 18%, rgba(9, 106, 185, 1) 53%, rgba(9, 134, 203, 1) 65%, rgba(46, 108, 129, 1) 83%, rgba(10, 214, 255, 1) 100%); color: white;';
        document.querySelector(".devsite-page-title-meta").insertAdjacentElement('afterend', summaryDiv)

        const button = document.createElement('button')
        button.innerHTML = svg
        button.addEventListener('mouseover', function () {
            summaryDiv.style.display = 'flex'
        });
        button.addEventListener('mouseout', function () {
            summaryDiv.style.display = 'none'
        })
        document.querySelector(".devsite-page-title-meta").insertAdjacentElement('afterend', button)
    }).catch((e) => {
        console.error(e.message)
    })
}