# graphqlMVC

##Query

# Write your query or mutation here

query getAllTasksAndGreetings{tasks(skip:0,limit:3){
  id
  name
  completed
  user{
    name
  }

}}


query getTaskbyID{
  task(id:"60859a5cb2fdec432c5a0952"){
    id
    name 
    completed
    user {
      name
    }
  }
}


query getAllUsers{
  users{
  	id
    name
    email
    tasks{
      id
      name
    }
    
	}
  
  user{
    id
    name
    email
    tasks{
      id
    name
      completed
    }
    
    
  }
}

## Authorization header 

{
  "Authorization":"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRlc3Q1QGdtYWlsLmNvbSIsImlhdCI6MTYxOTQxNzE1MSwiZXhwIjoxNjE5NDUzMTUxfQ._aEsCBwlKWMN0ixdmrcSszY7fsyDWxm5AQvKmMckmmI"
}

## Update mutation
mutation updateTask {
  updateTask(id:"60859a5cb2fdec432c5a0952",input:{name:"Test Update Task",completed: true}){
    id
    name
    completed
  }
}

mutation deleteTask{deleteTask(id:"60859a5cb2fdec432c5a0952"){
  id
   name
  completed
}

}

## Create Mutation

mutation CreateTask {
  createTask(input:{name:"new Task 6",completed:false}){
    
    id
    name
    completed
    user{id
    name}
   
   
    
  }
}

## Create User 

mutation CreateUser {
  createUser(input:{name:"new User",email:"test@gmail.com",tasks:[2,3]}){
    
    id
    name
    
    
  }
}
## SignUP

mutation SignupUser {
  signup(input:{name:"testUser5",email:"test5@gmail.com",password:"test123"}){
    
    id
    name
    createdAt
    updatedAt
  
    
    
  }
}

## Login Mutation

mutation login{
  login(input: {
    email:"test5@gmail.com",
    password:"test123"
  }){
    token
  }
}

## Get User with ID Using Authorization

query getUserWithId {
  user{
    id
    name
    email
    tasks{id
    name}
  }
}

## Authorization to give 

{
  "Authorization":"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRlc3Q0QGdtYWlsLmNvbSIsImlhdCI6MTYxOTM0MDQyNiwiZXhwIjoxNjE5Mzc2NDI2fQ.MZFlqGeVo8igjpOCP1fM6tmFoNHhyIF4hIQfWSYSwSI"
}
