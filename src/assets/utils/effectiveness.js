import { typeChart } from "../../data/typeChart";

export function calculateEffectiveness(defensiveTypes) {
    const result = {};
    const attackTypes = Object.keys(typeChart);
    console.log(attackTypes);

    attackTypes.forEach(attackType => {
        let multiplier = 1;

        defensiveTypes.forEach(defType => {
            const chart = typeChart[defType];
            if (!chart) return;
            console.log(defType);
            console.log("chart", chart);

            if (chart.immune.includes(attackType)) {
                multiplier *= 0;
            } else if (chart.weak.includes(attackType)) {
                multiplier *= 2;
            } else if (chart.resist.includes(attackType)) {
                multiplier *= 0.5;
            }
        });

        result[attackType] = multiplier;
    });

    return result;
}

export function groupEffectiveness(data) {
    return {
        immune: Object.keys(data).filter(t => data[t] === 0),
        x025: Object.keys(data).filter(t => data[t] === 0.25),
        x05: Object.keys(data).filter(t => data[t] === 0.5),
        x1: Object.keys(data).filter(t => data[t] === 1),
        x2: Object.keys(data).filter(t => data[t] === 2),
        x4: Object.keys(data).filter(t => data[t] === 4)
    };
}
