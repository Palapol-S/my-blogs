import { Component } from "react";
import { Navbar, /* Footer, */ BlogContent } from "../components";

interface Blog {
  id: number;
  attributes: {
    Image: {
      data: {
        attributes: {
          url: string;
        };
      };
    };
    createdBy: {
      id: number;
      firstname: string;
      lastname: string;
    };
    Title: string;
    Content: string;
    Description: string;
    ReadTime: string;
    createdAt: string;
    Blogs: string;
    Tags: string;
    SecondTags: string;
    ThirdTags: string;
  };
}

interface BlogContentPageProps {
  blogs?: { data: Blog[] };
}

class BlogContentPage extends Component<BlogContentPageProps> {
  render() {
    const { blogs } = this.props;

    return (
      <div>
        <Navbar />
        <BlogContent blogs={blogs ? blogs : { data: [] }} />
        {/* <Footer /> */}
      </div>
    );
  }
}

export default BlogContentPage;
