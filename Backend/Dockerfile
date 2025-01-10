# Utilisez une image Node.js officielle
FROM node:18

# Définir le répertoire de travail
WORKDIR /usr/src/app

# Copier les fichiers package.json et package-lock.json (s'ils existent)
COPY package*.json ./

# Installer les dépendances
RUN npm install

# Run build bcrypt (invalid ELF header)

# Copier le reste du code de l'application
COPY . .

# Étape 6 : Installez Nodemon globalement pour le développement
RUN npm install -g nodemon

# Exposer le port que votre application utilise
EXPOSE 9876

# Commande pour démarrer votre application
CMD ["nodemon", "server.js"]
