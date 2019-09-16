class Plotter{
    constructor(){
        this.fitness_to_value_plot = [];
        this.steps_to_fitness_plot = [];
        this.steps_to_value_plot = [];
        this.results = "";
    }

    getNewTrace(x,y){
        return {x:[x], y:[y], color:'blue'};
    }

    updateTrace(arr,x,y){
        arr.x.push(x);
        arr.y.push(y);
    }

    newIteration(iter, steps, current, fitness){
        let value = parseInt(current, 2);
        this.fitness_to_value = this.getNewTrace(fitness, value );
        this.steps_to_fitness = this.getNewTrace(steps, fitness);
        this.steps_to_value = this.getNewTrace(steps, value);

        this.results += `<b>Iteration: ${iter}</b><br>`
        this.results += `Step ${steps}: Fitness: ${fitness}, String: ${current}<br>`
    }

    updateIteration(steps, current, fitness){
        let value = parseInt(current, 2);
        this.results+=`Step ${steps}: Fitness: ${fitness}, String: ${current}<br>`
        
        this.updateTrace(this.fitness_to_value, fitness, value);
        this.updateTrace(this.steps_to_fitness, steps, fitness);
        this.updateTrace(this.steps_to_value, steps, value);
        if ( !current.includes("1") ){
            this.fitness_to_value.color = 'red';
            this.steps_to_fitness.color = 'red';
            this.steps_to_value.color = 'red';
        }
    }

    endIteration(){
        this.fitness_to_value_plot.push( this.make_trace( this.fitness_to_value) ); 
        this.steps_to_fitness_plot.push( this.make_trace( this.steps_to_fitness) );
        this.steps_to_value_plot.push( this.make_trace( this.steps_to_value) );
    }

    make_trace(data){
        let trace = {
            x: data.x ,
            y: data.y ,
            mode: 'lines',
            marker: {color:data.color, size: 10}
        };
        return trace;
    }

    show(){
        let label1 = {title:"Plot: Fitness-to-Numerical Value",x:"Fitness Score",y:"Numerical Value of String"};
        this.plot('plot-climbers',this.fitness_to_value_plot, label1);
        let label2 = {title:"Plot: Number of Steps-to-Highest Fitness",x:"Number of Steps",y:"Fitness Score"};
        this.plot('plot-iterations',this.steps_to_fitness_plot, label2);
        let label3 = {title:"Plot: Number of Steps-to-Numerical Value",x:"Number of Steps",y:"Numerical Value of String"};
        this.plot('plot3',this.steps_to_value_plot, label3);
        document.getElementById('results-list').innerHTML += this.results;
    }

    plot(div,trace_list, labels){       
        let data = [ ...trace_list ];

        let layout = {
            title: {
                text: labels.title 
            },
            xaxis: {
                title: {
                    text: labels.x
                }
            },
            yaxis: {
                title: {
                    text: labels.y
                }
            }
        };
        Plotly.newPlot(div, data, layout);
    }
}