import * as React from "react";
import * as ReactDOM from "react-dom";

import {Popup, Icon, Grid, Input, List, Button} from "semantic-ui-react";

import { Named } from "../model/named";
import { Tags } from "../model/tags";
import { nameAndTagsDefaultFilter } from "../model/entity";

interface NamedOptionallyTagged extends Named{
    tags?:Tags
}

interface NamedPickerProps<T extends NamedOptionallyTagged> {
    values: Array<T>
    onSelect: (entity: T) => void
    filter?:(val:T, filter:string)=>boolean
    iconProps?:{[key:string]:any}
}

interface NamedPickerState {
    filter: string
}

export class NamedPicker<T extends Named> extends React.Component<NamedPickerProps<T>, NamedPickerState> {
    constructor(props: NamedPickerProps<T>) {
        super(props)
        this.state = {
            filter: ''
        }
    }
    onFilterChange(value:string) {
        this.setState({filter:value})
    }
    render() {
        let lst = this.props.values.filter(
            (val:T)=>this.props.filter ? 
                this.props.filter(val, this.state.filter) : 
                nameAndTagsDefaultFilter(val, this.state.filter))
        let iconProps : {[key:string]:any} = { name:'add', ...this.props.iconProps}
        return (
            <Popup
                trigger={<Icon {...iconProps} />}
                hoverable
                position={'bottom left'}
                size={'large'}
            >
                <Grid centered columns={1}>
                    <Grid.Row key="search">
                        <Input onChange={(e, {value}) => this.onFilterChange(value)} placeholder="Search..." />
                    </Grid.Row>
                    <Grid.Row key="list">
                        <List>
                            {
                                lst.map(
                                    (item, index) => <List.Item key={index}>
                                        <Button onClick={() => this.props.onSelect(item)}>{item.name}</Button>
                                    </List.Item>
                                )
                            }
                        </List>
                    </Grid.Row>
                </Grid>
            </Popup>
        )
    }
}