import React from 'react'
import { Router, Route, browserHistory } from 'react-router'


import Search from './Search'
import SearchResults from './search_results'

const Routes = () => {
  return (
    <Router history={browserHistory}>
      <Route path='/' component={Search} />
      <Route path='/search/:query' component={SearchResults} />
    </Router>
  )
}
export default Routes
