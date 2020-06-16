import React, { FormEvent, useContext, useState, useEffect } from 'react'
import { Button, Form, Segment, Grid } from "semantic-ui-react";
import { IActivity } from "../../../app/models/activity";
import { v4 as uuid } from 'uuid';
import ActivityStore from "../../../app/stores/activityStore";
import { observer } from 'mobx-react-lite';
import { RouteComponentProps } from 'react-router-dom';

interface DetailsParam {
    id: string;
}

const ActivityForm: React.FC<RouteComponentProps<DetailsParam>> = ({ match, history }) => {
    const activityStore = useContext(ActivityStore);
    const { createActivity, editActivity, submitting, activity: initialFormState, loadActivity, clierActivity } = activityStore;

    // const initialForm = () => {
    //     if (initialFormState) {
    //         return initialFormState;
    //     } else {
    //         return {
    //             id: '',
    //             title: '',
    //             description: '',
    //             category: '',
    //             date: '',
    //             city: '',
    //             venue: ''
    //         }
    //     }
    // }
    const [activity, setActivity] = useState<IActivity>({
        id: '',
        title: '',
        description: '',
        category: '',
        date: '',
        city: '',
        venue: ''
    });

    useEffect(() => {
        if (match.params.id && activity.id.length === 0) {
            loadActivity(match.params.id).then(() => initialFormState && setActivity(initialFormState))
        }
        return () => {
            clierActivity();
        }
    }, [loadActivity, clierActivity, match.params.id, initialFormState, activity.id.length])

    const handleInputChange = (event: FormEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = event.currentTarget;
        setActivity({ ...activity, [name]: value })
    }
    const handleSubmit = async () => {
        if (activity.id.length === 0) {
            let newActivity = {
                ...activity, id: uuid()
            }
            await createActivity(newActivity).then(() => history.push(`/activities/${activity.id}`));
        } else {
            editActivity(activity).then(() => history.push(`/activities/${activity.id}`));
        }
    }
    return (
        <Grid>
            <Grid.Column width={10}>
                <Segment clearing={true}>
                    <Form onSubmit={handleSubmit}>
                        <Form.Input onChange={handleInputChange} placeholder={"Title"} name={"title"} value={activity.title} />
                        <Form.TextArea rows={2} onChange={handleInputChange} placeholder={"Description"} name={"description"} value={activity.description} />
                        <Form.Input onChange={handleInputChange} placeholder={"Category"} name={"category"} value={activity.category} />
                        <Form.Input onChange={handleInputChange} type={"datetime-local"} placeholder={"Date"} name={"date"} value={activity.date} />
                        <Form.Input onChange={handleInputChange} placeholder={"City"} name={"city"} value={activity.city} />
                        <Form.Input onChange={handleInputChange} placeholder={"Venue"} name={"venue"} value={activity.venue} />
                        <Button loading={submitting} positive floated={"right"} type='submit' content={"Submit"} />
                        <Button onClick={() => history.push('/activities')} floated={"right"} type='button' content={"Cancel"} />
                    </Form>
                </Segment>
            </Grid.Column>
        </Grid>

    )
};
export default observer(ActivityForm);
