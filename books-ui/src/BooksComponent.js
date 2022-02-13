import React, {Component} from 'react';
import {Box, Button, TextInput, List} from 'grommet';
import {CircleInformation} from "grommet-icons";

class BooksComponent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            title: '',
            author: '',
            message: null,
            books: [],
        };
    }

    onChange = e => {
        this.setState({[e.target.name]: e.target.value})
    };

    getBooks = () => {
        const {token, username} = this.props;
        const url_books = 'http://localhost:8092/urest/v1/books?';
        console.log(`sending request: ${url_books}`);
        fetch(url_books + new URLSearchParams({
            username: username
        }),{
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
        }).then(response => response.json())
            .then(data => {
                console.log(`${data.length} books obtained successfully for user: ${username}`);
                this.setState({ books: data });

            }).catch((err)=>{
            console.log(`Error API call: ${err}`);
            alert(error);
        });
    }

    componentDidMount() {
        console.log('componentDidMount');
        this.getBooks();
    }

    onAdd = e => {
        e.preventDefault()
        const {title, author} = this.state;
        const {token, username} = this.props;

        if (title === '' || author === ''){
            this.setState({message: 'Invalid data.'});
        } else {
            const url_book = 'http://localhost:8092/urest/v1/book';
            console.log(`sending request: ${url_book}`);

            fetch(url_book,{
                method:'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    "username": username,
                    "title": title,
                    "author": author
                })
            }).then(response => response.json())
                .then(data => {
                    const api_error = data.error;
                    if(typeof api_error == 'undefined'){
                        console.log("Book successfully added.");
                        this.getBooks();
                    } else {
                        alert(api_error);
                    }
                }).catch((err) => {
                console.log(`Error API call: ${err}`);
                alert(error);
            });
        }
    }

    render() {
        const {books} = this.state;
        console.log(books)
        return(
            <Box className='wishlist' style={{flexDirection: 'row', display: 'flex'}}>
                <Box className='booksForm' style={{padding: '20px'}}>
                    <h2 style={{alignSelf: "center"}}>My Wishlist</h2>
                    <List
                        style={{alignSelf: "center"}}
                        primaryKey="title"
                        secondaryKey="author"
                        data={books}
                    />
                </Box>
                <Box style={{padding: "20px"}}/>
                <Box className='booksForm' style={{paddingTop: '2px'}}>
                    <h2 style={{alignSelf: "center"}}>Add book to wishlist</h2>
                    <Box
                        style={{backgroundColor: "white"}}
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
                        style={{backgroundColor: "white"}}
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
                    {this.state.message && (
                        <Box style={{alignSelf: 'start', flexDirection: 'row', display: 'flex'}}>
                            <CircleInformation className='infoIcon'/>
                            <span
                                style={{color: '#d50000', fontSize: '13px'}}>{this.state.message}</span>
                        </Box>
                    )}
                    <Box className='add' style={{padding: "20px"}}>
                        <Button style={{alignSelf: 'flex-end'}} onClick={this.onAdd}>Add</Button>
                    </Box>
                </Box>
            </Box>
    )
    }
}

export default BooksComponent;
