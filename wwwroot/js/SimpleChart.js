    // function for Pie Chart
    function PieInit(width, height, pie_item1, pie_item2, pie_item3, filename, svg_id) {

        //initial parameters
        var pie_item1_count = 0;
        var pie_item2_count = 0;
        var pie_item3_count = 0;

        //use json file as data file
        d3.json(filename, function (error, data_file) {
            if (error) {
                throw error;
            }

            //count ImageType == pie_item1|2|3
            pie_item1_count = parseInt(data_file.filter( function(res){ return res.ImageType == pie_item1 }).length);
            pie_item2_count = parseInt(data_file.filter( function(res){ return res.ImageType == pie_item2 }).length);
            pie_item3_count = parseInt(data_file.filter( function(res){ return res.ImageType == pie_item3 }).length);

            //dataset from item & item count
            var dataset = [[pie_item1, pie_item1_count], [pie_item2, pie_item2_count], [pie_item3, pie_item3_count]];

            //creat a pie and use dataset as pie data
            var pie = d3.pie()
                .sort(null)
                .value(function (d) {
                    return d[1];
                 });
            var piedata = pie(dataset);

            //inner & outer radius for the donut chart
            var outerRadius = width / 5;
            var innerRadius = width / 20;

            //creat arc
            var arc = d3.arc()
                .outerRadius(outerRadius)
                .innerRadius(innerRadius);

            //select color scheme
            var colors = d3.schemeCategory20;

            //append a svg with given size
            var svg_pie = d3.select(svg_id)
                .append('svg')
                .attr('width', width)
                .attr('height', height);

            //creat arcs
            var arcs = svg_pie.selectAll('g')
                .data(piedata)
                .enter()
                .append('g')
                .attr('transform', 'translate(' + (width / 2 + 35) + ',' + height / 2 + ')');

            //fill color
            arcs.append('path')
                .attr('fill', function (d, i) {
                    return colors[i];
                })
                .attr('d', function (d) {
                    return arc(d);
                });

            //append text for arc
            arcs.append('text')
                .attr('transform', function (d, i) {
                    var x10 = arc.centroid(d)[0] * 2.5;
                    var y10 = arc.centroid(d)[1] * 2.5;
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

            //append line for arc
            arcs.append('line')
                .attr('stroke', 'black')
                .attr('x1', function (d) { return arc.centroid(d)[0] * 1.65; })
                .attr('y1', function (d) { return arc.centroid(d)[1] * 1.65; })
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

    //function for Bar Chart
    function BarInit(width, height, margin, filename, svg_id) {

        //inner size
        var in_width = width - margin.left - margin.right;
        var in_height = height - margin.top - margin.bottom;

        //use json file as data file
        d3.json(filename, function (error, data_file) {
            if (error) {
                throw error;
            }

            //convert TimeUse to numerical data
            data_file.forEach(function (d) {
                d.Round = d.Round;
                d.TimeUse = +d.TimeUse;
            });

            // get X data
            var Xdatas = data_file.map(function (d) {
                return d.Round;
            });

            // get Y data
            var values = data_file.map(function (d) {
                return d.TimeUse;
            });

            // create xScale & yScale
            var xScale = d3.scaleBand().domain(Xdatas).rangeRound([0, in_width]).padding(0.1),
                yScale = d3.scaleLinear().domain([0, d3.max(values)]).rangeRound([in_height, 0]);

            // a svg with given size
            var svg_bar = d3.select(svg_id)
                .attr('width', width)
                .attr('height', height);

            // append group to svg
            var g = svg_bar.append('g')
                .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

            // add X axis
            g.append('g')
                .attr('class', 'axisX')
                .attr('transform', 'translate(0,' + in_height + ')')
                .call(d3.axisBottom(xScale))
                .attr('font-weight', 'bold');

            // add Y axis
            g.append('g')
                .attr('class', 'axisY')
                .call(d3.axisLeft(yScale).ticks(10));

            // create chart for rect
            var bar_chart = g.selectAll('.bar')
                .data(data_file)
                .enter().append('g');

            // add rects
            bar_chart.append('rect')
                .attr('class', 'bar')
                .attr('x', function (d) {
                    return xScale(d.Round);
                })
                //start animatoion
                .attr("y", function (d) {
                    var min = yScale.domain()[0];
                    return yScale(min);
                })
                .attr("height", function (d) {
                    return 0;
                })
                .transition()
                .delay(function (d, i) {
                    return i * 200;
                })
                .duration(2000)
                .ease(d3.easeBounceIn)

                //animation finish
                .attr('y', function (d) {
                    return yScale(d.TimeUse);
                })
                .attr('height', function (d) {
                    return in_height - yScale(d.TimeUse);
                })
                .attr('width', xScale.bandwidth());

            // add text to rects
            bar_chart.append('text')
                .attr('class', 'barText')
                .attr('x', function (d) {
                    return xScale(d.Round);
                })

                //start animation
                .attr("y", function (d) {
                    var min = yScale.domain()[0];
                    return yScale(min);
                })
                .attr("height", function (d) {
                    return 0;
                })
                .transition()
                .delay(function (d, i) {
                    return i * 200;
                })
                .duration(1000)
                //use ease to show the bonce effect
                .ease(d3.easeBounceIn)

                //animation finish

                .attr('y', function (d) {
                    return yScale(d.TimeUse);
                })
                .attr('dx', xScale.bandwidth() / 2 + 10)        //+10 make text middle
                .attr('dy', 20)
                .attr('text-anchor', 'middle')
                .text(function (d) {
                    //console.log("d.TimeUse", d.TimeUse)
                    return d.TimeUse;
                });

            // mouseover event: change the opacity to 0.75
            bar_chart.on('mouseover', function (d) {
                d3.select(this).attr('opacity', 0.75);
            })
                .on('mouseout', function (d) {
                    d3.select(this)
                    .transition()
                    .duration(600)
                    .attr('opacity', 1)
                });
        });
    }

    //function for Sortable Bar Chart
    function SortBar(width, height, margin, bottomText, topText, filename, svg_id) {

        //inner size
        var in_width = width - margin.left - margin.right;
        var in_height = height - margin.top - margin.bottom;

        //use json file as data_file
        d3.json(filename, function (error, data_file) {
            if (error) {
                throw error;
            }

            //covert TimeUse from string to number
            data_file.forEach( function(row){
                row.TimeUse = +(row.TimeUse);
            });

            //Sort the data_file by ascending order
            data_file = data_file.sort( function(m, n){
                return d3.ascending(+m.TimeUse, +n.TimeUse)
            });

            //let x=TimeUse, y=Round
            var xValue = function(data){ return data.TimeUse };
            var yValue = function(data){ return data.Round };

            //xScale from 0 to max_TimeUse
            var xScale = d3.scaleLinear()
                .domain([0, d3.max(data_file, xValue)])
                .range([0, in_width]);

            //yScale map to Round
            var yScale = d3.scaleBand()
                .domain(data_file.map(yValue))
                .range([0, in_height])
                .padding(0.1);

            // append svg and transform to (left,top)
            var g = d3.select(svg_id).append('g')
                .attr('transform', `translate(${margin.left}, ${margin.top})`);

            // append rects
            g.selectAll('rect')
                .data(data_file)
                .enter()
                .append('rect')
                .attr('y', function (data) { return yScale(yValue(data)) })
                .attr('width', function(data){ return xScale(xValue(data)) })
                .attr('height', yScale.bandwidth())
                .attr('fill', 'steelblue')

            // X & Y axis;
            var yAxis = d3.axisLeft(yScale);
            var xAxis = d3.axisBottom(xScale)
                .tickFormat(d3.format(''))             //format('') show original number
                .tickSize(-in_height);

            //show value with no axis
            let yAxisGroup = g.append('g').call(yAxis);
            yAxisGroup.selectAll('.domain, .tick line').remove();
            let xAxisGroup = g.append('g').call(xAxis)
                .attr('transform', `translate(${0}, ${in_height})`);
            xAxisGroup.selectAll('.domain').remove();

            //append bottom text
            xAxisGroup.append('text')
                .attr('y', margin.bottom/2)
                .attr('x', in_width / 2)
                .attr('fill', 'black').text(bottomText)
                .attr('id', 'TimeUse');

            //append top text
            g.append('text')
                .text(topText)
                .attr('y', -margin.top/2)
                .attr('x', in_width /2);
        });
    }
