$(document).on("click", "#scrapeNews", scrapeNews);
$(document).on("click", ".btn-save-news", saveNews);
$(document).on("click", ".btn-unsave-news", unsaveNews);

let defaultURL = "https://nytimes.com";

function scrapeNews() {
    $.get(`/api/ScrapeNews/20`, (data) => {
        if (data) {
            alert(`Scraped ${data.length} articles from The New York Times`)
            for (let i = 0; i < data.length; i++) {
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
                    <button type="button" class="btn btn-success btn-save-news">Save</button>
                </div>
            </div>`);
}

function saveNews() {
    parent = $(this).parent();
    let headline = $(parent).children("h5").text().trim();
    let summary = $(parent).children("p").text().trim();
    let url = $(parent).children("a").attr("href").trim();
    let news = {
        headline: headline,
        url: url,
        summary: summary
    }
    console.log(news);

    $.post("/api/save", news, (response) => {
        if (response) {
            alert("Article saved!");
            $(this).text("Saved");
            $(this).removeClass("btn-success btn-save-news").addClass("btn-warning");
            $(this).off("click");
        }
    })
}

function unsaveNews() {
    id = $(this).attr("data-id");
    $.ajax({
        url: `/api/unsave/${id}`,
        type: 'DELETE',
    })
        .then((response) => {
            if (response.deletedCount > 0) {
                alert("News unsaved!")
                $($(this).closest(".card")).remove();
            } else {
                alert("This news doesn't exist in the database!")
            }
        });
}