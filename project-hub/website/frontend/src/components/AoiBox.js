import React, { Component } from 'react';
import Select from 'react-select';

const options = [
  { value: 'science', label: 'Science' },
  { value: 'math', label: 'Math' },
  { value: 'engineering', label: 'Engineering' },
  { value: 'arts', label:'Arts'}
]
export default class AoiBox extends Component{

	render(){
		return(
			<Select
          options={options} 
          isMulti
          onChange={ this.props.onChange } 
      />
			);
	}

}