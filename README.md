[![Build Status](https://travis-ci.org/xersos/Test-Unit-Badgeuse.svg?branch=master)](https://travis-ci.org/xersos/Test-Unit-Badgeuse)

# :sparkles: Installation de la badgeuse sur le serveur  :sparkles: #
 
La documentation pour les routes du back se trouve sur ./server/out/index.html (seul UUID est actuellement documentée)
 
## PRÉ-REQUIS ##

* DOCKE

où

* MariaDb (10.1)
* Node.js (v10.15.0)
* Npm (v6.4.1)


# Déploiement en production (Docker) #

## ÉTAPE 1 : Installer Docker ##

  Linux basé sur Debian : https://docs.docker.com/install/linux/docker-ce/debian/

  MacOS : https://docs.docker.com/docker-for-mac/install/

## ÉTAPE 2 : Configurer son Host ##

   Dans le fichier .env à la racine du projet ;   
   
   <ol>
        <li>assurez vous que la section *for prod* n'est pas commentée,</li>
        <li>assurez vous que la section *for development* est commentée,</li>
        <li>modifiez le _PORT_ANGULAR_ par celui que vous souhaitez utiliser et le _HOST_ANGULAR_ par l'IP de votre machine,</li>
   </ol> 
   
   TODO
   ~~- [ ] le fichier ./server/config/config.js présente des configurations pour passer aisément du mode dev au mode prod. Il faudra documenter modifier le readme de dev pour en prendre compte~~ 
          

## ÉTAPE 3 : Démarrer l'ensemble ##

   <ol>
        <li>lancez les containers docker avec la commande **docker-compose up --build**,</li>
   </ol>



# Déploiement pour le développement (Docker) #

## ÉTAPE 1 : Installer Docker ##

  Linux basé sur Debian : https://docs.docker.com/install/linux/docker-ce/debian/

  MacOS : https://docs.docker.com/docker-for-mac/install/

## ÉTAPE 2 : Configurer son Host ##

   Dans le fichier .env à la racine du projet ; commentez la section *for prod* et décommentez celle *for development*  
   
   <ol>
        <li>Dans le fichier docker-compose.yml, commenter le service _badgeuse-web_,</li>
        <li>Ouvrir un terminal dans le dossier client, installer les dépendance avec **npm install**.</li>
   </ol> 
   
   TODO
   ~~- [ ] le fichier ./server/config/config.js présente des configurations pour passer aisément du mode dev au mode prod. Il faudra documenter modifier le readme de dev pour en prendre compte~~ 
   

## ÉTAPE 3 : Démarrer l'ensemble ##

   <ol>
        <li>lancez les containers docker avec la commande **docker-compose up --build**,</li>
        <li>depuis un terminal dans le dossier client, lancer le serveur avec **ng serve**</li>
   </ol>
   



# Déploiement manuel (deprecated) #
  
## ÉTAPE 1 : Installer la base de donnée ##

   Pour la base de donnée, il faut importer les deux fichier sql situés dans le dossier ./BDD dans l'ordre suivant:
   
   1. BDD-Badgeuse-tables.sql
   2. BDD-Badgeuse-Data.sql
   
   Un utilisateur est automatiquement crée (uhaSQL) avec un mot de passe (uha), ainsi que les données des étudiants actuellement inscrit en cette année 2018-2019.

## ÉTAPE 2 : Configurer son Host ##

Dans le fichier docker-compole.yml, dans la partie node change le commentaire de HOST_ANGULAR et met ton adresse IP locale.

Ensuite si tu veux pas compiler le web avec Docker, tu peux le faire avec Angular pour que ça prenne moins de temps.
 
Pour ça, met en commentaire le service web toujours dans docker-compose.yml ainsi que phpmyadmin,
et ensuite dans l'environnement de node, change le port angular en mettant `4200` et remplace ton adresse IP par `localhost` pour le host.

## ÉTAPE 3 : Lancer le serveur ##
  
    
  A la racine du projet, éxecutez les commandes suivantes:
  
  `npm install` 
  
  `npm install -g pm2`
  
  Pour lancer pm2:
  
  `pm2 start index.js --name badgeuse`
  
  # IMPORTANT #
  
  3 ports doivent être disponible:
  
     - port 80
     - port 8080
  
  Pour que pm2 se relance automatiquement après un down server, éxecutez les commandes suivantes:
  
  `pm2 startup`
   
  `pm2 save` 
  
  
## BONUS : INFO ##

   #### Quelque commande de pm2: ####
   
   `pm2 restart badgeuse` -> redémarre le service 'badgeuse', neccessaire pour toute modification du backend
   
   `pm2 stop badgeuse` -> arrête le service 'badgeuse'
   
   `pm2 delete badgeuse` -> supprime le service 'badgeuse'
   
   `pm2 log` -> affiche les logs de pm2 (ctrl + C pour quitter)
   
   `pm2 flush` -> efface tous les logs de pm2

