import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

const transform = 'translate(50,50)';

export const D3Line = ({ data, width, height, marker }) => {
  const svgRef = useRef();

  const renderSvg = () => {
    const chartWidth = width - 200;
    const chartHeight = height - 200;

    const svg = d3.select(svgRef.current);

    svg.selectAll('*').remove();

    const xScale = d3.scaleLinear().domain([0, 100]).range([0, chartWidth]);
    const yScale = d3.scaleLinear().domain([0, 200]).range([chartHeight, 0]);

    const g = svg.append('g').attr('transform', transform);

    g.append('g')
      .attr('transform', 'translate(0,' + chartHeight + ')')
      .call(d3.axisBottom(xScale));

    g.append('g').call(d3.axisLeft(yScale));

    svg
      .append('g')
      .selectAll('dot')
      .data(data)
      .enter()
      .append('circle')
      .attr('cx', function (d) {
        return xScale(d[0]);
      })
      .attr('cy', function (d) {
        return yScale(d[1]);
      })
      .attr('r', 3)
      .attr('transform', transform)
      .style('fill', '#CC0000');

    const line = d3
      .line()
      .x(function (d) {
        return xScale(d[0]);
      })
      .y(function (d) {
        return yScale(d[1]);
      })
      .curve(d3.curveMonotoneX);

    svg
      .append('path')
      .datum(data)
      .attr('class', 'line')
      .attr('transform', transform)
      .attr('d', line)
      .style('fill', 'none')
      .style('stroke', '#CC0000')
      .style('stroke-width', '2');

    if (marker) {
      svg
        .append('svg:line')
        .attr('transform', transform)
        .attr('stroke', '#00ff00')
        .attr('stroke-linejoin', 'round')
        .attr('stroke-linecap', 'round')
        .attr('stroke-width', 2)
        .attr('x1', xScale(marker))
        .attr('y1', 200)
        .attr('x2', xScale(marker))
        .attr('y2', 0);
    }
  };

  /* global renders:writable */
  renders++;

  useEffect(() => {
    renderSvg();
  }, [width, height, data, marker]);

  if (!width || !height || !data) {
    return <></>;
  }

  return <svg ref={svgRef} width={width} height={height} />;
};
