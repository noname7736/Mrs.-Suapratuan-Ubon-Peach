
import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

export const NetworkMap: React.FC = () => {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!svgRef.current) return;

    const width = 800;
    const height = 400;

    const svg = d3.select(svgRef.current)
      .attr('viewBox', `0 0 ${width} ${height}`)
      .attr('preserveAspectRatio', 'xMidYMid meet');

    svg.selectAll('*').remove();

    // Define patterns for liquidity flow
    const defs = svg.append('defs');
    
    const nodes = [
      { id: 'LOGIC_CORE', type: 'root', x: width / 2, y: height / 2 },
      { id: 'TV_MUX_ARRAY', type: 'node' }, { id: 'MOBILE_OMNI', type: 'node' },
      { id: 'SOCIAL_GRID', type: 'node' }, { id: 'SAT_UPLINK', type: 'node' },
      { id: 'NEURAL_INPUT', type: 'node' }, { id: 'MIRROR_SFC', type: 'node' }
    ];

    const links = [
      { source: 'LOGIC_CORE', target: 'TV_MUX_ARRAY' },
      { source: 'LOGIC_CORE', target: 'MOBILE_OMNI' },
      { source: 'LOGIC_CORE', target: 'SOCIAL_GRID' },
      { source: 'LOGIC_CORE', target: 'SAT_UPLINK' },
      { source: 'LOGIC_CORE', target: 'NEURAL_INPUT' },
      { source: 'LOGIC_CORE', target: 'MIRROR_SFC' },
      { source: 'NEURAL_INPUT', target: 'SAT_UPLINK' },
      { source: 'MOBILE_OMNI', target: 'SOCIAL_GRID' }
    ];

    const simulation = d3.forceSimulation(nodes as any)
      .force('link', d3.forceLink(links).id((d: any) => d.id).distance(150))
      .force('charge', d3.forceManyBody().strength(-1000))
      .force('center', d3.forceCenter(width / 2, height / 2))
      .force('collision', d3.forceCollide().radius(50));

    // Sovereign Direct Pipes (background thicker lines)
    const sovereignPipes = svg.append('g')
      .selectAll('line')
      .data(links)
      .join('line')
      .attr('stroke', '#300')
      .attr('stroke-width', 8)
      .attr('stroke-linecap', 'round')
      .attr('opacity', 0.5);

    // Active Data Flow (moving dots/lines)
    const link = svg.append('g')
      .selectAll('line')
      .data(links)
      .join('line')
      .attr('stroke', '#dc2626')
      .attr('stroke-width', 2)
      .attr('stroke-dasharray', '5,5')
      .attr('class', 'flow-line');

    const node = svg.append('g')
      .selectAll('g')
      .data(nodes)
      .join('g');

    node.append('circle')
      .attr('r', (d) => (d.id === 'LOGIC_CORE' ? 16 : 8))
      .attr('fill', (d) => (d.id === 'LOGIC_CORE' ? '#dc2626' : '#111'))
      .attr('stroke', (d) => (d.id === 'LOGIC_CORE' ? '#fff' : '#dc2626'))
      .attr('stroke-width', 2)
      .attr('class', (d) => d.id === 'LOGIC_CORE' ? 'animate-pulse' : '');

    node.append('text')
      .text((d) => d.id)
      .attr('font-size', '10px')
      .attr('font-family', 'JetBrains Mono')
      .attr('font-weight', 'bold')
      .attr('fill', '#999')
      .attr('dx', 15)
      .attr('dy', 4);

    simulation.on('tick', () => {
      sovereignPipes
        .attr('x1', (d: any) => d.source.x)
        .attr('y1', (d: any) => d.source.y)
        .attr('x2', (d: any) => d.target.x)
        .attr('y2', (d: any) => d.target.y);

      link
        .attr('x1', (d: any) => d.source.x)
        .attr('y1', (d: any) => d.source.y)
        .attr('x2', (d: any) => d.target.x)
        .attr('y2', (d: any) => d.target.y);

      node.attr('transform', (d: any) => `translate(${d.x},${d.y})`);
    });

    return () => simulation.stop();
  }, []);

  return (
    <div className="w-full h-full">
      <svg ref={svgRef} className="w-full h-full" />
      <style>{`
        .flow-line {
          animation: dash 10s linear infinite;
        }
        @keyframes dash {
          to {
            stroke-dashoffset: -100;
          }
        }
      `}</style>
    </div>
  );
};
