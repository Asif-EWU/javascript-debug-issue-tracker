document.getElementById('issueInputForm').addEventListener('submit', submitIssue);

// issue id must be unique
function isValid(id) {
  if(!localStorage.getItem('issues')) return true;

  const issues = JSON.parse(localStorage.getItem('issues'));
  if(issues.find( issue => issue.id == id )) return false;

  return true;
}

function submitIssue(e) {
  const getInputValue = id => document.getElementById(id).value;
  const description = getInputValue('issueDescription');
  const severity = getInputValue('issueSeverity');
  const assignedTo = getInputValue('issueAssignedTo');
  const status = 'Open';
  let id;

  while(true) {
    id = Math.floor(Math.random()*1000000) + '';
    if(isValid(id)) break;
  }

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

const setElement = (id, content) => {
  document.getElementById(id).innerText = content;
}

const fetchIssues = () => {
  if(!localStorage.getItem('issues')) return;
  const issues = JSON.parse(localStorage.getItem('issues'));
  const closedIssueList = issues.filter( issue => issue.status == 'Closed' );
  
  setElement( 'active-issue', issues.length - closedIssueList.length );
  setElement( 'total-issue', issues.length );  
  
  const issuesList = document.getElementById('issuesList');
  issuesList.innerHTML = '';

  for (var i = 0; i < issues.length; i++) {
    const {id, description, severity, assignedTo, status} = issues[i];
    const divId = 'id' + id;

    issuesList.innerHTML += `<div id="${divId}" class="well">
                            <h6>Issue ID: ${id} </h6>
                            <p><span class="label label-info"> ${status} </span></p>
                            <h3 class="description"> ${description} </h3>
                            <p><span class="glyphicon glyphicon-time"></span> ${severity}</p>
                            <p><span class="glyphicon glyphicon-user"></span> ${assignedTo}</p>
                            <button onclick="closeIssue(${id})" class="close-button btn btn-warning">Close</button>
                            <button onclick="deleteIssue(${id})" class="btn btn-danger">Delete</button>
                            </div>`;
  }

  closedIssueList.forEach(item => {
    const divId = '#id' + item.id;
    document.querySelector(`${divId} .description`).style.textDecoration = 'line-through';
    document.querySelector(`${divId} .close-button`).disabled = true;
  });
}

