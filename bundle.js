/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

eval("/* Input: Object with attributes of six cities required for map */\nvar cities = [\n  {name: \"Kiev\", lonlat: [30.523400, 50.450100], color: '#006699', id:\"pan-to-kiev\",\n    content:\"B.Sc. in Geodesy, Cartography and Land Planning at National Aviation University from 2009 till 2013; B.Sc. in Mathematics, M.Sc. in Cartography at Taras Shevchenko Kiev National University from 2010 till 2015 and from 2013 till 2015.\"},\n  {name: \"Munich\", lonlat: [11.581980, 48.135125], color: '#AB4450', id:\"pan-to-munich\",\n    content:\"M.Sc. in Cartography at Technical University of Munich from 2015 till 2017.\"},\n  {name: \"Vienna\", lonlat: [16.373819, 48.208174], color: '#93648D', id:\"pan-to-vienna\",\n    content:\"M.Sc. in Cartography at Technical University of Vienna from 2015 till 2017.\"},\n  {name: \"Dresden\", lonlat: [13.737262, 51.050409], color: '#FFC65D', id:\"pan-to-dresden\",\n    content:\"M.Sc. in Cartography at Technical University of Dresden from 2015 till 2017.\"},\n  {name: \"Enschede\", lonlat: [6.893662, 52.221537], color: '#F16745', id:\"pan-to-enschede\",\n    content:\"M.Sc. in Cartography at University of Twente from 2015 till 2017.\"},\n  {name: \"Bonn\", lonlat: [7.0954900, 50.7343800], color: '#4CC3D9', id:\"pan-to-bonn\",\n    content:\"The future starts here!\"},\n];\n\n/* Functionality #1: Colored icons */\n/* Creates icons with different colors for each of six cities */\nvar city_features = [];\n\nfor (var city in cities) {\n\n  var city_feat = new ol.Feature({\n    geometry: new ol.geom.Point(ol.proj.fromLonLat(cities[city][\"lonlat\"])),\n    content: cities[city][\"content\"],\n    title: cities[city][\"name\"]\n  });\n\n  city_feat.setStyle(new ol.style.Style({\n    image: new ol.style.Icon(/** @type {olx.style.IconOptions} */ ({\n      color: cities[city][\"color\"],\n      crossOrigin: 'anonymous',\n      src: 'https://openlayers.org/en/v4.6.4/examples/data/dot.png'\n    }))\n  }));\n\n  city_features.push(city_feat);\n\n};\n\n/* Creates a vector source with cities' features */\nvar vectorSource = new ol.source.Vector({\n  features: city_features\n});\n\n/* Creates a vector layer from vector source with cities' features */\nvar vectorLayer = new ol.layer.Vector({\n  source: vectorSource\n});\n\n/* Represents a simple view of the map with customized center, projection and zoom level */\nvar view = new ol.View({\n  center: ol.proj.transform([17, 51.65], 'EPSG:4326', 'EPSG:3857'),\n  zoom: 5\n});\n\n/* Creates a map (based on Stamen 'terrain' basemap styling) and additional map elements */\nvar map = new ol.Map({\n  layers: [\n    new ol.layer.Tile({\n      source: new ol.source.Stamen({\n        layer: 'terrain'\n      })\n    }),\n    vectorLayer\n  ],\n  target: 'map',\n  view: view,\n});\n\n/* Functionality #2: Animations on the map evoked by clicking corresponding buttons */\n/* Creates a basic click function that reacts to each button with unique id */\nfunction onClick(id, callback) {\n  document.getElementById(id).addEventListener('click', callback);\n};\n\n/* Creates a basic pan to the city click function */\ncities.forEach(city => {\n  onClick(city.id, () => {\n    view.animate({\n      center: ol.proj.fromLonLat(city[\"lonlat\"]),\n      zoom: view.getZoom(),\n      duration: 1500\n    });\n  });\n});\n\n/* Creates an itinerary click function through each of six cities */\nvar city_locations = [];\n\nfor (var city in cities) {\n  city_locations.push(ol.proj.fromLonLat(cities[city][\"lonlat\"]));\n};\n\nfunction MoveTo(location, done) {\n  var duration = 2000;\n  var zoom = view.getZoom();\n  var parts = 2;\n  var called = false;\n  function callback(complete) {\n    --parts;\n    if (called) {\n      return;\n    }\n    if (parts === 0 || !complete) {\n      called = true;\n      done(complete);\n    }\n  }\n  view.animate({\n    center: location,\n    duration: duration\n  }, callback);\n  view.animate({\n    zoom: zoom,\n    duration: duration / 2\n  }, {\n    zoom: zoom,\n    duration: duration / 2\n  }, callback);\n}\n\nfunction tour() {\n  var index = -1;\n  function next(more) {\n    if (more) {\n      ++index;\n      if (index < city_locations.length) {\n        var delay = index === 0 ? 0 : 750;\n        setTimeout(function() {\n          MoveTo(city_locations[index], next);\n        }, delay);\n      }\n    }\n  }\n  next(true);\n};\n\nonClick('educational-tour', tour);\n\n/* Functionality #3: Popups on the map evoked by clicking on the city icons */\n/* Creates popup boxes when click on city icons */\nvar element = document.getElementById('popup');\n\nvar popup = new ol.Overlay({\n  element: element,\n  positioning: 'bottom-center',\n  stopEvent: false,\n  offset: [0, 0]\n});\n\nmap.addOverlay(popup);\n\nvar popup_content;\nvar city_name;\n\nmap.on('click', function(evt) {\n  var feature = map.forEachFeatureAtPixel(evt.pixel,\n    function(feature) {\n      return feature;\n    });\n  if (feature) {\n    var coordinates = feature.getGeometry().getCoordinates();\n    popup_content = feature.get('content');\n    city_name = feature.get('title');\n    popup.setPosition(coordinates);\n    $(element).popover({\n      'title': function() {\n        return 'Professional experience in ' + city_name\n      },\n      trigger: 'focus',\n      'html': true,\n      'container': element,\n      'boundary': 'window',\n      'content': function() {\n        return popup_content\n      }\n    });\n    $(element).popover('show');\n  } else {\n    $(element).popover('destroy');\n  }\n});\n\nmap.on('pointermove', function (evt) {\n  var pixel = map.getEventPixel(evt.originalEvent);\n  var hit = map.hasFeatureAtPixel(pixel);\n  map.getViewport().style.cursor = hit ? 'pointer' : '';\n});\n\n\n//////////////////\n// WEBPACK FOOTER\n// ./main.js\n// module id = 0\n// module chunks = 0\n\n//# sourceURL=webpack:///./main.js?");

/***/ })
/******/ ]);