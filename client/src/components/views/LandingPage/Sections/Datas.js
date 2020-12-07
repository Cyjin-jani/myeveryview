const categories = [
    {
        "_id" : 1,
        "name" : "식품"
    },
    {
        "_id" : 2,
        "name" : "화장품"
    },
    {
        "_id" : 3,
        "name" : "의류"
    },
    {
        "_id" : 4,
        "name" : "전자제품"
    },
    {
        "_id" : 5,
        "name" : "악세서리"
    },
    {
        "_id" : 6,
        "name" : "의약품"
    },
    {
        "_id" : 7,
        "name" : "장소"
    },
    {
        "_id" : 8,
        "name" : "생활용품"
    },
    {
        "_id" : 9,
        "name" : "SW 프로그램(어플)"
    },
]

const price = [
    {
        "_id" : 0,
        "name" : "전체",
        "rangeArray": []
    },
    {
        "_id" : 1,
        "name" : "5천원 미만",
        "rangeArray": [0, 4999]
    },
    {
        "_id" : 2,
        "name" : "5천원 ~ 1만원",
        "rangeArray": [5000, 10000]
    },
    {
        "_id" : 3,
        "name" : "1만원 ~ 3만원",
        "rangeArray": [10000, 30000]
    },
    {
        "_id" : 4,
        "name" : "3만원 ~ 5만원",
        "rangeArray": [30000, 50000]
    },
    {
        "_id" : 5,
        "name" : "5만원 이상",
        "rangeArray": [50000, 999999999]
    },
    

]

export { categories, price}