export const typeChart = {
    dragon: {
        weak: ["ice", "dragon", "fairy"],
        resist: ["fire", "water", "electric", "grass"],
        immune: []
    },
    water: {
        weak: ["electric", "grass"],
        resist: ["fire", "water", "ice", "steel"],
        immune: []
    },
    fire: {
        weak: ["water", "rock", "ground"],
        resist: ["fire", "grass", "ice", "bug", "steel", "fairy"],
        immune: []
    },
    electric: {
        weak: ["ground"],
        resist: ["electric", "flying", "steel"],
        immune: []
    },
    fairy: {
        weak: ["poison", "steel"],
        resist: ["fighting", "bug", "dark"],
        immune: ["dragon"]
    },
    ground: {
        weak: ["water", "ice", "grass"],
        resist: ["rock", "poison"],
        immune: ["electric"]
    },
    bug: {
        weak: ["fire", "flying", "rock"],
        resist: ["ground", "grass", "fighting"],
        immune: []
    },
    dark: {
        weak: ["big", "fighting", "fairy"],
        resist: ["ghost", "dark"],
        immune: ["psychic"]
    },
    fighting: {
        weak: ["flying", "psychic", "fairy"],
        resist: ["rock", "dark", "bug"],
        immune: []
    },
    flying: {
        weak: ["electric", "ice", "rock"],
        resist: ["grass", "fighting", "bug"],
        immune: ["ground"]
    },
    ghost: {
        weak: ["dark", "ghost"],
        resist: ["bug", "poison"],
        immune: ["normal", "fighting"]
    },
    grass: {
        weak: ["fire", "ice", "poison", "flying", "bug"],
        resist: ["ground", "grass", "water", "electric"],
        immune: []
    },
    ice: {
        weak: ["fire", "fighting", "rock", "steel"],
        resist: ["ice"],
        immune: []
    },
    normal: {
        weak: ["fighting"],
        resist: [],
        immune: ["ghost"]
    },
    poison: {
        weak: ["ground", "psychic"],
        resist: ["fighting", "poison", "bug", "fairy", "grass"],
        immune: []
    },
    psychic: {
        weak: ["bug", "ghost", "dark"],
        resist: ["fighting", "psychic"],
        immune: []
    },
    rock: {
        weak: ["water", "grass", "fihgting", "ground", "steel"],
        resist: ["fire", "normal", "poison", "flying"],
        immune: []
    },
    steel: {
        weak: ["fire", "fighting", "ground"],
        resist: ["normal", "grass", "ice", "rock", "fairy", "flying", "bug", "dragon", "steel", "psychic"],
        immune: ["poison"]
    }

};
