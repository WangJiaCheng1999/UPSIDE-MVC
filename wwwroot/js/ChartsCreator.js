/*
This class is used for create different types of charts
This file contain all D3.jS script will be used in DataPage
 */



function createBarChart(className, width, height, x, y, data){
    
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
        .attr("width", svgWidth)
        .attr("height", svgHeight)
        .attr("transform","500,500");
    

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

//Create a horizontal barchart 
function createHorizontalBarchart(className,svgWidth,svgHeight,x,y,data,xTitle){
    //set width and height of bar chart
    let svg = d3.select(className)
            .attr("width",svgWidth)
            .attr("height",svgHeight);
    
    //Gaps between the barchart and svg
    let margin = { top: 0, right: 30, bottom:100, left: 100};
    
    //Calculate the real range for x and y scale
    let innerWidth = svgWidth - margin.left - margin.right;
    let innerHeight = svgHeight - margin.top - margin.bottom;
    
    //Round and the values
    let values = Array.from(data.values());
    let keys = Array.from(data.keys());
    
    //X scale of bar chart
    let xScale = d3.scaleLinear()
        .domain([0,d3.max(values)])
        .range([0,innerWidth]);
    
    //y scale of bar chart
    let yScale = d3.scaleBand()
        .domain(keys)
        .range([0,innerHeight])
        .padding(0.05);
        
    //Separate out the barchart
    let g = svg.append("g")
        .attr("transform",`translate(${margin.left},${margin.top})`);
    
    //Left axis with removed ticks
    g.append('g')
        .call(d3.axisLeft(yScale))
        .selectAll('.domain , .tick line')
        .remove();
    
    //this determine the value's format
    let valueType;
    if(d3.mean(values) < 1){
      valueType = ".0%"  
    }else {
        valueType = ".0f";
    }
    
    g.append('g')
        .call(d3.axisLeft(yScale))
        .selectAll('.domain, .tick line')
        .remove();
    
    //Bottom axis
    let xAxis = g.append('g')
        .call(d3.axisBottom(xScale).tickFormat(d3.format(valueType)).tickSize(-innerHeight))
        .attr('transform',`translate(0,${innerHeight})`);
    
    
    xAxis.select(".domain")
        .remove();
    
    
    //add bars into the svg
    g.selectAll("rect")
        .data(data)
        .enter()
        .append("rect")
        .attr("y", d => yScale(d[0]))
        .attr("height", yScale.bandwidth())
        .transition()
        .duration(1000)
        .attr("width",d => xScale(d[1]))
    
    
    //append the title
    svg.append("text")
        .attr("transform",`translate(${(margin.left+innerWidth)/2},${innerHeight + margin.bottom/2})`)
        .text(xTitle)
        .attr("fill","#b3ecff")
        .attr("font-size","30px");
    
}

//Create a pie chart with given class name and other critical elements
function createPieChart(className,width,height,data){

    var width10 = 600;
    var height10 = 600;
    var itemCount10 = 0;
    var localCount = 0;
    var globalCount = 0;
    var neitherCount = 0;

    var filepath = "https://"+window.location.host+"/JData/Round1.json";


    d3.json(filepath, function (error, data10) {
        console.log("data10.length=" + data10.length);
        if (error) {
            throw error;
        }

        localCount = parseInt(data10.filter((res) => { return res.ImageType === "Local" }).length);
        globalCount = parseInt(data10.filter((res) => { return res.ImageType === "Global" }).length);
        neitherCount = parseInt(data10.filter((res) => { return res.ImageType === "Neither" }).length);
        console.log("localCount=" + localCount + ",   globalCount=" + globalCount + ",   neitherCount=" + neitherCount);

        var dataset = [['Local', localCount], ['Global', globalCount], ['Neither', neitherCount]];

        var pie = d3.pie()
            .sort(null)
            .value(function (d) {
                return d[1];
            });

        var piedata = pie(dataset);

        var outerRadius10 = width10 / 5;                //4
        var innerRadius10 = width10 / 20;               //0

        var arc = d3.arc()
            .outerRadius(outerRadius10)
            .innerRadius(innerRadius10);

        var colors = d3.schemeCategory10;

        var svg10 = d3.select("#svg10")
            .append('svg')
            .attr('width', width10)
            .attr('height', height10);

        var arcs = svg10.selectAll('g')
            .data(piedata)
            .enter()
            .append('g')
            .attr('transform', 'translate(' + width10 / 2 + ',' + height10 / 2 + ')');

        arcs.append('path')
            .attr('fill', function (d, i) {
                return colors[i + 2];                   //purple,green,red
            })
            .attr('d', function (d) {
                return arc(d);
            });

        arcs.append('text')
            .attr('transform', function (d, i) {
                var x10 = arc.centroid(d)[0] * 2.5;     //2.8@circle
                var y10 = arc.centroid(d)[1] * 2.5;     //2.8@circle
                if (i === 4) {
                    return 'translate(' + (x10 * 1.2) + ', ' + (y10 * 1.2) + ')';
                } else if (i === 3) {
                    return 'translate(' + (x10 - 40) + ', ' + y10 + ')';
                } else if (i === 5) {
                    return 'translate(' + (x10 + 40) + ', ' + y10 + ')';
                }
                return 'translate(' + x10 + ', ' + y10 + ')';
            })
            .attr('text-anchor', 'middle')
            .style("font-size", "16px")
            .attr("stroke", "blue")
            .text(function (d) {
                var percent = Number(d.value) / d3.sum(dataset, function (d) {
                    return d[1];
                }) * 100;
                return d.data[0] + ' ' + percent.toFixed(1) + '%';
            })

        arcs.append('line')
            .attr('stroke', 'black')
            .attr('x1', function (d) { return arc.centroid(d)[0] * 1.65; })      //2@circle
            .attr('y1', function (d) { return arc.centroid(d)[1] * 1.65; })      //2@circle
            .attr('x2', function (d, i) {
                if (i === 4) {
                    return arc.centroid(d)[0] * 3.2;
                }
                return arc.centroid(d)[0] * 2.5;
            })
            .attr('y2', function (d, i) {
                if (i === 4) {
                    return arc.centroid(d)[1] * 3.2;
                }
                return arc.centroid(d)[1] * 2.5;
            });
    });



}

