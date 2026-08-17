import { Product, CategoryInfo } from '../types';

export const CATEGORIES_DATA: CategoryInfo[] = [
  {
    id: 'Phones',
    name: 'Smartphones',
    iconName: 'Smartphone',
    count: 28,
    description: 'Next-generation 5G flagships and foldable mobile tech',
    bannerImage: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 'Laptops',
    name: 'Computers & Laptops',
    iconName: 'Laptop',
    count: 34,
    description: 'High-performance ultrabooks, creator stations & desktops',
    bannerImage: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 'Audio',
    name: 'Audio & Headphones',
    iconName: 'Headphones',
    count: 42,
    description: 'Active noise cancellation headphones, earbuds & monitors',
    bannerImage: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 'Smartwatch',
    name: 'Smartwatches & Fitness',
    iconName: 'Watch',
    count: 19,
    description: 'Cellular smartwatches, titanium fitness trackers & bands',
    bannerImage: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 'Gaming',
    name: 'Gaming & VR',
    iconName: 'Gamepad2',
    count: 25,
    description: 'OLED handhelds, mechanical gear & high refresh displays',
    bannerImage: 'https://images.unsplash.com/photo-1600080972464-8e5f35f63d08?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 'Cameras',
    name: 'Cameras & Drones',
    iconName: 'Camera',
    count: 16,
    description: 'Full-frame mirrorless bodies, 4K gimbal drones & lenses',
    bannerImage: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 'Speakers',
    name: 'Wireless Speakers',
    iconName: 'Speaker',
    count: 18,
    description: 'Spatial audio home hubs, rugged portable 360° sound',
    bannerImage: 'https://images.unsplash.com/photo-1545454675-3531b543be5d?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 'Accessories',
    name: 'Smart Accessories',
    iconName: 'Cpu',
    count: 52,
    description: 'GaN ultra chargers, magnetic power banks & thunderbolt docks',
    bannerImage: 'https://images.unsplash.com/photo-1622445262464-84b1456045b6?auto=format&fit=crop&w=900&q=80',
  },
];

export const PRODUCTS_DATA: Product[] = [
  {
    id: 'prod-01',
    name: 'Titanium Phone 16 Pro Max',
    slug: 'titanium-phone-16-pro-max',
    brand: 'Apple',
    category: 'Phones',
    price: 1199,
    originalPrice: 1299,
    discountPercent: 8,
    rating: 4.9,
    reviewCount: 342,
    image: 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1695048133142-1a20484d2569?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1565849904461-04a58ad377e0?auto=format&fit=crop&w=800&q=80'
    ],
    shortDescription: 'Grade 5 aerospace titanium design with A18 Pro silicon and 48MP Fusion quad-lens system.',
    description: 'Forged in aerospace-grade titanium with an ultra-thin bezel 6.9-inch Super Retina XDR display featuring ProMotion 120Hz. Powered by the ground-breaking A18 Pro chipset built on 3-nanometer architecture, delivering up to 33 hours of video playback and studio-grade audio capture.',
    stock: 45,
    inStock: true,
    isFlashSale: true,
    flashSaleSoldPercent: 78,
    isFeatured: true,
    isBestSeller: true,
    freeShipping: true,
    tags: ['Flagship', 'Titanium', '5G', 'Pro Photography'],
    colors: [
      { name: 'Natural Titanium', hex: '#A49B90' },
      { name: 'Desert Titanium', hex: '#CDB19B' },
      { name: 'Black Titanium', hex: '#2B2C2E' },
      { name: 'White Titanium', hex: '#E3E4E5' }
    ],
    storageOptions: ['256GB', '512GB', '1TB'],
    specs: [
      { label: 'Display', value: '6.9" Super Retina XDR OLED (120Hz ProMotion)' },
      { label: 'Processor', value: 'A18 Pro Hexa-core (6-core GPU)' },
      { label: 'Main Camera', value: '48MP Fusion + 48MP Ultra-Wide + 12MP 5x Telephoto' },
      { label: 'Battery', value: '4685 mAh (Up to 33h video)' },
      { label: 'Weight', value: '227 grams' },
      { label: 'Water Resistance', value: 'IP68 (6m up to 30 mins)' }
    ],
    features: [
      'Dedicated Camera Control tactile haptic shutter sensor',
      'Action button with custom programmable workflows',
      'USB-C 3.0 with blazing 10Gbps data transfer speeds',
      'Advanced 4K 120fps Dolby Vision cinematic recording',
      'Crash Detection & Emergency Satellite SOS connectivity'
    ],
    warranty: '2-Year Global Manufacturer Limited Warranty + 90-day tech support',
    reviews: [
      {
        id: 'rev-101',
        userName: 'Alexander M.',
        rating: 5,
        date: '3 days ago',
        title: 'Sensational battery life and camera sensor',
        comment: 'Upgraded from an older device and the camera control button combined with the 5x optical zoom is stunning. Natural Titanium finish looks even better in person.',
        verifiedPurchase: true,
        helpfulCount: 41
      },
      {
        id: 'rev-102',
        userName: 'Elena Rostova',
        rating: 5,
        date: '1 week ago',
        title: 'Top tier build quality',
        comment: 'The display bezels are noticeably slimmer and thermals during gaming are vastly improved thanks to the graphite structural substructure.',
        verifiedPurchase: true,
        helpfulCount: 19
      }
    ]
  },
  {
    id: 'prod-02',
    name: 'Sony WH-1000XM5 Studio ANC',
    slug: 'sony-wh-1000xm5-studio-anc',
    brand: 'Sony',
    category: 'Audio',
    price: 328,
    originalPrice: 399,
    discountPercent: 18,
    rating: 4.8,
    reviewCount: 520,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1484704849700-f032a568e944?auto=format&fit=crop&w=800&q=80'
    ],
    shortDescription: 'Industry-leading noise cancellation with two processors and 8 microphones for unparalleled quiet.',
    description: 'Engineered for audio perfection. Equipped with the Integrated Processor V1 and HD Noise Cancelling Processor QN1, the WH-1000XM5 creates a personal sound sanctuary. With 30 hours of battery life and high-res audio LDAC streaming.',
    stock: 62,
    inStock: true,
    isFlashSale: true,
    flashSaleSoldPercent: 64,
    isFeatured: true,
    freeShipping: true,
    tags: ['ANC', 'Hi-Res Audio', 'Bluetooth 5.3', 'Comfort'],
    colors: [
      { name: 'Midnight Black', hex: '#1C1C1E' },
      { name: 'Platinum Silver', hex: '#E0DDD5' },
      { name: 'Smoky Navy', hex: '#212B38' }
    ],
    specs: [
      { label: 'Driver Unit', value: '30mm Carbon Fiber Composite Dome' },
      { label: 'Battery Life', value: '30 hours (ANC On) / 40 hours (ANC Off)' },
      { label: 'Fast Charge', value: '3 min charge gives 3 hours playback' },
      { label: 'Weight', value: '250g ultra-lightweight' },
      { label: 'Codecs', value: 'LDAC, AAC, SBC' }
    ],
    features: [
      'Auto NC Optimizer dynamically adjusts to ambient atmosphere',
      'Speak-to-Chat automatically pauses audio when you talk',
      'Multipoint connection to seamlessly switch between phone & laptop',
      'Beamforming microphones with AI noise reduction for crystal voice calls'
    ],
    warranty: '1-Year Sony Official Warranty',
    reviews: [
      {
        id: 'rev-201',
        userName: 'David K.',
        rating: 5,
        date: 'Yesterday',
        title: 'Cuts out all airplane drone noise',
        comment: 'Used these on a 12 hour flight and they were exceptionally comfortable without any headband fatigue. Soundstage is rich and balanced.',
        verifiedPurchase: true,
        helpfulCount: 56
      }
    ]
  },
  {
    id: 'prod-03',
    name: 'MacBook Pro 16" M3 Max Liquid Retina',
    slug: 'macbook-pro-16-m3-max',
    brand: 'Apple',
    category: 'Laptops',
    price: 2499,
    originalPrice: 2899,
    discountPercent: 14,
    rating: 5.0,
    reviewCount: 188,
    image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?auto=format&fit=crop&w=800&q=80'
    ],
    shortDescription: 'Unprecedented speed with M3 Max 16-core CPU, 40-core GPU, 36GB Unified Memory and Liquid Retina XDR.',
    description: 'Built for intense developer workflows, 8K video render pipelines, and complex 3D rendering. The 16.2-inch Liquid Retina XDR display reaches 1600 nits peak brightness with extreme dynamic range. Features 22 hours of real-world battery life in a Space Black anodized aluminum enclosure.',
    stock: 22,
    inStock: true,
    isFlashSale: true,
    flashSaleSoldPercent: 85,
    isFeatured: true,
    isNewArrival: true,
    freeShipping: true,
    tags: ['Workstation', 'M3 Max', '1600 nits', 'Creator Choice'],
    colors: [
      { name: 'Space Black', hex: '#1F2022' },
      { name: 'Silver', hex: '#E3E4E5' }
    ],
    storageOptions: ['1TB SSD', '2TB SSD', '4TB SSD'],
    specs: [
      { label: 'Screen', value: '16.2-inch Liquid Retina XDR (3456x2234 at 120Hz)' },
      { label: 'Chip', value: 'Apple M3 Max (16-core CPU, 40-core GPU)' },
      { label: 'Memory', value: '36GB Unified Memory (300GB/s bandwidth)' },
      { label: 'Ports', value: '3x Thunderbolt 4, HDMI 2.1, SDXC slot, MagSafe 3' },
      { label: 'Battery', value: '100Wh Lithium-Polymer (22 hours)' }
    ],
    features: [
      'Hardware-accelerated ray tracing and mesh shading',
      'Six-speaker sound system with force-cancelling woofers',
      'Studio-quality 3-mic array with directional beamforming',
      'Full-size Magic Keyboard with physical full-height function row'
    ],
    warranty: '2-Year AppleCare+ Ready Warranty',
    reviews: [
      {
        id: 'rev-301',
        userName: 'Marcus Vance',
        rating: 5,
        date: '5 days ago',
        title: 'Compiles Xcode projects in seconds',
        comment: 'The fans barely even spin up during massive docker container builds. Battery easily lasts 2 full workdays on moderate brightness.',
        verifiedPurchase: true,
        helpfulCount: 77
      }
    ]
  },
  {
    id: 'prod-04',
    name: 'Apex Watch Ultra 2 Titanium Cellular',
    slug: 'apex-watch-ultra-2-titanium',
    brand: 'Apple',
    category: 'Smartwatch',
    price: 699,
    originalPrice: 799,
    discountPercent: 12,
    rating: 4.9,
    reviewCount: 290,
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1579586337278-3befd40fd17a?auto=format&fit=crop&w=800&q=80'
    ],
    shortDescription: 'The most capable adventure smartwatch with 3000-nit OLED sapphire crystal and precision dual GPS.',
    description: 'Forged from corrosion-resistant titanium with a raised bezel to protect the flat sapphire crystal edge. Features dual-frequency GPS for precision pacing in dense forests or high-rise cities, 100m water resistance, and EN13319 scuba dive computer certification.',
    stock: 35,
    inStock: true,
    isFlashSale: true,
    flashSaleSoldPercent: 55,
    isFeatured: true,
    freeShipping: true,
    tags: ['GPS', 'Titanium', 'Dive Computer', 'Cellular'],
    colors: [
      { name: 'Natural Titanium + Orange Loop', hex: '#FF6A00' },
      { name: 'Black Titanium + Ocean Band', hex: '#212121' },
      { name: 'Titanium + Trail Loop Gray', hex: '#8E8E93' }
    ],
    storageOptions: ['64GB Cellular + GPS'],
    specs: [
      { label: 'Case Size', value: '49mm Aerospace Titanium' },
      { label: 'Display', value: '3000 nits Always-On Retina Sapphire' },
      { label: 'Water Rating', value: 'WR100 & EN13319 Dive Certified (40m)' },
      { label: 'Sensors', value: 'ECG, Blood Oxygen, Depth Gauge, Water Temp, Siren' },
      { label: 'Battery', value: '36 hours normal / 72 hours low power mode' }
    ],
    features: [
      '86-decibel Emergency Siren audible up to 600 feet',
      'Precision Dual-Frequency L1 & L5 GPS integration',
      'Customizable tactile Action button with instant workout marking',
      'Night Mode with red interface for dark environment legibility'
    ],
    warranty: '2-Year Global Manufacturer Warranty',
    reviews: [
      {
        id: 'rev-401',
        userName: 'Brian Hughes',
        rating: 5,
        date: '2 weeks ago',
        title: 'Built like a tank',
        comment: 'Ran a 50K trail marathon with GPS mapping and music streaming. Still had 42% battery remaining at the finish line.',
        verifiedPurchase: true,
        helpfulCount: 38
      }
    ]
  },
  {
    id: 'prod-05',
    name: 'Galaxy Ultra 24 5G AI Phone',
    slug: 'galaxy-ultra-24-5g-ai',
    brand: 'Samsung',
    category: 'Phones',
    price: 1049,
    originalPrice: 1299,
    discountPercent: 19,
    rating: 4.8,
    reviewCount: 410,
    image: 'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=800&q=80'
    ],
    shortDescription: 'Integrated S-Pen, 200MP camera sensor with Galaxy AI live translation and Circle to Search.',
    description: 'Transform productivity with Galaxy AI. Features a titanium frame with flat Corning Gorilla Armor glass that reduces reflections by 75%. Comes with embedded low-latency S-Pen for sketching, annotating, and remote camera control.',
    stock: 50,
    inStock: true,
    isFlashSale: false,
    isFeatured: true,
    freeShipping: true,
    tags: ['Galaxy AI', 'S-Pen', '200MP Camera', 'Snapdragon 8 Gen 3'],
    colors: [
      { name: 'Titanium Gray', hex: '#6E6E73' },
      { name: 'Titanium Yellow', hex: '#E5D08F' },
      { name: 'Titanium Black', hex: '#222222' }
    ],
    storageOptions: ['256GB', '512GB', '1TB'],
    specs: [
      { label: 'Display', value: '6.8" Dynamic AMOLED 2X QHD+ 2600 nits' },
      { label: 'Processor', value: 'Snapdragon 8 Gen 3 for Galaxy' },
      { label: 'Camera', value: '200MP + 50MP 5x + 10MP 3x + 12MP Ultra-Wide' },
      { label: 'Battery', value: '5000 mAh (45W Fast Charging)' }
    ],
    features: [
      'Live two-way voice call translation in 16 languages',
      'Generative edit for moving, resizing and deleting objects in photos',
      'Vapor chamber cooling enlarged by 1.9x for sustained gaming frame rates'
    ],
    warranty: '2-Year Official Brand Warranty',
    reviews: []
  },
  {
    id: 'prod-06',
    name: 'ROG Ally OLED Extreme Gaming Handheld',
    slug: 'rog-ally-oled-extreme-handheld',
    brand: 'Asus',
    category: 'Gaming',
    price: 649,
    originalPrice: 799,
    discountPercent: 19,
    rating: 4.7,
    reviewCount: 165,
    image: 'https://images.unsplash.com/photo-1600080972464-8e5f35f63d08?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1600080972464-8e5f35f63d08?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=800&q=80'
    ],
    shortDescription: 'AMD Ryzen Z1 Extreme silicon, 120Hz FreeSync Premium display and full Windows 11 game library support.',
    description: 'Play any AAA game anywhere. Equipped with 8 cores, 16 threads, and 8.6 Teraflops of RDNA 3 graphic muscle. Features Zero Gravity thermal cooling dual fans and Hall Effect analog triggers for pinpoint accuracy.',
    stock: 18,
    inStock: true,
    isFlashSale: true,
    flashSaleSoldPercent: 90,
    isFeatured: true,
    freeShipping: true,
    tags: ['AAA Gaming', 'Ryzen Z1', '120Hz', 'Steam/Epic/GamePass'],
    colors: [
      { name: 'Matte Cyber White', hex: '#F0F0F2' },
      { name: 'Obsidian Black', hex: '#18181A' }
    ],
    storageOptions: ['512GB NVMe', '1TB NVMe'],
    specs: [
      { label: 'APU', value: 'AMD Ryzen Z1 Extreme (8C/16T up to 5.1GHz)' },
      { label: 'Display', value: '7" FHD (1920x1080) 120Hz 500 nits FreeSync' },
      { label: 'RAM', value: '24GB LPDDR5X-7500 dual channel' },
      { label: 'Battery', value: '80Wh Long-Life Battery' }
    ],
    features: [
      'Ergonomic grips with slant angle contours for hours of play',
      'Armoury Crate SE unified launcher for all gaming platforms',
      'Dual front-firing smart amp stereo speakers with Dolby Atmos'
    ],
    warranty: '1-Year International Warranty',
    reviews: []
  },
  {
    id: 'prod-07',
    name: 'Bose SoundLink Max Spatial Bluetooth Speaker',
    slug: 'bose-soundlink-max-spatial-speaker',
    brand: 'Bose',
    category: 'Speakers',
    price: 299,
    originalPrice: 399,
    discountPercent: 25,
    rating: 4.8,
    reviewCount: 215,
    image: 'https://images.unsplash.com/photo-1545454675-3531b543be5d?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1545454675-3531b543be5d?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?auto=format&fit=crop&w=800&q=80'
    ],
    shortDescription: 'Epic stereo acoustic architecture with deep sub-bass and rugged IP67 waterproof & dustproof housing.',
    description: 'Designed to turn any outdoor gathering into a festival. Featuring articulated transducers with custom passive radiators for ultra-low frequencies. Includes a built-in climbing rope carry handle and power bank reverse charging.',
    stock: 40,
    inStock: true,
    isFlashSale: true,
    flashSaleSoldPercent: 70,
    isFeatured: true,
    freeShipping: true,
    tags: ['IP67 Waterproof', '20h Playback', 'Powerbank', 'Bose Bass'],
    colors: [
      { name: 'Blue Dusk', hex: '#3B4D61' },
      { name: 'Triple Black', hex: '#1A1A1A' }
    ],
    specs: [
      { label: 'Battery Life', value: 'Up to 20 hours continuous audio' },
      { label: 'Durability', value: 'IP67 Waterproof, Dustproof & Drop Resistant' },
      { label: 'Connectivity', value: 'Bluetooth 5.3 + 3.5mm AUX input' },
      { label: 'USB Power', value: 'USB-C In/Out reverse device charging' }
    ],
    features: [
      'PositionIQ technology automatically optimizes EQ based on orientation',
      'SimpleSync pairing with Bose Smart soundbars and home speakers',
      'Customizable tactile rope strap with optional color accessories'
    ],
    warranty: '2-Year Bose Factory Warranty',
    reviews: []
  },
  {
    id: 'prod-08',
    name: 'Sony Alpha 7R V Full-Frame Mirrorless',
    slug: 'sony-alpha-7r-v-mirrorless',
    brand: 'Sony',
    category: 'Cameras',
    price: 3498,
    originalPrice: 3899,
    discountPercent: 10,
    rating: 4.9,
    reviewCount: 94,
    image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1502920917128-1aa500764cbd?auto=format&fit=crop&w=800&q=80'
    ],
    shortDescription: '61.0 MP back-illuminated Exmor R CMOS with dedicated AI processing unit for real-time subject tracking.',
    description: 'The pinnacle of high-resolution image capture. Incorporates a dedicated AI processing engine capable of estimating human poses, recognizing vehicles, trains, airplanes, insects, and wildlife instantly. Offers 8-step body image stabilization and 8K 24p cinematic video recording.',
    stock: 14,
    inStock: true,
    isFlashSale: false,
    isFeatured: true,
    freeShipping: true,
    tags: ['61MP', '8K Video', 'AI Real-time Tracking', 'Dual CFexpress'],
    colors: [
      { name: 'Magnesium Black', hex: '#222224' }
    ],
    storageOptions: ['Body Only', 'Body + 24-70mm f/2.8 GM II Lens'],
    specs: [
      { label: 'Sensor', value: '61.0 MP Full-Frame Exmor R BSI CMOS' },
      { label: 'Image Stabilization', value: '8.0-stop 5-axis In-Body Optical IS' },
      { label: 'Video', value: '8K 24p 10-bit 4:2:2 & 4K 60p oversampled' },
      { label: 'EVF', value: '9.44 million dot QXGA OLED electronic viewfinder' }
    ],
    features: [
      '4-axis multi-angle LCD screen with full tilt and side swivel',
      'Pixel Shift Multi Shooting creates massive 240.8 MP images',
      'Dual slots compatible with CFexpress Type A and UHS-II SD cards'
    ],
    warranty: '3-Year Sony Professional Imaging Warranty',
    reviews: []
  },
  {
    id: 'prod-09',
    name: 'Pixel 9 Pro 5G with Gemini Nano',
    slug: 'pixel-9-pro-5g-gemini',
    brand: 'Google',
    category: 'Phones',
    price: 899,
    originalPrice: 999,
    discountPercent: 10,
    rating: 4.8,
    reviewCount: 145,
    image: 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=800&q=80'
    ],
    shortDescription: 'Google Tensor G4 chip, 16GB RAM for on-device AI, pro triple camera and Super Actua 3000-nit display.',
    description: 'Sleek satin glass back with polished metal camera visor. Powered by Tensor G4 and built from the ground up for Gemini generative AI assistance, Best Take photography, Magic Audio Eraser, and 7 full years of Android OS updates.',
    stock: 32,
    inStock: true,
    isFlashSale: false,
    isNewArrival: true,
    isFeatured: true,
    freeShipping: true,
    tags: ['Google AI', 'Tensor G4', '7 Years Updates', 'Super Actua'],
    colors: [
      { name: 'Obsidian', hex: '#26282A' },
      { name: 'Porcelain', hex: '#F3F2EE' },
      { name: 'Hazel', hex: '#7E837D' },
      { name: 'Rose', hex: '#EACAC6' }
    ],
    storageOptions: ['128GB', '256GB', '512GB'],
    specs: [
      { label: 'Display', value: '6.3" LTPO OLED (1-120Hz) 3000 nits peak' },
      { label: 'RAM', value: '16GB LPDDR5X' },
      { label: 'Cameras', value: '50MP Wide + 48MP Ultra-Wide + 48MP 5x Telephoto' },
      { label: 'OS Support', value: '7 years of OS, Security and Pixel Drop updates' }
    ],
    features: [
      'Add Me feature combines two photos so everyone is in the group shot',
      'Video Boost with Night Sight generates HDR color in cloud pipeline',
      'Built-in Thermometer sensor for measuring object temperatures'
    ],
    warranty: '2-Year Google Warranty',
    reviews: []
  },
  {
    id: 'prod-10',
    name: 'Dell XPS 16 Carbon InfinityEdge Laptop',
    slug: 'dell-xps-16-carbon-infinityedge',
    brand: 'Dell',
    category: 'Laptops',
    price: 1899,
    originalPrice: 2299,
    discountPercent: 17,
    rating: 4.7,
    reviewCount: 88,
    image: 'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?auto=format&fit=crop&w=800&q=80'
    ],
    shortDescription: 'Intel Core Ultra 9 with AI Boost NPU, NVIDIA GeForce RTX 4070, and 4K+ OLED seamless touch glass.',
    description: 'Masterfully crafted from CNC machined aluminum with graphite palm rests. Features a seamless glass touchpad with haptic response, touch-function row, and zero-lattice keyboard for effortless productivity.',
    stock: 19,
    inStock: true,
    isFlashSale: false,
    isFeatured: true,
    freeShipping: true,
    tags: ['Intel Core Ultra', 'RTX 4070', 'OLED 4K', 'CNC Aluminum'],
    colors: [
      { name: 'Platinum Silver', hex: '#DCDFE2' },
      { name: 'Graphite Dark', hex: '#333538' }
    ],
    storageOptions: ['1TB NVMe', '2TB NVMe'],
    specs: [
      { label: 'Processor', value: 'Intel Core Ultra 9 185H (16 Cores / 22 Threads)' },
      { label: 'Graphics', value: 'NVIDIA GeForce RTX 4070 (8GB GDDR6)' },
      { label: 'Screen', value: '16.3" 4K+ (3840x2400) OLED Touch 100% DCI-P3' },
      { label: 'Audio', value: '10W Quad-speaker array with Waves MaxxAudio' }
    ],
    features: [
      'Dedicated Windows Copilot AI hardware key',
      'Gorilla Glass 3 palm rest with seamless invisible haptic trackpad',
      'ExpressCharge 80% recharge in under 60 minutes'
    ],
    warranty: '2-Year Dell ProSupport Premium On-Site Warranty',
    reviews: []
  },
  {
    id: 'prod-11',
    name: 'Logitech MX Master 3S Wireless Precision Mouse',
    slug: 'logitech-mx-master-3s-mouse',
    brand: 'Logitech',
    category: 'Accessories',
    price: 99,
    originalPrice: 129,
    discountPercent: 23,
    rating: 4.9,
    reviewCount: 890,
    image: 'https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?auto=format&fit=crop&w=800&q=80'
    ],
    shortDescription: 'Quiet Click technology, 8,000 DPI track-on-glass sensor, and MagSpeed electromagnetic scrolling.',
    description: 'An ergonomic icon remastered. MagSpeed scroll wheel scrolls 1,000 lines per second in near silence. Seamlessly control up to 3 computers with Logitech Flow to copy paste text, images, and files across Mac and Windows.',
    stock: 120,
    inStock: true,
    isFlashSale: true,
    flashSaleSoldPercent: 88,
    isFeatured: true,
    isBestSeller: true,
    freeShipping: false,
    tags: ['Ergonomic', 'Quiet Clicks', '8000 DPI', 'Multi-Device'],
    colors: [
      { name: 'Space Gray', hex: '#3B3D40' },
      { name: 'Pale Gray', hex: '#E6E7E9' }
    ],
    specs: [
      { label: 'Sensor', value: 'Darkfield 8000 DPI (Tracks on glass 4mm+)' },
      { label: 'Clicks', value: '90% quieter Quiet Click switches' },
      { label: 'Battery', value: 'Up to 70 days on full charge (USB-C)' },
      { label: 'Weight', value: '141g balanced ergonomic palm grip' }
    ],
    features: [
      'MagSpeed Electromagnetic wheel stops on a pixel',
      'Custom app-specific button assignments with Logi Options+',
      'Pair with up to 3 devices via Bluetooth Low Energy or Logi Bolt'
    ],
    warranty: '2-Year Logitech Hardware Warranty',
    reviews: []
  },
  {
    id: 'prod-12',
    name: 'DJI Mini 4 Pro 4K HDR Camera Drone',
    slug: 'dji-mini-4-pro-drone',
    brand: 'DJI',
    category: 'Cameras',
    price: 759,
    originalPrice: 899,
    discountPercent: 15,
    rating: 4.9,
    reviewCount: 230,
    image: 'https://images.unsplash.com/photo-1527977966376-1c8408f9f108?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1527977966376-1c8408f9f108?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1508614589041-895b88991e3e?auto=format&fit=crop&w=800&q=80'
    ],
    shortDescription: 'Under 249g lightweight design with omnidirectional obstacle sensing, 4K/60fps HDR true vertical video.',
    description: 'Fly regulation-free in most regions. Features ActiveTrack 360° subject tracking, 20km FHD video transmission with DJI O4, and up to 34 minutes of flight time per intelligent flight battery.',
    stock: 25,
    inStock: true,
    isFlashSale: false,
    isFeatured: true,
    freeShipping: true,
    tags: ['Sub-249g', '4K 60fps HDR', '360 Obstacle Sensing', '20km Range'],
    colors: [
      { name: 'Classic Drone Gray', hex: '#D1D3D4' }
    ],
    storageOptions: ['Standard Controller Bundle', 'Fly More Combo (DJI RC 2 Screen)'],
    specs: [
      { label: 'Takeoff Weight', value: '< 249 g (No FAA registration needed)' },
      { label: 'Max Flight Time', value: '34 Minutes (45 Mins with Plus Battery)' },
      { label: 'Video Quality', value: '4K/60fps HDR & 4K/100fps Slow Motion' },
      { label: 'Transmission', value: 'DJI O4 20km FHD Low-Latency Stream' }
    ],
    features: [
      'True Vertical Shooting for instant TikTok and Instagram uploads',
      'Omnidirectional optical obstacle avoidance with APAS 5.0 braking',
      'Night Shots noise reduction video mode for low-light cinematic aerials'
    ],
    warranty: '1-Year DJI Care Enterprise Warranty',
    reviews: []
  },
  {
    id: 'prod-13',
    name: 'AirPods Pro 2 USB-C with Spatial Audio',
    slug: 'airpods-pro-2-usb-c',
    brand: 'Apple',
    category: 'Audio',
    price: 189,
    originalPrice: 249,
    discountPercent: 24,
    rating: 4.9,
    reviewCount: 680,
    image: 'https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1588423771073-b8903fbb85b5?auto=format&fit=crop&w=800&q=80'
    ],
    shortDescription: 'Up to 2x more Active Noise Cancellation with Adaptive Audio, Transparency mode, and MagSafe USB-C.',
    description: 'Driven by the Apple H2 chip for acoustic clarity. Adaptive Audio dynamically blends Transparency and Active Noise Cancellation tailored to the changing noise environment around you.',
    stock: 95,
    inStock: true,
    isFlashSale: true,
    flashSaleSoldPercent: 82,
    isFeatured: true,
    isBestSeller: true,
    freeShipping: true,
    tags: ['H2 Chip', 'Adaptive Audio', 'MagSafe Case', 'Spatial Audio'],
    colors: [
      { name: 'Gloss White', hex: '#FFFFFF' }
    ],
    specs: [
      { label: 'Chip', value: 'Apple H2 Headphone Chip + U1 Case Chip' },
      { label: 'Battery', value: '6 hours earbud / 30 hours with case' },
      { label: 'Dust & Water', value: 'IP54 dust, sweat, and water resistant' },
      { label: 'Charging', value: 'USB-C, MagSafe, Apple Watch charger, Qi' }
    ],
    features: [
      'Conversation Awareness lowers media volume when you start speaking',
      'Personalized Spatial Audio with dynamic head tracking',
      'Touch control swipe to adjust volume directly on stem'
    ],
    warranty: '1-Year Limited Apple Warranty',
    reviews: []
  },
  {
    id: 'prod-14',
    name: 'Anker Prime 27,650mAh 250W GaN Power Bank',
    slug: 'anker-prime-250w-powerbank',
    brand: 'Anker',
    category: 'Accessories',
    price: 139,
    originalPrice: 179,
    discountPercent: 22,
    rating: 4.8,
    reviewCount: 310,
    image: 'https://images.unsplash.com/photo-1622445262464-84b1456045b6?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1622445262464-84b1456045b6?auto=format&fit=crop&w=800&q=80'
    ],
    shortDescription: 'Multi-device fast charging with 250W total output, smart digital TFT display, and app monitoring.',
    description: 'Charge two high-power laptops and a phone simultaneously at top speeds. Equipped with PD 3.1 technology and real-time battery health, temperature, and wattage diagnostics.',
    stock: 65,
    inStock: true,
    isFlashSale: true,
    flashSaleSoldPercent: 60,
    isFeatured: true,
    freeShipping: false,
    tags: ['250W GaN', '27650mAh', 'TSA Airline Approved', 'Smart Display'],
    colors: [
      { name: 'Space Metallic Gray', hex: '#3E4042' }
    ],
    specs: [
      { label: 'Capacity', value: '27,650 mAh (99.54 Wh Airline Approved)' },
      { label: 'Total Output', value: '250W (Max 140W single USB-C port)' },
      { label: 'Display', value: 'Full color TFT smart diagnostic screen' }
    ],
    features: [
      'Fast 170W recharge fills bank in only 37 minutes',
      'ActiveShield 2.0 monitors temperature 3 million times per day',
      'Companion smartphone app via Bluetooth to optimize charging speed'
    ],
    warranty: '24-Month Anker Hassle-Free Warranty',
    reviews: []
  },
  {
    id: 'prod-15',
    name: 'Sony WH-1000XM4 Noise Canceling Headphones',
    slug: 'sony-wh-1000xm4-headphones',
    brand: 'Sony',
    category: 'Audio',
    price: 248,
    originalPrice: 348,
    discountPercent: 28,
    rating: 4.8,
    reviewCount: 1420,
    image: 'https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80'
    ],
    shortDescription: 'Dual Noise Sensor technology, foldable travel swivel earcups, and up to 30-hour battery life.',
    description: 'The legendary traveler favorite. Super comfortable fold-flat design, deep bass profile, touch sensor controls, and wearing detection that pauses music when headphones are removed.',
    stock: 48,
    inStock: true,
    isFlashSale: true,
    flashSaleSoldPercent: 74,
    isFeatured: false,
    freeShipping: true,
    tags: ['Foldable ANC', '30hr Battery', 'LDAC', 'Value King'],
    colors: [
      { name: 'Matte Black', hex: '#1B1B1C' },
      { name: 'Silver Gray', hex: '#D6D5D2' }
    ],
    specs: [
      { label: 'Battery', value: '30 hours continuous playback' },
      { label: 'Design', value: 'Swivel & fold travel-ready hard case included' },
      { label: 'Weight', value: '254 grams' }
    ],
    features: [
      'Multipoint connection with 2 devices simultaneously',
      'Quick Attention mode lets you hear conversation by placing hand over earcup'
    ],
    warranty: '1-Year Sony Warranty',
    reviews: []
  },
  {
    id: 'prod-16',
    name: 'Samsung Odyssey OLED G9 49" Curved Gaming Monitor',
    slug: 'samsung-odyssey-oled-g9-monitor',
    brand: 'Samsung',
    category: 'Gaming',
    price: 1199,
    originalPrice: 1799,
    discountPercent: 33,
    rating: 4.9,
    reviewCount: 92,
    image: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&w=800&q=80'
    ],
    shortDescription: 'Dual QHD 32:9 ultra-wide curved screen with 0.03ms response time and 240Hz refresh rate.',
    description: 'Immerse your senses in glorious OLED picture quality with Neo Quantum Processor Pro. Delivering pure blacks and unmatched color depth for elite sim-racing, flight simulation, and multitasking.',
    stock: 10,
    inStock: true,
    isFlashSale: true,
    flashSaleSoldPercent: 92,
    isFeatured: true,
    freeShipping: true,
    tags: ['OLED 240Hz', '49-inch 32:9', '0.03ms GTG', 'Curved 1800R'],
    colors: [
      { name: 'Silver Metallic', hex: '#D2D4D8' }
    ],
    specs: [
      { label: 'Resolution', value: 'Dual QHD (5120 x 1440)' },
      { label: 'Curvature', value: '1800R Immersion Curve' },
      { label: 'Refresh Rate', value: '240Hz G-Sync & FreeSync Premium Pro' },
      { label: 'Response Time', value: '0.03ms (GtG)' }
    ],
    features: [
      'CoreSync & Core Lighting+ matches on-screen colors on rear chassis',
      'Samsung Gaming Hub for cloud gaming without a PC or console',
      'Smart TV apps built-in with remote control'
    ],
    warranty: '3-Year Manufacturer OLED Burn-In Coverage Warranty',
    reviews: []
  }
];

export const PROMO_SLIDES = [
  {
    id: 'slide-1',
    tag: 'Next-Gen Flagship Series',
    title: 'Work smarter. Upgrade everything.',
    description: 'Discover phones, laptops, studio audio, titanium wearables, and pro creative gear with up to 40% instant savings.',
    ctaText: 'Shop Now',
    secondaryCta: 'Explore Deals',
    categoryTarget: 'Phones',
    highlightBadge: 'Spring Tech Launch',
    featuredProduct: 'Titanium Phone 16 Pro Max',
    startingPrice: '$1,199',
    imageUrl: 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?auto=format&fit=crop&w=1000&q=80',
    accentColor: '#FF6A00'
  },
  {
    id: 'slide-2',
    tag: 'Ultra Creator Power',
    title: 'Engineered for extreme performance.',
    description: 'Liquid Retina XDR displays and 3-nanometer silicon architectures designed for heavy creative pipelines.',
    ctaText: 'Explore Laptops',
    secondaryCta: 'View Specs',
    categoryTarget: 'Laptops',
    highlightBadge: 'M3 Max Silicon',
    featuredProduct: 'MacBook Pro 16" Liquid Retina',
    startingPrice: '$2,499',
    imageUrl: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=1000&q=80',
    accentColor: '#0A84FF'
  },
  {
    id: 'slide-3',
    tag: 'Immersive Sound Stages',
    title: 'Silence the chaos. Hear every detail.',
    description: 'Dual-processor Active Noise Cancellation and high-resolution spatial audio with 30-hour battery life.',
    ctaText: 'Discover Audio',
    secondaryCta: 'See Reviews',
    categoryTarget: 'Audio',
    highlightBadge: 'Industry-Leading ANC',
    featuredProduct: 'Sony WH-1000XM5 Studio',
    startingPrice: '$328',
    imageUrl: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=1000&q=80',
    accentColor: '#FF8A00'
  }
];

export const TRUST_FEATURES = [
  {
    icon: 'Truck',
    title: 'Free Express Delivery',
    description: 'Complimentary 2-day priority shipping on all orders over $99'
  },
  {
    icon: 'ShieldCheck',
    title: '2-Year Official Warranty',
    description: '100% genuine brand-certified warranty with local repair support'
  },
  {
    icon: 'RefreshCw',
    title: '30-Day Easy Returns',
    description: 'Zero hassle return policy with free prepaid return label'
  },
  {
    icon: 'Headphones',
    title: '24/7 Tech Concierge',
    description: 'Direct access to certified consumer hardware specialists'
  }
];
