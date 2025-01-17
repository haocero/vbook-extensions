function execute(url, page) {
    if (!page) {
        page = 1;
    } else {
        page = parseInt(page)
    }

    var json = Http.get(url + "&page=" + page + "&take=24").string();

    var data = JSON.parse(json);
    var next = "";

    var novelList = [];

    if (data.books) {
        var total = data.total;
        if (page < total) {
            next = page + 1;
        }
        novelList = data.books.map(item => {
            return {
                "name": item.vtitle,
                "link": "-" + item.bslug,
                "description": item.vauthor,
                "cover": item.bcover ? "/covers/" + item.bcover : "",
                "host": "https://chivi.app"
            }
        });
    }

    return Response.success(novelList, next);
}