const convertCurrencyRupiah = (salary) => {
    return new Intl.NumberFormat('id-ID',
      { style: 'currency', currency: 'IDR', minimumFractionDigits: 2 }
    ).format(salary);
 }

module.exports = convertCurrencyRupiah