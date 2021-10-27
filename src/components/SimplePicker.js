import React, { Component } from 'react'
import { Picker } from '@react-native-picker/picker';

export class SimplePickerItem{
    constructor(label, value){
        this.label = label
        this.value = value
    }
}

export default class SimplePicker extends Component{
    constructor(props){
        super(props)
        this.values = props.values
        this.onChange = props.onChange ? props.onChange : (_a, _b)=>{}
        this.state = {
            value: props.initialValue ? props.initialValue : this.values[0].value
        }
    }
    render(){
        return <Picker
            selectedValue={this.state.value}
            onValueChange={itemValue => {
                const oldValue = this.state.value
                this.setState({ value: itemValue })
                this.onChange(itemValue, oldValue)
            }}>
            {this.values.map((i, index) => (
                <Picker.Item key={index} label={i.label} value={i.value}  />
            ))}
        </Picker>
    }
}
