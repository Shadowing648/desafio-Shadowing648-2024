export { RecintosZoo as RecintosZoo };

class RecintosZoo {
    constructor() {
        this.recintos = [
            { numero: 1, bioma: ['savana'], tamanhoTotal: 10, animaisExistentes: [{ especie: 'MACACO', quantidade: 3 }] },
            { numero: 2, bioma: ['floresta'], tamanhoTotal: 5, animaisExistentes: [] },
            { numero: 3, bioma: ['savana', 'rio'], tamanhoTotal: 7, animaisExistentes: [{ especie: 'GAZELA', quantidade: 1 }] },
            { numero: 4, bioma: ['rio'], tamanhoTotal: 8, animaisExistentes: [] },
            { numero: 5, bioma: ['savana'], tamanhoTotal: 9, animaisExistentes: [{ especie: 'LEAO', quantidade: 1 }] }
        ];

        this.animais = {
            'LEAO': { tamanho: 3, bioma: ['savana'] },
            'LEOPARDO': { tamanho: 2, bioma: ['savana'] },
            'CROCODILO': { tamanho: 3, bioma: ['rio'] },
            'MACACO': { tamanho: 1, bioma: ['savana', 'floresta'] },
            'GAZELA': { tamanho: 2, bioma: ['savana'] },
            'HIPOPOTAMO': { tamanho: 4, bioma: ['savana', 'rio'] }
        };
    }

    analisaRecintos(animal, quantidade) {
        if (!this.animais[animal]) {
            return { erro: 'Animal inválido' };
        }

        if (quantidade <= 0) {
            return { erro: 'Quantidade inválida' };
        }

        const animalInfo = this.animais[animal];
        const tamanhoAnimal = animalInfo.tamanho;
        const biomasAnimais = animalInfo.bioma;

        let recintosViaveis = [];

        for (const recinto of this.recintos) {
            if (!biomasAnimais.some(bioma => recinto.bioma.includes(bioma))) {
                continue;
            }

            let espacoOcupado = recinto.animaisExistentes.reduce((total, animalExistente) => {
                return total + (this.animais[animalExistente.especie].tamanho * animalExistente.quantidade);
            }, 0);

            if (animal === 'HIPOPOTAMO') {
                if (!(recinto.bioma.includes('savana') && recinto.bioma.includes('rio'))) {
                    continue;
                }
                if (recinto.animaisExistentes.some(a => a.especie !== animal)) {
                    continue;
                }
            }

            if (animal === 'MACACO') {
                if (recinto.animaisExistentes.length === 0) {
                    continue; 
                }
            }

            const isCarnivoro = ['LEAO', 'LEOPARDO', 'CROCODILO'].includes(animal);
            if (isCarnivoro && recinto.animaisExistentes.some(a => a.especie !== animal)) {
                continue; 
            }

            if (animal === 'LEAO' && recinto.animaisExistentes.some(a => a.especie !== 'LEAO')) {
                continue; 
            }

            let espacoExtra = (recinto.animaisExistentes.length > 0 && !recinto.animaisExistentes.every(a => a.especie === animal)) ? 1 : 0;
            let totalEspacoOcupado = espacoOcupado + (quantidade * tamanhoAnimal) + espacoExtra;

            if (totalEspacoOcupado <= recinto.tamanhoTotal) {
                let espacoLivre = recinto.tamanhoTotal - totalEspacoOcupado;
                recintosViaveis.push(`Recinto ${recinto.numero} (espaço livre: ${espacoLivre} total: ${recinto.tamanhoTotal})`);
            }
        }

        if (recintosViaveis.length === 0) {
            return { erro: 'Não há recinto viável' };
        }

        recintosViaveis.sort((a, b) => {
            const numA = parseInt(a.match(/\d+/)[0]);
            const numB = parseInt(b.match(/\d+/)[0]);
            return numA - numB;
        });

        return { recintosViaveis };
    }
}
