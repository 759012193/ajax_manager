import React from 'react'
import {Switch, Route} from 'react-router-dom'

import ActivitiesList from './pages/activities-list'
import ActivitiesAdd from './pages/activities-add'
import ActivitiesEdit from './pages/activities-edit'
import NotFound from './../notFound/NotFound'

export default class Activity extends React.Component{
    render() {
        return (
            <Switch>
                <Route path={"/activities/add-activities"} component={ActivitiesAdd}/>
                <Route path={"/activities/edit-activities"} component={ActivitiesEdit}/>
                <Route path={"/activities"} component={ActivitiesList}/>
                <Route component={NotFound}/>
            </Switch>
        )
    }
}
