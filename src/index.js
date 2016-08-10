import React, {Component} from "react";
import ReactDom from "react-dom";
import $ from "jquery";

class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      projects: null
    };
    this.getData = this.getData.bind(this);
  }

  getData() {
    $.ajax({
      type: "GET",
      url: "/portfolio",
      dataType: "json",
      async: false,
      success: (data) => {
        this.setState({
          projects: data
        });
      },
      error: (err) => {
        console.log(err);
        return err;
      }
    });
  }

  componentDidMount() {
    this.getData();
  }

  render() {
    var portfolioItems = [];

    if(this.state.projects != null){
      console.log(typeof this.state.projects);
      console.log(this.state.projects.projects.length);
      for(var i = 0; i<this.state.projects.projects.length;i++){
        portfolioItems.push(
          <div className="segment" key={i}>
            <img className="project_image" src={this.state.projects.projects[i].image}/>
            <h2>{this.state.projects.projects[i].title}</h2>
            <h3>{this.state.projects.projects[i].type}</h3>
            <h3>{this.state.projects.projects[i].date}</h3>
            <p>{this.state.projects.projects[i].description}</p>
          </div>
        );
      }
    }


    return (
      <div>
        <ul>
          <li><h1>Gentry Demchak</h1></li>
          <li><a href="https://github.com/deevolutionism"><img src="github-64.png"/></a></li>
          <li><a href="https://twitter.com/gdemchak17"><img src="twitter-64.png"/></a></li>
          <li><a href="https://www.linkedin.com/in/gentry-demchak-843a6a79"><img src="linkedin-64.png"/></a></li>
        </ul>
        {portfolioItems}
      </div>
    )
  }
}

const content = document.getElementById('app');

ReactDom.render(<Index />, content);
