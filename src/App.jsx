import React ,{Component} from 'react';
import './App.css';
import { FormGroup, FormControl, InputGroup} from 'react-bootstrap';
import { BsSearch } from "react-icons/bs";
import Profile from './Profile';
import Gallery from './Gallery';

class App extends Component{
    constructor(props){
        super(props);
        this.state ={
            query:'',
            artist: null,
            tracks:[]
        }
    }

    search() {
        console.log('this.state', this.state);
        const BASE_URL = 'https://api.spotify.com/v1/search?';
        let FETCH_URL = `${BASE_URL}q=${this.state.query}&type=artist&limit=1`;
        const ALBUM_URL = 'https://api.spotify.com/v1/artists/';
        var accessToken = 'BQBBIYVOUqt9kXf9AEPcglp1PbYBlnKSe7sNOu4pq-BAQ15RqPAkRFY-5nNjF8Z5BM2s5Etrt03ZXu7nrx7t8LeKhnd0EOekDRwsxqO0lJ_KPZFaeyfYVdHRtdGTuZlChUcGeF9GcCNWT1B8gmaMtw3NWvDJVuQpUhs0QjWdh-TZIGXrJQ&refresh_token=AQC-kqFaXVirguJj7VRjw8jhILT3Jg45vltR-oIKt78VIFseq9oDJIyig2-T-7ZkL3EJ209ovIW4xe7d0OLfFpApzwtftpKN0pWj9V1yAJZyIuZSMRsElTQzWqcyysomOHc'
        
        var myOptions = {
            method: 'GET',
            headers: {
              'Authorization': 'Bearer ' + accessToken
            },
            mode: 'cors',
            cache: 'default'
          }; 

        fetch(FETCH_URL,myOptions)
        .then(response => response.json())
        .then(json => {
           const artist = json.artists.items[0];
           this.setState({artist});

           FETCH_URL = `${ALBUM_URL}${artist.id}/top-tracks?country=IN&`
           fetch(FETCH_URL,myOptions)
           .then(response => response.json())
           .then(json => {
               console.log('artist\'s top tracks',json);
               const {tracks}= json;
               this.setState({tracks});
            });

        });
    }
    render(){
        return(
            <div className="App">
                <div className="App-title">Music App</div>
                <FormGroup>
                    <InputGroup>
                      <FormControl 
                        type="text"
                        placeholder="Artist name"
                        value={this.state.query}
                        onChange={event =>{this.setState({query : event.target.value})}}
                        onKeyPress={ event =>{
                            if(event.key === 'Enter'){
                                this.search()
                            }
                        }}
                      />
                    {/* <BsSearch size='1.5rem' onClick={() => this.search()}/>   */}
                    </InputGroup>
                </FormGroup>
                { 
                    this.state.artist !== null
                     ? <div>
                           <Profile 
                            artist={this.state.artist}
                           />
                           <Gallery 
                             tracks= {this.state.tracks}
                           />
                       </div>
                     : <div></div>
                }
            </div>
        )
    }
}
export default App;
