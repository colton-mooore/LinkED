import PropTypes from 'prop-types';
import { scaleLinear } from 'd3';

const VIEWBOX_WIDTH = 720;
const BAR_HEIGHT = 32;
const BAR_GAP = 18;
const LABEL_WIDTH = 240;
const CHART_PADDING = 24;

export default function AlignmentChart({ data }) {
  if (!data?.length) {
    return (
      <div className="rounded-lg border border-dashed border-slate-700 bg-slate-900/60 p-8 text-center text-slate-400">
        Alignment scores for this combination are not yet available.
      </div>
    );
  }

  const xScale = scaleLinear().domain([0, 100]).range([0, VIEWBOX_WIDTH - LABEL_WIDTH - CHART_PADDING * 2]);
  const chartHeight = data.length * (BAR_HEIGHT + BAR_GAP) + CHART_PADDING * 2;

  return (
    <div className="overflow-x-auto">
      <svg
        className="w-full"
        role="img"
        aria-label="Alignment scores for state standards"
        viewBox={`0 0 ${VIEWBOX_WIDTH} ${chartHeight}`}
      >
        <defs>
          <linearGradient id="barGradient" x1="0%" x2="100%" y1="0%" y2="0%">
            <stop offset="0%" stopColor="rgba(37, 99, 235, 0.75)" />
            <stop offset="100%" stopColor="rgba(96, 165, 250, 1)" />
          </linearGradient>
        </defs>
        {data.map((item, index) => {
          const barWidth = xScale(item.score);
          const y = CHART_PADDING + index * (BAR_HEIGHT + BAR_GAP);
          const labelY = y + BAR_HEIGHT / 2;
          return (
            <g key={item.standardId} transform={`translate(0, ${y})`}>
              <text
                x={CHART_PADDING}
                y={labelY}
                alignmentBaseline="middle"
                className="fill-slate-200 text-sm"
              >
                {item.standardName}
              </text>
              <rect
                x={LABEL_WIDTH}
                y={0}
                width={VIEWBOX_WIDTH - LABEL_WIDTH - CHART_PADDING * 2}
                height={BAR_HEIGHT}
                rx={8}
                className="fill-slate-800"
              />
              <rect
                x={LABEL_WIDTH}
                y={0}
                width={barWidth}
                height={BAR_HEIGHT}
                rx={8}
                fill="url(#barGradient)"
              />
              <text
                x={LABEL_WIDTH + barWidth + 12}
                y={labelY}
                alignmentBaseline="middle"
                className="fill-slate-200 text-sm font-semibold"
              >
                {item.score}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}

AlignmentChart.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      standardId: PropTypes.string.isRequired,
      standardName: PropTypes.string.isRequired,
      score: PropTypes.number.isRequired,
    })
  ),
};
