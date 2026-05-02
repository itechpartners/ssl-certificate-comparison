'use client'

import React, { useState } from 'react'
import { ChevronUp, ChevronDown, Filter } from 'lucide-react'
import clsx from 'clsx'
import { SSLProvider, SSLCertificate } from '@/data/providers'

interface ComparisonTableProps {
  providers: SSLProvider[]
  selectedCertType?: 'DV' | 'OV' | 'EV' | 'ALL'
}

export const ComparisonTable: React.FC<ComparisonTableProps> = ({
  providers,
  selectedCertType = 'ALL',
}) => {
  const [sortBy, setSortBy] = useState<'price' | 'rating' | 'name'>('price')
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc')
  const [showWildcardOnly, setShowWildcardOnly] = useState(false)

  const filteredAndSortedProviders = providers
    .map(provider => ({
      ...provider,
      certificates: provider.certificates.filter(
        cert =>
          selectedCertType === 'ALL' || cert.type === selectedCertType
      ),
    }))
    .filter(provider => provider.certificates.length > 0)
    .sort((a, b) => {
      let aVal, bVal

      if (sortBy === 'price') {
        aVal = a.certificates[0]?.price || 0
        bVal = b.certificates[0]?.price || 0
      } else if (sortBy === 'rating') {
        aVal = a.rating
        bVal = b.rating
      } else {
        aVal = a.name.toLowerCase()
        bVal = b.name.toLowerCase()
      }

      const comparison = aVal < bVal ? -1 : aVal > bVal ? 1 : 0
      return sortOrder === 'asc' ? comparison : -comparison
    })

  return (
    <div className="w-full">
      <div className="mb-4 flex flex-wrap gap-4">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium">Sort by:</span>
          <select
            value={sortBy}
            onChange={e => setSortBy(e.target.value as any)}
            className="rounded border border-gray-300 px-3 py-1 text-sm"
          >
            <option value="price">Price</option>
            <option value="rating">Rating</option>
            <option value="name">Name</option>
          </select>
          <button
            onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
            className="rounded p-1 hover:bg-gray-100"
          >
            {sortOrder === 'asc' ? (
              <ChevronUp size={18} />
            ) : (
              <ChevronDown size={18} />
            )}
          </button>
        </div>

        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={showWildcardOnly}
            onChange={e => setShowWildcardOnly(e.target.checked)}
            className="rounded"
          />
          <span className="text-sm">Wildcard only</span>
        </label>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b border-gray-300 bg-gray-50">
              <th className="px-4 py-3 text-left text-sm font-semibold">
                Provider
              </th>
              <th className="px-4 py-3 text-left text-sm font-semibold">
                Type
              </th>
              <th className="px-4 py-3 text-center text-sm font-semibold">
                Price/Year
              </th>
              <th className="px-4 py-3 text-center text-sm font-semibold">
                Issuance
              </th>
              <th className="px-4 py-3 text-center text-sm font-semibold">
                Warranty
              </th>
              <th className="px-4 py-3 text-center text-sm font-semibold">
                Rating
              </th>
              <th className="px-4 py-3 text-center text-sm font-semibold">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredAndSortedProviders.map(provider =>
              provider.certificates.map((cert, idx) => (
                <tr
                  key={`${provider.id}-${cert.id}`}
                  className={clsx(
                    'border-b border-gray-200 transition-colors hover:bg-blue-50',
                    idx === 0 && 'border-t-2 border-t-gray-300'
                  )}
                >
                  <td className="px-4 py-3 text-sm font-medium">
                    <div className="flex items-center gap-2">
                      <img
                        src={provider.logo}
                        alt={provider.name}
                        className="h-6 w-6 rounded"
                      />
                      {provider.name}
                    </div>
                  </td>
                  <td className="px-4 py-3 text-sm">
                    <span className="rounded bg-blue-100 px-2 py-1 text-xs font-semibold text-blue-800">
                      {cert.type}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-center text-sm font-semibold">
                    ${cert.price.toFixed(2)}
                  </td>
                  <td className="px-4 py-3 text-center text-sm">
                    {cert.issuanceTime}
                  </td>
                  <td className="px-4 py-3 text-center text-sm">
                    ${cert.warranty.toLocaleString()}
                  </td>
                  <td className="px-4 py-3 text-center text-sm">
                    <div className="flex items-center justify-center gap-1">
                      <span className="font-semibold text-yellow-500">★</span>
                      <span className="font-medium">{provider.rating}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-center text-sm">
                    <a
                      href={provider.affiliateLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="rounded bg-blue-500 px-3 py-1 text-white hover:bg-blue-600"
                    >
                      View
                    </a>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
