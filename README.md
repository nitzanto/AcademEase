<!DOCTYPE html>
<html>
<body>
<div align="center">
    <h1>AcademEase - Student and Course Management API</h1>
    <img src="https://i.imgur.com/FAa8Lop.png" alt="Logo" width="600" height="300">
</div>

<h2>Overview</h2>

<p>The Student and Course Management API is a RESTful API built using NestJS for managing student resources,
    including their personal information and the courses they have taken each year. The API uses an SQL database with MySQL to
    store student and course data and provides various endpoints to perform operations on students and courses.</p>

    
<h3>Software Engineering Principles</h3>

<ul>
    <li><strong>SOLID Principles:</strong> The project follows the SOLID principles, ensuring that the codebase is modular, maintainable, and scalable.</li>
    <li><strong>DRY (Don't Repeat Yourself):</strong> The codebase emphasizes the DRY principle by minimizing code duplication. Reusable components and services are employed to avoid redundancy and maintain code consistency.</li>
    <li><strong>Data Validation:</strong> Data validation is implemented at multiple levels of the application to ensure data integrity and security. Input validation is performed on the server-side to prevent invalid data from being processed.</li>
</ul>
<h2>Design</h2>
<h3>Relationship</h3>
    <img src="https://i.imgur.com/ZXxez8S.png" alt="design" ></img>
    <h3>Tables</h3>
    <img src="https://i.imgur.com/eNoe03l.png" alt="design"></img>
<h2>Resources</h2>
<h3>Students Resource</h3>

<ul>
    <li><strong>GET /students</strong>: Retrieve a list of all students' personal information, including
        courses they have taken. You can also filter students by year. (OPTIONAL)</li>
    <li><strong>GET /students/:student_id</strong>: Retrieve specific student's personal information and
        courses they have taken. You can also filter by year. (OPTIONAL)</li>
    <li><strong>POST /students</strong>: Create a new student.</li>
    <li><strong>PUT /students/:student_id</strong>: Update a student's personal information.</li>
    <li><strong>DELETE /students/:student_id</strong>: Delete a student and all related course records.</li>
</ul>

<h3>Courses Resource</h3>

<ul>
    <li><strong>GET /courses</strong>: Retrieve a list of all courses.</li>
    <li><strong>GET /courses/:course_name</strong>: Retrieve information about a specific course.</li>
    <li><strong>POST /courses</strong>: Create a new course for students</li>
    <li><strong>POST /courses/assign/:course_name: </strong>Assign a student or students to a specific course</li>
    <li><strong>PUT /courses/:course_name</strong>: Update course information.</li>
    <li><strong>PUT /courses/unassign/:course_name</strong>: Unassign a student or students from a specific course</li>
    <li><strong>DELETE /courses/:course_name</strong>: Delete a course.</li>
</ul>

<h2>API Paths</h2>

<p>Here are the main API endpoints with examples of how to use them:</p>

<h3>Student Resource</h3>
<ul>
<li><p>Retrieve all students with courses for all years or for a specific year:</p></li>
<pre><code>GET /students (For all years)
GET /students?year=&lt;year&gt; (OPTIONAL, specific year)</code></pre>

<li><p>Retrieve a specific student with courses for all years or for a specific year:</p></li>
<pre><code>GET /students/:student_id (For all years)
GET /students/:student_id?year=&lt;year&gt; (OPTIONAL, specific year)</code></pre>

<li><p><u></u>Create a new student:</p></li>
<pre><code>POST /students</code></pre>
<pre><code>Example request body:
{
    "firstname": "John",
    "lastname": "Doe",
    "address": "123 Main St"
}
</code></pre>

<li><p>Update a student's information:</p></li>
<pre><code>PUT /students/:student_id</code></pre>
<pre><code>
Example request body:
{
    "firstname": "Updated First Name",
    "lastname": "Updated Last Name",
    "address": "Updated Address"
}
</code></pre>

<li><p>Delete a student also his related course records:</p></li>
<pre><code>DELETE /students/:student_id</code></pre>
<br></br>
<h3>Course Resource</h3>
<li><p>Retrieve a list of all courses:</p></li>
<pre><code>GET /courses</code></pre>
 
<li><p>Retrieve information about a specific course:</p></li>
<pre><code>GET /courses/:course_name</code></pre>

<li><p>Create a new course for a student:</p></li>
<pre><code>POST /courses</code></pre>
<pre><code>Example request body:
{
    "course_name": "Mathematics",
    "year": 2023
}</code></pre>



<li><p>Assign students to a course:</p></li>
<pre><code>POST /courses/assign/:course_name</code></pre>
<pre><code>Example request body:
{
    "studentIds": [1 ,2], // number:[] , array of numbers
}</code></pre>


<li><p>Update course information:</p></li>
<pre><code>PUT /courses/:course_name</code></pre>
<pre><code>Example request body:
{
    "course_name": "Updated Course Name",
    "year": 2024
}</code></pre>

<li><p>Unassign students from course</p></li>
<pre><code>PUT /courses/unassign/:course_name</code></pre>
<pre><code>Example request body:
{
    "studentsIds": [4], // This is an array of numbers
}</code></pre>

<li><p>Delete a course and also the records of students assigned to it:</p></li>
<pre><code>DELETE /courses/:course_name</code></pre>
</ul>
<h2>Installation</h2>

<p>Please make sure you have the following installed:</p>
<ul>
    <li>Docker Desktop to run the container of MySQL DB</li>
    <li>Node JS ver 18+</li>
    <li>MySQL Workbench, DBeaver etc.. for viewing the DB in real-time</li>
    <li>Postman, Insomnia etc.. for API Testing</li>
</ul>
<p>To run this project locally, follow these steps:</p>

<ol>
    <li>Clone the repository from Github:</li>
    <li>Navigate to the project directory:</li>
    <pre><code>cd your-repository</code></pre>
    <li>Install the project dependencies:</li>
    <pre><code>npm install
npm i nest</code></pre>
   <p><strong>*** Make sure to have 2 terminals running: One for the container and a second one for running the application</strong></p>
    <li>Run the DB container with docker-compose in another terminal (Docker Desktop must be turned on)</li>
    <pre><code>docker-compose up</code></pre>
    <li>Connect to the DB through MySQL WorkBench or any other application and then fill in the credentials found at
        the .env file</li>
    <li>Run the migration command to generate the tables in DB:</li>
    <pre><code>npm run typeorm:run-migrations</code></pre>
    <li>Run the application after connecting to the DB & running migrations:</li>
    <pre><code>npm run start:prod</code></pre>
</ol>

<p>After running the migration the tables are generated and will be visible at MySQL WorkBench</p>
<p>The API should now be running locally and accessible at <a href="http://localhost:3000">http://localhost:3000</a>.
</p>
<p>You may test the API with Postman, Insomnia and look at the changes at real time with MySQL Workbench or any other
    application</p>
</body>
</html>
