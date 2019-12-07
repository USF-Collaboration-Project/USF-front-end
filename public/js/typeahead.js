// constructs the suggestion engine
const colors_suggestions = new Bloodhound({
    datumTokenizer: Bloodhound.tokenizers.whitespace, // see its meaning above
    queryTokenizer: Bloodhound.tokenizers.whitespace, // see its meaning above
    local: ['Red', 'Blood Red', 'White', 'Blue', 'Yellow', 'Green', 'Black', 'Pink', 'Orange']
});

$('#my_search').typeahead({
    hint: true,
    highlight: true,
    minLength: 1
},
    {
        name: 'colors',
        source: colors_suggestions   // Bloodhound instance is passed as the source
    });