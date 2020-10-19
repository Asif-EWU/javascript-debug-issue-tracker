document.getElementById('issueInputForm').addEventListener('submit', submitIssue);

function submitIssue(e) {
  const getInputValue = id => document.getElementById(id).value;
  const description = getInputValue('issueDescription');
  const severity = getInputValue('issueSeverity');
  const assignedTo = getInputValue('issueAssignedTo');
  const id = Math.floor(Math.random()*100000000) + '';
  const status = 'Open';

  const issue = { id, description, severity, assignedTo, status };
  let issues = [];
  if (localStorage.getItem('issues')){
    issues = JSON.parse(localStorage.getItem('issues'));
  }
  issues.push(issue);
  localStorage.setItem('issues', JSON.stringify(issues));

  document.getElementById('issueInputForm').reset();
  fetchIssues();
  e.preventDefault();
}

//// PROBLEM IS DESCRIBED AT THE BOTTOM OF THIS FILE
//// PROBLEM IS DESCRIBED AT THE BOTTOM OF THIS FILE
//// PROBLEM IS DESCRIBED AT THE BOTTOM OF THIS FILE
//// PROBLEM IS DESCRIBED AT THE BOTTOM OF THIS FILE
//// PROBLEM IS DESCRIBED AT THE BOTTOM OF THIS FILE
//// PROBLEM IS DESCRIBED AT THE BOTTOM OF THIS FILE
//// PROBLEM IS DESCRIBED AT THE BOTTOM OF THIS FILE 


const closeIssue = id => {
  const issues = JSON.parse(localStorage.getItem('issues'));
  const currentIssue = issues.find(issue => issue.id == id);
  currentIssue.status = 'Closed';
  localStorage.setItem('issues', JSON.stringify(issues));
  fetchIssues();
}

const deleteIssue = id => {
  const issues = JSON.parse(localStorage.getItem('issues'));
  const remainingIssues = issues.filter( issue => issue.id != id );
  localStorage.setItem('issues', JSON.stringify(remainingIssues));
  fetchIssues();
}

const fetchIssues = () => {
  if(!localStorage.getItem('issues')) return;
  const issues = JSON.parse(localStorage.getItem('issues'));
  const issuesList = document.getElementById('issuesList');
  issuesList.innerHTML = '';

  for (var i = 0; i < issues.length; i++) {
    const {id, description, severity, assignedTo, status} = issues[i];

    issuesList.innerHTML += `<div class="well">
                            <h6>Issue ID: ${id} </h6>
                            <p><span class="label label-info"> ${status} </span></p>
                            <h3> ${description} </h3>
                            <p><span class="glyphicon glyphicon-time"></span> ${severity}</p>
                            <p><span class="glyphicon glyphicon-user"></span> ${assignedTo}</p>
                            <a href="#" onclick="closeIssue(${id})" class="btn btn-warning">Close</a>
                            <a href="#" onclick="deleteIssue(${id})" class="btn btn-danger">Delete</a>
                            </div>`;
  }
}


/// Problem ta ashole localStorage e na. 
/// problem ta hoitase array.find() e
/// nicher code tar output dekhlei bujhte parben.
/// but evabe keno kaj kore. system ta ki? net e paitasi na. 
/// eitar details dewa ase emon kono article paile kindly share korben

const x = {name: 'x', age: 1};
const y = {name: 'y', age: 2};
const z = [];
z.push(x);
z.push(y);

const a = z.find(item => item.age === 2);
console.log(z);
console.log(a);

a.name = 'y1';

console.log(z);
console.log(a);