import { Component } from "react";
import { Navbar, Blogs, Footer } from "../components";

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
    authorImage: {
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
  };
}

interface HomepageProps {
  blogs?: { data: Blog[] };
}

class Homepage extends Component<HomepageProps> {
  render() {
    const { blogs } = this.props;

    return (
      <div>
        <Navbar />
        <Blogs blogs={blogs ? blogs : { data: [] }} />
        <Footer />
      </div>
    );
  }
}

export default Homepage;
