
//09 stueventfinal - 05 stockreport -08dropdownevents

function init(participant) {
    option = d3.select("#selDataset")
  
    d3.json("./samples.json").then((data) => {
  
    var names = data.names
    console.log(data);
    names.forEach(name => {
      option.append("option")
            .text(name)
            .attr("value", name)
    })
  
    var metadata = data.metadata[0];
    var dropdownmenu = d3.select("#sample-metadata")
  
    Object.entries(metadata).forEach(([key, value]) => {
      dropdownmenu.append("p")
              .text(`${key}: ${value}`)
      })
    })
  charts();
  d3.select("#selDataset").on("change", optionChanged)
  }
  
  //07 events review
  function info(newData) {
  
    var metadata = d3.select("#selDataset").node().value
    console.log(metadata)
    var dropdownmenu = d3.select("#sample-metadata")
  
    dropdownmenu.html("")
  
    d3.json("./samples.json").then(data => {
  
      var updateData = data.metadata.filter(function(item) {
        return item.id === parseInt(metadata);
      })
       Object.entries(updateData[0]).forEach(([key, value]) => {
      dropdownmenu.append("p")
              .text(`${key}: ${value}`)
  
  
      })
    })
  
  }
  
  function optionChanged(participant){
    charts(participant);
    info(participant);
  
  
  }
  // 06sort_slice
  function charts(participant){
  
    d3.json("./samples.json").then(data => {
  
      var metadata = d3.select("#selDataset").node().value
      console.log(metadata);
      var updateData = data.samples.filter(function(item) {
        return item.id === metadata.toString();
      })
      console.log(updateData)
      var otu_ids = updateData[0].otu_ids;
      var sample_values = updateData[0].sample_values;
      var labels = updateData[0].otu_labels;
  
      var top10_samples = sample_values.slice(0, 10).reverse();
      var top10_otu = otu_ids.slice(0, 10).reverse();
      var top10_labels = labels.slice(0, 10);
       var top10_otu_id = top10_otu.map(d => "OTU " + d);
      console.log(top10_otu)
      console.log(top10_samples);
  
      //https://plotly.com/javascript/bar-charts/

      var trace = {
        x: top10_samples,
        y: top10_otu_id,
        type: "bar",
        text: top10_labels,
        marker: {
          color: "green"
        },
        orientation: "h"
      }
  
      var layout = {
        title: "Top 10 OTU's per test subject",
      }
   
      var barData = [trace]
  
      Plotly.newPlot('bar', barData, layout);
  
      var trace1 = {
        x: otu_ids,
        y: sample_values,
        text: labels,
        mode: 'markers',
        marker: {
           size: sample_values,
           color: otu_ids
         }
      }
      var data1 = [trace1];
  
      var layout1 = {
      title: "OTU ID"
      };
  
      Plotly.newPlot('bubble', data1, layout1);
  
    })
  }
  
  
  init();
