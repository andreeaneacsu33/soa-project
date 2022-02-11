import React, {Component} from 'react';
import {Box, TextInput} from 'grommet';

class BooksComponent extends Component {

    onChange = e => {
        this.setState({[e.target.name]: e.target.value})
    };

    render() {
        return(
            <Box className='booksForm' style={{paddingTop: '2px'}}>
                <Box
                    className='emailBox'
                    direction="row"
                    margin="small"
                    round="xsmall"
                    border
                >
                    <TextInput
                        className='input'
                        name='title'
                        id='title'
                        plain
                        placeholder='Title'
                        type='text'
                        onChange={this.onChange}
                    />
                </Box>
                <Box
                    className='emailBox'
                    direction="row"
                    margin="small"
                    round="xsmall"
                    border
                >
                    <TextInput
                        className='input'
                        name='author'
                        id='author'
                        plain
                        placeholder='Author'
                        type='text'
                        onChange={this.onChange}
                    />
                </Box>
            </Box>
    )
    }
}

export default BooksComponent;
