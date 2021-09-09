var svg = d3.select(".piechart"),
    width = +svg.attr("width"),
    height = +svg.attr("height"),
    radius = Math.min(width, height) / 2,
    g = svg.append("g").attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

var color = d3.scaleOrdinal(["#086788", "#F7B32B"]);

var div = d3.select("body").append("div")
    .attr("class", "tooltip")
    .style("opacity", 0);

var pie = d3.pie()
    .sort(null)
    .value(function(d) { return d.population; });

var outerRadius = radius,
    innerRadius = 100,
    cornerRadius = 10;

var arc = d3.arc()
    .padRadius(outerRadius)
    .innerRadius(innerRadius);

var path = d3.arc()
    .outerRadius(radius - 20)
    .innerRadius(100);

var label = d3.arc()
    .outerRadius(radius - 50)
    .innerRadius(radius - 50);

  var div = d3.select("body").append("div")
      .attr("class", "tooltip")
      .style("opacity", 0);


d3.csv("Procent_studenten_Groningen.csv", function(d) {
  d.population = +d.population;

  return d;
}, function(error, data) {
  if (error) throw error;
  var arc = g.selectAll(".arc")
    .data(pie(data))
    .enter().append("g")
      .each(function(d){ d.outerRadius = outerRadius - 20; })
      .attr("class", "arc")


  arc.append("path")
      .attr("d", path)
      .attr("fill", function(d) { return color(d.data.age); })
      .on("mouseover", arcTween(outerRadius, 0))
      .on("mouseout", arcTween(outerRadius - 20, 150))

  arc.append("text")
      .attr("transform", function(d) { return "translate(" + label.centroid(d) + ")"; })
      .attr("dy", "0.6em")
      .text(function(d) { return d.data.age;});
  arc.append("text")
      .attr("transform", function(d) { return "translate(" + label.centroid(d) + ")"; })
      .attr("dy", "1.5em")
      .attr("dx", "1em")
      .text(function(d) { return d.data.percentage + " %"; });


  arc.append("svg:circle")
      .style("fill", "#E7E7E7")

  arc.append('text')
          .attr('class', 'center-txt type')
          .attr('text-anchor', 'middle')
          .style('font-weight', 'bold')
          .text(function(d, i) {
              return "Aantal:"
          });

  arc.append('text')
          .attr('class', 'center-txt value')
          .attr('y', '20px')
          .attr('text-anchor', 'middle')

      });

function arcTween(outerRadius, delay) {
  return function() {
    d3.select(this).transition().delay(delay).attrTween("d", function(d) {
      d3.select(".value")
      .text(function(){
        return d.data.population;
      })
      var i = d3.interpolate(d.outerRadius, outerRadius);
      return function(t) { d.outerRadius = i(t); return arc(d); };
    });
  };
}
