import React, {useContext, useEffect} from 'react'
import {Button, ButtonGroup, Card, Image, Grid, GridColumn} from 'semantic-ui-react'
import ActivityStore from "../../../app/stores/activityStore";
import {observer} from "mobx-react-lite";
import { RouteComponentProps, Link } from 'react-router-dom';
import { LoadingComponent } from '../../../app/layout/LoadingComponent';

interface DetailsParametr {
    id: string
}

const ActivityDetails: React.FC<RouteComponentProps<DetailsParametr>> = ({match, history}) => {
    const activityStore = useContext(ActivityStore);
    const {activity,  loadActivity, loadingInitial} = activityStore;

    useEffect(() => {
        loadActivity(match.params.id);
    }, [loadActivity, match.params.id])

    if (loadingInitial || !activity) return <LoadingComponent content='Loading activity...' />

    return (
        <Grid>
            <GridColumn width={4}></GridColumn>
            <GridColumn width={8}>
            <Card fluid>
            <Image src={`/assets/categoryImages/${activity!.category}.jpg`} wrapped ui={false} />
            <Card.Content>
                <Card.Header>{activity!.title}</Card.Header>
                <Card.Meta>
                    <span>{activity!.date}</span>
                </Card.Meta>
                <Card.Description>
                    {activity!.description}
                </Card.Description>
            </Card.Content>
            <Card.Content extra>
                <ButtonGroup widths={2}>
                    <Button basic color={"blue"} content={"Edit"} as={Link} to={`/menage/${activity.id}`} />
                    <Button onClick={() => history.push('/activities')} basic color={"grey"} content={"Cancel"} />
                </ButtonGroup>
            </Card.Content>
        </Card>
            </GridColumn>
            <GridColumn width={4}></GridColumn>
        </Grid>
    )
};
export default observer(ActivityDetails);

