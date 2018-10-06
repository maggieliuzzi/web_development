function randomString(n, chars='0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ') {
    var result = '';
    for (var i = n; i > 0; --i) result += chars[Math.floor(Math.random() * chars.length)];
    return result
}

function randomSubset(set, n) {
    var subset = [];
    if (set.length >= n) {
        var working_set = set;
        for (var i = 0; i < n; i++) {
            rng_max = working_set.length;
            rng = Math.floor(Math.random() * rng_max);
            subset.push(working_set[rng]);
            working_set.splice(rng, 1);
        }
    } else {
        subset = set;
    }
    return subset
}

module.exports = {"randomString": randomString, "randomSubset": randomSubset}