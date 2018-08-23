const elementIdKey = 'elementId'

function displayAccordianValues(values, configOptions) {
    var config = {
        elementIdKey: '',
        selected: () => { },
        ...configOptions
    }

    if (validConfig(config)) {
        valueEls = ''
        values.forEach(value => {
            valueEls += '<li>' + value + '</li>'
        });
        console.log('valueEls', valueEls)

        $(configOptions[elementIdKey]).append($('<ul class="uk-list uk-list-large">' + valueEls + '</ul>'))

        var listElement = $(configOptions[elementIdKey] + '> ul')

        if ('selected' in config) {
            listElement.click(config.selected)
        }

        if ('mouseover' in config) {
            listElement.mouseover(config.mouseover)
        }
        if ('mouseout' in config) {
            listElement.mouseout(config.mouseout)
        }
    }

}

function validConfig(config) {
    var validConfig = true;
    if (propertyMissingOrEmpty(config, elementIdKey)) {
        console.error("Missing required accordian key '" + elementIdKey + "'")
        return false;
    }

    return true;
}

function propertyMissingOrEmpty(object, propertyKey) {
    return (!(propertyKey in object) || object[propertyKey].length === 0)
}