
// Updating Filter Selections

function addFilter(key, value, completion) {
    selectedFilters[key].push(value);
    if (completion !== undefined) {
        completion()
    }
}

function removeAllFilters(completion) {
    Object.keys(selectedFilters).forEach(filterKey => {
        selectedFilters[filterKey] = []
    })
    if (completion !== undefined) {
        completion()
    }
}

function removeFilter(value, completion) {
    Object.keys(selectedFilters).forEach(filterKey => {
        var index = selectedFilters[filterKey].indexOf(value.trim())
        if (index !== -1) { selectedFilters[filterKey].splice(index, 1) }
    });
    if (completion !== undefined) {
        completion()
    }
}

// Convenience Methods

function findFilterKeyForValue(filterOptions, value) {
    found = undefined
    Object.keys(filterOptions).forEach(filterKey => {
        var index = filterOptions[filterKey].indexOf(value.trim())
        if (index !== -1) {
            found = filterKey
        }
    });
    return found
}

function filterCount(filters) {
    numFilters = 0
    Object.keys(filters).forEach(filterKey => {
        numFilters += filters[filterKey].length
    })
    return numFilters
}

function updateSelectedFiltersUI(selector, filters, selectionCallback) {
    $(selector).empty()
    filterHTML = ''

    if (filterCount(selectedFilters) > 0) {
        Object.keys(filters).forEach(filterKey => {
            var sectionFilters = filters[filterKey]
            console.log(sectionFilters);
            sectionFilters.forEach(filter => {
                filterHTML += '<div class="filter dark-border light-button">' + filter + ' <i class="fa fa-times" aria-hidden="true"></i></div>'
            });
        });
        filterPrefix = 'Filter' + (numFilters !== 1 ? 's' : '') + ': &nbsp;&nbsp;'
        filterHTML = filterPrefix + '<div style="display:inline-block;">' + filterHTML + '</div>'
    }

    $(selector).html(filterHTML)

    $('.filter').click(selectionCallback)
}