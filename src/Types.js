import PropTypes from "prop-types";

export const CustomerType = PropTypes.shape({
  id: PropTypes.number.isRequired,
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  address_line: PropTypes.string
});

export const ProductType = PropTypes.shape({
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  category: PropTypes.string,
  price: PropTypes.number.isRequired,
  discount_percentage: PropTypes.number,
  rating: PropTypes.number,
  stock: PropTypes.number,
  sku: PropTypes.string,
  weight: PropTypes.number,
  width: PropTypes.number,
  height: PropTypes.number,
  depth: PropTypes.number,
  warranty_information: PropTypes.string,
  shipping_information: PropTypes.string,
  availability_status: PropTypes.string,
  return_policy: PropTypes.string,
  minimum_order_quantity: PropTypes.number,
  created_at: PropTypes.string,
  updated_at: PropTypes.string,
  barcode: PropTypes.string,
  qr_code: PropTypes.string,
  thumbnail: PropTypes.string,
  image_url: PropTypes.string
});

export const ShoppingCartType = PropTypes.shape({
  customer_id: PropTypes.number.isRequired,
  is_empty: PropTypes.bool.isRequired,
  product_quantity: PropTypes.number.isRequired,
  created_date: PropTypes.string.isRequired
});

export const OrderType = PropTypes.shape({
  id: PropTypes.number.isRequired,
  customer_id: PropTypes.number.isRequired,
  product_quantities: PropTypes.arrayOf(
    PropTypes.shape({
      product_id: PropTypes.number.isRequired,
      quantity: PropTypes.number.isRequired
    })
  ).isRequired,
  total_amount: PropTypes.number.isRequired,
  order_date: PropTypes.string.isRequired,
  delivery_date: PropTypes.string,
  delivery_status: PropTypes.string.isRequired
});

export const CategoryType = PropTypes.shape({
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired
});

export const PaymentType = PropTypes.shape({
  id: PropTypes.number.isRequired,
  order_id: PropTypes.number.isRequired,
  status: PropTypes.string.isRequired,
  total: PropTypes.number.isRequired,
  detail: PropTypes.string
});

export const ShippingInfoType = PropTypes.shape({
  shipping_id: PropTypes.number.isRequired,
  shipping_cost: PropTypes.number.isRequired,
  shipping_type: PropTypes.string.isRequired,
  shipping_address: PropTypes.string.isRequired
});

export const ReviewType = PropTypes.shape({
  id: PropTypes.number.isRequired,
  reviewer_name: PropTypes.string.isRequired,
  rating: PropTypes.number.isRequired,
  comment: PropTypes.string.isRequired,
  review_date: PropTypes.string.isRequired
});

export const isValidProduct = (product) => {
    if (!product || typeof product !== 'object') return false;
    
    const requiredFields = {
        id: 'number',
        title: 'string',
        description: 'string',
        category: 'string',
        price: 'number'
    };

    for (const [field, type] of Object.entries(requiredFields)) {
        if (typeof product[field] !== type) return false;
    }

    if (product.price < 0) return false;

    const optionalNumberFields = [
        'discount_percentage',
        'rating',
        'stock',
        'weight',
        'width',
        'height',
        'depth',
        'minimum_order_quantity'
    ];

    const optionalStringFields = [
        'sku',
        'warranty_information',
        'shipping_information',
        'availability_status',
        'return_policy',
        'barcode',
        'qr_code',
        'thumbnail',
        'image_url'
    ];

    for (const field of optionalNumberFields) {
        if (product[field] !== undefined && typeof product[field] !== 'number') {
            return false;
        }
    }

    for (const field of optionalStringFields) {
        if (product[field] !== undefined && typeof product[field] !== 'string') {
            return false;
        }
    }

    return true;
};