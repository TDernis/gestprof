# gestprofs
Gestprofs est un système de notation permettant de gérer des élèves, ajouter des examens ainsi que d'attribuer des notes aux élèves.
Afin de faire fonctionner cette application, il faut passer par quelques étapes de configuration.
## Configuration
Tout d'abord, il faut installer les dépendances du projet:
```
npm install
```
Ensuite il faut configurer le point d'accès à l'API via le fichier ``src/modules/http-common.js`` dans lequel il faut modifier ``baseURL``:
```
baseURL: "http://localhost:8082/"
```
Enfin, lorsque vous avez lancé l'API, vous pouvez lancer cette application:
```
npm run serve
```
