# API Autoflow Pro Template - Todo App

## Setting

Clone this repository :

```
git clone https://github.com/pulzzedongyeon/autoflow-pro-sns
```


### Frontend

Install & Run Vue.js Package:

```
cd frontend
npm install
npm run dev
```


### Backend

Install & Run API AutoFlow Pro packages :

<details>
  <summary>► MAC: (press to expand)</summary>
  
  ```
  cd interactor/bin
  ./interactor start 
  ```
  
  Open up the browser and go to below URL
  
  ```
  http://localhost:4000
  ```
  
  🚨 IMPORTANT: Run the servers by pressing the ▶️ button
  
  Reference:
  http://www.interactor.com/product/autoflow/installation/macos
</details>

<details>
  <summary>► Windows: (press to expand)</summary>
  
  🚨 IMPORTANT: Open the terminal (cmd) using **Run as Administrator**
  ```
  cd interactor/bin
  ./interactor install 
  ./interactor start 
  ```
 
  Open up the browser and go to below URL
  
  ```
  http://localhost:4000
  ```
  
  🚨 IMPORTANT 🚨 Run the servers by pressing the ▶️ button
	
	
  Reference:
  http://www.interactor.com/product/autoflow/installation/windows
  
</details>

🚨 IMPORTANT: Apply the **_api_autoflow_pro_sns.json_** file using Upload Configuration on the Settings page of API Autoflow Pro.



### Database

Unfortunately, there's no easy way to just clone the entire database.

You first need to install the database in your computer and follow the instructions below to dump the data to your newly installed database.

Install MySQL:<br/>
https://dev.mysql.com/doc/mysql-installation-excerpt/8.0/en/

Install Workbench:<br/>
https://dev.mysql.com/downloads/workbench/

Import data to data:<br/>
https://dev.mysql.com/doc/workbench/en/wb-admin-export-import-management.html

🚨 IMPORTANT: Use the file **_sns_app.sql_** to import into your database
