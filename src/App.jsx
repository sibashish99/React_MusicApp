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
        var accessToken = 'BQBo6_vMSpr8I3_lOqVDYMBUfe3RaDuqlLpJFGiaNEizCrimc5MfA7xKpnji7lxDKowwh7h0pQUeJxlUp14sKerX8VzMgajsqmZQDbjwh2o57wShO9FzFmaKZhFyfUPv06Ujvw0Yp449PrpUioeB8aFWVYL9NrK85krO5VIFQgKhg-I63A&refresh_token=AQBKJxiSaLOaVn4FUiydzP8MztT3WjooSr4kjejc4eO-YQgzxuvRMYPONyoi-JDdeQDVF-y76mrXW0rpnqTAyNA_bix-VuesuJBpx_yREvm3Dzeero2sMVyBKy6fQOiC4vI'
        
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