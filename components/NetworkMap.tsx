
import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';

interface NetworkLink extends d3.SimulationLinkDatum<any> {
  source: any;
  target: any;
  encryption: number; // 0 - 100
  shield: boolean;
}

export const NetworkMap: React.FC = () => {
  const svgRef = useRef<SVGSVGElement>(null);
  const [linkData, setLinkData] = useState<NetworkLink[]>([
    { source: 'LOGIC_CORE', target: 'TV_MUX_ARRAY', encryption: 100, shield: true },
    { source: 'LOGIC_CORE', target: 'MOBILE_OMNI', encryption: 100, shield: true },
    { source: 'LOGIC_CORE', target: 'SOCIAL_GRID', encryption: 100, shield: true },
    { source: 'LOGIC_CORE', target: 'SAT_UPLINK', encryption: 100, shield: true },
    { source: 'LOGIC_CORE', target: 'NEURAL_INPUT', encryption: 100, shield: true },
    { source: 'LOGIC_CORE', target: 'MIRROR_SFC', encryption: 100, shield: true },
    { source: 'NEURAL_INPUT', target: 'SAT_UPLINK', encryption: 98, shield: true },
    { source: 'MOBILE_OMNI', target: 'SOCIAL_GRID', encryption: 95, shield: true },
    { source: 'TV_MUX_ARRAY', target: 'MOBILE_OMNI', encryption: 100, shield: true },
    { source: 'MIRROR_SFC', target: 'NEURAL_INPUT', encryption: 100, shield: true }
  ]);

  useEffect(() => {
    if (!svgRef.current) return;

    const width = 800;
    const height = 400;

    const svg = d3.select(svgRef.current)
      .attr('viewBox', `0 0 ${width} ${height}`)
      .attr('preserveAspectRatio', 'xMidYMid meet');

    svg.selectAll('*').remove();

    const nodes = [
      { id: 'LOGIC_CORE', type: 'root', x: width / 2, y: height / 2 },
      { id: 'TV_MUX_ARRAY', type: 'node' }, { id: 'MOBILE_OMNI', type: 'node' },
      { id: 'SOCIAL_GRID', type: 'node' }, { id: 'SAT_UPLINK', type: 'node' },
      { id: 'NEURAL_INPUT', type: 'node' }, { id: 'MIRROR_SFC', type: 'node' }
    ];

    const simulation = d3.forceSimulation(nodes as any)
      .force('link', d3.forceLink(linkData).id((d: any) => d.id).distance(180))
      .force('charge', d3.forceManyBody().strength(-1500))
      .force('center', d3.forceCenter(width / 2, height / 2))
      .force('collision', d3.forceCollide().radius(70));

    // Outer Reinforced Casing
    svg.append('g')
      .selectAll('line')
      .data(linkData)
      .join('line')
      .attr('stroke', '#0a0a0a')
      .attr('stroke-width', 22)
      .attr('stroke-linecap', 'butt')
      .attr('opacity', 1);

    // Sovereign Shield Aura (Luminescent background)
    const shieldAura = svg.append('g')
      .selectAll('line')
      .data(linkData)
      .join('line')
      .attr('stroke', '#ff0000')
      .attr('stroke-width', 18)
      .attr('stroke-linecap', 'round')
      .attr('opacity', 0.1)
      .attr('class', 'shield-aura');

    // Main Sovereign Pipes (Physical representation)
    const sovereignPipes = svg.append('g')
      .selectAll('line')
      .data(linkData)
      .join('line')
      .attr('stroke', (d: any) => d.encryption > 98 ? '#600' : '#222')
      .attr('stroke-width', 12)
      .attr('stroke-linecap', 'round')
      .attr('opacity', 1);

    // Active Data Flow (The "Target Flow" Bridge)
    const linkFlow = svg.append('g')
      .selectAll('line')
      .data(linkData)
      .join('line')
      .attr('stroke', (d: any) => d.encryption > 90 ? '#00e5ff' : '#ff0000')
      .attr('stroke-width', 4)
      .attr('stroke-dasharray', '10,15')
      .attr('class', 'flow-line');

    // Shield Status Icons (Group containers)
    const shieldIcons = svg.append('g')
      .selectAll('g')
      .data(linkData)
      .join('g')
      .attr('class', 'shield-icon-group');

    shieldIcons.append('rect')
      .attr('width', 14)
      .attr('height', 14)
      .attr('x', -7)
      .attr('y', -7)
      .attr('fill', '#000')
      .attr('stroke', (d: any) => d.encryption > 95 ? '#00e5ff' : '#ff0000')
      .attr('stroke-width', 1)
      .attr('transform', 'rotate(45)');

    shieldIcons.append('text')
      .text('S')
      .attr('font-size', '8px')
      .attr('font-family', 'JetBrains Mono')
      .attr('font-weight', 'black')
      .attr('text-anchor', 'middle')
      .attr('dy', 3)
      .attr('fill', (d: any) => d.encryption > 95 ? '#00e5ff' : '#ff0000');

    const node = svg.append('g')
      .selectAll('g')
      .data(nodes)
      .join('g')
      .call(d3.drag<any, any>()
        .on('start', (event, d) => {
          if (!event.active) simulation.alphaTarget(0.3).restart();
          d.fx = d.x; d.fy = d.y;
        })
        .on('drag', (event, d) => {
          d.fx = event.x; d.fy = event.y;
        })
        .on('end', (event, d) => {
          if (!event.active) simulation.alphaTarget(0);
          d.fx = null; d.fy = null;
        }));

    // Large Red Core Glow
    node.filter(d => d.id === 'LOGIC_CORE').append('circle')
      .attr('r', 40)
      .attr('fill', 'url(#coreGradient)')
      .attr('opacity', 0.5)
      .attr('class', 'animate-pulse');

    const defs = svg.append('defs');
    const grad = defs.append('radialGradient').attr('id', 'coreGradient');
    grad.append('stop').attr('offset', '0%').attr('stop-color', '#ff0000');
    grad.append('stop').attr('offset', '100%').attr('stop-color', 'transparent');

    node.append('circle')
      .attr('r', (d) => (d.id === 'LOGIC_CORE' ? 26 : 14))
      .attr('fill', (d) => (d.id === 'LOGIC_CORE' ? '#ff0000' : '#000'))
      .attr('stroke', (d) => (d.id === 'LOGIC_CORE' ? '#fff' : '#ff0000'))
      .attr('stroke-width', (d) => (d.id === 'LOGIC_CORE' ? 5 : 3))
      .attr('class', (d) => d.id === 'LOGIC_CORE' ? 'animate-pulse-intense shadow-glow-extreme' : '');

    node.append('text')
      .text((d) => d.id)
      .attr('font-size', '11px')
      .attr('font-family', 'JetBrains Mono')
      .attr('font-weight', '900')
      .attr('fill', '#fff')
      .attr('dx', 35)
      .attr('dy', 5)
      .attr('class', 'pointer-events-none drop-shadow-lg');

    simulation.on('tick', () => {
      shieldAura
        .attr('x1', (d: any) => d.source.x)
        .attr('y1', (d: any) => d.source.y)
        .attr('x2', (d: any) => d.target.x)
        .attr('y2', (d: any) => d.target.y);

      sovereignPipes
        .attr('x1', (d: any) => d.source.x)
        .attr('y1', (d: any) => d.source.y)
        .attr('x2', (d: any) => d.target.x)
        .attr('y2', (d: any) => d.target.y);

      linkFlow
        .attr('x1', (d: any) => d.source.x)
        .attr('y1', (d: any) => d.source.y)
        .attr('x2', (d: any) => d.target.x)
        .attr('y2', (d: any) => d.target.y);

      shieldIcons.attr('transform', (d: any) => {
        const x = (d.source.x + d.target.x) / 2;
        const y = (d.source.y + d.target.y) / 2;
        return `translate(${x},${y})`;
      });

      node.attr('transform', (d: any) => `translate(${d.x},${d.y})`);
    });

    return () => simulation.stop();
  }, [linkData]);

  useEffect(() => {
    const interval = setInterval(() => {
      setLinkData(prev => prev.map(link => ({
        ...link,
        encryption: Math.min(100, Math.max(95, link.encryption + (Math.random() * 1 - 0.5)))
      })));
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full h-full relative bg-[#020202]">
      <svg ref={svgRef} className="w-full h-full" />
      <style>{`
        .flow-line {
          animation: dash-fast 4s linear infinite;
        }
        @keyframes dash-fast {
          to { stroke-dashoffset: -150; }
        }
        .shield-aura {
          animation: aura-pulse-fast 2s ease-in-out infinite;
        }
        @keyframes aura-pulse-fast {
          0%, 100% { opacity: 0.05; stroke-width: 18px; }
          50% { opacity: 0.2; stroke-width: 26px; }
        }
        .shadow-glow-extreme {
          filter: drop-shadow(0 0 20px rgba(255, 0, 0, 1));
        }
      `}</style>
    </div>
  );
};
