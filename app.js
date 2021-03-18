
// create a drop down for all the IDs for the user to choose from. 
// Then for any id chosen have the top 10 OTUs displayed in the bar chart


function plots(id) {
    // pull in data
    d3.json("data/samples.json").then((importedData) => {
        var data = importedData;
        var filterd = data.samples.filter(i => i.id == id)[0];
        var otu_ids = filterd.otu_ids;
        var values = filterd.sample_values;
        var labels = filterd.otu_labels;
console.log(filterd);
        // otu IDs
        var top_ten_ids = otu_ids.slice(0,11);
        var reversed_ids = top_ten_ids.reverse();
        var final_ids = reversed_ids.map(d => "OTU " + d);
        // otu Values
        var top_ten_values = values.slice(0,11);
        var final_values = top_ten_values.reverse();
        // otu Labels
        var final_labels = labels.slice(0,11);

// create the trace for the bar plot
        var trace = {
            x: final_values,
            y:final_ids,
            text: final_labels,
            marker: {
                color: 'red'},
            type:"bar",
            orientation: "h",
        };

        var barData = [trace];
// create the layout with margins
        var layout = {
            title:"Top 10 OTUs Based on ID",
            yaxis: {
                tickmode:"linear"
            },
            margin: {
                l: 100,
                r: 100,
                t: 100,
                b: 30
            }
        };
        // plot the bar
    Plotly.newPlot("bar",barData,layout )
        // create trace for bubble graph
        var trace1 = {
            x: otu_ids,
            y: values,
            mode: "markers",
            marker: {
                size:values,
                color:otu_ids
            },
            text: labels
        };
        var bubbleData = [trace1];
        // layout for bubble graph
        var layout1 = {
            xaxis:{title:"OTU ID"},
            height: 600,
            width: 1000,
        };
    // plot bubble graph
    Plotly.newPlot("bubble",bubbleData, layout1);

    });
}
// create function to pull in demographic information for chart.
// pull the metadata column
function demographicInfo(id){
    d3.json("data/samples.json").then((demoData) => {
        var metaData = demoData;
        var fillData = metaData.metadata;
        var filterdID = fillData.filter(m => m.id.toString()=== id) [0];
        var demoInfo = d3.select("#sample-metadata");
        demoInfo.html("");
        // get both the key and the value
        Object.entries(filterdID).forEach((key) => {
            // create an "h5" tag to append the demo info to.
            demoInfo.append("h5").text(key[0].toUpperCase() + ": " + key[1] + "\n");
        });
    });
}
// create function to generate both the fucntion for plots and function for demo info
function optionChanged(id) {
    plots(id);
    demographicInfo(id);
}
// create the initializing page
function init() {
    // select dropdown menu 
    var dropdown = d3.select("#selDataset");

    // read the data 
    d3.json("data/samples.json").then((data)=> {
        // console.log(data)

        // get the id data to the dropdwown menu
        data.names.forEach(function(name) {
            dropdown.append("option").text(name).property("value");
        });

        // call the functions to display the data and the plots to the page
        plots(data.names[0]);
        demographicInfo(data.names[0]);
    });
}

init();

// };
    // console.log(importedData);
//     var data = importedData;
//     var names = data.names; 
//     var options = names;
// });
// var select = d3.select("selDataset");
// for(var i = 0; i < options.length; i++) {
//     option = select.append("option").text(options[i])
//     // var opt = options[i];
//     // var el = index.createElement("option");
//     // el.textContent = opt;
//     // el.value = opt;
//     // select.appendChild(el);
// }​
// });

// function handleSubmit() {
//     d3.event.preventDefault();
//     var id = d3.select("selDataset").node().value;
// }



// d3.json("data/samples.json").then((importedData) => {
//     // console.log(importedData);
    
//     // console.log(data);
    
//     // console.log(otu_ids);
    
//     // console.log(sorted_ids);
    
//     // console.log(reversed)
    
//     // console.log(top_ten)
//     var trace = {
//         x:top_ten.map(object => object.);
//     }

