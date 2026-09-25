import { Router, Route, Set } from '@redwoodjs/router'

import MainLayout from 'src/layouts/MainLayout'

const Routes = () => {
  return (
    <Router>
      <Set wrap={MainLayout}>
        <Route path="/" page={HomePage} name="home" />
        <Route path="/contact" page={ContactPage} name="contact" />
      </Set>
      <Route notfound page={NotFoundPage} />
    </Router>
  )
}

export default Routes
