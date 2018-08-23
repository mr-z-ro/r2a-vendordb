
function uniqueProperties(data, propertyName) {
    var properties = []
    data.forEach((dataEl) => {
        if (propertyName in dataEl) {

            var property = dataEl[propertyName]
            if (property.constructor === Array) {
                property.forEach(prop => {
                    var trimmedProp = prop.trim()
                    if (properties.indexOf(trimmedProp) === -1) {
                        properties.push(trimmedProp)
                    }
                })
            } else {
                var trimmedProp = property.trim()
                if (properties.indexOf(trimmedProp) === -1) {
                    properties.push(trimmedProp)
                }
            }

        }
    })
    return properties
}