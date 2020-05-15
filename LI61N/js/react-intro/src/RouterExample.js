import React from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams,
  useRouteMatch
} from 'react-router-dom'

const projects = [
  { id: '1', name: 'Project 1', issues: ['1', '2'] },
  { id: '2', name: 'Project 2', issues: ['3', '4'] },
  { id: '3', name: 'Project 3', issues: ['5', '6'] }
]

const issues = [
  { id: '1', name: 'issue 1' },
  { id: '2', name: 'issue 2' },
  { id: '3', name: 'issue 3' },
  { id: '4', name: 'issue 4' },
  { id: '5', name: 'issue 5' },
  { id: '6', name: 'issue 6' }
]

export default () => (
  <div>
    <Router>
      <ul>
        <li><Link to='/'>Home</Link></li>
        <li><Link to='/projects'>Projects</Link></li>
      </ul>

      <Switch>
        <Route path='/projects'><Projects /></Route>
        <Route path='/'><h1>Home</h1></Route>
      </Switch>
    </Router>
  </div>
)

function Projects () {
  const { path, url } = useRouteMatch()
  console.log('Projects')
  console.log(path)
  console.log(url)
  return (
    <div>
      <Route path={`${path}/:pid`}><Project /></Route>
      <Route path={`${path}`} exact>
        <h1>Projects</h1>
        <ul>
          {projects.map(prj => <li key={prj.id}><Link to={`${url}/${prj.id}`}>{prj.name}</Link></li>)}
        </ul>
      </Route>
    </div>
  )
}

function Project () {
  const { pid } = useParams()
  const { path, url } = useRouteMatch()
  console.log('Project')
  console.log(path)
  console.log(url)
  const prj = projects.filter(it => it.id === pid)[0]
  return prj ? (
    <Switch>
      <Route path={`${path}/issues/:iid`}><Issue /></Route>
      <Route path={`${path}`}>
        <h2>Project</h2>
        <p>Name: {prj.name}</p>
        Issues:
        <ul>
          {prj.issues.map(issueId => <li key={issueId}><Link to={`${url}/issues/${issueId}`}>{issueId}</Link></li>)}
        </ul>
      </Route>
    </Switch>
  ) : (
    <h2>Project not found</h2>
  )
}

function Issue () {
  const { iid, pid } = useParams()
  const issue = issues.filter(it => it.id === iid)[0]
  const proj = projects.filter(it => it.id === pid)[0]
  return (
    proj && issue && proj.issues.some(it => it === iid) ? (
      <div>
        <h3>Issue</h3>
        <p>Project: <Link to={`/projects/${proj.id}`}>{proj.name}</Link></p>
        <p>Name: {issue.name}</p>
      </div>
    ) : (
      <p>Issue not found</p>
    )
  )
}
