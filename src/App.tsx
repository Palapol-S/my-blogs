import { Component } from "react";
import { Routes, Route } from "react-router-dom";
import { Homepage, BlogContentPage, DocumentPage, DocsContentPage} from "./pages";

interface AppProps {}

interface AppState {
  loading: boolean;
  blogData: any;
  documentData: any;
  error: any;
}

class App extends Component<AppProps, AppState> {
  constructor(props: AppProps) {
    super(props);

    this.state = {
      loading: true,
      blogData: null,
      documentData: null,
      error: null,
    };
  }

  async componentDidMount() {
    try {
      const blogResponse = await fetch("http://localhost:1337/api/blogs?populate=*");
      const blogData = await blogResponse.json();

      const documentResponse = await fetch("http://localhost:1337/api/documents?populate=*");
      const documentData = await documentResponse.json();

      this.setState({ loading: false, blogData, documentData, error: null });
    } catch (error) {
      this.setState({ loading: false, blogData: null, documentData: null, error });
    }
  }

  render() {
    const { loading, blogData, documentData, error } = this.state;
    //console.log(blogData);
    //console.log(documentData);
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error!</p>;

    return (
      <div>
        <Routes>
          <Route path="/" element={<Homepage blogs={blogData ? blogData : ""} />} />
          <Route
            path="/blog-content/:id"
            element={<BlogContentPage blogs={blogData ? blogData : ""} />}
          />
          <Route path="/document" element={<DocumentPage documents={documentData ? documentData : ""} />} />
          <Route path="/document/:id" element={<DocsContentPage documents={documentData ? documentData : ""} />} />
        </Routes>
      </div>
    );
  }
}

export default App;
