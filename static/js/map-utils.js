function createMap(config) {
    var contents = document.getElementById(config.containerElementId);
    contents.innerHTML = '<div id="' + config.mapId + '" style="'+ config.mapStyle +'"></div>'
    var map = L.map(config.mapId, config);
    var osm = new L.TileLayer(config.osmUrl, config);
    map.addLayer(osm);
    zoomToShowAllBounds(map, config.latLonBounds)
    return map
}

function zoomToShowAllBounds(map, bounds){
    map.fitBounds(bounds)
}
