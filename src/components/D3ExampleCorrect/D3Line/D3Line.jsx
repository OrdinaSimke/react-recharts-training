import React, {
  useEffect,
  forwardRef,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import * as d3 from 'd3';

const transform = 'translate(50,50)';

const LineChart = forwardRef(({ data, width, height }, ref) => {
  const svgRef = useRef();
  let svg;
  let xScale;

  useImperativeHandle(ref, () => ({
    setMarker: (value) => {
      if (isNaN(value)) {
        return;
      }
      svg.selectAll('.marker').remove();

      svg
        .append('svg:line')
        .attr('transform', transform)
        .attr('class', 'marker')
        .attr('stroke', '#00ff00')
        .attr('stroke-linejoin', 'round')
        .attr('stroke-linecap', 'round')
        .attr('stroke-width', 2)
        .attr('x1', xScale(value))
        .attr('y1', 200)
        .attr('x2', xScale(value))
        .attr('y2', 0);
    },

    setColor: (value) => {
      if (isNaN(value)) {
        return;
      }
      const sel = svg.selectAll('circle');

      sel.style('fill', (d) => {
        return d[0] <= value ? '#333333' : '#CC0000';
      });
    },
  }));

  const renderSvg = () => {
    const chartWidth = width - 200;
    const chartHeight = height - 200;

    svg = d3.select(svgRef.current);

    svg.selectAll('*').remove();

    xScale = d3.scaleLinear().domain([0, 100]).range([0, chartWidth]);
    const yScale = d3.scaleLinear().domain([0, 200]).range([chartHeight, 0]);

    const g = svg.append('g').attr('transform', transform);

    g.append('g')
      .attr('transform', 'translate(0,' + chartHeight + ')')
      .call(d3.axisBottom(xScale));

    g.append('g').call(d3.axisLeft(yScale));

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
  };

  /* global renders2:writable */
  renders2++;

  useEffect(() => {
    renderSvg();
  }, [width, height, data]);

  if (!width || !height || !data) {
    return <></>;
  }

  return <svg ref={svgRef} width={width} height={height} />;
});

export default LineChart;
