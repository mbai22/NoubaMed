"use client";

interface BarChartProps {
  data: { label: string; value: number; color?: string }[];
  height?: number;
}

export function BarChart({ data, height = 200 }: BarChartProps) {
  const max = Math.max(...data.map((d) => d.value));

  return (
    <div className="flex items-end gap-2" style={{ height }}>
      {data.map((d) => (
        <div key={d.label} className="flex-1 flex flex-col items-center gap-1.5 h-full justify-end">
          <span className="text-xs font-medium text-gray-900 dark:text-white">{d.value}</span>
          <div
            className="w-full rounded-md transition-all duration-500"
            style={{
              height: `${(d.value / max) * 100}%`,
              background: d.color || "linear-gradient(180deg, #7c3aed 0%, #a78bfa 100%)",
            }}
          />
          <span className="text-xs text-gray-400">{d.label}</span>
        </div>
      ))}
    </div>
  );
}

export function LineChart({ data, height = 200 }: { data: { label: string; value: number }[]; height?: number }) {
  const max = Math.max(...data.map((d) => d.value));
  const points = data.map((d, i) => ({
    x: (i / (data.length - 1)) * 100,
    y: ((max - d.value) / max) * (height - 24),
  }));

  return (
    <div className="relative" style={{ height }}>
      <svg className="w-full h-full" preserveAspectRatio="none" viewBox={`0 0 100 ${height}`}>
        <polyline
          points={points.map((p) => `${p.x},${p.y}`).join(" ")}
          fill="none"
          stroke="#7c3aed"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {points.map((p, i) => (
          <circle key={i} cx={p.x} cy={p.y} r="3" fill="#7c3aed" stroke="white" strokeWidth="2" />
        ))}
      </svg>
      <div className="flex justify-between mt-2">
        {data.map((d) => (
          <span key={d.label} className="text-xs text-gray-400">{d.label}</span>
        ))}
      </div>
    </div>
  );
}
