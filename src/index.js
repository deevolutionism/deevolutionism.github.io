import React, {Component} from "react";
import ReactDom from "react-dom";
import $ from "jquery";

var version = '0.0.0';

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
      version = this.state.projects.version;
      for(var i = 0; i<this.state.projects.projects.length;i++){
        portfolioItems.push(
          <div className="segment" key={i}>
            <img className="project_image" src={this.state.projects.projects[i].image}/>
            <h2>{this.state.projects.projects[i].title}</h2>
            <h3>{this.state.projects.projects[i].type}</h3>
            <h3>{this.state.projects.projects[i].date}</h3>
            <p>{this.state.projects.projects[i].description}</p>
            <div>
              <p>{this.state.projects.projects[i].views} views</p>
            </div>
          </div>
        );
      }
    }


    return (
      <div>
      <h1>Gentry Demchak</h1>
        <ul>
          <li><a href="https://github.com/deevolutionism">Github</a></li>
          <li><a href="https://twitter.com/gdemchak17">Twitter</a></li>
          <li><a href="https://www.linkedin.com/in/gentry-demchak-843a6a79">Linkedin</a></li>
        </ul>
        {portfolioItems}
        <div>{version} - 2016</div>
      </div>
    )
  }
}

const content = document.getElementById('app');

ReactDom.render(<Index />, content);
