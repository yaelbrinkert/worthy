# Dockerfile (front/Dockerfile)

# Étape 1 : Utilisez une image de Node.js (ou une image de base légère comme alpine si live-server est en Node)
FROM node:18

# Étape 2 : Définissez le répertoire de travail
WORKDIR /usr/src/app

# Étape 3 : Copiez tous les fichiers de votre application front-end
COPY . .

# Étape 4 : Installez live-server
RUN npm install -g live-server

# Étape 5 : Exposez le port de live-server
EXPOSE 8080

# Étape 6 : Lancez live-server
CMD ["live-server", "--port=8080", "--host=0.0.0.0"]
