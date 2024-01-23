import { Component } from "react";
import { Navbar, BlogTag, /* Footer */ } from "../components";

interface BlogTagPage {
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
    views: number;
  };
}

interface BlogTagpageProps {
  blogs?: { data: BlogTagPage[] };
}

class BlogTagpage extends Component<BlogTagpageProps> {
  render() {
    const { blogs } = this.props;

    return (
      <div>
        <Navbar />
        <BlogTag blogs={blogs ? blogs : { data: [] }} />
        {/* <Footer /> */}
      </div>
    );
  }
}

export default BlogTagpage;
