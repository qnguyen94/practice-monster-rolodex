import React ,{ Component } from 'react';
import './App.css';
import { CardList } from './components/card-list/card-list.component';
import { SearchBox } from './components/card-list/search-box.component';

class App extends Component{
  constructor(){
    super(); // Call initialization from Component

    this.state = {
      monsters:[],
      searchField: '',
    }

    //Bind custom methods to this component (ES5)
    //ES6: Use arrow functions => Automatically bind, don't need below
    // this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount(){
    fetch('https://jsonplaceholder.typicode.com/users')
    .then(response => response.json())
    .then(users => this.setState({
      monsters: users
    }))
    .catch(reject => console.log(reject))
  }

  // // ES5 (need binding)
  // handleChange(e){
  //   this.setState({searchField: e.target.value})
  // }

  //ES6 (Don't need binding)
  handleChange = e => {
    this.setState({searchField: e.target.value})
  }

  render(){

    //Destructure into 2 variables
    const { monsters, searchField } = this.state;

    //Filter out matched monsters
    const filteredMonsters = monsters.filter(monster => 
      monster.name.toLowerCase().includes(searchField.toLowerCase())
    )

    return(
      <div className="App">
        <h1> Monster Rolodex </h1>
        <SearchBox 
          placeholder='Search Monsters'
          handleChange = {this.handleChange}
        />
        <CardList monsters={filteredMonsters}></CardList>
      </div>
    )
  }
}

export default App;
