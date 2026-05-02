'use client'

import React, { useState } from 'react'
import { Filter, X } from 'lucide-react'

interface FilterBarProps {
  onFilterChange: (filters: FilterState) => void
}

export interface FilterState {
  certType: 'DV' | 'OV' | 'EV' | 'ALL'
  priceRange: [number, number]
  features: {
    wildcard: boolean
    multiDomain: boolean
    autoRenewal: boolean
  }
  supportType: ('phone' | 'email' | 'livechat')[]
}

export const FilterBar: React.FC<FilterBarProps> = ({ onFilterChange }) => {
  const [isOpen, setIsOpen] = useState(false)
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

  const handleFilterChange = (newFilters: Partial<FilterState>) => {
    const updated = { ...filters, ...newFilters }
    setFilters(updated)
    onFilterChange(updated)
  }

  return (
    <div className="mb-6 rounded-lg border border-gray-200 bg-white p-4">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 text-lg font-semibold text-gray-800 hover:text-blue-600"
      >
        <Filter size={20} />
        Filters {!isOpen && <span className="text-sm text-gray-500">(Click to expand)</span>}
      </button>

      {isOpen && (
        <div className="mt-4 space-y-4">
          {/* Certificate Type Filter */}
          <div>
            <h4 className="mb-2 font-semibold text-gray-700">Certificate Type</h4>
            <div className="flex gap-2">
              {['ALL', 'DV', 'OV', 'EV'].map(type => (
                <button
                  key={type}
                  onClick={() =>
                    handleFilterChange({
                      certType: type as any,
                    })
                  }
                  className={`rounded px-3 py-1 text-sm font-medium transition ${
                    filters.certType === type
                      ? 'bg-blue-600 text-white'
                      : 'border border-gray-300 text-gray-700 hover:border-blue-600'
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>

          {/* Price Range Filter */}
          <div>
            <h4 className="mb-2 font-semibold text-gray-700">Price Range</h4>
            <div className="flex items-center gap-3">
              <input
                type="range"
                min="0"
                max="500"
                value={filters.priceRange[1]}
                onChange={e =>
                  handleFilterChange({
                    priceRange: [filters.priceRange[0], parseInt(e.target.value)],
                  })
                }
                className="flex-1"
              />
              <span className="text-sm font-medium">
                ${filters.priceRange[1]}/year
              </span>
            </div>
          </div>

          {/* Features Filter */}
          <div>
            <h4 className="mb-2 font-semibold text-gray-700">Features</h4>
            <div className="space-y-2">
              {['wildcard', 'multiDomain', 'autoRenewal'].map(feature => (
                <label
                  key={feature}
                  className="flex items-center gap-2 text-sm text-gray-700"
                >
                  <input
                    type="checkbox"
                    checked={filters.features[feature as keyof typeof filters.features]}
                    onChange={e =>
                      handleFilterChange({
                        features: {
                          ...filters.features,
                          [feature]: e.target.checked,
                        },
                      })
                    }
                    className="rounded"
                  />
                  {feature === 'wildcard'
                    ? 'Wildcard SSL'
                    : feature === 'multiDomain'
                      ? 'Multi-Domain'
                      : 'Auto-Renewal'}
                </label>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
