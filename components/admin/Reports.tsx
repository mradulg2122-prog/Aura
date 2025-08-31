import React from 'react';
import GlassCard from '../common/GlassCard';
import { FileDownIcon } from '../common/Icons';

const Reports: React.FC = () => {

  const handleExport = (reportType: string) => {
    // In a real app, this would trigger a download from an API endpoint.
    // Here, we just log to the console for demonstration.
    alert(`Exporting ${reportType}... Check the console.`);
    console.log(`Generating and downloading ${reportType}...`);
  };

  const reportOptions = [
    { type: 'User Activity Log (CSV)', description: 'A detailed log of all user activities including logins, resource access, and forum posts.' },
    { type: 'Weekly Analytics Summary (PDF)', description: 'A summary of key metrics like user engagement, mood trends, and screening results for the past week.' },
    { type: 'Full User Data (CSV)', description: 'A complete export of all user data. For administrative and backup purposes only.' },
    { type: 'Content Engagement Report (CSV)', description: 'Shows which resources, games, and articles are most popular among users.' },
  ];

  return (
    <div>
      <h1 className="text-3xl font-bold text-text-heading mb-2">Reports & Exports</h1>
      <p className="text-text-muted mb-8">Generate and download reports for analytics and record-keeping.</p>
      
      <GlassCard>
        <div className="space-y-6">
          {reportOptions.map(report => (
            <div key={report.type} className="flex flex-col md:flex-row items-start md:items-center justify-between p-4 bg-white/40 rounded-lg">
              <div>
                <h3 className="font-semibold text-text-heading">{report.type}</h3>
                <p className="text-sm text-text-body mt-1 max-w-xl">{report.description}</p>
              </div>
              <button
                onClick={() => handleExport(report.type)}
                className="mt-4 md:mt-0 flex-shrink-0 bg-accent text-white font-semibold py-2 px-4 rounded-lg hover:bg-opacity-90 transition-colors text-sm flex items-center gap-2"
              >
                <FileDownIcon className="w-4 h-4" />
                Export
              </button>
            </div>
          ))}
        </div>
      </GlassCard>
    </div>
  );
};

export default Reports;
