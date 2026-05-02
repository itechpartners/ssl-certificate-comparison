CREATE TABLE providers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL UNIQUE,
  slug VARCHAR(255) NOT NULL UNIQUE,
  logo VARCHAR(500),
  description TEXT,
  website VARCHAR(500),
  affiliate_link VARCHAR(500),
  rating DECIMAL(3, 2),
  review_count INT DEFAULT 0,
  founded_year INT,
  trust_seals TEXT[],
  specialties TEXT[],
  support_phone BOOLEAN DEFAULT false,
  support_email BOOLEAN DEFAULT false,
  support_livechat BOOLEAN DEFAULT false,
  support_documentation BOOLEAN DEFAULT false,
  warranty_min INT,
  warranty_max INT,
  warranty_unit VARCHAR(10),
  validation_types TEXT[],
  features_wildcard BOOLEAN DEFAULT false,
  features_multidomain BOOLEAN DEFAULT false,
  features_autorenew BOOLEAN DEFAULT false,
  features_freereissue BOOLEAN DEFAULT false,
  features_csr BOOLEAN DEFAULT false,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Certificates Table
CREATE TABLE certificates (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  provider_id UUID NOT NULL REFERENCES providers(id) ON DELETE CASCADE,
  name VARCHAR(255) NOT NULL,
  type VARCHAR(10) NOT NULL (DV, OV, EV),
  is_wildcard BOOLEAN DEFAULT false,
  is_multidomain BOOLEAN DEFAULT false,
  price DECIMAL(10, 2),
  billing_cycle INT, -- in months
  issuance_time VARCHAR(100),
  warranty INT,
  encryption_bits INT,
  browsers_compatible DECIMAL(5, 2),
  trust_score DECIMAL(3, 2),
  use_cases TEXT[],
  features TEXT[],
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(provider_id, name)
);

-- User Reviews Table
CREATE TABLE reviews (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  provider_id UUID NOT NULL REFERENCES providers(id) ON DELETE CASCADE,
  user_email VARCHAR(255) NOT NULL,
  rating INT NOT NULL CHECK (rating >= 1 AND rating <= 5),
  title VARCHAR(255),
  comment TEXT,
  verified BOOLEAN DEFAULT false,
  helpful_count INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Price History Table (for tracking price changes)
CREATE TABLE price_history (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  certificate_id UUID NOT NULL REFERENCES certificates(id) ON DELETE CASCADE,
  old_price DECIMAL(10, 2),
  new_price DECIMAL(10, 2),
  changed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Comparison Favorites (user bookmarks)
CREATE TABLE favorites (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id VARCHAR(255),
  provider_id UUID NOT NULL REFERENCES providers(id) ON DELETE CASCADE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(user_id, provider_id)
);

-- Price Alerts
CREATE TABLE price_alerts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_email VARCHAR(255) NOT NULL,
  certificate_id UUID NOT NULL REFERENCES certificates(id) ON DELETE CASCADE,
  target_price DECIMAL(10, 2),
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  last_triggered TIMESTAMP
);

-- Indexes for performance
CREATE INDEX idx_providers_slug ON providers(slug);
CREATE INDEX idx_certificates_provider_id ON certificates(provider_id);
CREATE INDEX idx_certificates_type ON certificates(type);
CREATE INDEX idx_reviews_provider_id ON reviews(provider_id);
CREATE INDEX idx_price_history_certificate_id ON price_history(certificate_id);
CREATE INDEX idx_price_alerts_email ON price_alerts(user_email);
