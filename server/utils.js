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

function dateConversion(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [day, month, year].join('-');
}

module.exports = {"randomString": randomString, "randomSubset": randomSubset, "dateConversion": dateConversion}