'use client'

import React from 'react'
import { Star, Check, X } from 'lucide-react'
import { SSLProvider } from '@/data/providers'

interface ProviderCardProps {
  provider: SSLProvider
  featured?: boolean
}

export const ProviderCard: React.FC<ProviderCardProps> = ({
  provider,
  featured = false,
}) => {
  const lowestPrice = Math.min(...provider.certificates.map(c => c.price))

  return (
    <div
      className={`rounded-lg border-2 ${
        featured
          ? 'border-blue-500 bg-blue-50 shadow-lg'
          : 'border-gray-200 bg-white shadow'
      } overflow-hidden transition-transform hover:scale-105`}
    >
      {featured && (
        <div className="bg-blue-500 px-4 py-2 text-white text-sm font-semibold">
          Recommended
        </div>
      )}

      <div className="p-6">
        <div className="mb-4 flex items-start justify-between">
          <div>
            <img
              src={provider.logo}
              alt={provider.name}
              className="mb-2 h-8 w-8"
            />
            <h3 className="text-xl font-bold">{provider.name}</h3>
            <p className="text-sm text-gray-600">{provider.description}</p>
          </div>
          <div className="text-right">
            <div className="flex items-center gap-1">
              <Star size={16} className="fill-yellow-400 text-yellow-400" />
              <span className="text-sm font-semibold">{provider.rating}</span>
            </div>
            <p className="text-xs text-gray-500">
              ({provider.reviewCount} reviews)
            </p>
          </div>
        </div>

        <div className="mb-4 rounded bg-gray-50 p-3">
          <p className="text-xs text-gray-600">Starting from</p>
          <p className="text-2xl font-bold text-blue-600">
            ${lowestPrice.toFixed(2)}
            <span className="text-sm text-gray-600">/year</span>
          </p>
        </div>

        <div className="mb-4 grid grid-cols-2 gap-2 text-xs">
          {[
            { label: 'Wildcard SSL', value: provider.features.wildcard },
            { label: 'Multi-Domain', value: provider.features.multiDomain },
            { label: 'Auto-Renewal', value: provider.features.autoRenewal },
            { label: 'Free Reissue', value: provider.features.freeReissue },
          ].map(feature => (
            <div key={feature.label} className="flex items-center gap-2">
              {feature.value ? (
                <Check size={14} className="text-green-600" />
              ) : (
                <X size={14} className="text-gray-400" />
              )}
              <span>{feature.label}</span>
            </div>
          ))}
        </div>

        <div className="mb-4">
          <p className="mb-2 text-xs font-semibold text-gray-700">Support:</p>
          <div className="flex gap-2 text-xs">
            {[
              { label: 'Phone', value: provider.support.phone },
              { label: 'Email', value: provider.support.email },
              { label: 'Chat', value: provider.support.livechat },
            ].map(support => (
              <span
                key={support.label}
                className={`rounded px-2 py-1 ${
                  support.value
                    ? 'bg-green-100 text-green-800'
                    : 'bg-gray-100 text-gray-500'
                }`}
              >
                {support.label}
              </span>
            ))}
          </div>
        </div>

        <a
          href={provider.affiliateLink}
          target="_blank"
          rel="noopener noreferrer"
          className={`block w-full rounded py-2 text-center font-semibold transition ${
            featured
              ? 'bg-blue-600 text-white hover:bg-blue-700'
              : 'border-2 border-blue-600 text-blue-600 hover:bg-blue-50'
          }`}
        >
          View Details
        </a>
      </div>
    </div>
  )
}
