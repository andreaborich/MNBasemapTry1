mapboxgl.accessToken = "pk.eyJ1IjoiYWJvcmljaCIsImEiOiJjazNoZ3MxanMwY2l0M25uanhybGNqNXFrIn0.5bmkiPVvApzHyRJsQgYfgg";
var map = new mapboxgl.Map({
  container: "map",
  style: "mapbox://styles/mapbox/satellite-v9",
  zoom: 6,
  center: [-93.289,46.481]
});

map.on("load", function() {
  map.addSource("shp_bdry_counties-7kstqe", {
    type: "vector",
    url: "mapbox://aborich.6zvbr8xw"
  });
  map.addLayer({
    id: "County Boundaries",
    type: "fill",
    source: "shp_bdry_counties-7kstqe",
    layout: {
      visibility: "visible"
    },
    paint: {
      "fill-color": "rgba(255,255,255,0.4)",
      "fill-outline-color":"rgba(0,0,0,1)",
    },
    "source-layer": "shp_bdry_counties-7kstqe"
  });

  map.addSource("contours", {
    type: "vector",
    url: "mapbox://mapbox.mapbox-terrain-v2"
  });
  map.addLayer({
    id: "contours",
    type: "line",
    source: "contours",
    "source-layer": "contour",
    layout: {
      visibility: "visible",
      "line-join": "round",
      "line-cap": "round"
    },
    paint: {
      "line-color": "#877b59",
      "line-width": 1
    }
  });
});

var toggleableLayerIds = ["contours", "County Boundaries"];

for (var i = 0; i < toggleableLayerIds.length; i++) {
  var id = toggleableLayerIds[i];

  var link = document.createElement("a");
  link.href = "#";
  link.className = "active";
  link.textContent = id;

  link.onclick = function(e) {
    var clickedLayer = this.textContent;
    e.preventDefault();
    e.stopPropagation();

    var visibility = map.getLayoutProperty(clickedLayer, "visibility");

    if (visibility === "visible") {
      map.setLayoutProperty(clickedLayer, "visibility", "none");
      this.className = "";
    } else {
      this.className = "active";
      map.setLayoutProperty(clickedLayer, "visibility", "visible");
    }
  };

  var layers = document.getElementById("menu");
  layers.appendChild(link);
}
