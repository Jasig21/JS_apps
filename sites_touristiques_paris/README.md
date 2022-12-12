# **Langages Web 3 ( JavaScript avancé )** 🌐

## **Projet final**

### Présentation

L’objectif de ce projet est de créer **une carte web des sites touristiques de Paris** avec les couches suivantes :

- Une couche de type raster : **un fond de carte Openstreetmaps**
- Une couche de polygones : **Les arrondissements de Paris**
- Une couche de polygones : **Les zones touristiques de Paris**
- Une couche de points : **Les principaux sites touristiques de Paris**

Le répertoire du projet est composé de :

- Le fichier **index.html** : le code HTML du projet
- Un dossier **/data** : contient les 2 fichiers de données

  - **arrondissements.js** : le geojson des arrondissements de Paris **(NE PAS MODIFIER)**
  - **zones-touristiques.js** : le geojson des zones touristiques de Paris **(NE PAS MODIFIER)**

- Le dossier **/js** :

  - **app.js** : contient la déclaration des variables de données geojson

- Le dossier **/css** :
  - **popup.css** : le code css de la popup

Le projet est basé sur les frameworks :

- Openlayers v6.5.0
- Bootstrap v 4.6.0

Les propriétés des objets geojson :

- **arrondissements** :

  - **c_ar** : le code arrondissement
  - l_aroff
  - surface
  - l_ar
  - n_sq_co
  - c_arinsee
  - geom_x_y
  - n_sq_ar
  - perimetre

- **zones-touristiques** :
  - \_id
  - \_user
  - type
  - \_version
  - \_changeset
  - name
  - boundary
  - \_timestamp
  - \_uid
  - geo_point_2d
  - source

### Création de la carte

1. Créer une carte openlayers dans l'élément html _#map_ avec les options suivantes:
   - Le fond de carte OpenStreetMaps
   - Une vue centrée sur Paris
   - Un contrôleur de carte: l'échelle linéaire

### Première couche : Les arrondissements de Paris 

1. Transformer l'objet geojson **arrondissements** _( voir app.js )_ à une couche de type vecteur avec le style suivant :

   - Bordure :
     - largeur : **1** ( pixel )
     - couleur : **#6b6b6b**
   - Remplissage :
     - opacité : **0.7**
     - couleur : utiliser **une couleur déferente pour chaque arrondissement**.

   > **_NOTE :_** Après la transformation de l'objet geojson **arrondissements** à une liste de features. Chaque **feature** possèdera la propriété **c_ar** ( code arrondissement ). Utilisez cette propriété pour modifier la couleur du style.

2. Ajouter la couche des arrondissements à la carte et lier sa visibilité à la checkbox **_Arrondissements_**.



### Deuxième couche : Les zones touristiques de Paris

1. Transformer l'objet geojson **zonesTouristiques** _( voir app.js )_ à une couche de type vecteur avec le style suivant :

   - Bordure :
     - largeur : **1** ( pixel )
     - couleur : **à choisir**
   - Remplissage :
     - opacité : **1**
     - couleur : **une seule couleur (au choix) pour toutes les zones touristiques**.

2. Ajouter la couche des zones touristiques à la carte et lier sa visibilité à la checkbox **_Zones touristiques_**.





### Troisième couche : Les principaux sites touristiques de Paris

1. Créer la classe **Site** avec les propriétés et les méthodes suivantes:

   - **Les propriétés**

     - **nom:** Le nom
     - **codeArrondissement:** Le code arrondissement
     - **adresse:** L'adresse
     - **lon:** La longitude
     - **lat:** La latitude

   - **Les méthodes**
     - **getDescription:** retourne une description du site _( une chaîne de caractères )_

2. Transformer le tableau suivant à une liste d'objets de type **Site**.

   | Nom                                      | Code insee | Adresse                                                 | Longitude     | Latitude      |
   | ---------------------------------------- | ---------- | ------------------------------------------------------- | ------------- | ------------- |
   | Musée du Louvre                          | 75101      | ENTRÉE PRINCIPALE PAR LA PYRAMIDE                       | 2.33581863894 | 48.8609963623 |
   | Palais des congrès de Paris              | 75117      | 2, PLACE DE LA PORTE MAILLOT, 75853 PARIS CEDEX 17      | 2.28316017256 | 48.8786328114 |
   | Cathédrale ND de Paris                   | 75104      | 6 PLACE DU PARVIS ND                                    | 2.34991335251 | 48.8529615431 |
   | Arc de triomphe                          | 75108      | PLACE CHARLES DE GAULLE                                 | 2.2954977352  | 48.8736689226 |
   | Opéra national de Paris - palais Garnier | 75109      | 8 rue Scribe                                            | 2.33047528573 | 48.8716033061 |
   | Tour Eiffel                              | 75107      | CHAMP DE MARS                                           | 2.29505953467 | 48.8578733005 |
   | Centre Pompidou                          | 75104      | PLACE GEORGES POMPIDOU                                  | 2.35244570795 | 48.8605100459 |
   | Panthéon                                 | 75105      | PLACE DU PANTHÉON                                       | 2.34562448244 | 48.8463050337 |
   | Basilique du sacré-coeur de Montmartre   | 75118      | 35 RUE DU CHEVALIER-DE-LA-BARRE - PARVIS DU SACRÉ COEUR | 2.34340214701 | 48.8871779194 |

3. Transformer **la liste des objets de type Site** à une **couche de type vecteur**.

4. Ajouter **la couche des sites touristiques** à la carte et lier sa visibilité à la checkbox **_Sites touristiques_**.




### Popup avec la description du site touristique

1. Ajouter le code HTML de la popup au fichier _index.html_

   ```diff
       ...
       <main class="h-100 row m-0 p-0">
           <div id="map" class="h-100 col-9 m-0 p-0">
               <!-- map container -->
           </div>
           <div class="h-100 col-3 m-0 p-2">
               <!-- la liste des couches -->
               <div class="card mt-3">
                    <div class="card-header">La liste des couches :</div>
                    <div class="card-body">
                        <div class="form-check">
                            <input
                                type="checkbox"
                                class="form-check-input"
                                id="sites-touristiques-paris"
                            />
                            <label class="form-check-label" for="sites-touristiques-paris">
                                Sites touristiques
                            </label>
                        </div>
                        <div class="form-check">
                            <input
                                type="checkbox"
                                class="form-check-input"
                                id="zones-touristiques-paris"
                            />
                            <label class="form-check-label" for="zones-touristiques-paris">
                                Zones touristiques
                            </label>
                        </div>
                        <div class="form-check">
                            <input
                                type="checkbox"
                                class="form-check-input"
                                id="arrondissement-paris"
                            />
                            <label class="form-check-label" for="arrondissement-paris">
                                Arrondissements
                            </label>
                        </div>
                    </div>
               </div>
   +           <div id="map-popup" class="ol-popup">
   +               <a
   +                   href="#"
   +                   id="popup-closer"
   +                   class="ol-popup-closer"
   +               ></a>
   +               <div id="map-popup-content"></div>
   +           </div>
           </div>
       </main>
       ...
   ```

2. Ajouter une popup avec les propriétés suivantes :
   - Affichage : lier à l'événement click sur le point du site touristique
   - Contenu : la description retournée par la méthode **getDescription** du site
   - Fermeture : lier à l'événement click sur le bouton "X" dans la popup _( #popup-closer )_
