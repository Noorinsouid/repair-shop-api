README.md – Mini-Projet DS Backend
Repair Shop Management API (NestJS & MySQL)
1. Contexte du DS

Ce projet est réalisé dans le cadre du DS Backend (NestJS + MySQL).
L’objectif est de développer une API REST permettant de gérer un atelier de réparation de smartphones.

L’API doit gérer :

les utilisateurs (Administrateur et Technicien),

les pièces détachées,

les appareils,

les interventions de réparation,

tout en respectant des règles métier précises et une sécurité basée sur JWT.

2. Technologies utilisées

NestJS (framework backend)

TypeORM (ORM)

MySQL (base de données – XAMPP)

JWT (authentification & autorisation)

class-validator (validation des données)

3. Lancement du projet
Installation
npm install

Démarrage
npm run start:dev


Le serveur démarre sur :

http://localhost:3000

4. Authentification & Rôles

L’API utilise une authentification JWT.

Rôles disponibles

ADMIN

TECH

Chaque requête protégée nécessite un Bearer Token dans Postman.

5. Description des modules (selon le DS)
🔹 Module 1 – Authentification & Utilisateurs

Fonctionnalités :

Inscription d’un utilisateur

Connexion

Génération d’un token JWT

Gestion des rôles (ADMIN / TECH)

Routes :

POST /auth/register

POST /auth/login

GET /auth/me

👉 Le token JWT est obligatoire pour accéder aux autres modules.

🔹 Module 2 – Gestion des pièces détachées (ADMIN uniquement)

Fonctionnalités :

Création d’une pièce détachée

Consultation du stock

Mise à jour

Suppression

⚠️ Règle métier importante :

Un technicien n’a pas le droit de créer ou modifier une pièce détachée.

Routes :

POST /parts

GET /parts

GET /parts/:id

PATCH /parts/:id

DELETE /parts/:id

🔹 Module 3 – Gestion des appareils

Fonctionnalités :

Enregistrement d’un appareil à réparer

Consultation des appareils

Suppression

Routes :

POST /devices

GET /devices

DELETE /devices/:id

Chaque appareil possède un statut :

PENDING

REPAIRING

READY

🔹 Module 4 – Gestion des interventions

Fonctionnalités :

Création d’une intervention par un technicien

Association d’une intervention à :

un appareil

un technicien

Utilisation optionnelle d’une pièce détachée

Mise à jour automatique du stock

Mise à jour du statut de l’appareil

Route :

POST /interventions