import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Route, Switch } from 'react-router-dom'
import { Loader, Header } from 'semantic-ui-react'

import { projectsLoading, loadProject, unloadProject, getProject } from 'redux/rootReducer'
import ProjectPageUI from './components/ProjectPageUI'


// TODO shared 404 component
const Error404 = () => (<Header size="huge" textAlign="center">Error 404: Page Not Found</Header>)

// <EditFamilyInfoModal />
// <EditIndividualInfoModal />


class Project extends React.Component
{
  static propTypes = {
    project: PropTypes.object,
    match: PropTypes.object,
    loading: PropTypes.bool.isRequired,
    loadProject: PropTypes.func.isRequired,
    unloadProject: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props)

    props.loadProject(props.match.params.projectGuid)
  }

  componentWillUnmount() {
    this.props.unloadProject()
  }

  render() {
    if (this.props.project) {
      return (
        <Switch>
          <Route path={`${this.props.match.url}/project_page`} component={ProjectPageUI} />
          <Route component={() => <Error404 />} />
        </Switch>
      )
    } else if (this.props.loading) {
      return <Loader inline="centered" active />
    }
    return <Error404 />
  }
}

const mapDispatchToProps = {
  loadProject, unloadProject,
}

const mapStateToProps = state => ({
  project: getProject(state),
  loading: projectsLoading(state),
})

export default connect(mapStateToProps, mapDispatchToProps)(Project)
