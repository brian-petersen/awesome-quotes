$(document).ready(function() {
    var quotes;
    var authors = [];

    $.expr[":"].contains = $.expr.createPseudo(function(arg) {
        return function( elem ) {
            return $(elem).text().toUpperCase().indexOf(arg.toUpperCase()) >= 0;
        };
    });

    Jaml.register('quote', function(quote) {
        div({ class: 'quote' },
            div({ class: 'text' }, quote.text),
            div({ class: 'author' }, quote.author),
            div({ class: 'clear' })
        );
    });

    Jaml.register('author', function(author) {
        li({ class: 'author-link' },
            a({ href: '#' }, author)
        );
    });

    $('.search-query').on('input', function() {
        var query = $(this).val();

        $('.author-link').removeClass('active');

        $(".quote:not(:contains('" + query + "'))").fadeOut();
        $(".quote:hidden:contains('" + query + "')").fadeIn();
    });

    $('.author-link').live('click', function() {
        $('.search-query').val('');

        $('.author-link').removeClass('active');
        $(this).addClass('active');

        $('.quote').hide();
        $(".quote .author:contains('" + $(this).children().html() + "')").parent().show();
    });

    $('.reset').click(function() {
        $('.author-link').removeClass('active');
        $('.quote').show();
        $('.search-query').val('');
    });

    $.getJSON('https://dl.dropboxusercontent.com/u/1917492/quotes.json', function(data) {
        quotes = data;

        for (var i = 0; i < quotes.length; i++) {
            $('.quotes').append(Jaml.render('quote', quotes[i]));

            authors.push(quotes[i].author);
        }

        authors = _.uniq(authors).sort();

        for (var i = 0; i < authors.length; i++) {
            $('.author-list').append(Jaml.render('author', authors[i]));
        }
    });
});