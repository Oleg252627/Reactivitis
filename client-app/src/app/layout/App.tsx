import React, { useState, useEffect, Fragment } from 'react';
import axios from 'axios';
import {Container} from 'semantic-ui-react';
import { IActivity } from '../models/activity';
import {NavBar} from "../../features/nav/NavBar";
import {ActivityDashboard} from "../../features/activities/dashboard/ActivityDashboard";


const App = () => {
    const [activities, setActivities] = useState<IActivity[]>([]);
    const [selectedActivity, setSelectedActivity] = useState<IActivity | null>(null);
    const [editMode, setEditMode] = useState<boolean>(false);

    const handleSelectedActivity = (id: string) => {
        setSelectedActivity(activities.filter(z => z.id === id)[0])
    }
    const handleOpenCreateForm = () => {
        setSelectedActivity(null)
        setEditMode(true)
    }
    const handleCreateActivity = (activity: IActivity) => {
        setActivities([...activities, activity]);
        setSelectedActivity(activity);
        setEditMode(false);
    }
    const handleEditActivity = (activity: IActivity) => {
        setActivities([...activities.filter(z => z.id !== activity.id), activity]);
        setSelectedActivity(activity);
        setEditMode(false);
    }
    const handleDeleteActivity = (id: string) => {
        setActivities([...activities.filter(z => z.id !== id)]);
        setSelectedActivity(null);
        setEditMode(false);
    }

    useEffect(() => {
        axios.get<IActivity[]>('https://localhost:5001/api/activities')
            .then((response) => {
                let activities: IActivity[] = [];
                response.data.forEach(activity => {
                    activity.date = activity.date.split('.')[0];
                    activities.push(activity);
                })
                setActivities(activities);
            })
    }, [])

    return (
        <Fragment>
            <NavBar openCreateForm={handleOpenCreateForm}/>
            <Container style={{marginTop: '7em'}}>
                <ActivityDashboard activities={activities}
                                   selectActivity={handleSelectedActivity}
                                   selectedActivity={selectedActivity}
                                   editMode={editMode}
                                   setEditMode={setEditMode}
                                   setSelectedActivity={setSelectedActivity}
                                   createActivity={handleCreateActivity}
                                   editActivity={handleEditActivity}
                                   deleteActivity={handleDeleteActivity}
                />
            </Container>
        </Fragment>
    );
}

export default App;
