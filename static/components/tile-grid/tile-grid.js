
    function updateTileGrid(selector, tileElements, tileGridConfig) {
        var targetElement = $(selector);
        targetElement.empty();
        if (!tileElements.length) {
            var noVendorsMessage = '<p class="empty-tile-grid-message" style="text-align: center;">' + tileGridConfig.emptyText + '</p>';
            targetElement.append(noVendorsMessage);
        }

        tileElements.forEach(tileElement => {
            targetElement.append($(`
                <div class="tile" id="` + tileGridConfig.idMap(tileElement) + `">`
                + tileGridConfig.tileContent(tileElement) +
                `</div>`
            ));
        })

        $('.tile').click(event => {
            tileGridConfig.tileSelected(event.currentTarget.id)
        })
    }
