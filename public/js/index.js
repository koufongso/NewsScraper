$(document).on("click", "#scrapeNews", scrapeNews)

let defaultURL = "https://nytimes.com";

function scrapeNews() {
    $.get(`/api/ScrapeNews/20`, (data) => {
        
        if (data) {
            alert(`Scraped ${data.length} articles from The New York Times`)
            for(let i=0; i<data.length;i++){
                $("#news").append(newsCard(data[i].headline, data[i].summary, data[i].url));
            }
            
        }
    })
}

function newsCard(headline, summary, url) {
    return (`<div class="card">
                <div class="card-body">
                    <h5 class="card-title">${headline}</h5>
                    <p class="card-text">${summary}</p>
                    <a href="${url}" class="btn btn-primary" target="_blank">Read Original Article</a>
                    <button type="button" class="btn btn-success" id="scrapeNews">Save</button>
                </div>
            </div>`);
}