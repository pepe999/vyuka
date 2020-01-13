import React from "react";

import { connect } from "react-redux";

import { secondNews, fetchNews } from "../../redux/news/index";

import { NewsItem } from "../../components/NewsItem";

import { getNewsList, getActiveNewsList } from "../../redux/news/selectors";

const mapStateToProps = state => {
  // return { news: state.news.news };
  return {
    news: getNewsList(state),
    activeNews: getActiveNewsList(state)
  };
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
    console.log("mount");

    this.props.fetchNews();
  }

  handleButton(e) {
    this.props.fetchNews();
  }

  render() {
    return (
      <div>
        {this.props.news[0].title}
        <button onClick={e => this.handleButton(e)}> načíst</button>
        <hr />
        {this.props.activeNews.map(news => (
          <NewsItem title={news.title} />
        ))}
      </div>
    );
  }
}
const News = connect(mapStateToProps, mapDispatchToProps)(connectedNews);
export default News;
