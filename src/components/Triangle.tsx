// Solid triangle drawn as SVG - unicode ▲▼◀▶ render as emoji boxes on iOS
const POINTS = {
  up: "5,1 9,9 1,9",
  down: "1,1 9,1 5,9",
  left: "9,1 9,9 1,5",
  right: "1,1 9,5 1,9",
};

export default function Triangle({ dir, className = "" }: { dir: keyof typeof POINTS; className?: string }) {
  return (
    <svg viewBox="0 0 10 10" aria-hidden="true" className={`inline-block w-[0.7em] h-[0.7em] fill-current align-[-0.05em] ${className}`}>
      <polygon points={POINTS[dir]} />
    </svg>
  );
}
