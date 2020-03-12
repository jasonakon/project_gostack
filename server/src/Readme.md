# Go Backend

Simple dummy Web API, with in-memory data.

## Build & run

1. Load dependencies  
```go get -u "github.com/gorilla/mux"```

2. Run  
```go run main.go```

3. Test some API with Postman  
[Postman API](https://www.postman.com/) 
Proceed run some API testing with link below  
   * ```localhost:8080/api/persons``` without body payload
   * ```localhost:8080/api/addpersons``` with body payload and method 'PUT'   
      ```
      {
         "id": "1",
         "name": "qkk"
      }   
      ```
   * ```localhost:8080/api/deletepersons``` with body payload and method 'DELETE' 
      ```
      {
         "id": "1",
         "name": "Nicholas"
      }   
      ```
