// Shop settings. Fill these in once the business is registered and Stripe is set up.
//
// For each product, create a Payment Link in the Stripe Dashboard
// (Product catalogue → Payment Links), enable "Collect customers' addresses",
// add the shipping rates (€4.95, free over €35) and "Allow promotion codes",
// then paste the link below under the product's id.

export const shopConfig = {
  currency: 'EUR',
  /** Orders at or above this subtotal ship free (set the same rule in Stripe). */
  freeShippingFrom: 35,
  shippingFee: 4.95,
  /** Legal name and address of the food business operator, shown on product pages (EU 1169/2011). */
  businessName: '',
  businessAddress: '',
  /** Public contact email for orders and "notify me" requests. Leave empty to hide. */
  contactEmail: '',
  paymentLinks: {
    'two-islands': '',
    'osmanthus-peel': '',
    'rose-date': '',
    'ginger-jujube': '',
    'honeysuckle-mint': '',
    'chrysanthemum-goji': '',
    'after-dinner-hawthorn': '',
    'roasted-barley': '',
    'discovery-box': '',
  } as Record<string, string>,
}

export const paymentLinkFor = (productId: string) => shopConfig.paymentLinks[productId] || ''

export const formatPrice = (euros: number) =>
  new Intl.NumberFormat('en-IE', { style: 'currency', currency: shopConfig.currency }).format(euros)
