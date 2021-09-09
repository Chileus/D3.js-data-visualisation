
var margin = {top: 20, right: 80, bottom: 30, left: 150},
width = 840 - margin.left - margin.right,
height = 960 - margin.top - margin.bottom;

// Zet de marges en hoogte + breedte

var x = d3.scaleLinear()
  .rangeRound([0, width])
  .domain([0, 12200])

var y = d3.scaleBand()
  .rangeRound([0, height])


var xAxis = d3.axisBottom(x)
  .scale(x)
  .ticks(5); // specify the number of ticks


var div = d3.select("body").append("div")
    .attr("class", "tooltip")
    .style("opacity", 0);


var svg2 = d3.select(".outro").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");




d3.csv("test03.csv", function(data) {

// Laat de CSV in voor de data

    data.forEach(function(d) {
      d.bev_tot_2014 = +d.bev_tot_2014;
      d.Code = +d.Code;
      d.aant_stu_tot_2014 = +d.aant_stu_tot_2014;

    })


    svg2.append("g")
      .attr("class", "axis axis--x")
      .attr("transform", "translate(0," + (height + 510) + ")")
      .call(xAxis);

    var maxCount = d3.max(data, function(d, i) {
      return d.bev_tot_2014;
    })

    x.domain([0, maxCount]);

    y.domain(data.map(function(d, i) {
        return d.Code;
      }));

    var bar = svg2.selectAll(".bar")
      .data(data)
    .enter().append("g")
      .attr("class", "bar");
// Koppel alle strings naar numbers

    bar.append("rect")
      .attr("x", 1)
      .attr('y', function(d, i) {
        return y(d.Code) + 1;
      })
      .attr('height', (height / 13) - 2)
      .attr('width', function(d, i) {
        return x(d.aant_stu_tot_2014);
      })


    bar.append("rect")
      .attr("x", 1)
      .attr("class","bevolking")
      .attr('y', function(d, i) {
        return y(d.Code) + 1;
      })
      .attr('height', (height / 13) - 2)
      .attr('width', function(d, i) {
        return x(d.bev_tot_2014);
      })
      .on("mouseover", function(d) {
       div.transition()
         .duration(200)
         .style("opacity", .9);
       div.html(
         "Percentage studenten:<br/>" +
         Math.round(d.aant_stu_tot_2014 / (d.bev_tot_2014 / 100)) + "%"
       )
         .style("left", (d3.event.pageX) + "px")
         .style("top", (d3.event.pageY - 28) + "px");
       })
     .on("mouseout", function(d) {
       div.transition()
         .duration(500)
         .style("opacity", 0);
       });

      bar.append("text")
      .attr("dy", ".75em")
      .attr("x", function(d, i) {
        return x(d.aant_stu_tot_2014) + 10;
      })
      .attr('y', function(d, i) {
        return y(d.Code) + 10;
      })
      .attr("text-anchor", "left")
      .text(function(d) { return d.aant_stu_tot_2014; });

      bar.append("text")
      .attr("dy", ".75em")
      .attr("x", function(d, i) {
        return x(d.bev_tot_2014) + 10;
      })
      .attr('y', function(d, i) {
        return y(d.Code) + 10;
      })
      .attr("text-anchor", "left")
      .text(function(d) { return d.bev_tot_2014; });

      bar.append("text")
        .attr("dy", ".75em")
        .attr("x", -150)
        .attr('y', function(d, i) {
          return y(d.Code) + 8;
        })
        .attr("text-anchor", "left")
        .text(function(d) { return d.GebiedenCode; });
})
