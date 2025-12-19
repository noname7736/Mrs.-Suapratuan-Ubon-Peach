
import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

export const NetworkMap: React.FC = () => {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!svgRef.current) return;

    const width = 800;
    const height = 350;

    const svg = d3.select(svgRef.current)
      .attr('viewBox', `0 0 ${width} ${height}`)
      .attr('preserveAspectRatio', 'xMidYMid meet');

    svg.selectAll('*').remove();

    const nodes = [
      { id: 'CORE', type: 'root' },
      { id: 'TV-1', type: 'node' }, { id: 'TV-2', type: 'node' },
      { id: 'MOB-1', type: 'node' }, { id: 'MOB-2', type: 'node' },
      { id: 'SOC-1', type: 'node' }, { id: 'SOC-2', type: 'node' },
      { id: 'SAT-ALPHA', type: 'node' }
    ];

    const links = [
      { source: 'CORE', target: 'TV-1' }, { source: 'CORE', target: 'TV-2' },
      { source: 'CORE', target: 'MOB-1' }, { source: 'CORE', target: 'MOB-2' },
      { source: 'CORE', target: 'SOC-1' }, { source: 'CORE', target: 'SOC-2' },
      { source: 'CORE', target: 'SAT-ALPHA' }
    ];

    const simulation = d3.forceSimulation(nodes as any)
      .force('link', d3.forceLink(links).id((d: any) => d.id).distance(100))
      .force('charge', d3.forceManyBody().strength(-300))
      .force('center', d3.forceCenter(width / 2, height / 2));

    const link = svg.append('g')
      .selectAll('line')
      .data(links)
      .join('line')
      .attr('stroke', 'rgba(220, 38, 38, 0.2)')
      .attr('stroke-width', 1);

    const node = svg.append('g')
      .selectAll('circle')
      .data(nodes)
      .join('circle')
      .attr('r', (d) => (d.id === 'CORE' ? 12 : 6))
      .attr('fill', (d) => (d.id === 'CORE' ? '#dc2626' : '#333'))
      .attr('stroke', (d) => (d.id === 'CORE' ? '#fff' : '#dc2626'))
      .attr('stroke-width', 2);

    const label = svg.append('g')
      .selectAll('text')
      .data(nodes)
      .join('text')
      .text((d) => d.id)
      .attr('font-size', '10px')
      .attr('font-family', 'JetBrains Mono')
      .attr('fill', '#666')
      .attr('dx', 15)
      .attr('dy', 4);

    simulation.on('tick', () => {
      link
        .attr('x1', (d: any) => d.source.x)
        .attr('y1', (d: any) => d.source.y)
        .attr('x2', (d: any) => d.target.x)
        .attr('y2', (d: any) => d.target.y);

      node
        .attr('cx', (d: any) => d.x)
        .attr('cy', (d: any) => d.y);
      
      label
        .attr('x', (d: any) => d.x)
        .attr('y', (d: any) => d.y);
    });

    return () => simulation.stop();
  }, []);

  return <svg ref={svgRef} className="w-full h-full opacity-80" />;
};
