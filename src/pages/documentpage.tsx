import { Component } from "react";
import { Navbar, Footer, Documents } from "../components";
//import TableOfContent from "../components/toc";
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

interface DocumentPageProps {
  documents?: { data: Document[] };
}

interface DocumentPageState {}

class DocumentPage extends Component<DocumentPageProps, DocumentPageState> {
  constructor(props: DocumentPageProps) {
    super(props);

  }

  render() {
    const { documents } = this.props;
    
    return (
      <div>
        <Navbar />
        <div className="flex">
          <Sidebars documents={documents ? documents : { data: [] }} />
          <Documents documents={documents ? documents : { data: [] }} />
          {/* <TableOfContent documents={documents ? documents : { data: [] }}/> */}
        </div>
        <Footer />
      </div>
    );
  }
}

export default DocumentPage;
