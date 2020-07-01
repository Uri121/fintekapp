import React, { Component } from "react";
import Information from "./Information";
import Staff from "./Staff";

class App extends Component {
  constructor() {
    super();
    this.state = {
      list: [],
    };
  }

  //this function returns the finall six randoms workers that will be shown
  randomWorkers = async () => {
    //the list that will contain the workers
    const workersList = [];
    //list of random 6 ids
    const ids = this.getRandomInt();

    //fetching json from github repo
    const api_call = await fetch(
      "https://raw.githubusercontent.com/fintekapps/react-site/master/data/staff.json"
    );
    const response = await api_call.json();

    let index = 0;
    //pushing the workers from the json response list by comparing the ids
    for (let i = 0; i < response.length; i++) {
      if (ids[index] === response[i].id) {
        workersList.push(response[i]);
        index++;
      }
    }
    //setting the list of the workers as state
    this.setState({ list: workersList });
  };

  //this function generates a random number
  getRandomInt = () => {
    let amount = 6,
      lower_bound = 1,
      upper_bound = 100;
    const ids = [];
    while (ids.length < amount) {
      let random_number = Math.floor(
        Math.random() * (upper_bound - lower_bound) + lower_bound
      );
      if (ids.indexOf(random_number) === -1) {
        //new random number
        ids.push(random_number);
      }
    }
    const sortedIds = ids.sort();

    return sortedIds;
  };

  componentDidMount() {
    this.randomWorkers();
  }

  render() {
    const { list } = this.state;
    return (
      <div className="flex-container">
        <Information />
        <div className="staff">
          {list
            ? list.map((worker) => (
                <Staff
                  firstName={worker.firstname}
                  lastName={worker.lastname}
                  job={worker.job}
                  avatar={worker.avatar}
                  key={worker.id}
                  id={worker.id}
                />
              ))
            : null}
        </div>
      </div>
    );
  }
}

export default App;
