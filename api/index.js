// ce fichier index.js est placé dans le dossier api, pour représenter le démarrage du serveur

const express = require('express');
const path = require('path'); // Importer le module path
const app = express();

// récupération du fichier json :
const pokedexInfos = require('../data/pokedex.json'); // Chemin correct

// mise en place du moteur de vue ejs
app.set('view engine', 'ejs');

// Définir le dossier qui contient nos vues
app.set('views', path.join(__dirname, '../views')); // Chemin correct pour le dossier views

// ajout du dossier public
app.use(express.static(path.join(__dirname, '../public'))); // Chemin correct pour le dossier public

// Route d'accueil
app.get('/', (request, response) => {
    response.render("homepage", { pokedexInfos });
});

// Route pour afficher un Pokémon par numéro
app.get('/pokemon/:numero', (request, response) => {
    const numero = parseInt(request.params.numero);
    const pokemonDetails = pokedexInfos.find(pokemon => pokemon.numero === numero);
    response.render("detailPage", {
        pokemonDetails: pokemonDetails,
        pokedexInfos: pokedexInfos
    });
});

// Définition de la route pour accéder à la page des types de Pokémon
app.get('/types', (request, response) => {
    response.render("typesPage", { pokedexInfos });
});

// Route pour afficher les Pokémon par type
app.get('/types/:type', (request, response) => {
    const type = request.params.type;
    const filteredPokemons = pokedexInfos.filter(pokemon => pokemon.type.includes(type));
    response.render('filteredTypesPage', { pokemons: filteredPokemons, type });
});

// écoute du serveur (sera ignorée par Vercel, mais utile pour les tests en local)
if (require.main === module) {
    app.listen(process.env.PORT || 3000, () => {
        console.log(`Server running on port ${process.env.PORT || 3000}`);
    });
}

module.exports = app; // Permet à Vercel de démarrer l’application
