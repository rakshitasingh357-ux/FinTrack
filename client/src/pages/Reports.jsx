import {
  Download,
  FileBarChart,
  Calendar,
} from "lucide-react";

function Reports() {
  const downloadReport = (type) => {
    const content =
      `FinTrack ${type} Report\n\nGenerated from your FinTrack application.`;

    const blob = new Blob(
      [content],
      {
        type: "text/plain",
      }
    );

    const url =
      URL.createObjectURL(blob);

    const link =
      document.createElement("a");

    link.href = url;

    link.download =
      `${type
        .toLowerCase()
        .replace(" ", "-")}-report.txt`;

    link.click();

    URL.revokeObjectURL(url);
  };

  return (
    <div className="page">
      <div className="page-header">
        <div>
          <p className="welcome-text">
            FINANCIAL REPORTING
          </p>

          <h1>
            Reports
          </h1>

          <p>
            Generate summaries of your
            financial activity.
          </p>
        </div>
      </div>

      <div className="reports-grid">
        <div className="glass-card report-card">
          <div className="report-icon">
            <FileBarChart size={30} />
          </div>

          <h2>
            Monthly Report
          </h2>

          <p>
            Get an overview of your
            monthly financial activity.
          </p>

          <button
            className="secondary-button"
            onClick={() =>
              downloadReport("Monthly")
            }
          >
            <Download size={18} />
            Download Report
          </button>
        </div>

        <div className="glass-card report-card">
          <div className="report-icon yellow-icon">
            <Calendar size={30} />
          </div>

          <h2>
            Yearly Summary
          </h2>

          <p>
            Review your financial
            performance throughout
            the year.
          </p>

          <button
            className="secondary-button"
            onClick={() =>
              downloadReport("Yearly")
            }
          >
            <Download size={18} />
            Download Report
          </button>
        </div>
      </div>
    </div>
  );
}

export default Reports;