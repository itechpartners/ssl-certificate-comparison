'use client'

import React from 'react'
import { sslProviders } from '@/data/providers'
import { notFound } from 'next/navigation'
import { Star, MapPin, Globe, Award } from 'lucide-react'

interface ProviderPageProps {
  params: {
    slug: string
  }
}

export default function ProviderPage({ params }: ProviderPageProps) {
  const provider = sslProviders.find(p => p.slug === params.slug)

  if (!provider) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-100">
      {/* Provider Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <div className="flex items-start justify-between">
            <div>
              <div className="flex items-center gap-4 mb-4">
                <img
                  src={provider.logo}
                  alt={provider.name}
                  className="h-16 w-16 rounded"
                />
                <div>
                  <h1 className="text-4xl font-bold text-gray-900">{provider.name}</h1>
                  <p className="text-gray-600">{provider.description}</p>
                </div>
              </div>
              <div className="flex flex-wrap gap-4 text-sm">
                <a
                  href={provider.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 text-blue-600 hover:underline"
                >
                  <Globe size={16} /> Visit Website
                </a>
                <span className="flex items-center gap-1">
                  <Star size={16} className="text-yellow-400" />
                  {provider.rating} ({provider.reviewCount} reviews)
                </span>
                <span className="text-gray-600">Founded {provider.foundedYear}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        {/* Features Grid */}
        <section className="mb-12 grid grid-cols-1 gap-6 md:grid-cols-2">
          <div className="rounded-lg bg-white p-6 shadow">
            <h2 className="mb-4 text-xl font-bold text-gray-900">Features</h2>
            <ul className="space-y-2 text-gray-700">
              <li className="flex items-center gap-2">
                <span className={provider.features.wildcard ? '✓ text-green-600 font-bold' : '✗ text-gray-400'}>
                  {provider.features.wildcard ? '✓' : '✗'}
                </span>
                Wildcard SSL
              </li>
              <li className="flex items-center gap-2">
                <span className={provider.features.multiDomain ? '✓ text-green-600 font-bold' : '✗ text-gray-400'}>
                  {provider.features.multiDomain ? '✓' : '✗'}
                </span>
                Multi-Domain (SAN)
              </li>
              <li className="flex items-center gap-2">
                <span className={provider.features.autoRenewal ? '✓ text-green-600 font-bold' : '✗ text-gray-400'}>
                  {provider.features.autoRenewal ? '✓' : '✗'}
                </span>
                Auto-Renewal
              </li>
              <li className="flex items-center gap-2">
                <span className={provider.features.freeReissue ? '✓ text-green-600 font-bold' : '✗ text-gray-400'}>
                  {provider.features.freeReissue ? '✓' : '✗'}
                </span>
                Free Reissue
              </li>
            </ul>
          </div>

          <div className="rounded-lg bg-white p-6 shadow">
            <h2 className="mb-4 text-xl font-bold text-gray-900">Support</h2>
            <div className="space-y-2">
              <p className="flex items-center gap-2">
                <span className={provider.support.phone ? 'text-green-600' : 'text-gray-400'}>
                  {provider.support.phone ? '✓' : '✗'}
                </span>
                Phone Support
              </p>
              <p className="flex items-center gap-2">
                <span className={provider.support.email ? 'text-green-600' : 'text-gray-400'}>
                  {provider.support.email ? '✓' : '✗'}
                </span>
                Email Support
              </p>
              <p className="flex items-center gap-2">
                <span className={provider.support.livechat ? 'text-green-600' : 'text-gray-400'}>
                  {provider.support.livechat ? '✓' : '✗'}
                </span>
                Live Chat
              </p>
              <p className="flex items-center gap-2">
                <span className={provider.support.documentation ? 'text-green-600' : 'text-gray-400'}>
                  {provider.support.documentation ? '✓' : '✗'}
                </span>
                Documentation
              </p>
            </div>
          </div>
        </section>

        {/* Certificates */}
        <section className="mb-12">
          <h2 className="mb-6 text-2xl font-bold text-gray-900">Available Certificates</h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {provider.certificates.map(cert => (
              <div key={cert.id} className="rounded-lg border border-gray-200 bg-white p-6 shadow">
                <div className="mb-4">
                  <h3 className="text-lg font-bold text-gray-900">{cert.name}</h3>
                  <span className="inline-block rounded bg-blue-100 px-2 py-1 text-sm font-semibold text-blue-800 mt-2">
                    {cert.type} Validation
                  </span>
                </div>

                <div className="mb-4 rounded bg-gray-50 p-3">
                  <p className="text-sm text-gray-600">Price per year</p>
                  <p className="text-2xl font-bold text-blue-600">${cert.price.toFixed(2)}</p>
                </div>

                <ul className="mb-4 space-y-2 text-sm text-gray-700">
                  <li>Issuance: {cert.issuanceTime}</li>
                  <li>Warranty: ${cert.warranty.toLocaleString()}</li>
                  <li>Encryption: {cert.encryptionBits}-bit</li>
                  <li>Browser Support: {cert.browsers_compatible}%</li>
                  <li>
                    Features:
                    {cert.isWildcard && ' Wildcard'}
                    {cert.isMultiDomain && ' Multi-Domain'}
                  </li>
                </ul>

                <a
                  href={provider.affiliateLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full rounded bg-blue-600 px-4 py-2 text-center font-semibold text-white hover:bg-blue-700"
                >
                  Get Certificate
                </a>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}
