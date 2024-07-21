# Job Board
<div align="center">
<img width="30%" src="https://github.com/mahmoudhaney/Jobs/assets/83553963/b6d3c7b7-1f2f-4981-8c1b-5552eb0546cc">
</div>

# Introduction
Whether you're just starting out in your career, looking for a change, or trying to advance to the next level, we have thousands of jobs to choose from in various industries and locations.
Our easy-to-use search tools make finding jobs matching your skills and interests simple. And with our advanced filtering options, you can narrow down your search results to find the perfect job for you.
Once you've found a few jobs you're interested in, you can easily apply online or contact the employer directly. We also offer a variety of resources to help you prepare for your job search, including resume and cover letter writing tips, interview advice, and more.

# Features
## For users :
- Search Jobs: Users should be able to search for jobs by title, company, location, or keyword.
- Filter Jobs: Allow users to filter jobs by job type, salary range, experience level, and other criteria to narrow down their search results.
- Apply for Jobs: The app should enable users to apply for jobs directly through the app with a single click, streamlining the application process.
- job detatils: Provide job page with all informations about it.
- Resume Management: The app should allow users to upload and manage their resumes within the app. This makes it easy to apply for jobs quickly and easily.
- Manage Profile :Create and update their profile information (such as name, skills, and experience)

## For Admins :
- Job Posting: Employers should be able to post jobs directly through the app, including a detailed job description, qualifications, and benefits.
- Applicant Tracking: The app should provide an applicant tracking system (ATS) that allows employers to manage applications, track the status of candidates, and schedule interviews      
- Candidate Search: Allow employers to search for qualified candidates in the app's database based on skills and experience.
- Manage Users :Suspend or activate user accounts
- Manage Jobs : Post new jobs ,Edit existing jobs ,Delete jobs
- Manage Categories :Create new job categories ,Edit existing categories ,Delete categories
- View Reports : View the number of users and jobs on the platform and See applications for each job
- 
# To install the application's dependencies   
       npm install 
# To run and excute the application 
       npm start  
       node server.js
# Features in the future
- Save Jobs: Users can save jobs to their account for later viewing, allowing them to come back to interesting opportunities.
- Job Alerts: Users can set up job alerts to be notified when new jobs matching their criteria are posted. This keeps them updated on relevant opportunities.

# Database
## users

| Column Name | SQL Type |
| ---| ---|
| gender | ENUM('male', 'female', 'other') |
| role | ENUM('Admin', 'User', 'Owner') |
| id | int AUTO_INCREMENT PRIMARY KEY |
| name | VARCHAR(50) NOT NULL |
| email | VARCHAR(50) NOT NULL UNIQUE |
| password | VARCHAR(255) NOT NULL |
| address | VARCHAR(255) |
| education | VARCHAR(255) |
| job_title | VARCHAR(100) |
| image | LONGBLOB |
| age | INT |
| phone_number | VARCHAR(20) |

## jobs
| Column Name | SQL Type |
| ---| ---|
| id | int AUTO_INCREMENT PRIMARY KEY |
| title | VARCHAR(100) NOT NULL |
| owner | VARCHAR(255) |
| job_type | ENUM('Full Time', 'Part Time', 'Contract', 'Freelance', 'Internship') |
| experience | int NOT NULL |
| location | VARCHAR(255) |
| image | varchar(255) |
| published_on | DATETIME DEFAULT CURRENT_TIMESTAMP |
| deadline | DATETIME NOT NULL |
| qualifications | VARCHAR(255) |
| responsibility | VARCHAR(255) |
| vacancy | INT DEFAULT 1, salary DOUBLE |
| category_id | INT NOT NULL |
| FOREIGN KEY(category_id) | REFERENCES categories(id) |

** Foreign Key:**
* `category_id`(assuming this column exists) references the `id` column in the`categories` table(foreign key constraint named`category_id`).
** Note:**
* Ensure you have a `categories` table with a`title` column before using this foreign key constraint.

 ## jobapplications
| Column Name | SQL Type |
| ---| ---|
| id | INT AUTO_INCREMENT PRIMARY KEY |
| status | ENUM('pending', 'rejected', 'accepted') DEFAULT 'pending' |
| userID | INT NOT NULL |
| jobID | INT NOT NULL |
| cv_link | TEXT NOT NULL |
| portfolio | VARCHAR(255) |
| appliedOn | DATETIME DEFAULT CURRENT_TIMESTAMP |
| FOREIGN KEY(userID) | REFERENCES users(id) |
| FOREIGN KEY(jobID) | REFERENCES jobs(id) |


## company_info
| Column Name | SQL Type |
| ---| ---|
| id | int AUTO_INCREMENT PRIMARY KEY |
| name | VARCHAR(255) NOT NULL |
| website | VARCHAR(255) |
| logo | BLOB |
| description | TEXT |
| location | VARCHAR(255) |
| industry | VARCHAR(255) |
| owner_user_id | INT |
| FOREIGN KEY(owner_user_id) | REFERENCES users(id)



## categories
| Column Name | SQL Type |
| ---| ---|
| id | int AUTO_INCREMENT PRIMARY KEY |
| title | VARCHAR(70) UNIQUE NOT NULL |
| image | varchar(255) |
| description | TEXT |

## Demo 
General
![image](https://github.com/user-attachments/assets/68bce6c7-5d61-4755-abe0-13d9c600c6fe)
User
![image](https://github.com/user-attachments/assets/3523d1e2-e4ef-41d6-aa02-efdefdad6926)
![image](https://github.com/user-attachments/assets/03d8412e-999f-44b8-a1cc-10de2cda9fe9)
![image](https://github.com/user-attachments/assets/c50d4f8a-9aee-4039-bed0-0028c8f60e7e)
Admin 
![image](https://github.com/user-attachments/assets/a556b5f4-13be-4516-818b-aa0564060a82)
![image](https://github.com/user-attachments/assets/387c0cd4-55b2-42aa-8688-b3e9cea2b346)
![image](https://github.com/user-attachments/assets/d79ef16f-4737-44b2-ab10-1a0ab74a0a50)





