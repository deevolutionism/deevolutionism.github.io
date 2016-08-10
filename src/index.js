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
      // for(var i = 0; i<this.state.projects.length;i++){
      //   console.log(this.state.projects[i].title);
      // //   portfolioItems.push(
      // //     <div className="segment" key={projects.projects[i].title}>
      // //       <img src={projects.projects[i].image}/>
      // //       <h2>{projects.projects[i].title}</h2>
      // //       <h3>{projects.projects[i].type}</h3>
      // //       <h3>{projects.projects[i].date}</h3>
      // //       <p>{projects.projects[i].description}</p>
      // //     </div>
      // //   );
      // // }
      // }
    }


    return (
      <div>
        <h1>Gentry Demchak</h1>
        {portfolioItems}
      </div>
    )
  }
}

const content = document.getElementById('app');

ReactDom.render(<Index />, content);
