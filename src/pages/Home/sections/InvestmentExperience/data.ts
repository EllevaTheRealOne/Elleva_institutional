// Institutional dataset for Investment Experience views

export const FIDUCIARY_TRACKING_DATA = [
  { month: 'Jan', executado: 100.0, politicaAlvo: 100.0 },
  { month: 'Fev', executado: 100.2, politicaAlvo: 100.0 },
  { month: 'Mar', executado: 100.1, politicaAlvo: 100.0 },
  { month: 'Abr', executado: 99.9, politicaAlvo: 100.0 },
  { month: 'Mai', executado: 100.3, politicaAlvo: 100.0 },
  { month: 'Jun', executado: 100.1, politicaAlvo: 100.0 },
  { month: 'Jul', executado: 100.0, politicaAlvo: 100.0 },
];

export const INSTITUTIONAL_HOLDINGS = [
  {
    id: 'US-T-BILL-26',
    name: 'US Treasury Bills 3M / 6M',
    category: 'Sovereign Fixed Income',
    weight: '34.5%',
    custodian: 'BNY Mellon (Segregated)',
    settlement: 'T+0 Intraday',
    status: 'Tier-1 Fiduciary',
  },
  {
    id: 'US-T-NOTE-10Y',
    name: 'US Treasury Notes 10Y Benchmark',
    category: 'Sovereign Fixed Income',
    weight: '17.5%',
    custodian: 'State Street Global Custody',
    settlement: 'T+1 DVP',
    status: 'Tier-1 Fiduciary',
  },
  {
    id: 'MSCI-WORLD-ESG',
    name: 'Global Core Institutional Index',
    category: 'Global Equities',
    weight: '24.0%',
    custodian: 'JPMorgan Chase CASS',
    settlement: 'T+1 DVP',
    status: 'Direct Title',
  },
  {
    id: 'INFRA-GLOBAL-EQ',
    name: 'Essential Infrastructure & Utilities',
    category: 'Real Assets',
    weight: '12.0%',
    custodian: 'Euroclear Bank',
    settlement: 'T+1 DVP',
    status: 'Direct Title',
  },
  {
    id: 'SOFR-CASH-EQUIV',
    name: 'Overnight SOFR Sweep & Fiduciary Cash',
    category: 'Strategic Liquidity',
    weight: '12.0%',
    custodian: 'Federal Reserve Bank Account',
    settlement: 'T+0 Real-time',
    status: 'Tier-1 Reserve',
  },
];

export const CUSTODIAN_DISTRIBUTION = [
  { name: 'BNY Mellon Trust', value: 38, color: '#0C5F5A' },
  { name: 'State Street Global', value: 30, color: '#189890' },
  { name: 'JPMorgan CASS', value: 20, color: '#8E9995' },
  { name: 'Euroclear Segregated', value: 12, color: '#4E5653' },
];

export const ALLOCATION_COMPARISON_DATA = [
  { assetClass: 'Sovereign Fixed Income', atual: 52.0, alvo: 50.0, desvio: '+2.0%' },
  { assetClass: 'Global Equities Core', atual: 24.0, alvo: 25.0, desvio: '-1.0%' },
  { assetClass: 'Real Assets & Infra', atual: 12.0, alvo: 13.0, desvio: '-1.0%' },
  { assetClass: 'Strategic Cash & SOFR', atual: 12.0, alvo: 12.0, desvio: '0.0%' },
];

export const GEOGRAPHIC_EXPOSURE = [
  { region: 'North America (US/CA)', weight: 64, color: '#0C5F5A' },
  { region: 'Developed Europe', weight: 22, color: '#189890' },
  { region: 'Asia-Pacific Core', weight: 10, color: '#8E9995' },
  { region: 'Global Sovereign Supranational', weight: 4, color: '#4E5653' },
];

export const PERFORMANCE_TRAJECTORY_DATA = [
  { period: 'Q1', portfolio: 100.0, benchmark: 100.0 },
  { period: 'Q2', portfolio: 102.4, benchmark: 101.8 },
  { period: 'Q3', portfolio: 104.9, benchmark: 103.5 },
  { period: 'Q4', portfolio: 107.1, benchmark: 105.2 },
  { period: 'Q1+1', portfolio: 109.8, benchmark: 107.0 },
  { period: 'Q2+1', portfolio: 112.6, benchmark: 109.1 },
];

export const BRINSON_ATTRIBUTION = [
  { component: 'Asset Allocation Effect', value: '+0.82%', type: 'positive' },
  { component: 'Security Selection Effect', value: '+1.44%', type: 'positive' },
  { component: 'Interaction / Execution Alpha', value: '+0.42%', type: 'positive' },
  { component: 'Net Currency Hedge Effect', value: '+0.06%', type: 'positive' },
];

export const STRESS_TEST_SCENARIOS = [
  { scenario: 'Macro Stagflation Shock', impacto: -2.8, limiteMax: -7.5 },
  { scenario: 'Geopolitical Volatility Surge', impacto: -1.9, limiteMax: -6.0 },
  { scenario: 'Yield Curve Spike (+150bps)', impacto: -1.4, limiteMax: -5.0 },
  { scenario: 'Global Equity Drawdown (-20%)', impacto: -3.2, limiteMax: -8.0 },
];

export const RISK_BUDGET_METRICS = [
  { label: 'VaR 99% Consumption', used: 27.5, max: 100, status: '1.24% of 4.50% limit' },
  { label: 'Tracking Error Limit', used: 34.0, max: 100, status: '0.34% of 1.00% limit' },
  { label: 'Single Issuer Concentration', used: 18.0, max: 100, status: '0.90% of 5.00% limit' },
  { label: 'Liquidity Stress Absorption', used: 12.0, max: 100, status: '94.2% available in <24h' },
];

export const LIQUIDITY_LADDER_DATA = [
  { horizon: 'T+0 Intraday', amount: 57.9, cumulative: 57.9 },
  { horizon: 'T+1 Next Day', amount: 214.2, cumulative: 272.1 },
  { horizon: 'T+2 / T+3 Market', amount: 154.6, cumulative: 426.7 },
  { horizon: 'T+5 Global Core', amount: 55.8, cumulative: 482.5 },
];

export const LIQUIDITY_INSTRUMENTS = [
  { name: 'Overnight Fed Reverse Repo / SOFR Cash', share: '12.0%', tier: 'Tier-1 Cash' },
  { name: 'US Treasury Bills (< 90 days)', share: '34.5%', tier: 'Tier-1 Sovereign' },
  { name: 'US Benchmark Notes (Liquid G10)', share: '28.0%', tier: 'Tier-1 High Liquid' },
  { name: 'Liquid Large-Cap Equities (DVP)', share: '25.5%', tier: 'Liquid Equities' },
];

export const MACRO_REGIME_SIGNALS = [
  { indicator: 'Macro Growth Impulse', status: 'Moderate Expansion', signal: 'Constructive', confidence: '96.2%' },
  { indicator: 'Fiduciary Inflation Drift', status: 'Disinflating / Neutral', signal: 'Controlled', confidence: '94.8%' },
  { indicator: 'Sovereign Curve Term Premia', status: 'Normalized Slope', signal: 'Neutral Duration', confidence: '98.0%' },
  { indicator: 'Credit Risk Premia (IG/HY)', status: 'Tight Spreads / Stable', signal: 'No Tail Stress', confidence: '91.5%' },
];

export const AUTONOMOUS_THESES = [
  {
    title: 'Sovereign Duration Immunization',
    hypothesis: 'Maintain effective duration within ±0.05y of benchmark mandate to neutralize rates volatility.',
    status: 'ACTIVE EXECUTION',
  },
  {
    title: 'Systematic Factor Quality Overweight',
    hypothesis: 'Maintain positive exposure to institutional profitability and balance-sheet resilience factors.',
    status: 'ACTIVE EXECUTION',
  },
  {
    title: 'Intraday Custody Segregation Auditing',
    hypothesis: 'Enforce real-time cryptographic asset reconciliation across all 4 Tier-1 custodial vaults.',
    status: 'VERIFIED CONTINUOUS',
  },
];

export const FACTOR_EXPOSURES = [
  { factor: 'Value Factor', zScore: 0.42, benchmark: 0.0 },
  { factor: 'Momentum Factor', zScore: 0.68, benchmark: 0.0 },
  { factor: 'Quality / Profitability', zScore: 1.15, benchmark: 0.0 },
  { factor: 'Low Volatility', zScore: 0.74, benchmark: 0.0 },
  { factor: 'Size Factor (Large Cap)', zScore: 0.88, benchmark: 0.0 },
  { factor: 'Yield / Carry', zScore: 0.52, benchmark: 0.0 },
  { factor: 'Liquidity Factor', zScore: 1.28, benchmark: 0.0 },
];

export const TELEMETRY_LOGS = [
  { time: '14:32:01 UTC', node: 'Vault-01 (BNY Mellon)', event: 'Settlement Hash Verified (T+0)', status: 'SECURE' },
  { time: '14:31:58 UTC', node: 'Compliance Engine Pre-Trade', event: '240 Mandate Rules Evaluated (0.4ms)', status: 'PASSED' },
  { time: '14:31:40 UTC', node: 'Risk Engine Monte Carlo', event: '10,000 Path VaR Recalibration (1.24%)', status: 'COMPLIANT' },
  { time: '14:30:22 UTC', node: 'Custody Rebalancer', event: 'Drift Threshold Check (±0.12% < ±1.50%)', status: 'OPTIMAL' },
  { time: '14:28:15 UTC', node: 'Market Feed Telemetry', event: 'Global 4,820 feeds/sec Ingestion', status: 'SYNCHRONIZED' },
];

export const MANDATE_COMPLIANCE_RULES = [
  { rule: 'Mandate Leverage Constraint', limit: '0.00x (No Leverage Permitted)', current: '0.00x', status: 'COMPLIANT' },
  { rule: 'Single Issuer Exposure Cap', limit: 'Max 5.00% Net AUM', current: '0.92% Max', status: 'COMPLIANT' },
  { rule: 'Minimum Investment Grade Floor', limit: '100% BBB- or higher', current: '100% AAA/AA+', status: 'COMPLIANT' },
  { rule: 'Direct Custody Segregation Mandate', limit: '100% Client Legal Title', current: '100.0%', status: 'COMPLIANT' },
  { rule: 'Restricted Entity / OFAC Sanctions List', limit: '0 Violations Permitted', current: '0 Violations', status: 'COMPLIANT' },
];
