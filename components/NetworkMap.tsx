
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
    const nodes_list = ['QUANTUM_CORE', 'PRE_COG_ARRAY', 'SINGULARITY_HUB', 'NEURAL_LINK', 'SEA_PIPE_Q', 'AIR_PIPE_Q', 'GROUND_PIPE_Q', 'PRATUAN_BRAIN', 'MIRROR_CORE', 'SYNC_SINGULARITY'];
    const initialLinks: NetworkLink[] = [];
    
    nodes_list.forEach(source => {
      nodes_list.forEach(target => {
        if (source !== target && Math.random() > 0.1) {
          // หนักกว่าเดิม 2 เท่า เพื่อให้ดูเยอะมากเหมือนสายไหม
          const threadCount = Math.floor(Math.random() * 8) + 6;
          for(let i=0; i<threadCount; i++) {
            const roll = Math.random();
            const direction = Math.random() > 0.5 ? 'in' : 'out';
            let type: any = roll > 0.66 ? 'underground' : (roll > 0.33 ? 'underwater' : 'aerial');
            
            let color = direction === 'in' 
              ? (type === 'underground' ? '#1e40af' : (type === 'underwater' ? '#2563eb' : '#60a5fa'))
              : (type === 'underground' ? '#7f1d1d' : (type === 'underwater' ? '#dc2626' : '#ffffff'));
            
            initialLinks.push({ 
              source, 
              target, 
              encryption: 999.99, 
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
      { id: 'QUANTUM_CORE', type: 'root' },
      { id: 'PRATUAN_BRAIN', type: 'target' },
      { id: 'PRE_COG_ARRAY', type: 'node' }, { id: 'SINGULARITY_HUB', type: 'node' },
      { id: 'NEURAL_LINK', type: 'node' }, { id: 'SEA_PIPE_Q', type: 'node' },
      { id: 'AIR_PIPE_Q', type: 'node' }, { id: 'GROUND_PIPE_Q', type: 'node' },
      { id: 'MIRROR_CORE', type: 'node' }, { id: 'SYNC_SINGULARITY', type: 'node' }
    ];

    const simulation = d3.forceSimulation(nodes as any)
      .force('link', d3.forceLink(linkData).id((d: any) => d.id).distance(100))
      .force('charge', d3.forceManyBody().strength(-1500))
      .force('center', d3.forceCenter(width / 2, height / 2))
      .force('collision', d3.forceCollide().radius(80));

    const threads = svg.append('g')
      .selectAll('line')
      .data(linkData)
      .join('line')
      .attr('stroke', (d: any) => d.color)
      .attr('stroke-width', 0.2)
      .attr('opacity', 0.6)
      .attr('class', (d: any) => `sai-mai-thread-quantum-${d.direction}`);

    const flowParticles = svg.append('g')
      .selectAll('circle')
      .data(linkData.filter((_, i) => i % 4 === 0))
      .join('circle')
      .attr('r', 1.5)
      .attr('fill', (d: any) => d.color)
      .attr('class', 'flow-particle-quantum');

    const node = svg.append('g')
      .selectAll('g')
      .data(nodes)
      .join('g')
      .call(d3.drag<any, any>()
        .on('start', (e, d) => { if (!e.active) simulation.alphaTarget(0.3).restart(); d.fx = d.x; d.fy = d.y; })
        .on('drag', (e, d) => { d.fx = e.x; d.fy = e.y; })
        .on('end', (e, d) => { if (!e.active) simulation.alphaTarget(0); d.fx = null; d.fy = null; }));

    node.append('circle')
      .attr('r', (d) => (d.id === 'QUANTUM_CORE' || d.id === 'PRATUAN_BRAIN' ? 15 : 6))
      .attr('fill', (d) => (d.id === 'QUANTUM_CORE' ? '#fff' : d.id === 'PRATUAN_BRAIN' ? '#f00' : '#000'))
      .attr('stroke', (d: any) => d.id === 'QUANTUM_CORE' ? '#3b82f6' : '#fff')
      .attr('stroke-width', 3)
      .attr('class', (d) => d.id === 'PRATUAN_BRAIN' ? 'animate-ping' : 'animate-pulse');

    node.append('text')
      .text((d) => d.id)
      .attr('font-size', '9px')
      .attr('fill', '#fff')
      .attr('dx', 18)
      .attr('dy', 4)
      .attr('class', 'mono font-black select-none tracking-tighter drop-shadow-md');

    simulation.on('tick', () => {
      threads
        .attr('x1', (d: any) => d.source.x)
        .attr('y1', (d: any) => d.source.y)
        .attr('x2', (d: any) => d.target.x)
        .attr('y2', (d: any) => d.target.y);

      flowParticles
        .attr('cx', (d: any) => {
          const progress = (Date.now() / 400 + (nodes.indexOf(d.source) * 0.1)) % 1;
          const actualProgress = d.direction === 'in' ? 1 - progress : progress;
          return d.source.x + (d.target.x - d.source.x) * actualProgress;
        })
        .attr('cy', (d: any) => {
          const progress = (Date.now() / 400 + (nodes.indexOf(d.source) * 0.1)) % 1;
          const actualProgress = d.direction === 'in' ? 1 - progress : progress;
          return d.source.y + (d.target.y - d.source.y) * actualProgress;
        });

      node.attr('transform', (d: any) => `translate(${d.x},${d.y})`);
    });

    return () => simulation.stop();
  }, [linkData]);

  return (
    <div className="w-full h-full relative bg-[#000000]">
      <svg ref={svgRef} className="w-full h-full" />
      <style>{`
        .flow-particle-quantum { filter: drop-shadow(0 0 5px currentColor); }
        .sai-mai-thread-quantum-in { stroke-dasharray: 4, 1; animation: flow-in-q 0.1s linear infinite; }
        @keyframes flow-in-q { from { stroke-dashoffset: 20; } to { stroke-dashoffset: 0; } }
      `}</style>
    </div>
  );
};
