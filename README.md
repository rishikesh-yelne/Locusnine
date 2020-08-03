## Locusnine User Management

Hi! This is a single-page User Management Web Application developed to view all users and perform operations like Adding an user, Editing user details and Deleting the user through the website. The User details include the following: Name, Email ID, Role Type (Admin or Customer Executive) and (optional) Mobile Number. A Status field is also associated with the Users, which is currently assigned randomly during user creation. The Status values can be Active, Pending or Inactive.

**Technologies Used :** ASP.NET MVC, Entity Framework, AngularJS, JavaScript, RESTful API, MsSQL.

**Author :** Rishikesh Yelne

## About the Application
The Application is a single-page web application and all activities are asynchronously performed, ie. the whole page is not refreshed/reloaded. Following are the main activities:
1. Adding an User
- Input the User's Name, Email ID and select the Role Type. The Mobile Number field is optional.
- Client Side Validations are enabled to ensure that the user's name & email ID is not empty, the email ID is of correct format, the mobile number (if provided) should be of 10-digits.
- The Validations are also present at Server Side to ensure incorrect data is not stored in case the client side validations are disabled at the end-user's browser level.
- After successful creation of user, the list of users is reloaded.
2. List of Users
- The List contains details of the users : Name, Email ID, Role Type, Status.
- An additional column is present to edit the particular user.
3. Editing / Deleting an User
- User details can be modified by  clicking on edit button provided for each user in the list of users.
- The user can also be deleted by clicking the delete button provided.


## Pre-Requisites
1. **Database**:
	- Open Database folder.
	- Run the **Script.sql** using 'sa' login.
	The script creates a new database 'LocusnineDB', a new login 'locuser' (password:locusnine) and a table 'tblUsers'.
	
		OR
		Restore the **Locusnine.bak** file.
		> **Please Note** : The backup file is generated in version 14. Create new login 'locuser' with password 'locusnine' and assign the LocusnineDB to this user.
		
	- Accordingly update the **Connection String** 'LocusnineDBContext' in Web.config of MVC Project .
2. **IIS**:
	Please open the Web Settings in the Properties of the Locusnine ASP.NET MVC Project and in the Servers section, select 'Local IIS' instead of 'IIS Express'.
	Kindly click on 'Create Virtual Directory' and Save the changes so that the Web Application can be accessed using the following URL : http://localhost/Locusnine or http://localhost/Locusnine/Users/Index

## Application Demo
The Demo folder contains the screen recording of the application to demonstrate the various features of the application like Viewing all Users, Sorting/Searching the users, Add/Update/Delete of User, along with various validation checks in place. 