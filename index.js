const Manager = require("./lib/manager");
const Engineer = require("./lib/engineer");
const Intern = require("./lib/intern");
const inquirer = require("inquirer");


const fs = require("fs");



const generatedHtmlFilePath = './output/team.html'
let teamMembers = [];


inquirer
  .prompt([
    
      {
        name:"managerName",
        type:"input",
        message:"Enter team manager's name",
      },
      {
        name:"managerID",
        type:"input",
        message:"Enter team manager's employee ID",
      },
      {
        name:"managerEmail",
        type:"input",
        message:"Enter team manager's email",
      },
      {
        name:"managerOfficeNumber",
        type:"input",
        message:"Enter team manager's office number",
      },
      {
          name:"additionalTeamMember",
          type:"list",
          message: "Select team members to add",
          choices:["Engineer", "Intern"]
      },
  ])
  .then(answers => {
    
    let manager = new Manager(answers.managerName, answers.managerID, answers.managerEmail, answers.managerOfficeNumber);
    
    teamMembers.push(manager);
    
    evaluateAdditionalTeamMemberResult(answers.additionalTeamMember);
  })
  .catch(error => {
      
    if(error.isTtyError) {
      
    } else {
      
    }
  });


function addEngineer()
{
inquirer
.prompt([

    {
        name:"engineerName",
        type:"input",
        message:"Enter engineer's name",
    },
    {
        name:"engineerID",
        type:"input",
        message:"Enter engineer's employee ID",
    },
    {
        name:"engineerEmail",
        type:"input",
        message:"Enter engineer's email",
    },
    {
        name:"engineerGithub",
        type:"input",
        message:"Enter engineer's github username",
    },
    {
        name:"additionalTeamMember",
        type:"list",
        message: "Select team members to add",
        choices:["Engineer", "Intern", "Exit"]
    },
])
.then(answers => {
    
    let engineer = new Engineer(answers.engineerName, answers.engineerID, answers.engineerEmail, answers.engineerGithub);
    teamMembers.push(engineer);
    
    evaluateAdditionalTeamMemberResult(answers.additionalTeamMember);
})
.catch(error => {
    
    if(error.isTtyError) {
  
    } else {
 
    }
});
}


function addIntern()
{
inquirer
.prompt([
    
    {
        name:"internName",
        type:"input",
        message:"Enter intern's name",
    },
    {
        name:"internID",
        type:"input",
        message:"Enter intern's employee ID",
    },
    {
        name:"internEmail",
        type:"input",
        message:"Enter intern's email",
    },
    {
        name:"internSchool",
        type:"input",
        message:"Enter intern's school",
    },
    {
        name:"additionalTeamMember",
        type:"list",
        message: "Select team members to add",
        choices:["Engineer", "Intern", "Exit"]
    },
])
.then(answers => {
    
    let intern = new Intern(answers.internName, answers.internID, answers.internEmail, answers.internSchool);
    //add to global array
    teamMembers.push(intern);
    //evaluate additional team member
    evaluateAdditionalTeamMemberResult(answers.additionalTeamMember);

})
.catch(error => {
    if(error.isTtyError) {
   
    } else {
   
    }
});
}

function evaluateAdditionalTeamMemberResult(result)
{  if(result === "Engineer")
    {
        
        addEngineer();
    }else if(result === "Intern")
    {
        
        addIntern();
    }else
    {
        
        generateHTML();
    }
}

function generateInitialHTML()
{
    return `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Team Profile</title>
        <link rel="stylesheet" href="./teamProfile.css">
    </head>
    <body>
        <div class="teamNavBar">
            <h1 class="navBarTitle">My Team</h2>
        </div>
        <div class="cardBody">`
}

function generateTeamMemberHtml(teamMember)
{
    return `        <div class="teamMemberCard">
    <div class="teamMemberTitle">
        <h3>${teamMember.getName()} - ${teamMember.getRole()}</h3>
    </div>
    <div class="teamMemberBody">
        <ul>
            <li>ID:${teamMember.getId()}</li>
            <li>Email: <a href="mailto:${teamMember.getEmail()}">${teamMember.getEmail()}</a></li>
            ${teamMember.getRoleHtml()}
        </ul>
    </div>
</div>`;
}

function generateFinalHtml()
{
    return `    </div>
    </body>
    </html>`;
}


function generateHTML()
{
    
    fs.writeFileSync(generatedHtmlFilePath,"");
    let htmlData = generateInitialHTML();
    
    for(var a in teamMembers)
    {
        htmlData += generateTeamMemberHtml(teamMembers[a]);
    }
    
    htmlData += generateFinalHtml();
 
    fs.writeFileSync(generatedHtmlFilePath,htmlData);
}