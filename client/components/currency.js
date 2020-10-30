export function currency(amount, currency) {
    if (currency && currency === "usd") {
        return "US$ " + amount.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,");
    }
    return "$ " + amount.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,");
}

export default currency;