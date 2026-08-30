import { useState } from 'react';
import { usePolling } from './hooks/usePolling';
import Header from './components/Header';
import MetricCards from './components/MetricCards';
import LiveChart from './components/LiveChart';
import SummaryPanel from './components/SummaryPanel';
import PowerCharts from './components/PowerCharts';
import ExperimentComparison from './components/ExperimentComparison';
import HistoryTable from './components/HistoryTable';
import './App.css';

function App() {
  const { latest, chartData, isConnected, lastUpdate } = usePolling();
  const [experimentId, setExperimentId] = useState('');

  return (
    <div className="app">
      <Header
        isConnected={isConnected}
        lastUpdate={lastUpdate}
        source={latest?.source}
      />

      <main className="dashboard">
        {/* Section: Live Telemetry */}
        <section className="section">
          <h2 className="section-title">Live Telemetry</h2>
          <MetricCards data={latest} />
        </section>

        {/* Section: Live Trend Chart */}
        <section className="section">
          <LiveChart data={chartData} />
        </section>

        {/* Section: Experiment Filter */}
        <section className="section">
          <ExperimentComparison onExperimentChange={setExperimentId} />
        </section>

        {/* Section: Summary Statistics */}
        <section className="section">
          <SummaryPanel experimentId={experimentId} />
        </section>

        {/* Section: Power Analysis Charts */}
        <section className="section">
          <h2 className="section-title">Power Analysis</h2>
          <PowerCharts experimentId={experimentId} />
        </section>

        {/* Section: Historical Data Table */}
        <section className="section">
          <HistoryTable experimentId={experimentId} />
        </section>
      </main>

      <footer className="app-footer">
        <p>Wind Turbine IoT Monitoring System — University Engineering Project</p>
      </footer>
    </div>
  );
}

export default App;
