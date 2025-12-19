
import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';

interface NetworkLink extends d3.SimulationLinkDatum<any> {
  source: any;
  target: any;
  encryption: number;
  shield: boolean;
  color: string;
  type: 'underground' | 'underwater' | 'aerial';
  direction: 'in' | 'out';
}

export const NetworkMap: React.FC = () => {
  const svgRef = useRef<SVGSVGElement>(null);
  const [linkData, setLinkData] = useState<NetworkLink[]>([]);

  useEffect(() => {
    const nodes_list = ['NEURAL_CORE', 'TV_INTAKE', 'MOBILE_INTAKE', 'SOCIAL_INTAKE', 'SEA_CABLE', 'AIR_SENSOR', 'GROUND_PROBE', 'TARGET_BRAIN', 'MIRROR_SFC', 'NODE_SYNC'];
    const initialLinks: NetworkLink[] = [];
    
    nodes_list.forEach(source => {
      nodes_list.forEach(target => {
        if (source !== target && Math.random() > 0.25) {
          // Double the threads to simulate massive intake/broadcast volume
          const threadCount = Math.floor(Math.random() * 6) + 4;
          for(let i=0; i<threadCount; i++) {
            const roll = Math.random();
            const direction = Math.random() > 0.5 ? 'in' : 'out';
            let type: any = roll > 0.66 ? 'underground' : (roll > 0.33 ? 'underwater' : 'aerial');
            
            // Intake is bluish, Broadcast is reddish/white
            let color = direction === 'in' 
              ? (type === 'underground' ? '#1e40af' : (type === 'underwater' ? '#2563eb' : '#60a5fa'))
              : (type === 'underground' ? '#7f1d1d' : (type === 'underwater' ? '#dc2626' : '#f8fafc'));
            
            initialLinks.push({ 
              source, 
              target, 
              encryption: 99.9, 
              shield: true,
              color: color,
              type: type,
              direction: direction
            });
          }
        }
      });
    });
    setLinkData(initialLinks);
  }, []);

  useEffect(() => {
    if (!svgRef.current || linkData.length === 0) return;

    const width = 800;
    const height = 400;
    const svg = d3.select(svgRef.current).attr('viewBox', `0 0 ${width} ${height}`);
    svg.selectAll('*').remove();

    const nodes = [
      { id: 'NEURAL_CORE', type: 'root' },
      { id: 'TARGET_BRAIN', type: 'target' },
      { id: 'TV_INTAKE', type: 'node' }, { id: 'MOBILE_INTAKE', type: 'node' },
      { id: 'SOCIAL_INTAKE', type: 'node' }, { id: 'SEA_CABLE', type: 'node' },
      { id: 'AIR_SENSOR', type: 'node' }, { id: 'GROUND_PROBE', type: 'node' },
      { id: 'MIRROR_SFC', type: 'node' }, { id: 'NODE_SYNC', type: 'node' }
    ];

    const simulation = d3.forceSimulation(nodes as any)
      .force('link', d3.forceLink(linkData).id((d: any) => d.id).distance(130))
      .force('charge', d3.forceManyBody().strength(-1000))
      .force('center', d3.forceCenter(width / 2, height / 2))
      .force('collision', d3.forceCollide().radius(70));

    // Dual-Direction Sai Mai Threads
    const threads = svg.append('g')
      .selectAll('line')
      .data(linkData)
      .join('line')
      .attr('stroke', (d: any) => d.color)
      .attr('stroke-width', 0.3)
      .attr('opacity', 0.4)
      .attr('class', (d: any) => `sai-mai-thread-${d.direction}`);

    // High Speed Flow particles
    const flowParticles = svg.append('g')
      .selectAll('circle')
      .data(linkData.filter((_, i) => i % 5 === 0))
      .join('circle')
      .attr('r', 1.2)
      .attr('fill', (d: any) => d.color)
      .attr('class', 'flow-particle-fast');

    const node = svg.append('g')
      .selectAll('g')
      .data(nodes)
      .join('g')
      .call(d3.drag<any, any>()
        .on('start', (e, d) => { if (!e.active) simulation.alphaTarget(0.3).restart(); d.fx = d.x; d.fy = d.y; })
        .on('drag', (e, d) => { d.fx = e.x; d.fy = e.y; })
        .on('end', (e, d) => { if (!e.active) simulation.alphaTarget(0); d.fx = null; d.fy = null; }));

    node.append('circle')
      .attr('r', (d) => (d.id === 'NEURAL_CORE' || d.id === 'TARGET_BRAIN' ? 12 : 5))
      .attr('fill', (d) => (d.id === 'NEURAL_CORE' ? '#2563eb' : d.id === 'TARGET_BRAIN' ? '#dc2626' : '#000'))
      .attr('stroke', (d: any) => d.id === 'TARGET_BRAIN' ? '#ff0' : '#2563eb')
      .attr('stroke-width', 2)
      .attr('class', (d) => d.id === 'TARGET_BRAIN' ? 'animate-pulse' : '');

    node.append('text')
      .text((d) => d.id)
      .attr('font-size', '8px')
      .attr('fill', '#fff')
      .attr('dx', 10)
      .attr('dy', 3)
      .attr('class', 'mono font-bold select-none tracking-tighter');

    simulation.on('tick', () => {
      threads
        .attr('x1', (d: any) => d.source.x)
        .attr('y1', (d: any) => d.source.y)
        .attr('x2', (d: any) => d.target.x)
        .attr('y2', (d: any) => d.target.y);

      flowParticles
        .attr('cx', (d: any) => {
          const progress = (Date.now() / 800 + (nodes.indexOf(d.source) * 0.1)) % 1;
          const actualProgress = d.direction === 'in' ? 1 - progress : progress;
          return d.source.x + (d.target.x - d.source.x) * actualProgress;
        })
        .attr('cy', (d: any) => {
          const progress = (Date.now() / 800 + (nodes.indexOf(d.source) * 0.1)) % 1;
          const actualProgress = d.direction === 'in' ? 1 - progress : progress;
          return d.source.y + (d.target.y - d.source.y) * actualProgress;
        });

      node.attr('transform', (d: any) => `translate(${d.x},${d.y})`);
    });

    return () => simulation.stop();
  }, [linkData]);

  return (
    <div className="w-full h-full relative bg-[#010101]">
      <svg ref={svgRef} className="w-full h-full" />
      <style>{`
        .flow-particle-fast { filter: drop-shadow(0 0 3px currentColor); transition: all 0.1s linear; }
        .sai-mai-thread-in { stroke-dasharray: 2, 2; animation: flow-in 10s linear infinite; }
        @keyframes flow-in { from { stroke-dashoffset: 100; } to { stroke-dashoffset: 0; } }
      `}</style>
    </div>
  );
};
