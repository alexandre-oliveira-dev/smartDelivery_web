interface PriceformaterType {
  price: string | number;
}

class PriceFormater {
  formater({ price }: PriceformaterType) {
    const priceFormat = parseFloat(String(price))?.toLocaleString('pt-br', {
      style: 'currency',
      currency: 'brl',
    });
    return priceFormat;
  }
}
export { PriceFormater };
