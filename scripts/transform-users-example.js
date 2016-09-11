/**
 * Transforms users using Aggregate framework
 * Adds additional computed fields:
 * - week of dob
 * - month of dob
 * - quarter of dob
 * - full name
 */
// connection
var client = new Mongo();
var db = client.getDB('test');
//
load('full-name-expression.js');
load('week-expression.js');
load('day-of-week-expression.js');
load('month-expression.js');
load('quarter-expression.js');
// projection (transformation definition)
var projection = {
    gender: 1,
    name: {
        title: 1,
        first: 1,
        last: 1,
        fullName: fullNameExpression
    },
    location: 1,
    email: 1,
    dob: 1,
    registered: 1,
    phone: 1,
    cell: 1,
    id: 1,
    picture: 1,
    nat: 1,
    dayOfWeek: dayOfWeekExpression,
    week: weekExpression,
    month: monthExpression,
    quarter: quarterExpression
};
// transformation
var results = db.users.aggregate([
    { $project: projection },
    { $limit: 5 }
]);
results.forEach(function (doc) {
    printjson(doc);
});
//
quit();
