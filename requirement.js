/*
Requirements:

Book
  -ISBN           - String
  -Title          - String
  -Author         - [Number]
  -Language       - String
  -Publications   - Number
  -NumOfPages     - Number
  -Categories     - [String]

Author
  -id             - Number
  -Name           - String
  -Books          - [String]

Publications
  -id             - Number
  -Name           - String
  -Books          - [String]

--------------------------------APIs-----------------------------------------

Book
 -GET
   -to get all books (**done**)
   -to get a specific book (**done**)
   -to get a list of books based on category (**done**)
   -to get a list of books based on Author

-POST
   -to add a new book

-PUT
   -to to update book details
   -to update/add new author

-DELETE
   -to delete a book
   -to delete an author from a book



Author
  -GET
    -to get all authors (**done**)
    -to get specific author (**done**)
    -to get list of author based on a books (**done**)

  -POST
    -to add new author

  -PUT
    -to update author details

  -DELETE
    -to delete an author




Publications
   -GET
     -to get all publications(**done**)
     -to get specific publications(**done**)
     -to get a list of publication based on a book(**done**)
     
   -POST
     -to add new publication

   -PUT
     -to update publication

   -DELETE
    -to delete a book from publication
    -to delete a publication


*/