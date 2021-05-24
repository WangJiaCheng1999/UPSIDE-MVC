/*
This class is used for create different types of charts
This file contain all D3.jS script will be used in DataPage
 */

//Create a barchart with given class name and other critical elements
function createBarChart(className,width,height,x,y,data){
    
    //Set Graph's hight and width
    let svgWidth = width;
    let svgHeight = height;
    let svgX = x;
    let svgY = y;

    //The width of each bar and gap between them
    let barGap = 40;
    let barWidth = 10;
    
    //Set the scale of the Barchart's number
    let scale = d3.scaleLinear([0, d3.max(data)], [0, svgWidth * 0.9]);
    
    //Select the svg that will hold the barchart by id
    let barchartSvg = d3.select(className)
        .select("#barchart1")
        .enter()
        .attr("width", svgWidth)
        .attr("height", svgHeight)
        .attr("transform", "translate(" + svgX + "," + svgY + ")");

    //Adding bars to the barchart
    let barchart = barchartSvg.selectAll("rect")
        .data(data)
        .enter()
        .append("rect")
        .attr("width", function (d, i) {
            return barWidth;
        })
        .attr("height", function (d, i) {
            return scale(d);
        })
        .attr("transform", function (d, i) {
            let h = svgHeight - scale(d) - 20;
            return "translate(" + barGap * i + "," + h + ")";
        });

    //Set X Axis
    let scaleX = d3.scaleLinear([1, data.length], [0, 400]);
    let xAxis = d3.axisBottom()
        .scale(scaleX)
        .ticks(data.length, "s");


    //Append to barchart
    barchartSvg.append("g")
        .attr("transform", "translate(0,482)")
        .call(xAxis);

    //Axis Font
    d3.selectAll("g.tick").select("line").style("color", "red");
    
}

//Create a pie chart with given class name and other critical elements
function createPieChart(className,width,height,data){


}

