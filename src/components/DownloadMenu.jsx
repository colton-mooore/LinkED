import PropTypes from 'prop-types';

function downloadFile({ content, filename, type }) {
  const blob = new Blob([content], { type });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', filename);
  document.body.appendChild(link);
  link.click();
  link.parentNode.removeChild(link);
  URL.revokeObjectURL(url);
}

export default function DownloadMenu({ data, selectedSkill, selectedState }) {
  const baseName = `${selectedState}-${selectedSkill}-alignment`;

  const handleDownloadJson = () => {
    const content = JSON.stringify(data, null, 2);
    downloadFile({
      content,
      filename: `${baseName}.json`,
      type: 'application/json',
    });
  };

  const handleDownloadCsv = () => {
    const header = 'standardId,standardName,score';
    const rows = data.map((row) =>
      [row.standardId, `"${row.standardName.replace(/"/g, '""')}"`, row.score].join(',')
    );
    const content = [header, ...rows].join('\n');
    downloadFile({
      content,
      filename: `${baseName}.csv`,
      type: 'text/csv',
    });
  };

  const disabled = data.length === 0;

  return (
    <div className="flex flex-wrap gap-3">
      <button
        type="button"
        onClick={handleDownloadJson}
        disabled={disabled}
        className="rounded-md border border-slate-700 px-4 py-2 text-sm font-medium text-slate-200 transition hover:border-brand hover:bg-brand/10 hover:text-white disabled:cursor-not-allowed disabled:opacity-50"
      >
        Download JSON
      </button>
      <button
        type="button"
        onClick={handleDownloadCsv}
        disabled={disabled}
        className="rounded-md border border-slate-700 px-4 py-2 text-sm font-medium text-slate-200 transition hover:border-brand hover:bg-brand/10 hover:text-white disabled:cursor-not-allowed disabled:opacity-50"
      >
        Download CSV
      </button>
    </div>
  );
}

DownloadMenu.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      standardId: PropTypes.string.isRequired,
      standardName: PropTypes.string.isRequired,
      score: PropTypes.number.isRequired,
    })
  ).isRequired,
  selectedSkill: PropTypes.string.isRequired,
  selectedState: PropTypes.string.isRequired,
};
