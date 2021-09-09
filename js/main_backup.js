var margin = {top:20, right:40, bottom:30 ,left:20},
              width = 960 - margin.left - margin.right,
              height = 640 - margin.top - margin.bottom,
              barWidth= Math.floor(width/19) - 1;
// alle margins + width en height en barbreedte in een var

var x = d3.scaleLinear().range([barWidth / 2, width - barWidth / 2]);
var y = d3.scaleLinear().range([height,0]);

// scale.linear() is aangepast naar scaleLinear() in de laatste versie
// zelfde vaar var y

var yAxis = d3.axisRight()
    .scale(y)
    .tickSize(-width)
    .tickFormat(function(d) { return Math.round(d / 1e6) + "D"; });
//     .ticksize(-width)
//    .tickformat(function(d){return Math.round(d / 1e6) + "M";});
//  Ga ik misschien nog nodig hebben hier weet niet precies
//  wat de gevolgen gaan zijn
// wooooow dit is awesome wtf doet hoe????

var svg = d3.select("body").append("svg")
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom)
.append("g")
  .attr("transform","translate("+ margin.left + "," + margin.top + ")")  ;

// Maar het canvas basicly waar alles op word afgebeeld

var buurten = svg.append("g")
  .attr("class","buurten");

var sales = [
  { product: 'Hoodie',  count: 7 },
  { product: 'Jacket',  count: 6 },
  { product: 'Snuggie', count: 9 },
];

var svg = d3.select('svg');
svg.size();
// 1 -- one <svg> element exists

var rects = svg.selectAll('rect')
  .data(sales);

rects.size();

var newRects = rects.enter();

var maxCount = d3.max(sales, function(d, i) {
  return d.count;
});
var x = d3.scaleLinear()
  .range([0, 300])
  .domain([0, maxCount]);
var y = d3.scaleOrdinal()
  .rangeRoundBands([0, 75])
  .domain(sales.map(function(d, i) {
    return d.product;
  }));

newRects.append('rect')
  .attr('x', x(0))
  .attr('y', function(d, i) {
    return y(d.product);
  })
  .attr('height', y.rangeBand())
  .attr('width', function(d, i) {
    return x(d.count);
  });

/*var valueline = d3.line()
	.x(function(d) { return x(d.date); })
	.y(function(d) { return y(d.close); });

d3.csv("test03.csv", function(data) {
    data.forEach(function(d) {
      d.bev_tot_2014 = +d.bev_tot_2014;
      //d.year = +d.year;
      d.aant_stu_tot_2014 = +d.aant_stu_tot_2014;
    })

    var age1 = d3.max(data, function(d) { return d.aant_stu_tot_2014; }),
        year0 = 1,
        year1 = 19,
        year = year1;

      // Update the scale domains.
    x.domain([year1 - age1, year1]);
    y.domain([0, d3.max(data, function(d) { return d.bev_tot_2014; })]);
    svg.append("g")
      .attr("class", "y axis")
      .attr("transform", "translate(" + width + ",0)")
      .call(yAxis)
      .selectAll("g")
      .filter(function(value) { return !value; })
      .classed("zero", true);

    	// Add the Y Axis
      var buurt = buurten.selectAll(".buurt")
      .data(d3.range(year0 - age1, year1 + 1, 5))
      .enter().append("g")
        .attr("class","buurt")
        .attr("transform", function(buurt) { return "translate(" + x(buurt) + ",0)"; });

        buurt.selectAll("rect")
        .data(function(buurt) { return data[year][buurt] || [0, 0]; })
      .enter().append("rect")
        .attr("x", -barWidth / 2)
        .attr("width", barWidth)
        .attr("y",200)
        .attr("height", function(value) { return height - y(value); });


        buurt.append("text")
        .attr("y", height - 4)
        .text(function(buurt) { return buurt; });

});*/
