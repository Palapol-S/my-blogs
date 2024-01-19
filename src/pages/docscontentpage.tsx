import { Component } from "react";
import { Navbar, /* Footer, */ DocsContent } from "../components";
/* import TableOfContent from "../components/toc"; */
import Sidebars from "../components/Sidebars";

interface Document {
  id: number;
  attributes: {
    Title: string;
    Documentation: string;
    Tags: string;
    Submenu: boolean;
    SubTag: string;
  };
}

interface DocsContentPageProps {
  documents?: { data: Document[] };
}

interface DocsContentPageState {}

class DocsContentPage extends Component<DocsContentPageProps, DocsContentPageState> {
  constructor(props: DocsContentPageProps) {
    super(props);

  }

  render() {
    const { documents } = this.props;
    
    return (
      <div>
        <Navbar />
        <div className="flex">
          <Sidebars documents={documents ? documents : { data: [] }} />
          <DocsContent documents={documents ? documents : { data: [] }} />
          {/* <TableOfContent documents={documents ? documents : { data: [] }}/> */}
        </div>
        {/* <Footer /> */}
      </div>
    );
  }
}

export default DocsContentPage;