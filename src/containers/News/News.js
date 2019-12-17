import React from "react";

import { connect } from "react-redux";

import { secondNews } from "../../redux/news/index";

const mapStateToProps = state => {
  return { news: state.news.news };
};

function mapDispatchToProps(dispatch) {
  return {
    // nactiHlasky: hlasky => dispatch(nactiHlasky(hlasky)),
    // nactiHlaskySaga: hlasky => dispatch(nactiHlaskySaga(hlasky)),
    // dalsiHlaska: hlasky => dispatch(dalsiHlaska(hlasky))
    addSecondNews: () => dispatch(secondNews())
  };
}

class connectedNews extends React.Component {
  //   state = {
  //     videoHeight: "0px",
  //     loaded: false,
  //     playing: true,
  //     answer: false
  //   }

  //   componentDidMount() {
  //     this.props.nactiHlaskySaga(null);
  //     this.setState({loaded: true})
  //   }

  //   handleShowVideo(e) {
  //     this.state.videoHeight === "0px" ? this.setState({videoHeight: "200%"}) : this.setState({videoHeight: "0px"});
  //   }

  //   // dodělat přepisování start/stop + pokud video dohraje - nastavit state na playing false
  //   handlePlay(e) {
  //     this.setState({playing: !this.state.playing});
  //   }

  //   handleNext(e) {
  //     if (this.props.aktHlaska != null){
  //       this.props.dalsiHlaska(this.props.aktHlaska.id);
  //     }
  //   }

  handleButton(e) {
    this.props.addSecondNews();
  }

  render() {
    return (
      <div>
        {this.props.news.title}
        <button onClick={e => this.handleButton(e)}> akce</button>{" "}
      </div>
    );
  }
}
const News = connect(mapStateToProps, mapDispatchToProps)(connectedNews);
export default News;
