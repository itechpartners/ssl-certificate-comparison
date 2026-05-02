'use client'

import React, { useState } from 'react'
import { Search, TrendingUp, Shield, Zap } from 'lucide-react'
import { sslProviders } from '@/data/providers'
import { ProviderCard } from '@/components/ProviderCard'
import { ComparisonTable } from '@/components/ComparisonTable'
import { FilterBar, FilterState } from '@/components/FilterBar'

export default function Home() {
  const [view, setView] = useState<'cards' | 'table'>('cards')
  const [filters, setFilters] = useState<FilterState>({
    certType: 'ALL',
    priceRange: [0, 500],
    features: {
      wildcard: false,
      multiDomain: false,
      autoRenewal: false,
    },
    supportType: [],
  })

  const filteredProviders = sslProviders.filter(provider => {
    if (filters.certType !== 'ALL') {
      const hasCertType = provider.validationType.includes(filters.certType)
      if (!hasCertType) return false
    }

    if (filters.features.wildcard && !provider.features.wildcard) return false
    if (filters.features.multiDomain && !provider.features.multiDomain) return false
    if (filters.features.autoRenewal && !provider.features.autoRenewal) return false

    return true
  })

  const featuredProviders = filteredProviders.slice(0, 3)

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-100">
      {/* Header */}
      <header className="border-b border-gray-200 bg-white shadow-sm">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold text-gray-900">
            SSL Certificate Comparison
          </h1>
          <p className="mt-2 text-lg text-gray-600">
            Find the perfect SSL certificate for your website - Compare prices, features, and support
          </p>
        </div>
      </header>

      {/* Hero Stats */}
      <section className="bg-white py-8 border-b border-gray-200">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            {[
              { icon: Shield, label: 'SSL Providers', value: sslProviders.length },
              { icon: TrendingUp, label: 'Certificates Compared', value: '150+' },
              { icon: Zap, label: 'Starting From', value: '$0/yr' },
            ].map(stat => (
              <div key={stat.label} className="flex items-center gap-4 rounded-lg bg-gray-50 p-4">
                <stat.icon size={32} className="text-blue-600" />
                <div>
                  <p className="text-sm text-gray-600">{stat.label}</p>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <FilterBar onFilterChange={setFilters} />

        {/* Featured Providers */}
        {view === 'cards' && (
          <section className="mb-12">
            <h2 className="mb-6 text-2xl font-bold text-gray-900">Recommended SSL Providers</h2>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              {featuredProviders.map((provider, idx) => (
                <ProviderCard
                  key={provider.id}
                  provider={provider}
                  featured={idx === 0}
                />
              ))}
            </div>
          </section>
        )}

        {/* View Toggle */}
        <div className="mb-6 flex gap-2">
          <button
            onClick={() => setView('cards')}
            className={`rounded px-4 py-2 font-medium ${
              view === 'cards'
                ? 'bg-blue-600 text-white'
                : 'border border-gray-300 text-gray-700 hover:border-blue-600'
            }`}
          >
            Card View
          </button>
          <button
            onClick={() => setView('table')}
            className={`rounded px-4 py-2 font-medium ${
              view === 'table'
                ? 'bg-blue-600 text-white'
                : 'border border-gray-300 text-gray-700 hover:border-blue-600'
            }`}
          >
            Table View
          </button>
        </div>

        {/* Comparison View */}
        {view === 'table' && (
          <section className="rounded-lg bg-white p-6 shadow">
            <h2 className="mb-6 text-2xl font-bold text-gray-900">Compare All Certificates</h2>
            <ComparisonTable providers={filteredProviders} selectedCertType={filters.certType} />
          </section>
        )}

        {/* All Providers Grid */}
        {view === 'cards' && (
          <section>
            <h2 className="mb-6 text-2xl font-bold text-gray-900">All Providers</h2>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {filteredProviders.slice(3).map(provider => (
                <ProviderCard key={provider.id} provider={provider} />
              ))}
            </div>
          </section>
        )}
      </div>

      {/* Footer */}
      <footer className="border-t border-gray-200 bg-white py-8 mt-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center text-gray-600">
          <p>© 2026 SSL Certificate Comparison. We may earn commissions from affiliate links.</p>
        </div>
      </footer>
    </div>
  )
}
