import React, {FormEvent, useState} from 'react'
import {Button, Form, Segment} from "semantic-ui-react";
import {IActivity} from "../../../app/models/activity";
import {v4 as uuid} from 'uuid';

interface IProps {
    setEditMode: (editMode: boolean) => void;
    activity: IActivity;
    createActivity: (activity: IActivity) => void;
    editActivity: (activity: IActivity) => void;
}
export const ActivityForm: React.FC<IProps> = ({setEditMode, activity: activityForm, createActivity, editActivity}) => {
    const initialForm = () => {
        if (activityForm) {
            return activityForm;
        } else {
            return {
                id: '',
                title: '',
                description: '',
                category: '',
                date: '',
                city: '',
                venue: ''
            }
        }
    }
    const [activity, setActivity] = useState<IActivity>(initialForm);
    const handleInputChange = (event: FormEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const {name, value} = event.currentTarget;
        setActivity({...activity, [name]: value})
    }
    const handleSubmit = () => {
        if (activity.id.length === 0) {
            let newActivity = {
                ...activity, id: uuid()
            }
            createActivity(newActivity);
        } else {
            editActivity(activity);
        }
    }
    return (
        <Segment clearing={true}>
            <Form onSubmit={handleSubmit}>
                <Form.Input onChange={handleInputChange} placeholder={"Title"} name={"title"} value={activity.title} />
                <Form.TextArea rows={2} onChange={handleInputChange} placeholder={"Description"} name={"description"} value={activity.description}/>
                <Form.Input onChange={handleInputChange}  placeholder={"Category"} name={"category"} value={activity.category}/>
                <Form.Input onChange={handleInputChange}  type={"datetime-local"} placeholder={"Date"} name={"date"} value={activity.date}/>
                <Form.Input onChange={handleInputChange}  placeholder={"City"} name={"city"} value={activity.city}/>
                <Form.Input onChange={handleInputChange}  placeholder={"Venue"} name={"venue"} value={activity.venue}/>
                <Button positive floated={"right"} type='submit' content={"Submit"} />
                <Button onClick={() => {setEditMode(false)}} floated={"right"} type='button' content={"Cancel"} />
            </Form>
        </Segment>
    )
}
