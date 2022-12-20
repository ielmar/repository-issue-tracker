export default function Table({ openIssues, closedIssues }) {
  return (
    <div className="table-container" role="table">
      <div className="flex-table header" role="rowgroup">
        <div className="flex-row" role="columnheader">
          Title
        </div>
        <div className="flex-row" role="columnheader">
          Status
        </div>
        <div className="flex-row" role="columnheader">
          Created
        </div>
        <div className="flex-row" role="columnheader">
          Closed
        </div>
        <div className="flex-row" role="columnheader">
          Duration
        </div>
      </div>
      {openIssues.map((issue, idx) => (
        <div
          className="flex-table row"
          role="rowgroup"
          key={`open_issue__${idx}`}
        >
          <div className="flex-row" role="cell">
            <a href={issue.url} title={issue.title}>
              {`${issue.title} #${issue.number}`}
            </a>
          </div>
          <div className="flex-row" role="cell">
            {issue.state}
          </div>
          <div className="flex-row" role="cell">
            {issue.created_at}
          </div>
          <div className="flex-row" role="cell">
            Not yet
          </div>
          <div className="flex-row" role="cell">
            Not closed
          </div>
        </div>
      ))}
      {closedIssues.map((issue, idx) => {
        const duration = Math.round(
          (new Date(issue.closed_at).getTime() -
            new Date(issue.created_at).getTime()) /
            (1000 * 60 * 60 * 24)
        );
        return (
          <div
            className="flex-table row"
            role="rowgroup"
            key={`closed_issue__${idx}`}
          >
            <div className="flex-row" role="cell">
              <a href={issue.url} title={issue.title}>
                {`${issue.title} #${issue.number}`}
              </a>
            </div>
            <div className="flex-row" role="cell">
              {issue.state}
            </div>
            <div className="flex-row" role="cell">
              {issue.created_at}
            </div>
            <div className="flex-row" role="cell">
              {issue.closed_at}
            </div>
            <div className="flex-row" role="cell">
              {duration} {duration > 1 ? "days" : "day"}
            </div>
          </div>
        );
      })}
    </div>
  );
}
