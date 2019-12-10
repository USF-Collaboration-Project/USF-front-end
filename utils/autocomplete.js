// Sam and Sukhrob's autocomplete code here
// Originally in file "index.js"

const queryInput = document.getElementById("query")
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
const autoCompleteList = ['quality', 'crop', 'elevation', 'ned', 'myd11a2', 'opengeohub', 'caltech', 'agriculture', 'google', 'mass', 'built', 'mangrove', 'aod',
 'ncep', 'dmsp', 'brightness', 'srtm', 'daylight', 'mcd64a1', 'myd13q1', 'l4', 'ciesin', 'forecast', 'coastal', 'hurricane', 'mcd43a4', 'state', 'bio5', 'ngdc', 
 'ocean', 'osb', 'nex', 'topography', 'l8', 'tm', 'photosynthesis', 'evapotranspiration', 'myd15a2h', 'sar', 'goes-17', 'black-sky', 'ges-disc', 'albedo', 'lai', 
 'avhrr', 'lt5', 'cas', 'nesdis', 'water-mask', 'cfmask', 'infrastructure', 'wind', 'mcd12q2', 'mod17a2', 'esa', 'vapor', 'canada', 'kbdi', 'lo8', 'nir', 'snow', 
 'lm1', 'elevation', 'eos', 'us', 'weather', 'imerg', 'ga', 'myd13a1', 'methane', 'fapar', 'cropland', 'oisst', 'seasonality', 'aerosol', 'pdsi', 'annual', 
 'surface', 'alos', 'emc', 'planet', 'aster', 'c1', 'production', 'county', 'moisture', 'soil', 'mod13a1', 'atmosphere', 'le7', 'accessibility', 'mydocga', 
 'nlcd-derived', 'vnir', 'bio19', 'netherlands', 'goes-west', 'dos', 'census', 'toms', 'smod', 'nasa', 'goes-east', 'worldpop', 'usda', 'hydrosheds', 'gap', 
 'l8sr', 'nws', 'tern', 'glims', 'ice', 'cdr', 'mod08-m3', 'so2', 'multispectral', 'taxonomy', 'mcd43a2', 'gfsad', 'myd13a2', 'msi', 'ospo', 'myd09q1', 'climate', 
 'stressors', 'mcd19a2', 'fragmentation', 'geophysical', 'hydrology', 'bio7', 'emissivity', 'boundaries', 'oli-tirs', 'fpar', 'brdf', 'australia', 'lm2', 'countries', 
 'surface-temperature', 'ndvi', 'eroc', 'night', 'pml', 'hyperspectral', 'csiro', 't2', 'classification', 'bioclim', 'idaho', 'gravity', 'jpl', 'bio17', 'crs', 
 'infrared', 'glacier', 'cgiar', 'goddard', 'counties', 'modocga', 'formaldehyde', 'corine', 'rainfall', 'famine', 'fishing', 'air-temperature', 'pantropical', 
 'hapludalfs', 'epa', 'hyperion', 'nopp', 'tropical', 'sst', 'annual', 'mod13q1', 'isothermality', 'rema', 'prism', 'psn', 't1', 'gldas', 'worldclim', 'bio2', 
 'l1', 'forest', 'uvai', 'tellus', 'yearly', 'fapar', 'mod44w', 'smoothed', 'clc', 'eea', '', 'gtopo30', 'ndvi', 'lt04', 'bio1', 'surface-reflectance', 'diurnal',
  'antarctica', 'texture', 'biome', 'etm', 'daymet', 'ch4', 'water', 'tir', 'bio12', 'gimms', 'landforms', 'visible', '4-day', 'warmest', 'avnir-2', 'ahn', 'bio3', 
  'optical', 'wetness', 'lidar', 'sea-ice', 'toa', 'power-plants', 'bulk', 'tier2', 's5p', 'lc08', 'maca', 'nlcd', 'reanalysis', 'vegetation', 'landcover', 'evi', 
  'density', 'eosdis', 'srtm', 'fmask', 'polar', 'humidity', 'igpb', 'mod10a1', 'runoff', 'aafc', 'nass', 'demography', 'envirometrix', 'bio9', 'temperature', 
  'history', 'oregonstate', 'highres', 'lights', 'recurrence', 'tiger', 'water', 'protected', 'ldas', 'gfw', 'reflectance', 'co', 'hourly', 'npp', 
  'evapotranspiration', 'twente', 'biomass', 'slope', 'atmospheric', 'l2', 'uofi', 'shrub', 'rtma', 'mask', 'oli', 'sulfur-dioxide', 'mcd12q1', 'mod09q1', 
  'boundaries', 'goes', 'wwf', 'fundamental', 'sentinel', 'sr', 'rt', 'vegetation', 'mod11a2', 'landsat-derived', 'intertidal', 'forests', 'pathfinder', 
  'olci', 'organic', 'shrubland', 'mod09a1', 'lst-derived', 'visibility', 'geoscience-australia', 'probav', 'visible', 'political', 'gpw', 'soil-depth', 
  'atmosphere', 'human-modification', 'vito', 'blm', 'digital-soil-mapping', 'tree-cover', 'bio13', 'pollution', 'bio14', 'viirs', 'rgb', 'naip', 'arctic', 
  'myd11a1', 'social', 'cdl', 'sar', 'swir', 'stray-light', 'jrc', 'geophysical', 'myd09a1', 'canopy', 'antarctica', 'mod08', 'eorc', 'nrt', 'wildfire', 'nhc', 
  'demographic', 'backscattering', 'mcd43a1', 'ergo', 'gridmet-derived', 'biodiversity', 'zipcode', 'fldas', 'vnp09ga', 'aspect', 'seawifs', 'dem', 'gfz', 'eu', 
  'mrlc', 'us', 'no2', 'accumulation', 'radiance', 'argillic', 'tree', 'jaxa', 'aai', 'murray', 'hansen', 'precipitation', 'nfdrs', 'gridmet', 'ncar', 'umn', 
  'proba', 'tirs', 'alos', 'chlorophyll', 'precipitable', 'drought', 'bio16', 'heat', 'skysat', 'mascon', 'mod13a2', '3-hourly', 'myd14a2', 'bira', 'lst', 'smos',
   'oxford', 'metdata', 'biology', 'nitrogen-dioxide', 'lidar', 'nighttime', 'carbon', 'openlandmap', 'hotspot', 'nrcan', 'glcf', 'neighborhood', 'forma', 
   'myd09gq', 'velocity', 'landsat', 'fpar', 'roads', 'bio10', 'oceandata', 'protection', 'gross-primary-product', 'pdsi', 'maiac', 'glas', 'air-quality', 
   'ecoregions', 'slga', 'zcta', 'albedo', 'friction', 'usgs', 'hsl', 'era5', 'water-temp', 'palmer', 'pressure', 'globalsoilmap', 'grace', 'uq', 'gimp', 
   'hydrography', 'tidal-flats', 'tasseled-cap', 'isccp', 'bio15', 'mod09ga', 'terra', 'nldas', 'eog', 'cpom', 'nsidc', 'ozone', 'copernicus', 'borders', 
   'lt8', 'usdos', 'gfs', 'dem', 'mod14a1', 'tcb', 'productivity', 'white-sky', 'iucn', 'hcho', 'height', 'ocean', 'settlements', 'monitoring', 'le07', 'goes-r', 
   'daily', 'lt4', 'zip', 'dlr', 'sr', 'fireburning', '30-year', 'onset-greenness', 'metop', 'fire', 'ged', 'radiance', 'surface-temperature', 'o3', 'tier1', 
   'alos2', 'gls', 'wettest', 'flux', 'half-hourly', 'surface', 'real-time', 'landfire', 'gpm', 'mcd45a1', 'builtup', 'climate', 'thermal', 'lm5', 'cloud', 
   'forcing', 'modis', 'whoi', 'sand', 'clay', 'cdem', 'evi', 'population', 'forest', 'states', 'wdpa', 'ucsb', 'lc8', 'mod16a2', 'myd10a1', 'urban', 'pgc', 
   'whrc', 'utokyo', 'evaporation', 'soil-moisture', 'ciesin-derived', 'tropomi', 'precipitation', 'flow', 'carbon-monoxide', 'ecmwf', 'day', 'ornl', 'calibrated',
    'ssh', 'fire', 'csp', 'myd14a1', 'emissivity', 'productivity', 'vnp13a1', 'dewpoint', 'radar', 'mcd115a3h', 'aura', 'gddp', 'radarsat-1', 'goes-s', 'global', 
    'city', 'berkeley', 'bio18', 'temperature', 'fsa', 'landscape-gradient', 'snow', 'palsar', 'monthly', 'ucb', 'wtlab', 'chg', 'drainage', 'global', 'myd08-m3',
    'map', 'lm3', 'burn', 'mss', 'watershed', 'wri', 'l5', 'glad', 'soil', 'radiation', 'deforestation', 'gpp', 'multitemporal', 'driest', 'lima', 'cryosat-2', 
    'etopo1', 'lt05', 'firms', '8-day', 'polarization', 'arctic', 'persiann', 'watercontent', 'bio4', 'knmi', 'sulphur-dioxide', 'mod09gq', 'coldest', 
    'landcover', 'ph', 'omi', 'resolve', 'hycom', 'csu', 'conservation', 'osu', 'umd', 'mod17', 'mosaic', 'conditioned', 'smap', 'orthorectified', 'bio8', 
    'dnb', 'land', 'imagery', 'human', 'ncdc', 'crop', 'lance', 'greenland', 'soil-temperature', 'cmip5', 'sron', 'bedrock', 'conus', 'aot', 'goes-16', 'igsnrr',
    'noaa', 'lst', 'mod17a3', 'wbd', 'sst', 'wind', 'void-filled', 'gpp', 'bathymetry', '16-day', 'mod44b', 'mod14a2', 'habitats', 'ols', 'aboveground', 'bio11', 
    'globcover', 'eo-1', 'marine', 'mod15a2h', 'l7', 'myd09ga', 'mcd43b3', 'energy', 'direction', 'aqua', 'land', 'pansharpened', 'lai', 'phenology', 'power', 
    'aerial', 'geostationary', 'ledaps', 'abi', 'l3', 'bio6', 'salinity', 'mcd43a3', 'wcmc', 'poes', 'mpa', 'tnc', 'potential', 'trmm', 'lm4', 'mod11a1']
// auto completes queryInput with above array
autocomplete(queryInput, autoCompleteList);

