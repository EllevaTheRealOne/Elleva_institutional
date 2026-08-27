import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
  Line,
  createCoordinates,
} from '@vnedyalk0v/react19-simple-maps';
import type { Coordinates } from '@vnedyalk0v/react19-simple-maps';
import {
  Activity,
  Building,
  Database,
  Landmark,
  Lock,
  PieChart,
  ShieldCheck,
} from 'lucide-react';

import countries110m from 'world-atlas/countries-110m.json';

interface GlobalMarketsProps {
  isDark?: boolean;
}

interface FinancialHub {
  id: string;
  name: string;
  city: string;
  coordinates: Coordinates;
  roleKey: string;
  exchange: string;
  latency: string;
  moduleKey: string;
  descKey: string;
}

interface FinancialRoute {
  from: Coordinates;
  to: Coordinates;
  label: string;
}

const FINANCIAL_HUBS: FinancialHub[] = [
  {
    id: 'nyc',
    city: 'New York',
    name: 'New York (NYSE / NASDAQ)',
    coordinates: createCoordinates(-74.006, 40.7128),
    exchange: 'NYSE / NASDAQ / CME',
    roleKey: 'globalMarkets.hubs.nyc.role',
    latency: '< 1.8ms',
    moduleKey: 'globalMarkets.hubs.nyc.module',
    descKey: 'globalMarkets.hubs.nyc.desc',
  },
  {
    id: 'lon',
    city: 'London',
    name: 'London (LSE / FX Hub)',
    coordinates: createCoordinates(-0.1278, 51.5074),
    exchange: 'LSE / ICE Europe / FX Spot',
    roleKey: 'globalMarkets.hubs.lon.role',
    latency: '< 2.1ms',
    moduleKey: 'globalMarkets.hubs.lon.module',
    descKey: 'globalMarkets.hubs.lon.desc',
  },
  {
    id: 'zrh',
    city: 'Zurich',
    name: 'Zurich (SIX / Private Banking)',
    coordinates: createCoordinates(8.5417, 47.3769),
    exchange: 'SIX Swiss Exchange',
    roleKey: 'globalMarkets.hubs.zrh.role',
    latency: '< 3.2ms',
    moduleKey: 'globalMarkets.hubs.zrh.module',
    descKey: 'globalMarkets.hubs.zrh.desc',
  },
  {
    id: 'dxb',
    city: 'Dubai',
    name: 'Dubai (DIFC / Sovereign Capital)',
    coordinates: createCoordinates(55.2708, 25.2048),
    exchange: 'DFM / Nasdaq Dubai',
    roleKey: 'globalMarkets.hubs.dxb.role',
    latency: '< 4.1ms',
    moduleKey: 'globalMarkets.hubs.dxb.module',
    descKey: 'globalMarkets.hubs.dxb.desc',
  },
  {
    id: 'sao',
    city: 'São Paulo',
    name: 'São Paulo (B3 / LatAm Hub)',
    coordinates: createCoordinates(-46.6333, -23.5505),
    exchange: 'B3 (Brasil, Bolsa, Balcão)',
    roleKey: 'globalMarkets.hubs.sao.role',
    latency: '< 2.4ms',
    moduleKey: 'globalMarkets.hubs.sao.module',
    descKey: 'globalMarkets.hubs.sao.desc',
  },
  {
    id: 'sgp',
    city: 'Singapore',
    name: 'Singapore (SGX / Asian FX)',
    coordinates: createCoordinates(103.8198, 1.3521),
    exchange: 'SGX / MAS Framework',
    roleKey: 'globalMarkets.hubs.sgp.role',
    latency: '< 3.9ms',
    moduleKey: 'globalMarkets.hubs.sgp.module',
    descKey: 'globalMarkets.hubs.sgp.desc',
  },
  {
    id: 'hkg',
    city: 'Hong Kong',
    name: 'Hong Kong (HKEX / Global Flow)',
    coordinates: createCoordinates(114.1694, 22.3193),
    exchange: 'HKEX (Hong Kong Exchanges)',
    roleKey: 'globalMarkets.hubs.hkg.role',
    latency: '< 4.4ms',
    moduleKey: 'globalMarkets.hubs.hkg.module',
    descKey: 'globalMarkets.hubs.hkg.desc',
  },
];

const FINANCIAL_ROUTES: FinancialRoute[] = [
  {
    from: createCoordinates(-74.006, 40.7128),
    to: createCoordinates(-0.1278, 51.5074),
    label: 'NYC - LON',
  },
  {
    from: createCoordinates(-74.006, 40.7128),
    to: createCoordinates(-46.6333, -23.5505),
    label: 'NYC - SAO',
  },
  {
    from: createCoordinates(-0.1278, 51.5074),
    to: createCoordinates(8.5417, 47.3769),
    label: 'LON - ZRH',
  },
  {
    from: createCoordinates(8.5417, 47.3769),
    to: createCoordinates(55.2708, 25.2048),
    label: 'ZRH - DXB',
  },
  {
    from: createCoordinates(55.2708, 25.2048),
    to: createCoordinates(103.8198, 1.3521),
    label: 'DXB - SGP',
  },
  {
    from: createCoordinates(103.8198, 1.3521),
    to: createCoordinates(114.1694, 22.3193),
    label: 'SGP - HKG',
  },
  {
    from: createCoordinates(-0.1278, 51.5074),
    to: createCoordinates(103.8198, 1.3521),
    label: 'LON - SGP',
  },
  {
    from: createCoordinates(-46.6333, -23.5505),
    to: createCoordinates(-0.1278, 51.5074),
    label: 'SAO - LON',
  },
];

export const GlobalMarkets: React.FC<GlobalMarketsProps> = ({
  isDark = false,
}) => {
  const { t } = useTranslation(['home', 'common']);

  const [selectedHub, setSelectedHub] = useState<FinancialHub>(
    FINANCIAL_HUBS[0],
  );

  const connectedModules = [
    {
      id: 'global-market-data',
      name: t('globalMarkets.modules.marketData.name'),
      icon: <Database className="h-3.5 w-3.5" />,
      desc: t('globalMarkets.modules.marketData.desc'),
    },
    {
      id: 'global-banks',
      name: t('globalMarkets.modules.banks.name'),
      icon: <Landmark className="h-3.5 w-3.5" />,
      desc: t('globalMarkets.modules.banks.desc'),
    },
    {
      id: 'global-brokers',
      name: t('globalMarkets.modules.brokers.name'),
      icon: <Building className="h-3.5 w-3.5" />,
      desc: t('globalMarkets.modules.brokers.desc'),
    },
    {
      id: 'global-custody',
      name: t('globalMarkets.modules.custody.name'),
      icon: <Lock className="h-3.5 w-3.5" />,
      desc: t('globalMarkets.modules.custody.desc'),
    },
    {
      id: 'global-compliance',
      name: t('globalMarkets.modules.compliance.name'),
      icon: <ShieldCheck className="h-3.5 w-3.5" />,
      desc: t('globalMarkets.modules.compliance.desc'),
    },
    {
      id: 'global-portfolios',
      name: t('globalMarkets.modules.portfolios.name'),
      icon: <PieChart className="h-3.5 w-3.5" />,
      desc: t('globalMarkets.modules.portfolios.desc'),
    },
  ];

  return (
    <section
      id="global-markets"
      className={`border-t py-20 transition-colors duration-300 sm:py-28 ${
        isDark
          ? 'border-white/5 bg-[#050607] text-[#F5F7F6]'
          : 'border-black/[0.04] bg-[#F7F8F6] text-[#0A0D0C]'
      }`}
    >
      <div className="mx-auto max-w-7xl px-6 sm:px-10">
        <div className="mb-14 max-w-3xl">
          <h2 className="type-section-title mb-4">
            {t('globalMarkets.title')}
          </h2>

          <p
            className={`type-body ${
              isDark ? 'text-[#8E9995]' : 'text-[#4E5653]'
            }`}
          >
            {t('globalMarkets.description')}
          </p>
        </div>

        <div
          className={`mb-10 overflow-hidden rounded-2xl border transition-all ${
            isDark
              ? 'border-[rgba(245,247,246,0.1)] bg-[#0A0D0F] shadow-xl'
              : 'border-[rgba(10,13,12,0.1)] bg-white shadow-sm'
          }`}
        >
          <div
            className={`flex flex-wrap items-center justify-between gap-4 border-b px-6 py-3.5 text-xs font-mono ${
              isDark
                ? 'border-[rgba(245,247,246,0.08)] bg-[#0E1214]'
                : 'border-[rgba(10,13,12,0.06)] bg-[#F1F3F1]'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <span className="h-2 w-2 animate-pulse rounded-full bg-[#189890]" />

              <span className="font-bold text-[#189890]">
                {t('globalMarkets.telemetry.mesh')}
              </span>

              <span
                className={`hidden sm:inline ${
                  isDark ? 'text-[#8E9995]' : 'text-[#4E5653]'
                }`}
              >
                {t('globalMarkets.telemetry.hubsCount')}
              </span>
            </div>

            <div className="flex items-center gap-4 text-[11px]">
              <span
                className={isDark ? 'text-[#8E9995]' : 'text-[#4E5653]'}
              >
                {t('globalMarkets.telemetry.routingLabel')}{' '}
                <span className="font-bold text-[#189890]">
                  {t('globalMarkets.telemetry.routingValue')}
                </span>
              </span>

              <span
                className={isDark ? 'text-[#8E9995]' : 'text-[#4E5653]'}
              >
                {t('globalMarkets.telemetry.statusLabel')}{' '}
                <span className="font-bold text-[#189890]">
                  {t('globalMarkets.telemetry.statusValue')}
                </span>
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12">
            <div className="relative flex min-h-[340px] items-center justify-center overflow-hidden p-3 sm:min-h-[460px] sm:p-6 lg:col-span-8">
              <div className="aspect-[16/10] max-h-[500px] w-full sm:aspect-[16/9]">
                <ComposableMap
                  projection="geoEqualEarth"
                  projectionConfig={{
                    scale: 170,
                    center: createCoordinates(15, 10),
                  }}
                  className="h-full w-full"
                >
                  <Geographies geography={countries110m}>
                    {({ geographies }) =>
                      geographies.map((geo) => (
                        <Geography
                          key={geo.rsmKey}
                          geography={geo}
                          fill={isDark ? '#11161A' : '#E8EBE7'}
                          stroke={isDark ? '#1C252B' : '#DCE1DC'}
                          strokeWidth={0.4}
                          style={{
                            default: {
                              outline: 'none',
                            },
                            hover: {
                              fill: isDark ? '#172026' : '#DFE5DE',
                              outline: 'none',
                            },
                            pressed: {
                              outline: 'none',
                            },
                          }}
                        />
                      ))
                    }
                  </Geographies>

                  {FINANCIAL_ROUTES.map((route) => (
                    <Line
                      key={route.label}
                      from={route.from}
                      to={route.to}
                      stroke={isDark ? '#189890' : '#0C5F5A'}
                      strokeWidth={1.2}
                      strokeOpacity={isDark ? 0.45 : 0.35}
                      className="map-route-subtle"
                    />
                  ))}

                  {FINANCIAL_HUBS.map((hub) => {
                    const isSelected = selectedHub.id === hub.id;

                    return (
                      <Marker
                        key={hub.id}
                        coordinates={hub.coordinates}
                        onClick={() => setSelectedHub(hub)}
                        className="cursor-pointer transition-transform duration-200"
                      >
                        {isSelected && (
                          <circle
                            r={10}
                            fill="none"
                            stroke="#189890"
                            strokeWidth={1.2}
                            opacity={0.7}
                            className="animate-ping"
                          />
                        )}

                        <circle
                          r={isSelected ? 5.5 : 3.5}
                          fill={
                            isSelected
                              ? '#189890'
                              : isDark
                                ? '#F5F7F6'
                                : '#0A0D0C'
                          }
                          stroke={isDark ? '#050607' : '#FFFFFF'}
                          strokeWidth={1.5}
                        />

                        <text
                          textAnchor="middle"
                          y={hub.coordinates[1] < 0 ? 14 : -10}
                          className={`pointer-events-none hidden select-none text-[9px] font-mono font-medium tracking-tight sm:block ${
                            isSelected
                              ? 'fill-[#189890] font-bold'
                              : isDark
                                ? 'fill-[#8E9995]'
                                : 'fill-[#4E5653]'
                          }`}
                        >
                          {hub.city}
                        </text>
                      </Marker>
                    );
                  })}
                </ComposableMap>
              </div>

              <div className="pointer-events-none absolute bottom-3 left-4 hidden select-none text-[10px] font-mono text-[#8E9995] sm:block">
                {t('globalMarkets.footerNote')}
              </div>
            </div>

            <div
              className={`flex flex-col justify-between border-t p-6 sm:p-7 lg:col-span-4 lg:border-l lg:border-t-0 ${
                isDark
                  ? 'border-[rgba(245,247,246,0.08)] bg-[#0E1214]'
                  : 'border-[rgba(10,13,12,0.06)] bg-[#F7F8F6]'
              }`}
            >
              <div>
                <div className="mb-3 flex items-center justify-between">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-[#189890] font-ui">
                    {t('globalMarkets.inspector.badge')}
                  </span>

                  <span className="rounded bg-[#189890]/10 px-2 py-0.5 text-[10px] font-semibold text-[#189890] font-mono">
                    {selectedHub.id.toUpperCase()}
                  </span>
                </div>

                <h3 className="mb-1 text-xl font-bold font-display sm:text-2xl">
                  {selectedHub.name}
                </h3>

                <div className="mb-4 text-xs text-[#189890] font-mono">
                  {selectedHub.exchange}
                </div>

                <p
                  className={`mb-6 text-xs leading-relaxed font-body sm:text-sm ${
                    isDark ? 'text-[#8E9995]' : 'text-[#4E5653]'
                  }`}
                >
                  {t(selectedHub.descKey)}
                </p>

                <div className="space-y-3 text-xs font-ui">
                  <div className="flex justify-between border-b border-black/[0.06] pb-2 dark:border-white/10">
                    <span
                      className={
                        isDark ? 'text-[#8E9995]' : 'text-[#4E5653]'
                      }
                    >
                      {t('globalMarkets.inspector.primaryRole')}
                    </span>

                    <span className="max-w-[170px] text-right font-semibold">
                      {t(selectedHub.roleKey)}
                    </span>
                  </div>

                  <div className="flex justify-between border-b border-black/[0.06] pb-2 dark:border-white/10">
                    <span
                      className={
                        isDark ? 'text-[#8E9995]' : 'text-[#4E5653]'
                      }
                    >
                      {t('globalMarkets.inspector.layer')}
                    </span>

                    <span className="font-semibold text-[#189890]">
                      {t(selectedHub.moduleKey)}
                    </span>
                  </div>

                  <div className="flex justify-between border-b border-black/[0.06] pb-2 dark:border-white/10">
                    <span
                      className={
                        isDark ? 'text-[#8E9995]' : 'text-[#4E5653]'
                      }
                    >
                      {t('globalMarkets.inspector.latency')}
                    </span>

                    <span className="font-bold text-[#189890] font-mono">
                      {selectedHub.latency}
                    </span>
                  </div>

                  <div className="flex justify-between">
                    <span
                      className={
                        isDark ? 'text-[#8E9995]' : 'text-[#4E5653]'
                      }
                    >
                      {t('globalMarkets.inspector.connection')}
                    </span>

                    <span className="flex items-center gap-1 font-semibold text-[#189890] font-mono">
                      <Activity className="h-3 w-3" />
                      {t('globalMarkets.inspector.connectionStatus')}
                    </span>
                  </div>
                </div>
              </div>

              <div className="mt-6 border-t border-black/[0.06] pt-6 dark:border-white/10">
                <div className="mb-2.5 text-[10px] font-semibold uppercase tracking-widest text-[#8E9995] font-ui">
                  {t('globalMarkets.inspector.switchHub')}
                </div>

                <div className="flex flex-wrap gap-1.5">
                  {FINANCIAL_HUBS.map((hub) => {
                    const isCurrent = selectedHub.id === hub.id;

                    return (
                      <button
                        key={hub.id}
                        type="button"
                        onClick={() => setSelectedHub(hub)}
                        className={`rounded-sm px-2.5 py-1 text-[11px] transition-all font-mono focus:outline-none focus-visible:ring-2 focus-visible:ring-[#189890] ${
                          isCurrent
                            ? 'bg-[#0C5F5A] font-semibold text-white shadow-xs'
                            : isDark
                              ? 'bg-white/5 text-[#8E9995] hover:bg-white/10 hover:text-white'
                              : 'bg-black/5 text-[#4E5653] hover:bg-black/10 hover:text-black'
                        }`}
                      >
                        {hub.city}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
          {connectedModules.map((module) => (
            <div
              key={module.id}
              id={module.id}
              className={`flex flex-col justify-between rounded-xl border p-5 transition-all ${
                isDark
                  ? 'border-[rgba(245,247,246,0.06)] bg-[#0A0D0F]'
                  : 'border-[rgba(10,13,12,0.06)] bg-white shadow-xs'
              }`}
            >
              <div>
                <div className="mb-3 inline-block rounded-sm bg-[#D9F1EE] p-2 text-[#0C5F5A]">
                  {module.icon}
                </div>

                <h4 className="mb-1.5 text-xs font-bold uppercase tracking-wider font-ui">
                  {module.name}
                </h4>

                <p
                  className={`text-xs leading-relaxed font-body ${
                    isDark ? 'text-[#8E9995]' : 'text-[#4E5653]'
                  }`}
                >
                  {module.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};