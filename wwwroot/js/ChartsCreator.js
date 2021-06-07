/*
This class is used for create different types of charts
This file contain all D3.jS script will be used in DataPage
 */

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

function createInteractivePieChart(className,width,height,data){
    
    // Creates sources <svg> element
    let svg = d3.select(className)
        .append("svg")
        .attr("width", width)
        .attr("height", height);

    let g = svg.append("g")
        .attr("transform", `translate(${width / 2}, ${height / 2})`);

    let radius = Math.min(width, height) / 2;
    
    let arc = d3
        .arc()
        .outerRadius(radius - 10)
        .innerRadius(100);


    let values = Array.from(data.values());

    //Compute the angles for path and set the padding
    let pie = d3.pie();
    pie.padAngle(0.03);
    let pied_data = pie(values);

    let arcs = g
        .selectAll("path")
        .data(pied_data)
        .join((enter) => enter.append("path").style("stroke", "white"));

    let color = d3.scaleOrdinal(d3.schemeAccent);
    
    let colorScale = d3.scaleLinear()
        .domain([0, d3.max(values)])
        .range([0, 1]);

    //set color for each arc
    arcs.attr("d", arc)
        .style("fill", function (d, i){
            if(data.size <= 8){
                return color(i);
            }else {
                console.log(d3.interpolateBlues(colorScale(d.data)));
                return d3.interpolateBlues(colorScale(d.data));
            }
        });
        
    
}
