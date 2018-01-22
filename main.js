/* Input: Object with attributes of six cities required for map */
var cities = [
	{name: "Kiev", lonlat: [30.523400, 50.450100], color: '#006699', id:"pan-to-kiev",
		content:"B.Sc. in Geodesy, Cartography and Land Planning at National Aviation University from 2009 till 2013; B.Sc. in Mathematics, M.Sc. in Cartography at Taras Shevchenko Kiev National University from 2010 till 2015 and from 2013 till 2015."},
	{name: "Munich", lonlat: [11.581980, 48.135125], color: '#AB4450', id:"pan-to-munich",
		content:"M.Sc. in Cartography at Technical University of Munich from 2015 till 2017."},
	{name: "Vienna", lonlat: [16.373819, 48.208174], color: '#93648D', id:"pan-to-vienna",
		content:"M.Sc. in Cartography at Technical University of Vienna from 2015 till 2017."},
	{name: "Dresden", lonlat: [13.737262, 51.050409], color: '#FFC65D', id:"pan-to-dresden",
		content:"M.Sc. in Cartography at Technical University of Dresden from 2015 till 2017."},
	{name: "Enschede", lonlat: [6.893662, 52.221537], color: '#F16745', id:"pan-to-enschede",
		content:"M.Sc. in Cartography at University of Twente from 2015 till 2017."},
	{name: "Bonn", lonlat: [7.0954900, 50.7343800], color: '#4CC3D9', id:"pan-to-bonn",
		content:"The future starts here!"},
];

/* Functionality #1: Colored icons */
/* Creates icons with different colors for each of six cities */
var city_features = [];

for (var city in cities) {

	var city_feat = new ol.Feature({
		geometry: new ol.geom.Point(ol.proj.fromLonLat(cities[city]["lonlat"])),
		content: cities[city]["content"],
		title: cities[city]["name"]
	});

	city_feat.setStyle(new ol.style.Style({
		image: new ol.style.Icon(/** @type {olx.style.IconOptions} */ ({
			color: cities[city]["color"],
			crossOrigin: 'anonymous',
			src: 'https://openlayers.org/en/v4.6.4/examples/data/dot.png'
		}))
	}));

	city_features.push(city_feat);

};

/* Creates a vector source with cities' features */
var vectorSource = new ol.source.Vector({
	features: city_features
});

/* Creates a vector layer from vector source with cities' features */
var vectorLayer = new ol.layer.Vector({
	source: vectorSource
});

/* Represents a simple view of the map with customized center, projection and zoom level */
var view = new ol.View({
	center: ol.proj.transform([17, 51.65], 'EPSG:4326', 'EPSG:3857'),
	zoom: 5
});

/* Creates a map (based on Stamen 'terrain' basemap styling) and additional map elements */
var map = new ol.Map({
	layers: [
		new ol.layer.Tile({
			source: new ol.source.Stamen({
				layer: 'terrain'
			})
		}),
		vectorLayer
	],
	target: 'map',
	view: view,
});

/* Functionality #2: Animations on the map evoked by clicking corresponding buttons */
/* Creates a basic click function that reacts to each button with unique id */
function onClick(id, callback) {
	document.getElementById(id).addEventListener('click', callback);
};

/* Creates a basic pan to the city click function */
cities.forEach(city => {
	onClick(city.id, () => {
		view.animate({
			center: ol.proj.fromLonLat(city["lonlat"]),
			zoom: view.getZoom(),
			duration: 1500
		});
	});
});

/* Creates an itinerary click function through each of six cities */
var city_locations = [];

for (var city in cities) {
	city_locations.push(ol.proj.fromLonLat(cities[city]["lonlat"]));
};

function MoveTo(location, done) {
	var duration = 2000;
	var zoom = view.getZoom();
	var parts = 2;
	var called = false;
	function callback(complete) {
		--parts;
		if (called) {
			return;
		}
		if (parts === 0 || !complete) {
			called = true;
			done(complete);
		}
	}
	view.animate({
		center: location,
		duration: duration
	}, callback);
	view.animate({
		zoom: zoom,
		duration: duration / 2
	}, {
		zoom: zoom,
		duration: duration / 2
	}, callback);
}

function tour() {
	var index = -1;
	function next(more) {
		if (more) {
			++index;
			if (index < city_locations.length) {
				var delay = index === 0 ? 0 : 750;
				setTimeout(function() {
					MoveTo(city_locations[index], next);
				}, delay);
			}
		}
	}
	next(true);
};

onClick('educational-tour', tour);

/* Functionality #3: Popups on the map evoked by clicking on the city icons */
/* Creates popup boxes when click on city icons */
var element = document.getElementById('popup');

var popup = new ol.Overlay({
	element: element,
	positioning: 'bottom-center',
	stopEvent: false,
	offset: [0, 0]
});

map.addOverlay(popup);

var popup_content;
var city_name;

map.on('click', function(evt) {
	var feature = map.forEachFeatureAtPixel(evt.pixel,
		function(feature) {
			return feature;
		});
	if (feature) {
		var coordinates = feature.getGeometry().getCoordinates();
		popup_content = feature.get('content');
		city_name = feature.get('title');
		popup.setPosition(coordinates);
		$(element).popover({
			'title': function() {
				return 'Professional experience in ' + city_name
			},
			trigger: 'focus',
			'html': true,
			'container': element,
			'boundary': 'window',
			'content': function() {
				return popup_content
			}
		});
		$(element).popover('show');
	} else {
		$(element).popover('destroy');
	}
});

map.on('pointermove', function (evt) {
	var pixel = map.getEventPixel(evt.originalEvent);
	var hit = map.hasFeatureAtPixel(pixel);
	map.getViewport().style.cursor = hit ? 'pointer' : '';
});
