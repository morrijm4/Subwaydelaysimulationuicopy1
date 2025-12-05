import { SubwayLine } from '../types/subway';

interface MapViewProps {
  lines: SubwayLine[];
}

export function MapView({ lines }: MapViewProps) {
  return (
    <div className="relative h-[200px] bg-gray-100 border-b border-gray-200 overflow-hidden">
      {/* Simplified subway map visualization */}
      <svg className="w-full h-full" viewBox="0 0 390 200" fill="none">
        {/* Grid background */}
        <defs>
          <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
            <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#e5e7eb" strokeWidth="0.5"/>
          </pattern>
        </defs>
        <rect width="390" height="200" fill="url(#grid)" />
        
        {/* Subway lines visualization */}
        {/* Red Lines (1,2,3) */}
        <line x1="100" y1="30" x2="100" y2="170" stroke="#EE352E" strokeWidth="8" opacity={lines.find(l => l.id === '1')?.status === 'on-time' ? '1' : '0.5'} />
        <line x1="120" y1="30" x2="120" y2="170" stroke="#EE352E" strokeWidth="8" opacity={lines.find(l => l.id === '2')?.status === 'on-time' ? '1' : '0.5'} />
        <line x1="140" y1="30" x2="140" y2="170" stroke="#EE352E" strokeWidth="8" opacity={lines.find(l => l.id === '3')?.status === 'on-time' ? '1' : '0.5'} />
        
        {/* Green Lines (4,5,6) */}
        <line x1="170" y1="30" x2="170" y2="170" stroke="#00933C" strokeWidth="8" opacity={lines.find(l => l.id === '4')?.status === 'on-time' ? '1' : '0.5'} />
        <line x1="190" y1="30" x2="190" y2="170" stroke="#00933C" strokeWidth="8" opacity={lines.find(l => l.id === '5')?.status === 'on-time' ? '1' : '0.5'} />
        <line x1="210" y1="30" x2="210" y2="170" stroke="#00933C" strokeWidth="8" opacity={lines.find(l => l.id === '6')?.status === 'on-time' ? '1' : '0.5'} />
        
        {/* Purple Line (7) */}
        <line x1="30" y1="100" x2="270" y2="100" stroke="#B933AD" strokeWidth="8" opacity={lines.find(l => l.id === '7')?.status === 'on-time' ? '1' : '0.5'} />
        
        {/* Blue Lines (A,C,E) */}
        <line x1="240" y1="30" x2="240" y2="170" stroke="#0039A6" strokeWidth="8" opacity={lines.find(l => l.id === 'A')?.status === 'on-time' ? '1' : '0.5'} />
        <line x1="260" y1="30" x2="260" y2="170" stroke="#0039A6" strokeWidth="8" opacity={lines.find(l => l.id === 'C')?.status === 'on-time' ? '1' : '0.5'} />
        
        {/* Orange Lines (B,D,F,M) */}
        <line x1="290" y1="30" x2="290" y2="170" stroke="#FF6319" strokeWidth="8" opacity={lines.find(l => l.id === 'B')?.status === 'on-time' ? '1' : '0.5'} />
        <line x1="310" y1="30" x2="310" y2="170" stroke="#FF6319" strokeWidth="8" opacity={lines.find(l => l.id === 'D')?.status === 'on-time' ? '1' : '0.5'} />
        
        {/* Yellow Lines (N,Q,R,W) - horizontal */}
        <line x1="30" y1="130" x2="360" y2="130" stroke="#FCCC0A" strokeWidth="8" opacity={lines.find(l => l.id === 'N')?.status === 'on-time' ? '1' : '0.5'} />
        
        {/* L Line - horizontal */}
        <line x1="30" y1="70" x2="360" y2="70" stroke="#A7A9AC" strokeWidth="8" opacity={lines.find(l => l.id === 'L')?.status === 'on-time' ? '1' : '0.5'} />
        
        {/* G Line */}
        <line x1="330" y1="50" x2="330" y2="150" stroke="#6CBE45" strokeWidth="8" opacity={lines.find(l => l.id === 'G')?.status === 'on-time' ? '1' : '0.5'} />
        
        {/* Brown Lines (J,Z) */}
        <line x1="360" y1="80" x2="360" y2="150" stroke="#996633" strokeWidth="8" opacity={lines.find(l => l.id === 'J')?.status === 'on-time' ? '1' : '0.5'} />
        
        {/* Intersection circles */}
        <circle cx="100" cy="100" r="6" fill="white" stroke="#333" strokeWidth="2" />
        <circle cx="240" cy="100" r="6" fill="white" stroke="#333" strokeWidth="2" />
        <circle cx="170" cy="130" r="6" fill="white" stroke="#333" strokeWidth="2" />
        <circle cx="290" cy="130" r="6" fill="white" stroke="#333" strokeWidth="2" />
      </svg>
      
      {/* Map overlay info */}
      <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm rounded-lg px-3 py-2 text-xs">
        <div className="text-gray-900">System Map</div>
        <div className="text-gray-500">Real-time status</div>
      </div>
    </div>
  );
}
