
// ce fichier index.js est placé à la racine de notre dépôt, pour représenter le démarrage du serveur

// initialisation du serveur
const express = require('express')
const app = express();


// récupération du fichier json : 
const pokedexInfos = require('./data/pokedex.json');


// mise en place du moteur de vue ejs 
app.set('view engine', 'ejs');

// avec cette ligne, on définit un dossier qui contient nos vues, le premier paramètre ici sert à spécifier qu'on veut "setter" le dossier views, et le deuxième paramètre représent le chemin vers le dossier views en question
app.set('views', 'views');

// ajout du dossier public
app.use(express.static('public'));


app.get('/', (request, response) => {
    response.render("homepage", { pokedexInfos })
})

app.get('/pokemon/:numero', (request, response) => {
    // Extrait le paramètre 'numero' de l'URL et le convertit en nombre entier
    const numero = parseInt(request.params.numero);
    // Trouve les détails du Pokémon dans 'pokedexInfos' en utilisant le numéro extrait
    const pokemonDetails = pokedexInfos.find(pokemon => pokemon.numero === numero);
    //Rend la vue 'detailPage.ejs' en passant les détails du Pokémon trouvé
    response.render("detailPage",
        {
            pokemonDetails: pokemonDetails,// Les détails du Pokémon spécifique
            pokedexInfos: pokedexInfos
        })// La liste complète des Pokémon
})

// Définition de la route pour accéder à la page des types de Pokémon
app.get('/types', (request, response) => {
    // Rend la vue 'typePage.ejs' en passant les données de 'pokedexInfos'
    // 'pokedexInfos' contient les informations de tous les Pokémon du fichier json
    response.render("typesPage", { pokedexInfos });
});

// Route pour afficher les Pokémon par type
app.get('/types/:type', (request, response) => {
    // Récupération du type depuis les paramètres de l'URL
    const type = request.params.type;

    // Filtrage des Pokémon par le type spécifié
    const filteredPokemons = pokedexInfos.filter(pokemon => pokemon.type.includes(type));

    // Rend la vue 'filteredPokemonPage.ejs' avec les Pokémon filtrés et le type
    response.render('filteredTypesPage', { pokemons: filteredPokemons, type });
});


// écoute du serveur (sera ignorée par Vercel, mais utile pour les tests en local)
if (require.main === module) {
    app.listen(process.env.PORT || 3000, () => {
        console.log(`Server running on port ${process.env.PORT || 3000}`);
    });
}

module.exports = app;
/*  La ligne module.exports = app; permet à Vercel de démarrer l’application en mode sans serveur. */