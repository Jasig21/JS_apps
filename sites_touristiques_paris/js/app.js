
/**************** Création de l'objet ol map ***************/

var map = new ol.Map({
  target: 'map',
  layers: [
    new ol.layer.Tile({
      source: new ol.source.OSM()
    })
  ],
  view: new ol.View({
    center: ol.proj.fromLonLat([2.347479, 48.860730]),  
    zoom: 12
  }),
  controls: ol.control.defaults().extend([
    new ol.control.FullScreen(),
    new ol.control.ScaleLine(),
    ])
});



/**************** Couche des zones touristiques de Paris ***************/

//Objet GeoJSON des zones touristiques de Paris 
var zonesTouristiques = JSON.parse(zonesTouristiquesGeojson);

//Transformation en couche vecteur 
var geojsonTour = new ol.format.GeoJSON()
var touristFeatures = geojsonTour.readFeatures(zonesTouristiques, {featureProjection : 'EPSG:3857'});
var TourGeoJsonSource = new ol.source.Vector({
    features : touristFeatures
})

//Style de la couche 
var touristStyle = new ol.style.Style({
    stroke: new ol.style.Stroke({
        color: "#6b6b6b",
        width: 1
    }),

    fill: new ol.style.Fill({
        color: "black"
    })
})

//Création de la couche 
var touristLayer = new ol.layer.Vector({
    source: TourGeoJsonSource,
    style: touristStyle
});

//Liaison de la couche au checkbox avec un événement 
var touristZonesCheckBox = document.getElementById("zones-touristiques-paris");
touristZonesCheckBox.addEventListener("click", function (event){
    touristLayer.setVisible(event.target.checked);
    event.stopPropagation();
})



/**************** Couche des arrondissements de Paris ***************/

// Objet geojson des arrondissements 
var arrondissements = JSON.parse(arrondissementsGeoJson);

//Transformation en couche vecteur
var geojsonArr = new ol.format.GeoJSON()
var arrFeatures = geojsonArr.readFeatures(arrondissements, {featureProjection : 'EPSG:3857'});
var arrGeoJsonSource = new ol.source.Vector({
    features : arrFeatures
})

//Style de la couche retourné par une fonction basée sur le code arrondissement des features 
var styleFunction = function (feature){
    //la méthode getProperties va nous permettre de récupérer la valeur du code arrondissement de chaque feature
    var codeArr = feature.getProperties().c_ar;   

    var colors = {
        1: [85, 158, 150],
        2: [189, 111, 124],
        3: [140, 221, 248],
        4: [251, 255, 181],
        5: [184, 189, 255],
        6: [255, 184, 243],
        7: [191, 238, 205],
        8: [164, 212, 254],
        9: [217, 192, 166],
        10: [255, 200, 143],
        11: [63, 167, 214],
        12: [211, 220, 36],
        13: [35, 37, 157],
        14: [158, 85, 152],
        15: [85, 164, 109],
        16: [126, 97, 206],
        17: [109, 144, 173],
        18: [122, 84, 46],
        19: [252, 119, 83],
        20: [0, 129, 167],
    }

    var featureColor = colors[codeArr];

    if (!featureColor) {
        featureColor = "gray";
    };

    return new ol.style.Style({
        stroke: new ol.style.Stroke({
            color: "#6b6b6b",
            width: 1,
        }),

        fill: new ol.style.Fill({
            color: featureColor
        })
    });
};

//Création de la couche 
var arrondissementsLayer = new ol.layer.Vector({
    source: arrGeoJsonSource,
    style: styleFunction
});

arrondissementsLayer.setOpacity(0.7)

//Liaison de la couche au checkbox avec un événement 
var arrondissementsCheckBox = document.getElementById("arrondissement-paris");
arrondissementsCheckBox.addEventListener("click", function (event){
    arrondissementsLayer.setVisible(event.target.checked);
    event.stopPropagation();
})
    


/**************** Couche des sites touristiques de Paris ***************/

//Conversion du tableau des sites touristiques en une liste d'objets 
class Site {
    constructor (nom, codePostal, adresse, lon, lat) {
        this.nom = nom;
        this.codePostal = codePostal;
        this.adresse = adresse;
        this.lon = lon;
        this.lat = lat
    }

    getDescription () {
        return this.nom + ' est un site touristique situé dans le' + this.codePostal+ ' de Paris, à ' + this.adresse
    }    
}

//Déclaration de tous les sites 
var louvre = new Site('Musée du Louvre', 75101, "ENTRÉE PRINCIPALE PAR LA PYRAMIDE",  2.33581863894,   48.8609963623);
var palaisCongrès = new Site('Palais des congrès', 75117, "2, PLACE DE LA PORTE MAILLOT, CEDEX 17", 2.28316017256, 48.8786328114);
var cathédraleND  = new Site('Cathédrale ND de Paris', 75104, "6 PLACE DU PARVIS ND", 2.34991335251, 48.8529615431);
var arcTriomphe = new Site('Arc de triomphe', 75108, "PLACE CHARLES DE GAULLE", 2.2954977352, 48.8736689226);
var opera = new Site('Opéra national de Paris - palais Garnier', 75109, "8 rue Scribe", 2.33047528573, 48.8716033061);
var tourEiffel = new Site('Tour Eiffel', 75107, "CHAMP DE MARS", 2.29505953467, 48.8578733005);
var centrePompidou = new Site('Centre Pompidou', 75104, "PLACE GEORGES POMPIDOU", 2.35244570795, 48.8605100459);
var pantheon = new Site('Panthéon', 75105, "PLACE DU PANTHÉON", 2.34562448244, 48.8463050337);
var montmartre = new Site('Basilique du sacré-coeur de Montmartre', 75118, "35 RUE DU CHEVALIER-DE-LA-BARRE - PARVIS DU SACRÉ COEUR", 2.34340214701, 48.8871779194);

//Ajout de chaque variable à un tableau 
var sites = [];
sites.push(louvre);
sites.push(palaisCongrès);
sites.push(cathédraleND);
sites.push(arcTriomphe);
sites.push(opera);
sites.push(tourEiffel);
sites.push(centrePompidou);
sites.push(pantheon);
sites.push(montmartre);

//Style de la couche des sites
var iconStyle = new ol.style.Style({
    image: new ol.style.Icon ({
        anchor: [0.5, 1],
        src: "pin2.png"
    })
});

//Création des features et préparatif pour les popups : coords et details  
var siteFeatures = [];
for (site of sites) {
    var lon = site.lon;
    var lat = site.lat;
    var coords = [lon, lat];

    var projectedCoords = ol.proj.fromLonLat(coords);

    var feature = new ol.Feature({
        geometry: new ol.geom.Point(projectedCoords),
        name: site.nom,
        details: site.getDescription()
    });

    feature.setStyle(iconStyle);
    siteFeatures.push(feature);
}

//Création de la couche sites touristiques
let sitesLayerSource = new ol.source.Vector({
    features: siteFeatures
});

let sitesLayer = new ol.layer.Vector({
    source: sitesLayerSource,
    id: "sites" //cet Id sera utilisé pour les popups 
});

//Liaison de la couche au checkbox avec un événement 
var sitesCheckBox = document.getElementById("sites-touristiques-paris"); 
sitesCheckBox.addEventListener("click", function (event){
        sitesLayer.setVisible(event.target.checked);
        event.stopPropagation();
})



/******************Création de popups****************/
   
//Création de l'overlay du popup 
var container = document.getElementById("map-popup-content");
var popUp = document.getElementById("map-popup");

var popupOverlay = new ol.Overlay({
    element: popUp,
    positioning: 'bottom-center',
    offset: [0, -45]
});


//Création de la fonction de fermeture de la pop-up
function closePopup() {
    popupOverlay.setPosition(undefined);
}

//Ajouter l'événement clic à la carte
map.on("click", function pop(event) {
    closePopup();
    map.forEachFeatureAtPixel(event.pixel, (feature, layer) => {
        if (feature) {
            if (layer) {
                var layerId = layer.get("id");
                if (layerId === "sites") {
                    var coordinates = feature.getGeometry().getCoordinates();
                    popupOverlay.setPosition(coordinates);
                    container.innerHTML = feature.get("details");
                }
            }
        }
    });
});


/************** Ajout des différentes chouches à la carte ****************/
map.addLayer(arrondissementsLayer);
map.addLayer(touristLayer);
map.addLayer(sitesLayer);
map.addOverlay(popupOverlay);


//AND VOILA ! 

//J'ai bien aimé l'exercice, mais autant de lignes pour des popups hmmmm bon.
//Vive Leaflet ! Je retire si ça peut impacter ma note par contre... hihi 
