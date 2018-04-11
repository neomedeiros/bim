Test API - Node JS

Description

This API implements 3 endpoints to compare two strings asynchronously. You need to use doing the following requests:

POST
/api/diff/left

Body:

{
	"code":"[comparisonid]",
	"value":"yourstringvalue"
}

Returns 200 OK if everything goes fine


POST
/api/diff/right

Body:

{
	"code":"[same-comparisonid]",
	"value":"yourstringvalue"
}

Returns 200 OK if everything goes fine


And finally,

GET
/api/diff/compare/[the-comparisonid-you-informed]

It will return if the strings are equal or not.

