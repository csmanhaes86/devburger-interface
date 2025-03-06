export const formatPrice = (value) => {
  return new Intl.NumberFormat('pr-br', {
    style: 'currency',
    currency: 'BRL',
  }).format(value/100);
};
