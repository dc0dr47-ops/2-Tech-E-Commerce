/** Verified product photography overrides. */
export const PRODUCT_IMAGE_OVERRIDES: Record<string, string> = {
  'prod-01': 'https://www.mobiledokan.com/media/apple-iphone-16-pro-max-white-titanium-official-image.webp',
  'prod-02': 'https://jp.images-monotaro.com/Monotaro3/pi/highreso/mono77487035-220519-02.jpg',
  'prod-03': 'https://fortresselectronics.co.ke/wp-content/uploads/2024/09/MacBook-Pro.webp',
  'prod-04': 'https://alephksa.com/cdn/shop/files/Apple_Watch_Ultra_2_49mm_Natural_Titanium_Alpine_Loop_Tan_PDP_Image_Position_1__en-ME_7c9b5bd4-6611-4fb3-8d89-4922a8d9c502.jpg?v=1727247606',
};

export const getProductImage = (productId: string, fallback: string) =>
  PRODUCT_IMAGE_OVERRIDES[productId] ?? fallback;
