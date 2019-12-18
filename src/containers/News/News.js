import React from "react";

import { connect } from "react-redux";

import { secondNews, fetchNews } from "../../redux/news/index";

import { NewsItem } from "../../components/NewsItem";

const mapStateToProps = state => {
  return { news: state.news.news };
};

// istanbul ignore next
const mapDispatchToProps = {
  secondNews,
  fetchNews
};

class connectedNews extends React.Component {
  //   componentDidMount = () => {
  //     this.props.fetchNews();
  //   };

  componentDidMount() {
    //   bez timeoutu se zavolala akce drive nez se inisializovala aplikace - neprobehlo volání sagy
    setTimeout(() => {
      this.props.fetchNews();
    });
  }

  handleButton(e) {
    this.props.secondNews();
  }

  render() {
    return (
      <div>
        {this.props.news[0].title}
        <button onClick={e => this.handleButton(e)}> načíst</button>
        <hr />
        {this.props.news.map(news => (
          <NewsItem title={news.title} />
        ))}
      </div>
    );
  }
}
const News = connect(mapStateToProps, mapDispatchToProps)(connectedNews);
export default News;
