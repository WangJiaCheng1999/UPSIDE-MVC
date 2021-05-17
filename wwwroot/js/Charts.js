//Get experiment data
$.getJSON("https://localhost:5001/JData/Round3.json", function (data) {
        console.log(data[0].ImageDetail);
});



var data = [100, 200, 300, 400];

//Set Graph's hight and width
var svgWidth = 500;
var svgHeight = 500;
var svgX = 0;
var svgY = 0;

//The width of each bar and gap between them
var barGap = 40;
var barwidth = 10;


//Set the scale of the Barchart's number
var scale = d3.scaleLinear([0, d3.max(data)], [0, svgWidth * 0.9]);

//Select the svg that will hold the barchart by id
var barchartSvg = d3.select(".barchart")
    .select("#barchart1")
    .attr("width", svgWidth)
    .attr("height", svgHeight)
    .attr("transform", "translate(" + svgX + "," + svgY + ")");


//Adding bars to the barchart
var barchart = barchartSvg.selectAll("rect")
    .data(data)
    .enter()
    .append("rect")
        .attr("width", function (d, i) {
            return barwidth;
})
        .attr("height", function (d, i) {
            return scale(d);
})
        .attr("transform", function (d, i) {
            var h = svgHeight - scale(d) - 20;
    return "translate(" + barGap * i + "," + h + ")";
});

//Set X Axis
var scaleX = d3.scaleLinear([1, data.length], [0, 400]);
var xAxis = d3.axisBottom()
.scale(scaleX)
.ticks(data.length, "s");

//Append to barchart
barchartSvg.append("g")
.attr("transform", "translate(0,482)")
.call(xAxis);

//Axis Font
d3.selectAll("g.tick").select("line").style("color", "red");

