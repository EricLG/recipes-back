# Healthcheck

`GET /api/health` est public et renvoie HTTP 200 avec le texte `OK`, sans JWT.
Il indique que le serveur HTTP répond ; il ne vérifie pas la connexion MongoDB.
Il ne retourne aucune information de configuration. Les autres routes conservent
leur politique d'authentification et les protections globales restent actives.

Le healthcheck Docker appelle cette route sur `127.0.0.1:3000` dans le conteneur.
