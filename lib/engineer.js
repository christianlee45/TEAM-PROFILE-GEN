const Employee = require('./Employee');

class Engineer extends Employee {   
    constructor(name, id, email, github)
    {
        super(name, id, email);
        this.github = github;
    }
    getGithub()
    {
        return this.github;
    }
    getRole()
    {
        return "Engineer"
    }
    getRoleHtml()
    {
        return `<li>Github: <a href="https://github.com/${this.getGithub()}">${this.getGithub()}</a></li>`
    }
}

module.exports = Engineer;