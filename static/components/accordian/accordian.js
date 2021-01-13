const elementIdKey = 'elementId'

function displayAccordianValues(values, selections, configOptions) {
    var config = {
        elementIdKey: '',
        selected: () => { },
        ...configOptions
    }

    if (validConfig(config)) {
        $(config[elementIdKey]).empty();

        values = values.concat(selections).sort()

        if (values.length > 0) {


            valueEls = ''
            values.forEach(value => {
                isSelection = (selections.indexOf(value) !== -1)

                text = undefined
                if (configOptions.tooltip_text) {
                    text = configOptions.tooltip_text(value).trim()
                }

                valueEls += `<li class ="` + (isSelection ? 'selection' : 'option') + " " + ((text && text.length > 0) ? 'tooltip' : '') + `"` + 
                ((text && text.length > 0) ? (` title="` + text + `"`) : '') +`>`
                    + value +
                    (isSelection ? `<span class="uk-badge delete-badge"><i class="fas fa-times"></i></span>` : '')
                    + `</li>`

            });
            $(config[elementIdKey]).append($('<ul class="uk-list uk-list-large">' + valueEls + '</ul>'))

            var listOptions = $(config[elementIdKey] + '>ul>li.option')

            if ('selected' in config) {
                listOptions.click(config.selected)
            }

            if ('mouseover' in config) {
                listOptions.mouseover(config.mouseover)
            }
            if ('mouseout' in config) {
                listOptions.mouseout(config.mouseout)
            }

            if ('deselected' in config) {
                $('.jBox-wrapper').remove()
                $(config[elementIdKey] + '>ul>li.selection').click(config.deselected)
            }

            new jBox('Tooltip', {
                attach: '.tooltip',
                preventDefault: true,
                closeOnMouseleave: true,
                addClass: 'custom-tooltip',
                position: {
                    x: 'right',
                    y: 'center'
                },
                outside: 'x',
                adjustPosition: true,
                adjustTracker: true,
                delayOpen: 200
            });
        } else {
            html = valueEls += '<li>' + value + '</li>'

            $(config[elementIdKey]).html(config.emptyText);

            var listElement = $(config[elementIdKey] + '>ul>li')
            if ('selected' in config) {
                listElement.click(config.selected)
            }
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