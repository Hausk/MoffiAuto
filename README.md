# Moffi réservation Automatique EthiFinance

Ce dépôt contient le code source pour automatiser la réservation d'un créneau de travail sur la plateforme Moffi, dans le contexte de l'entreprise EthiFinance. Le script `script.js` utilise le module Puppeteer pour simuler un navigateur web et effectuer les étapes de réservation automatiquement.
## Prérequis

Avant de pouvoir exécuter ce script, vous devez avoir Node.js installé sur votre système. Si vous ne l'avez pas déjà, vous pouvez l'installer en utilisant les commandes suivantes sur Ubuntu :

``` bash
sudo apt update
sudo apt install nodejs
```

## Installation

Pour installer les dépendances nécessaires, exécutez la commande suivante :

``` bash
npm install
```

## Configuration

Avant d'exécuter le script, vous devez renommer le fichier example.env en .env et remplir les variables d'environnement appropriées :

- MOFFI_USERNAME : votre nom d'utilisateur pour la plateforme Moffi

- MOFFI_PASSWORD : votre mot de passe pour la plateforme Moffi

## Exécution

Une fois que vous avez configuré les variables d'environnement, vous pouvez exécuter le script en utilisant la commande suivante :

``` bash
node script.js
```

Le script ouvrira un navigateur web et effectuera les étapes nécessaires pour réserver un créneau de travail sur la plateforme Moffi. Si tout se passe bien, vous devriez voir un message indiquant que la réservation a été effectuée avec succès. Si quelque chose ne fonctionne pas comme prévu, le script affichera des messages d'erreur pour vous aider à diagnostiquer le problème.