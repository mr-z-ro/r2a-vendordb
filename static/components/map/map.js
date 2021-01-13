var map
var geojsonLayer
mapConfig = {}

function createMap(config) {
    console.log(config)
    mapConfig = config
    var contents = document.getElementById(mapConfig.containerElementId);
    contents.innerHTML = '<div id="' + mapConfig.mapId + '" style="' + mapConfig.mapStyle + '"></div>'
    var map = L.map(mapConfig.mapId, mapConfig);
    var osm = new L.TileLayer(mapConfig.osmUrl, mapConfig);
    map.addLayer(osm);
    return map
}

function updateMap(mapData) {
    if (geojsonLayer !== undefined) {
        map.removeLayer(geojsonLayer)
    }

    console.log('mapData', mapData)
    geojsonLayer = L.geoJson(mapData, {
        style: mapConfig.getStyle,
        onEachFeature: (feature, layer) => {
            layer.on({
                mouseover: highlightFeature,
                mouseout: resetHighlight,
                click: mapConfig.selection
            })
        }
    }).addTo(map);
    map.fitBounds(geojsonLayer.getBounds());
}

function createLegend(legendConfig, legendCategories) {
    var mapLegend = L.control(legendConfig);

    console.log("Legend Map Config: ", mapConfig)


    mapLegend.onAdd = function (map) {
        div = L.DomUtil.create('div', 'map-overlay map-legend')
        labels = [];

        for (var i = 0; i < legendCategories.length; i++) {
            div.innerHTML += '<div class="map-legend-item"><i style="background:' + mapConfig.getColor(i) + '"></i> ' + legendCategories[i] + '</div>';
        }
        return div;
    };
    return mapLegend
}

function createOverlay(overlayConfig) {
    mapOverlay = L.control(overlayConfig);

    mapOverlay.update = function (props) {
        if (overlayConfig.hoverOnly === true) {
            style = 'display: ' + ((props !== undefined) ? 'block' : 'none') + ";"
            this._div.setAttribute('style', style)
        }
    };

    mapOverlay.onAdd = function (map) {
        this._div = L.DomUtil.create('div', 'map-overlay'); // create a div with a class "map-overlay"
        this._div.innerHTML = overlayConfig.innerHTML
        this.update();
        return this._div;
    };
    return mapOverlay
}

function highlightFeature(e) {
    var layer = e.target;
    var color = mapConfig.getColor(mapConfig.indexFromFeature(layer.feature))

    layer.setStyle({...mapConfig.getHighlightStyle, color: color });

    if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
        layer.bringToFront();
    }

    mapOverlay.update(layer.feature.properties);
}

function resetHighlight(e) {
    style = mapConfig.getStyle(e.target.feature)
    e.target.setStyle(style)
    mapOverlay.update();
}