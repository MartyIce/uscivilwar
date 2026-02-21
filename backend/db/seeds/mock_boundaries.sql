-- Civil War Interactive Map - Mock Territory Boundaries Data
-- Seed file: mock_boundaries.sql
-- Contains state boundaries for 1861 with political alignment (Union, Confederate, Border)

-- Note: GeoJSON coordinates are simplified/approximate for mock data purposes.
-- Production data should use actual historical boundary data from AHCB or similar sources.

-- Reset sequence for consistent IDs during development
-- ALTER SEQUENCE territory_boundaries_id_seq RESTART WITH 1;

-- ============================================
-- Confederate States (11 states)
-- Seceded between December 1860 and June 1861
-- ============================================

INSERT INTO territory_boundaries (id, name, type, valid_from, valid_to, side, geojson, source) VALUES

-- South Carolina - First to secede (Dec 20, 1860)
(1, 'South Carolina', 'state', '1861-01-01', '1865-12-31', 'confederate',
    '{"type": "Feature", "properties": {"name": "South Carolina", "abbr": "SC", "admitted": 1788}, "geometry": {"type": "Polygon", "coordinates": [[[-83.35, 35.0], [-79.0, 35.0], [-79.0, 32.0], [-80.9, 32.0], [-83.35, 35.0]]]}}',
    'mock_data'),

-- Mississippi - Second (Jan 9, 1861)
(2, 'Mississippi', 'state', '1861-01-01', '1865-12-31', 'confederate',
    '{"type": "Feature", "properties": {"name": "Mississippi", "abbr": "MS", "admitted": 1817}, "geometry": {"type": "Polygon", "coordinates": [[[-91.65, 35.0], [-88.1, 35.0], [-88.1, 30.2], [-89.0, 30.2], [-91.65, 31.0], [-91.65, 35.0]]]}}',
    'mock_data'),

-- Florida - Third (Jan 10, 1861)
(3, 'Florida', 'state', '1861-01-01', '1865-12-31', 'confederate',
    '{"type": "Feature", "properties": {"name": "Florida", "abbr": "FL", "admitted": 1845}, "geometry": {"type": "Polygon", "coordinates": [[[-87.6, 31.0], [-82.0, 31.0], [-80.0, 25.0], [-82.0, 24.5], [-87.6, 30.0], [-87.6, 31.0]]]}}',
    'mock_data'),

-- Alabama - Fourth (Jan 11, 1861)
(4, 'Alabama', 'state', '1861-01-01', '1865-12-31', 'confederate',
    '{"type": "Feature", "properties": {"name": "Alabama", "abbr": "AL", "admitted": 1819}, "geometry": {"type": "Polygon", "coordinates": [[[-88.5, 35.0], [-85.0, 35.0], [-85.0, 31.0], [-88.5, 30.2], [-88.5, 35.0]]]}}',
    'mock_data'),

-- Georgia - Fifth (Jan 19, 1861)
(5, 'Georgia', 'state', '1861-01-01', '1865-12-31', 'confederate',
    '{"type": "Feature", "properties": {"name": "Georgia", "abbr": "GA", "admitted": 1788}, "geometry": {"type": "Polygon", "coordinates": [[[-85.6, 35.0], [-81.0, 35.0], [-80.9, 32.0], [-81.0, 31.0], [-85.0, 31.0], [-85.6, 35.0]]]}}',
    'mock_data'),

-- Louisiana - Sixth (Jan 26, 1861)
(6, 'Louisiana', 'state', '1861-01-01', '1865-12-31', 'confederate',
    '{"type": "Feature", "properties": {"name": "Louisiana", "abbr": "LA", "admitted": 1812}, "geometry": {"type": "Polygon", "coordinates": [[[-94.0, 33.0], [-89.0, 33.0], [-89.0, 29.0], [-94.0, 29.5], [-94.0, 33.0]]]}}',
    'mock_data'),

-- Texas - Seventh (Feb 1, 1861)
(7, 'Texas', 'state', '1861-01-01', '1865-12-31', 'confederate',
    '{"type": "Feature", "properties": {"name": "Texas", "abbr": "TX", "admitted": 1845}, "geometry": {"type": "Polygon", "coordinates": [[[-106.6, 36.5], [-100.0, 36.5], [-94.0, 33.5], [-94.0, 29.5], [-97.0, 26.0], [-103.0, 29.0], [-106.6, 32.0], [-106.6, 36.5]]]}}',
    'mock_data'),

-- Virginia - Eighth (Apr 17, 1861) - Note: West Virginia separated in 1863
(8, 'Virginia', 'state', '1861-01-01', '1863-06-19', 'confederate',
    '{"type": "Feature", "properties": {"name": "Virginia", "abbr": "VA", "admitted": 1788}, "geometry": {"type": "Polygon", "coordinates": [[[-83.7, 39.5], [-75.2, 39.5], [-75.2, 37.0], [-76.3, 36.5], [-83.7, 36.5], [-83.7, 39.5]]]}}',
    'mock_data'),

-- Virginia after West Virginia separation
(9, 'Virginia', 'state', '1863-06-20', '1865-12-31', 'confederate',
    '{"type": "Feature", "properties": {"name": "Virginia", "abbr": "VA", "admitted": 1788}, "geometry": {"type": "Polygon", "coordinates": [[[-80.5, 39.5], [-75.2, 39.5], [-75.2, 37.0], [-76.3, 36.5], [-83.7, 36.5], [-83.7, 37.5], [-80.5, 39.5]]]}}',
    'mock_data'),

-- Arkansas - Ninth (May 6, 1861)
(10, 'Arkansas', 'state', '1861-01-01', '1865-12-31', 'confederate',
    '{"type": "Feature", "properties": {"name": "Arkansas", "abbr": "AR", "admitted": 1836}, "geometry": {"type": "Polygon", "coordinates": [[[-94.6, 36.5], [-90.0, 36.5], [-90.0, 33.0], [-94.6, 33.0], [-94.6, 36.5]]]}}',
    'mock_data'),

-- North Carolina - Tenth (May 20, 1861)
(11, 'North Carolina', 'state', '1861-01-01', '1865-12-31', 'confederate',
    '{"type": "Feature", "properties": {"name": "North Carolina", "abbr": "NC", "admitted": 1789}, "geometry": {"type": "Polygon", "coordinates": [[[-84.3, 36.6], [-75.5, 36.6], [-75.5, 34.0], [-78.5, 33.8], [-84.3, 35.0], [-84.3, 36.6]]]}}',
    'mock_data'),

-- Tennessee - Eleventh (June 8, 1861)
(12, 'Tennessee', 'state', '1861-01-01', '1865-12-31', 'confederate',
    '{"type": "Feature", "properties": {"name": "Tennessee", "abbr": "TN", "admitted": 1796}, "geometry": {"type": "Polygon", "coordinates": [[[-90.3, 36.5], [-81.7, 36.6], [-81.7, 35.0], [-90.3, 35.0], [-90.3, 36.5]]]}}',
    'mock_data');

-- ============================================
-- Border States (5 states)
-- Slave states that did not secede from the Union
-- ============================================

INSERT INTO territory_boundaries (id, name, type, valid_from, valid_to, side, geojson, source) VALUES

-- Maryland
(13, 'Maryland', 'state', '1861-01-01', '1865-12-31', 'border',
    '{"type": "Feature", "properties": {"name": "Maryland", "abbr": "MD", "admitted": 1788}, "geometry": {"type": "Polygon", "coordinates": [[[-79.5, 39.7], [-75.0, 39.7], [-75.0, 38.0], [-76.0, 37.9], [-79.5, 39.2], [-79.5, 39.7]]]}}',
    'mock_data'),

-- Delaware
(14, 'Delaware', 'state', '1861-01-01', '1865-12-31', 'border',
    '{"type": "Feature", "properties": {"name": "Delaware", "abbr": "DE", "admitted": 1787}, "geometry": {"type": "Polygon", "coordinates": [[[-75.8, 39.8], [-75.0, 39.8], [-75.0, 38.4], [-75.8, 38.4], [-75.8, 39.8]]]}}',
    'mock_data'),

-- Kentucky
(15, 'Kentucky', 'state', '1861-01-01', '1865-12-31', 'border',
    '{"type": "Feature", "properties": {"name": "Kentucky", "abbr": "KY", "admitted": 1792}, "geometry": {"type": "Polygon", "coordinates": [[[-89.5, 39.1], [-82.0, 39.1], [-82.0, 36.5], [-89.5, 36.5], [-89.5, 39.1]]]}}',
    'mock_data'),

-- Missouri
(16, 'Missouri', 'state', '1861-01-01', '1865-12-31', 'border',
    '{"type": "Feature", "properties": {"name": "Missouri", "abbr": "MO", "admitted": 1821}, "geometry": {"type": "Polygon", "coordinates": [[[-95.8, 40.6], [-89.1, 40.6], [-89.1, 36.0], [-95.8, 36.0], [-95.8, 40.6]]]}}',
    'mock_data'),

-- West Virginia (admitted June 20, 1863)
(17, 'West Virginia', 'state', '1863-06-20', '1865-12-31', 'border',
    '{"type": "Feature", "properties": {"name": "West Virginia", "abbr": "WV", "admitted": 1863}, "geometry": {"type": "Polygon", "coordinates": [[[-82.6, 40.6], [-77.7, 39.3], [-79.5, 37.5], [-82.6, 37.2], [-82.6, 40.6]]]}}',
    'mock_data');

-- ============================================
-- Union States (remaining free states)
-- ============================================

INSERT INTO territory_boundaries (id, name, type, valid_from, valid_to, side, geojson, source) VALUES

-- Pennsylvania
(18, 'Pennsylvania', 'state', '1861-01-01', '1865-12-31', 'union',
    '{"type": "Feature", "properties": {"name": "Pennsylvania", "abbr": "PA", "admitted": 1787}, "geometry": {"type": "Polygon", "coordinates": [[[-80.5, 42.3], [-74.7, 42.0], [-74.7, 39.7], [-80.5, 39.7], [-80.5, 42.3]]]}}',
    'mock_data'),

-- New York
(19, 'New York', 'state', '1861-01-01', '1865-12-31', 'union',
    '{"type": "Feature", "properties": {"name": "New York", "abbr": "NY", "admitted": 1788}, "geometry": {"type": "Polygon", "coordinates": [[[-79.8, 43.0], [-71.9, 45.0], [-71.9, 40.5], [-74.0, 40.5], [-79.8, 42.0], [-79.8, 43.0]]]}}',
    'mock_data'),

-- Ohio
(20, 'Ohio', 'state', '1861-01-01', '1865-12-31', 'union',
    '{"type": "Feature", "properties": {"name": "Ohio", "abbr": "OH", "admitted": 1803}, "geometry": {"type": "Polygon", "coordinates": [[[-84.8, 42.0], [-80.5, 42.0], [-80.5, 38.4], [-84.8, 38.4], [-84.8, 42.0]]]}}',
    'mock_data'),

-- Indiana
(21, 'Indiana', 'state', '1861-01-01', '1865-12-31', 'union',
    '{"type": "Feature", "properties": {"name": "Indiana", "abbr": "IN", "admitted": 1816}, "geometry": {"type": "Polygon", "coordinates": [[[-88.1, 41.8], [-84.8, 41.8], [-84.8, 37.8], [-88.1, 37.8], [-88.1, 41.8]]]}}',
    'mock_data'),

-- Illinois
(22, 'Illinois', 'state', '1861-01-01', '1865-12-31', 'union',
    '{"type": "Feature", "properties": {"name": "Illinois", "abbr": "IL", "admitted": 1818}, "geometry": {"type": "Polygon", "coordinates": [[[-91.5, 42.5], [-87.0, 42.5], [-87.0, 37.0], [-91.5, 36.9], [-91.5, 42.5]]]}}',
    'mock_data'),

-- Massachusetts
(23, 'Massachusetts', 'state', '1861-01-01', '1865-12-31', 'union',
    '{"type": "Feature", "properties": {"name": "Massachusetts", "abbr": "MA", "admitted": 1788}, "geometry": {"type": "Polygon", "coordinates": [[[-73.5, 42.9], [-69.9, 42.9], [-69.9, 41.2], [-73.5, 42.0], [-73.5, 42.9]]]}}',
    'mock_data'),

-- Connecticut
(24, 'Connecticut', 'state', '1861-01-01', '1865-12-31', 'union',
    '{"type": "Feature", "properties": {"name": "Connecticut", "abbr": "CT", "admitted": 1788}, "geometry": {"type": "Polygon", "coordinates": [[[-73.7, 42.1], [-71.8, 42.1], [-71.8, 41.0], [-73.7, 41.0], [-73.7, 42.1]]]}}',
    'mock_data'),

-- New Jersey
(25, 'New Jersey', 'state', '1861-01-01', '1865-12-31', 'union',
    '{"type": "Feature", "properties": {"name": "New Jersey", "abbr": "NJ", "admitted": 1787}, "geometry": {"type": "Polygon", "coordinates": [[[-75.6, 41.4], [-73.9, 41.4], [-73.9, 38.9], [-75.6, 39.4], [-75.6, 41.4]]]}}',
    'mock_data'),

-- Michigan
(26, 'Michigan', 'state', '1861-01-01', '1865-12-31', 'union',
    '{"type": "Feature", "properties": {"name": "Michigan", "abbr": "MI", "admitted": 1837}, "geometry": {"type": "Polygon", "coordinates": [[[-90.4, 48.2], [-82.4, 45.0], [-82.4, 41.7], [-87.0, 41.7], [-87.0, 46.0], [-90.4, 48.2]]]}}',
    'mock_data'),

-- Wisconsin
(27, 'Wisconsin', 'state', '1861-01-01', '1865-12-31', 'union',
    '{"type": "Feature", "properties": {"name": "Wisconsin", "abbr": "WI", "admitted": 1848}, "geometry": {"type": "Polygon", "coordinates": [[[-92.9, 47.1], [-86.8, 45.5], [-86.8, 42.5], [-92.9, 42.5], [-92.9, 47.1]]]}}',
    'mock_data'),

-- Iowa
(28, 'Iowa', 'state', '1861-01-01', '1865-12-31', 'union',
    '{"type": "Feature", "properties": {"name": "Iowa", "abbr": "IA", "admitted": 1846}, "geometry": {"type": "Polygon", "coordinates": [[[-96.6, 43.5], [-90.1, 43.5], [-90.1, 40.4], [-96.6, 40.4], [-96.6, 43.5]]]}}',
    'mock_data'),

-- Minnesota
(29, 'Minnesota', 'state', '1861-01-01', '1865-12-31', 'union',
    '{"type": "Feature", "properties": {"name": "Minnesota", "abbr": "MN", "admitted": 1858}, "geometry": {"type": "Polygon", "coordinates": [[[-97.2, 49.4], [-89.5, 49.0], [-89.5, 43.5], [-97.2, 43.5], [-97.2, 49.4]]]}}',
    'mock_data'),

-- Maine
(30, 'Maine', 'state', '1861-01-01', '1865-12-31', 'union',
    '{"type": "Feature", "properties": {"name": "Maine", "abbr": "ME", "admitted": 1820}, "geometry": {"type": "Polygon", "coordinates": [[[-71.1, 47.5], [-66.9, 44.8], [-66.9, 43.0], [-71.1, 43.0], [-71.1, 47.5]]]}}',
    'mock_data'),

-- New Hampshire
(31, 'New Hampshire', 'state', '1861-01-01', '1865-12-31', 'union',
    '{"type": "Feature", "properties": {"name": "New Hampshire", "abbr": "NH", "admitted": 1788}, "geometry": {"type": "Polygon", "coordinates": [[[-72.6, 45.3], [-70.7, 43.8], [-70.7, 42.7], [-72.6, 42.7], [-72.6, 45.3]]]}}',
    'mock_data'),

-- Vermont
(32, 'Vermont', 'state', '1861-01-01', '1865-12-31', 'union',
    '{"type": "Feature", "properties": {"name": "Vermont", "abbr": "VT", "admitted": 1791}, "geometry": {"type": "Polygon", "coordinates": [[[-73.4, 45.0], [-71.5, 45.0], [-71.5, 42.7], [-73.4, 42.7], [-73.4, 45.0]]]}}',
    'mock_data'),

-- Rhode Island
(33, 'Rhode Island', 'state', '1861-01-01', '1865-12-31', 'union',
    '{"type": "Feature", "properties": {"name": "Rhode Island", "abbr": "RI", "admitted": 1790}, "geometry": {"type": "Polygon", "coordinates": [[[-71.9, 42.0], [-71.1, 42.0], [-71.1, 41.1], [-71.9, 41.1], [-71.9, 42.0]]]}}',
    'mock_data'),

-- Kansas (admitted Jan 29, 1861)
(34, 'Kansas', 'state', '1861-01-29', '1865-12-31', 'union',
    '{"type": "Feature", "properties": {"name": "Kansas", "abbr": "KS", "admitted": 1861}, "geometry": {"type": "Polygon", "coordinates": [[[-102.0, 40.0], [-94.6, 40.0], [-94.6, 37.0], [-102.0, 37.0], [-102.0, 40.0]]]}}',
    'mock_data'),

-- California
(35, 'California', 'state', '1861-01-01', '1865-12-31', 'union',
    '{"type": "Feature", "properties": {"name": "California", "abbr": "CA", "admitted": 1850}, "geometry": {"type": "Polygon", "coordinates": [[[-124.4, 42.0], [-114.1, 35.0], [-114.6, 32.7], [-117.1, 32.5], [-122.4, 37.0], [-124.4, 42.0]]]}}',
    'mock_data'),

-- Oregon
(36, 'Oregon', 'state', '1861-01-01', '1865-12-31', 'union',
    '{"type": "Feature", "properties": {"name": "Oregon", "abbr": "OR", "admitted": 1859}, "geometry": {"type": "Polygon", "coordinates": [[[-124.6, 46.3], [-116.5, 46.0], [-116.5, 42.0], [-124.6, 42.0], [-124.6, 46.3]]]}}',
    'mock_data'),

-- Nevada (admitted Oct 31, 1864)
(37, 'Nevada', 'state', '1864-10-31', '1865-12-31', 'union',
    '{"type": "Feature", "properties": {"name": "Nevada", "abbr": "NV", "admitted": 1864}, "geometry": {"type": "Polygon", "coordinates": [[[-120.0, 42.0], [-114.0, 42.0], [-114.0, 35.0], [-120.0, 39.0], [-120.0, 42.0]]]}}',
    'mock_data');

-- ============================================
-- Territories
-- ============================================

INSERT INTO territory_boundaries (id, name, type, valid_from, valid_to, side, geojson, source) VALUES

-- District of Columbia
(38, 'District of Columbia', 'territory', '1861-01-01', '1865-12-31', 'union',
    '{"type": "Feature", "properties": {"name": "District of Columbia", "abbr": "DC"}, "geometry": {"type": "Polygon", "coordinates": [[[-77.1, 39.0], [-76.9, 39.0], [-76.9, 38.8], [-77.1, 38.8], [-77.1, 39.0]]]}}',
    'mock_data');

-- Reset sequence to continue after manual inserts
SELECT setval('territory_boundaries_id_seq', (SELECT MAX(id) FROM territory_boundaries));

-- ============================================
-- Data Sources Reference
-- ============================================

INSERT INTO data_sources (name, url, last_imported, record_count, notes) VALUES
('Mock Boundary Data', NULL, NOW(), 38, 'Simplified mock boundaries for development. Production should use AHCB data.'),
('Atlas of Historical County Boundaries', 'https://publications.newberry.org/ahcb/', NULL, NULL, 'Source for production boundary data'),
('ACW Battle Data', 'https://github.com/jrnold/acw_battle_data', NULL, NULL, 'Primary source for battle data');
