[![Open in Visual Studio Code](https://classroom.github.com/assets/open-in-vscode-2e0aaae1b6195c2367325f4f02e2d04e9abb55f0b24a779b69b11b9e10269abc.svg)](https://classroom.github.com/online_ide?assignment_repo_id=15564556&assignment_repo_type=AssignmentRepo)

# IPROJECT REAUTO

> Tuliskan API Docs kamu di sini

# Movie API Documentation

## Endpoints :

List of available endpoints:


- `POST /register`
- `POST /login`
- `POST /googleAuth`
- `POST /products`
- `POST /products/midtras`
- `GET /products/readproduct`
- `GET /products/:id`
- `PATCH /products/:id`
- `PUT /products/:id`
- `DELETE /products/:id`

&nbsp;

Endpoints
1. POST /register
Description: Registers a new user.

Request Body:

json
```json
{
  "username": "string",
  "email": "string",
  "password": "string"
}
```
Response:

201 Created
json
```json
{
  "id": "user_id",
  "username": "string",
  "email": "string"
}
```
400 Bad Request
json
```json
{
  "error": "Description of the error"
}
```
2. POST /login
Description: Authenticates a user and returns a token.

Request Body:

json
```json
{
  "email": "string",
  "password": "string"
}
```
Response:

200 OK
json
```json
{
  "token": "jwt_token"
}
```
401 Unauthorized
json
```json
{
  "error": "Invalid credentials"
}
```
3. POST /googleAuth
Description: Authenticates a user via Google OAuth.

Request Body:

json
```json
{
  "idToken": "string"
}
```
Response:

200 OK
json
```json
{
  "token": "jwt_token"
}
```
400 Bad Request
json
```json
{
  "error": "Invalid ID token"
}
```
4. POST /products
Description: Creates a new product.

Request Body:

json
```json
{
  "name": "string",
  "description": "string",
  "price": "number"
}
```
Response:

201 Created
json
```json
{
  "id": "product_id",
  "name": "string",
  "description": "string",
  "price": "number"
}
```
400 Bad Request
json
```json
{
  "error": "Description of the error"
}
```
5. POST /products/midtras
Description: Processes payments through Midtrans for a product.

Request Body:

json
```json
{
  "productId": "string",
  "amount": "number",
  "paymentMethod": "string"
}
```
Response:

200 OK
json
```json
{
  "transactionId": "string",
  "status": "success"
}
```
400 Bad Request
json
```json
{
  "error": "Description of the error"
}
```
6. GET /products/readproduct
Description: Retrieves a list of products.

Response:

200 OK
json
```json
[
  {
    "id": "product_id",
    "name": "string",
    "description": "string",
    "price": "number"
  }
]
```
7. GET /products/:id
Description: Retrieves a specific product by ID.

Response:

200 OK
json
```json
{
  "id": "product_id",
  "name": "string",
  "description": "string",
  "price": "number"
}
```
404 Not Found
json
```json
{
  "error": "Product not found"
}
```
8. PATCH /products/:id
Description: Updates partial details of a product.

Request Body:

json
```json
{
  "name": "string",
  "description": "string",
  "price": "number"
}
```
Response:

200 OK
json
```json
{
  "id": "product_id",
  "name": "string",
  "description": "string",
  "price": "number"
}
```
400 Bad Request
json
```json
{
  "error": "Description of the error"
}
```
9. PUT /products/:id
Description: Completely updates a product’s details.

Request Body:

json
```json
{
  "name": "string",
  "description": "string",
  "price": "number"
}
```
Response:

200 OK
json
```json
{
  "id": "product_id",
  "name": "string",
  "description": "string",
  "price": "number"
}
```
400 Bad Request
json
```json
{
  "error": "Description of the error"
}
```
10. DELETE /products/:id
Description: Deletes a specific product by ID.

Response:

200 OK
json
```json
{
  "message": "Product deleted successfully"
}
```
404 Not Found
json
```json
{
  "error": "Product not found"
}
```
