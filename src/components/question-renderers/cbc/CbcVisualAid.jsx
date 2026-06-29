function ShapeVisual({ shape }) {
  const normalized = String(shape || '').toLowerCase();

  if (normalized === 'circle') {
    return <span className="cbc-visual-shape circle" aria-hidden="true" />;
  }

  if (normalized === 'triangle') {
    return <span className="cbc-visual-shape triangle" aria-hidden="true" />;
  }

  if (normalized === 'rectangle') {
    return <span className="cbc-visual-shape rectangle" aria-hidden="true" />;
  }

  return <span className="cbc-visual-shape square" aria-hidden="true" />;
}

function ArrayVisual({ visual, label = '' }) {
  const item = visual.item || '●';
  const rows = Math.max(1, Number(visual.rows) || 1);
  const cols = Math.max(1, Number(visual.cols) || 1);
  const total = rows * cols;
  const arrayColsClass = [8, 9].includes(cols) ? ` cbc-array-cols-${cols}` : '';

  return (
    <span
      className={`cbc-visual-array${arrayColsClass}`}
      aria-label={label || `${rows} rows of ${cols}`}
      role="img"
    >
      {Array.from({ length: total }).map((_, index) => (
        <span key={`array-${index}`} aria-hidden="true">{item}</span>
      ))}
    </span>
  );
}

const clockNumbers = Array.from({ length: 12 }, (_, index) => index + 1);

function normalizeClockTime(visual) {
  const clock = visual?.clock || visual || {};
  const [timeHour, timeMinute] = String(visual?.time || '')
    .split(':')
    .map((part) => Number(part));

  const rawHour = Number(clock.hour ?? visual?.hour ?? timeHour);
  const rawMinute = Number(clock.minute ?? visual?.minute ?? timeMinute);
  const hour = Number.isFinite(rawHour) ? rawHour : 12;
  const minute = Number.isFinite(rawMinute) ? rawMinute : 0;

  return {
    hour,
    minute: Math.min(59, Math.max(0, minute))
  };
}

function polarPoint(angleDeg, radius, center = 50) {
  const radians = (angleDeg - 90) * (Math.PI / 180);

  return {
    x: center + radius * Math.cos(radians),
    y: center + radius * Math.sin(radians)
  };
}

function ClockVisual({ visual }) {
  const { hour, minute } = normalizeClockTime(visual);
  const minuteAngle = minute * 6;
  const hourAngle = (hour % 12) * 30 + minute * 0.5;
  const hourEnd = polarPoint(hourAngle, 24);
  const minuteEnd = polarPoint(minuteAngle, 34);
  const displayHour = Number.isInteger(hour) ? hour : String(hour).replace(/\.0$/, '');
  const displayMinute = String(minute).padStart(2, '0');
  const label = visual?.ariaLabel || `Analog clock showing ${displayHour}:${displayMinute}.`;

  return (
    <svg className="cbc-visual-clock" viewBox="0 0 100 100" role="img" aria-label={label}>
      <circle className="cbc-clock-face" cx="50" cy="50" r="46" aria-hidden="true" />
      {clockNumbers.map((number) => {
        const point = polarPoint(number * 30, 36);

        return (
          <text
            className="cbc-clock-number"
            dominantBaseline="middle"
            key={number}
            textAnchor="middle"
            x={point.x}
            y={point.y}
            aria-hidden="true"
          >
            {number}
          </text>
        );
      })}
      <line className="cbc-clock-hand hour" x1="50" y1="50" x2={hourEnd.x} y2={hourEnd.y} aria-hidden="true" />
      <line className="cbc-clock-hand minute" x1="50" y1="50" x2={minuteEnd.x} y2={minuteEnd.y} aria-hidden="true" />
      <circle className="cbc-clock-center" cx="50" cy="50" r="2.6" aria-hidden="true" />
    </svg>
  );
}

function CompassVisual({ visual }) {
  const directions = ['N', 'E', 'S', 'W'];
  const labels = { N: 'North', E: 'East', S: 'South', W: 'West' };
  const directionNames = { N: 'north', E: 'east', S: 'south', W: 'west' };
  const startDir = visual?.startDirection || '';
  const answerDir = visual?.answerDirection || '';
  const turn = visual?.turn || '';
  const getCompassDirectionClass = (direction) => `cbc-compass-arm ${directionNames[direction]}${startDir === direction ? ' start' : ''}${answerDir === direction ? ' answer' : ''}`;

  const turnLabel = turn ? `Turn ${turn}.` : '';

  const accessibleLabel = `Compass showing ${directions.map(d => `${d} (${labels[d]})`).join(', ')}. Start direction ${labels[startDir] || ''}. ${turnLabel} Answer direction ${labels[answerDir] || ''}.`;

  return (
    <span className="cbc-visual-compass" role="img" aria-label={accessibleLabel.trim()}>
      <span className="cbc-compass-labels">
        <span className={getCompassDirectionClass('N')} aria-hidden="true">
          <span className="cbc-compass-dir">N</span>
          <span className="cbc-compass-label">North</span>
          <span className="cbc-compass-arrow">↑</span>
        </span>
      </span>
      <span className="cbc-compass-cross" aria-hidden="true">
        <span className={getCompassDirectionClass('W')}>
          <span className="cbc-compass-dir">W</span>
          <span className="cbc-compass-label">West</span>
          <span className="cbc-compass-arrow">←</span>
        </span>
        <span className="cbc-compass-center">●</span>
        <span className={getCompassDirectionClass('E')}>
          <span className="cbc-compass-arrow">→</span>
          <span className="cbc-compass-dir">E</span>
          <span className="cbc-compass-label">East</span>
        </span>
      </span>
      <span className="cbc-compass-labels">
        <span className={getCompassDirectionClass('S')} aria-hidden="true">
          <span className="cbc-compass-arrow">↓</span>
          <span className="cbc-compass-dir">S</span>
          <span className="cbc-compass-label">South</span>
        </span>
      </span>
    </span>
  );
}

export default function CbcVisualAid({ visual, label = '' }) {
  if (!visual) return null;

  if (visual.type === 'shape') {
    return <ShapeVisual shape={visual.shape} />;
  }

  if (visual.type === 'emoji') {
    return <span className="cbc-visual-emoji" aria-hidden="true">{visual.value}</span>;
  }

  if (visual.type === 'objects') {
    const count = Math.max(0, Number(visual.count) || 0);
    return (
      <span className="cbc-visual-objects" aria-label={label || `${count} objects`}>
        {Array.from({ length: count }).map((_, index) => (
          <span key={`${visual.item || 'item'}-${index}`} aria-hidden="true">{visual.item || '●'}</span>
        ))}
      </span>
    );
  }

  if (visual.type === 'array') {
    return <ArrayVisual visual={visual} label={label} />;
  }

  if (visual.type === 'clock') {
    return <ClockVisual visual={visual} />;
  }

  if (visual.type === 'compass') {
    return <CompassVisual visual={visual} />;
  }

  if (visual.type === 'text') {
    return <span className="cbc-visual-text">{visual.value}</span>;
  }

  return null;
}