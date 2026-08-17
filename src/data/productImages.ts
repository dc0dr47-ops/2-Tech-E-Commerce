/** Verified model-specific product photography. */
export const PRODUCT_IMAGE_OVERRIDES: Record<string, string> = {
  'prod-01': 'https://commons.wikimedia.org/wiki/Special:FilePath/IPhone_16_Pro_Max_White_256g.jpg',
  'prod-03': 'https://commons.wikimedia.org/wiki/Special:FilePath/M3_Macbook_Pro_14_inch_Space_Grey_model.jpg',
  'prod-04': 'https://commons.wikimedia.org/wiki/Special:FilePath/Apple_Watch_Ultra_2.jpg',
  'prod-05': 'https://commons.wikimedia.org/wiki/Special:FilePath/Samsung_Galaxy_S24_Ultra.jpg',
  'prod-06': 'https://commons.wikimedia.org/wiki/Special:FilePath/Asus_ROG_Ally.jpg',
  'prod-08': 'https://commons.wikimedia.org/wiki/Special:FilePath/Sony_a7R_V_20230616_162618.jpg',
  'prod-09': 'https://commons.wikimedia.org/wiki/Special:FilePath/Google_Pixel_9_Pro_(Hazel)_rear.svg',
  'prod-11': 'https://commons.wikimedia.org/wiki/Special:FilePath/Logitech_MX_Master_3S_HS21.jpg',
  'prod-12': 'https://commons.wikimedia.org/wiki/Special:FilePath/2024_Dron_DJI_Mini_4_Pro_(21).jpg',
  'prod-13': 'https://commons.wikimedia.org/wiki/Special:FilePath/AirPods_Pro_2.jpg',
};

export const getProductImage = (productId: string, fallback: string) =>
  PRODUCT_IMAGE_OVERRIDES[productId] ?? fallback;
