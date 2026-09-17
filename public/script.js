// 1. Colores según el tipo de Pokémon (para las píldoras de colores)
const coloresTipo = {
    normal: '#A8A77A',
    fire: '#EE8130',
    water: '#6390F0',
    electric: '#F7D02C',
    grass: '#7AC74C',
    ice: '#96D9D6',
    fighting: '#C22E28',
    poison: '#A33EA1',
    ground: '#E2BF65',
    flying: '#A98FF3',
    psychic: '#F95587',
    bug: '#A6B91A',
    rock: '#B6A136',
    ghost: '#735797',
    dragon: '#6F35FC',
    dark: '#705746',
    steel: '#B7B7CE',
    fairy: '#D685AD'
};

// El div "resultado" existe en AMBAS páginas (index.html y buscador.html)
const resultado = document.getElementById('resultado');

// 2. Función que consulta la PokeAPI, recibe el id como parámetro
async function buscarPokemon(id) {
    if (!id || id.trim() === '') {
        resultado.innerHTML = '<p class="error">Por favor ingresa un ID.</p>';
        return;
    }

    resultado.innerHTML = '<p class="cargando">Buscando...</p>';

    try {
        const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
        const respuesta = await fetch(url);

        if (!respuesta.ok) {
            throw new Error('Pokémon no encontrado');
        }

        const data = await respuesta.json();
        mostrarCarta(data);

    } catch (error) {
        resultado.innerHTML = `<p class="error">${error.message}. Verifica el ID (1-1025).</p>`;
    }
}

// 3. Función que construye la "carta" con el contenido de la API
function mostrarCarta(pokemon) {
    const imagen = pokemon.sprites.other['official-artwork'].front_default;

    const tiposHTML = pokemon.types.map(t => {
        const nombreTipo = t.type.name;
        const color = coloresTipo[nombreTipo] || '#777';
        return `<span class="tipo" style="background:${color}">${nombreTipo}</span>`;
    }).join('');

    const hp = pokemon.stats.find(s => s.stat.name === 'hp').base_stat;
    const ataque = pokemon.stats.find(s => s.stat.name === 'attack').base_stat;
    const defensa = pokemon.stats.find(s => s.stat.name === 'defense').base_stat;
    const velocidad = pokemon.stats.find(s => s.stat.name === 'speed').base_stat;

        resultado.innerHTML = `
        <div class="card-pokemon" style="width:280px; margin:0 auto;">
            <button class="btn-cerrar" onclick="cerrarCarta()" title="Cerrar">✕</button>
            <div class="card-header">
                <h2>#${pokemon.id} ${pokemon.name}</h2>
                <span class="hp">HP ${hp}</span>
            </div>

            <div class="card-imagen">
                <img src="${imagen}" alt="${pokemon.name}">
            </div>

            <div class="card-tipos">
                ${tiposHTML}
            </div>

            <div class="card-stats">
                <p><strong>Altura:</strong> ${pokemon.height / 10} m</p>
                <p><strong>Peso:</strong> ${pokemon.weight / 10} kg</p>
                <p><strong>Ataque:</strong> ${ataque}</p>
                <p><strong>Defensa:</strong> ${defensa}</p>
                <p><strong>Velocidad:</strong> ${velocidad}</p>
            </div>
        </div>
    `;
}

// 5. Función para cerrar la carta y volver al estado inicial
function cerrarCarta() {
    resultado.innerHTML = '';

    const titulo = document.querySelector('.contenido-inicio h1');
    const instruccion = document.querySelector('.instruccion');

    if (titulo && instruccion) {
        // ===== Estamos en index.html =====
        titulo.style.display = 'block';
        instruccion.style.display = 'block';

        // Regresamos la URL a "/" sin recargar la página
        window.history.pushState({}, '', '/');
    } else {
        // ===== Estamos en buscador.html =====
        const inputId = document.getElementById('inputId');
        if (inputId) inputId.value = '';
    }
}

// 4. Aquí es donde el script "decide" en qué página está
document.addEventListener('DOMContentLoaded', () => {

    const inputId = document.getElementById('inputId');
    const btnBuscar = document.getElementById('btnBuscar');

    if (inputId && btnBuscar) {
        // ===== Estamos en buscador.html (tiene input y botón) =====

        btnBuscar.addEventListener('click', () => {
            buscarPokemon(inputId.value.trim());
        });

        inputId.addEventListener('keypress', (evento) => {
            if (evento.key === 'Enter') {
                buscarPokemon(inputId.value.trim());
            }
        });

        } else if (resultado) {
        // ===== Estamos en index.html (sin input, se lee la URL) =====

        const idDesdeURL = window.location.pathname.replace('/', '').trim();

        if (idDesdeURL !== '' && /^\d+$/.test(idDesdeURL)) {
            // Ocultamos el título y las instrucciones porque ya vamos a mostrar la carta
            const titulo = document.querySelector('.contenido-inicio h1');
            const instruccion = document.querySelector('.instruccion');

            if (titulo) titulo.style.display = 'none';
            if (instruccion) instruccion.style.display = 'none';

            buscarPokemon(idDesdeURL);
        }
        // Si idDesdeURL está vacío (estamos en "/"), no hacemos nada:
        // el título y las instrucciones se quedan visibles junto a la imagen.
    }
});