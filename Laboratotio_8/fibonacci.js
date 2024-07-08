// fibonacci.js

function fibonacci(n) {
    if (n <= 1) return { result: n, series: [n] };

    let fibSeries = [0, 1];
    for (let i = 2; i <= n; i++) {
        fibSeries[i] = fibSeries[i - 1] + fibSeries[i - 2];
    }

    return { result: fibSeries[n], series: fibSeries };
}

module.exports = fibonacci;