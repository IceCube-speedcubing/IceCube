# **Welcome To IceCube**
## **IceCube** is a all in one speedcubing website

### **Features**
- Encyclopedia for everything cubing related!
- Timer that saves all your times everywhere!

### **API**
- **Creating a user**  
  Request
  ```
  POST http://url.com/api/user/
  Content-Type: application/json

  {
      "username": "Joe",
      "password": "1234",
      "email": "JoeIsCool@example.com"
  }
  ```
  Response
  ```
  {
      "username": "Joe",
      "password": "1234",
      "email": "JoeIsCool@example.com",
      *has id and more*
  }
  ```

- **Adding WCA stuff to a user** (*this is a work in progress so this is not done*)  
  Request
  ```
  POST http://url.com/api/user/wca/
  Content-Type: application/json

  {
      "username": "Joe",
      "password": "1234",
      "email": "JoeIsCool@example.com",
      "wcaEmail": "JoeIsCool@example.com",
      "wcaPassword": "1234"
  }
  ```

- **Encyclopedia add** (*this is a work in progress so this is not done*)  
  Request
  ```
  POST http://url.com/api/encyclopedia/
  Content-Type: application/json

  {
      "username": "Joe",
      "password": "1234",
      "email": "JoeIsCool@example.com",
      "content": `# 3x3 Methods
        - CFOP
        - ROUX
        - APB
      `
  }
  ```
  Response
  ```
  {
      "message": "Pending Approval From Community",
      "url": "http://url.com/encyclopedia/:id/"
  }
  ```

- **Encyclopedia Edit** (*this is a work in progress so this is not done*)  
  Request
  ```
  PATCH http://url.com/api/encyclopedia/:id/
  Content-Type: application/json

  {
      "username": "Joe",
      "password": "1234",
      "email": "JoeIsCool@example.com",
      "content": `# 3x3 Methods
        - CFOP
        - ROUX
        - APB
        - BEGINNERS METHOD
      `
  }
  ```
  Response
  ```
  {
       "message": "Pending Approval From Community",
       "url": "http://url.com/encyclopedia/:id/edits/:id/"
  }
  ```
