

function init(bits){
    let bit_string = "";
    for (let i=0; i<bits; i++){
        let bit = parseInt(Math.random()*2);
        bit_string += bit;
    }
    return bit_string;
}

function countOnes(bit_string){
    return bit_string.split('').reduce( (a,b) => (+a)+(+b) );
}

function getFitness(bit_string){
    let ones = countOnes(bit_string);
    return Math.abs(13 * ones - 170);
}

function flip_bit(index, bit_string){
    bits = bit_string.split("");
    bits[index] = (bits[index] == '0') ? '1' : '0';
    return bits.join("");
}

function getNeighbors(bit_string){
    let neighbors = [];
    for(let i=0; i<bit_string.length; i++){
        let neighbor = flip_bit(i,bit_string);
        neighbors.push(neighbor);
    }
    return neighbors;
}

function hillClimb(){
    let output = new Plotter();
    let bits = 40
    let max = 100;
    for( let iter=0; iter<max; iter++){
        let local = false;
        let current = init(bits);
        let fitness = getFitness(current);
        let steps = 0;
        output.newIteration(iter, steps, current, fitness);
        while (local == false){
            neighbors = getNeighbors(current);
            let next = current;
            for (let j=0; j<neighbors.length; j++){
                let neighbor_fitness = getFitness(neighbors[j]);
                if (fitness < neighbor_fitness ){
                    fitness = neighbor_fitness;
                    next = neighbors[j]
                }
            }
            if (getFitness(current) < getFitness(next)){
                console.log(`current fitness: ${getFitness(current)}, next fitness: ${getFitness(next)}`)
                current = next;
                output.updateIteration(++steps, current, fitness);
            }
            else{
                console.log(current);
                local = true;
                output.endIteration();
            }
        }
    }
    output.show();
}