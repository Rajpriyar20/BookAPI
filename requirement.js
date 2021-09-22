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
   -to add a new book(**done**)

-PUT
   -to update book details(**done**)
   -to update/add new author(**done**)

-DELETE
   -to delete a book(**done**)
   -to delete an author from a book(**done**)



Author
  -GET
    -to get all authors (**done**)
    -to get specific author (**done**)
    -to get list of author based on a books (**done**)

  -POST
    -to add new author(**done**)
    -to add/update author

  -PUT
    -to update author details(**done**)

  -DELETE
    -to delete an author(**done**)




Publications
   -GET
     -to get all publications(**done**)
     -to get specific publications(**done**)
     -to get a list of publication based on a book(**done**)
     
   -POST
     -to add new publication(**done**)

   -PUT
     -to update publication

   -DELETE
    -to delete a book from publication(**done**)
    -to delete a publication(**done**)


*/