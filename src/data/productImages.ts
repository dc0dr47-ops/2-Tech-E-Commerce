/** Exact product photography overrides for storefront cards. */
export const PRODUCT_IMAGE_OVERRIDES: Record<string, string> = {
  'prod-01': 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-16-pro-max-naturaltitanium-select?wid=1200&hei=1200&fmt=png-alpha',
  'prod-02': '/hero/sony-xm5-cutout.svg',
  'prod-03': 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/mbp16-spaceblack-gallery1-202310?wid=1200&hei=1200&fmt=png-alpha',
  'prod-04': 'https://theapplewiki.com/images/3/3a/Apple_Watch_Ultra_2.png',
  'prod-05': 'https://images.priceoye.pk/samsung-galaxy-s24-ultra-12-256gb-pakistan-priceoye-govw1-500x500.webp',
  'prod-06': 'https://www.firstshop.co.za/cdn/shop/files/90nv00f1-m00220-controllers-1172581414.jpg?v=1749554237&width=1214',
  'prod-07': 'https://cdn1.avstore.ro/qube/get/w739h600/3fd8cc89bfbd859638409fb7a67d59f5',
  'prod-08': 'https://cdn.vjshop.vn/may-anh/mirrorless/sony/sony-a7r-v/sony-a7r-v.jpg',
  'prod-09': 'https://bbpcdn.pstatic.gr/bpimg18/2maylA/1SEQHS_SX1024Y1024/1723790704/google-pixel-9-pro-5g-128gb.jpg',
  'prod-10': 'https://nextplay.co.th/wp-content/uploads/2024/05/noteboo-xps16-9640-04.jpg',
  'prod-11': 'https://img.pccomponentes.com/articles/1057/10579686/1256-logitech-mx-master-3s-para-mac-raton-inalambrico-8000dpi-gris-palido.jpg',
  'prod-12': 'https://im9.cz/iR/short-tail/977017.jpg',
  'prod-13': 'https://ennap.com/cdn/shop/files/airpods-pro-2nd-generation-with-magsafe-charging-case-usbc-airpods-pro-2nd-generation-with-magsafe-charging-case-usbc-ennap-com-5.jpg?v=1697852900&width=1946',
  'prod-14': 'https://fstudio.vtexassets.com/arquivos/ids/946759/61EvdWaI61L._AC_SL1500_.jpg?v=638423883628870000',
  'prod-15': 'https://i5.walmartimages.com/asr/ab54bcc9-0c1d-468d-8602-10e51c424401.ef3bbe7d0b10e0479a558224cf102e0c.jpeg?odnBg=FFFFFF&odnHeight=768&odnWidth=768',
  'prod-16': 'https://bfasset.costco-static.com/U447IH35/as/mbp9pwvs4q3srq64w4pxtvck/1402425-894__1?auto=webp&format=jpg',
};

export const getProductImage = (productId: string, fallback: string) =>
  PRODUCT_IMAGE_OVERRIDES[productId] ?? fallback;
