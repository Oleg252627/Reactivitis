import React, { useEffect, Fragment, useContext} from 'react';
import {Container} from 'semantic-ui-react';
import NavBar from "../../features/nav/NavBar";
import ActivityDashboard from "../../features/activities/dashboard/ActivityDashboard";
import {LoadingComponent} from "./LoadingComponent";
import ActivityStore from '../stores/activityStore';
import {observer} from 'mobx-react-lite';


const App = () => {
    const activityStore = useContext(ActivityStore)
    // const [activities, setActivities] = useState<IActivity[]>([]);
    // const [selectedActivity, setSelectedActivity] = useState<IActivity | null>(null);
    // const [editMode, setEditMode] = useState<boolean>(false);
    // const [submitting, setSubmitting] = useState<boolean>(false);
    // const [target, setTarget] = useState<string>('');


    // const handleEditActivity = (activity: IActivity) => {
    //     setSubmitting(true);
    //     agent.Activities.update(activity).then(() => {
    //         setActivities([...activities.filter(z => z.id !== activity.id), activity]);
    //         setSelectedActivity(activity);
    //         setEditMode(false);
    //     }).then(() => setSubmitting(false))
    // }
    // const handleDeleteActivity = (event: SyntheticEvent<HTMLButtonElement>, id: string) => {
    //     setSubmitting(true);
    //     setTarget(event.currentTarget.name);
    //     agent.Activities.delete(id).then(() => {
    //         setActivities([...activities.filter(z => z.id !== id)]);
    //         setSelectedActivity(null);
    //         setEditMode(false);
    //     }).then(() => setSubmitting(false))
    // }

    useEffect(() => {
        activityStore.loadActivities();
    }, [activityStore])

    if (activityStore.loadingInitial) return <LoadingComponent content={"Loading activity..."} />

    return (
        <Fragment>
            <NavBar/>
            <Container style={{marginTop: '7em'}}>
                <ActivityDashboard/>
            </Container>
        </Fragment>
    );
}

export default observer(App);
