//temporary database

let Book = [{
        ISBN: "RAJ1234",
        title: "C++",
        authors: [1, 2],
        language: "en",
        pubDate: "1998-07-20",
        numOfPages: 330,
        category: ["programming", "tech", "logical"],
        publication: 1,
    },
    {
        ISBN: "1234PRIYA",
        title: "Getting started with Python",
        authors: [1],
        language: "en",
        pubDate: "1992-07-20",
        numOfPages: 490,
        category: ["programming", "fiction", "tech", "web dev"],
        publication: 1,
    }
];

let Author = [{
        id: 1,
        name: "Dennis",
        books: ["RAJ1234", "1234PRIYA"],
    },
    {
        id: 2,
        name: "Davis",
        books: ["RAJ1234"],
    },
    {
        id: 3,
        name: "Krickel",
        books: [],
    }
];

let Publication = [{
        id: 1,
        name: "Anil",
        books: ["RAJ1234"],
    },
    {
        id: 1,
        name: "Chakra",
        books: [],
    }
];

module.exports = { Book, Author, Publication };