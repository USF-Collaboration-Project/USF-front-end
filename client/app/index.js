// changed the query from query->search
const queryInput = document.getElementById("search") 
const submit = document.getElementById("submitButton")
const autoCompleteContainer = document.getElementById("autoComplete")
let selectedItem;
let resultSelected = 0;

function getAndDisplayResults(value) {
    console.log(value + " was selected")
    autoCompleteContainer.innerHTML = ""
    queryInput.value = value
    resultSelected = 0
}

function submitSelection(el) {
    const untrimmedValue = el.innerHTML
    const boldStart = untrimmedValue.indexOf("<b>")
    const boldBreak = untrimmedValue.indexOf("</b>")
    const value = untrimmedValue.substring(0, boldStart) + untrimmedValue.substring(boldStart + 3, boldBreak) +
        untrimmedValue.substring(boldBreak + 4, untrimmedValue.length)
    console.log(value)
    getAndDisplayResults(value)
}
// Creates list element when called
function createAutoCompleteList(name, start, stop) {
    // Creates divs of different elements for each name of the element list
    const el = document.createElement("div")
    el.className = "autoCompleteItems"
    const innerPart = name.substring(0, start) + "<b>" + name.substring(start, stop) + "</b>" + name.substring(stop,
        name.length)
    el.innerHTML = innerPart
    // Add event listener to outer div
    el.addEventListener("click", function () {
        submitSelection(el)
    })
    autoCompleteContainer.appendChild(el)
}
// function to handle autocomplete list for given input field
function autocomplete(input, autoCompWords) {
    input.addEventListener("input", function (e) {
        autocompleted = false
        autoCompleteContainer.innerHTML = ""
        //result.innerHTML = "" // Unused currently
        resultSelected = -1
        let substr = this.value.toUpperCase().trim()
        let lengthToCheck = 1 // checks for matches with at least n characters for names
        if (substr.length < lengthToCheck) {
            return
        }
        // Finds places where partial word searches can check for matching substring
        // Ex. Frederick-Rockville-Gaithersburg will return an index at the start of the string, and at each hyphen when a new word starts
        for (let i = 0; i < autoCompWords.length; i++) {
            wordBreaks = [] // array for all index locations of spaces and hyphens
            wordBreaks.push(-1) // adds for start of word, is -1 due to adding 1 later
            for (let j = 0; j < autoCompWords[i].length; j++) {
                charToCheck = autoCompWords[i].toUpperCase().charAt(j)
                // adds if character is a space, hyphen or slash
                if (charToCheck == " " || charToCheck == "-" || charToCheck == "/") {
                    wordBreaks.push(j)
                }
            }
            // checks at each index of a word break for a partial substring match
            for (let j = 0; j < wordBreaks.length; j++) {
                if (substr == autoCompWords[i].substring(wordBreaks[j] + 1, wordBreaks[j] + 1 + substr
                    .length).toUpperCase()) {
                    createAutoCompleteList(autoCompWords[i], wordBreaks[j] + 1, wordBreaks[j] + 1 + substr
                        .length)
                    break
                }
            }
        }
    })
}
// Button press gets and displays results
submit.addEventListener("click", function () {
    getAndDisplayResults(queryInput.value) // function to do actual work with submitted query
})
// Can change between keyup and keydown
queryInput.addEventListener("keyup", function (e) {
    // Enter press submits
    if (e.keyCode == 13) {
        childContainer = autoCompleteContainer.children
        if (childContainer.length == 1) {
            elementSelected = childContainer[0]
            submitSelection(elementSelected)
        } else if (resultSelected != -1) {
            elementSelected = childContainer[resultSelected]
            submitSelection(elementSelected)
        } else {
            getAndDisplayResults(queryInput.value)
        }
        // Up arrow press scrolls up through list
    } else if (e.keyCode == 38) {
        console.log("up arrow pressed")
        childContainer = autoCompleteContainer.children
        if (childContainer.length >= 2) {
            const prevResult = Math.max(resultSelected, 0)
            resultSelected -= 1
            if (resultSelected < 0) {
                resultSelected = childContainer.length - 1
            }
            childContainer[prevResult].className = "autoCompleteItems"
            childContainer[resultSelected].className = "listHighlighted"
        } else if (childContainer.length == 1) {
            resultSelected = 0
            childContainer[0].className = "listHighlighted"
        }
        // Down arrow scrolls down through list
    } else if (e.keyCode == 40) {
        console.log("down arrow pressed")
        childContainer = autoCompleteContainer.children
        if (childContainer.length >= 2) {
            const prevResult = Math.max(resultSelected, 0)
            resultSelected += 1
            resultSelected = resultSelected % childContainer.length
            childContainer[prevResult].className = "autoCompleteItems"
            childContainer[resultSelected].className = "listHighlighted"
        } else if (childContainer.length == 1) {
            resultSelected = 0
            childContainer[0].className = "listHighlighted"
        }
    }
})
// Creates autoCompleteList array by combining lists
const autoCompleteList = ["item 1", "item 2", "item 3",
    "thing 1", "thingy", "temperature", "precipitation", "humidity",
    "water cover"
]

// const autoCompleteList =  {
//     'MOD13A1.005 Vegetation Indices 16-Day L3 Global 500m': 'Global MODIS vegetation indices are designed to\nprovide consistent spatial and temporal comparisons of vegetation conditions.\nBlue, red, and near-infrared reflectances, centered at 469-nanometers,\n645-nanometers, and 858-nanometers, respectively, are used to determine the\nMODIS daily vegetation indices.',
//         'MOD44W.005 Land Water Mask Derived from MODIS and SRTM': 'The Global Water Mask uses the SWBD (SRTM Water Body Data) in combination with MODIS 250m data to create a complete global map of surface water at 250m spatial resolution, circa 2000-2002.  This dataset is intended for use in processing of raster data and for masking out water in final raster data products.'
//     }
// auto completes queryInput with above array
autocomplete(queryInput, autoCompleteList);