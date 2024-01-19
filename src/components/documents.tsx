//this code is unused right now it can be home page of the document
import React, { Component } from "react";
import { Text } from "@mantine/core";
import { unified } from "unified";
import rehypeParse from "rehype-parse";
import rehypeStringify from "rehype-stringify";
import { visit } from "unist-util-visit";

interface Document {
  id: number;
  attributes: {
    Title: string;
    Documentation: string;
    Tags: string;
    Submenu : boolean;
    SubTag: string;
  };
}

interface DocumentProps {
  documents?: {
    data: Document[];
  };
}

interface ElementNode {
  type: string;
  tagName: string;
  children: { type: string; value: string }[];
  properties: { [key: string]: any };
}

interface DocumentsState {
  data: Document[];
}

class Documents extends Component<DocumentProps, DocumentsState> {
  constructor(props: DocumentProps) {
    super(props);

    this.state = {
      data: [],
    };
  }

  componentDidMount() {
    // If documents prop is provided, use it directly
    if (this.props.documents) {
      this.filterAndSetData(this.props.documents.data);
    }
  }

  filterAndSetData(documents: Document[]) {
    // Find the first document with the specified ID and has the tag "Introduction"
    const specificDocument = documents.find((document) =>
      document.id === 1 && document.attributes.Tags?.includes("Introduction")
    );

    if (specificDocument) {
      this.setState({ data: [specificDocument] });
    } else {
      console.warn("Document not found or does not have the required tag.");
    }
  }

  render() {
    const toc: { id: string; title: string }[] = [];
    const processedData = this.state.data
      .filter((document) => document.id)
      .map((document) => {
        const processedDocument = unified()
          .use(rehypeParse, {
            fragment: true,
          })
          .use(() => {
            return (tree) => {
              visit(tree, "element", (node) => {
                const elementNode = node as ElementNode;
                if (elementNode.tagName === "h2") {
                  const rawTitle = elementNode.children[0].value;
                  const id = rawTitle.toLowerCase().replace(/\s+/g, "-");
                  elementNode.properties.id = id;
                  toc.push({
                    id,
                    title: rawTitle,
                  });
                }
              });
            };
          })
          .use(rehypeStringify)
          .processSync(document.attributes.Documentation ?? "")
          .toString();

        return {
          ...document,
          processedDocument,
        };
      });

    return (
      <div className="w-full pb-10 bg-[#f9f9f9]">
        <div className="max-w-[1240px] mx-auto p-4">
          <div
            className="grid lg:grid-cols-2 sm:grid-cols-3 ss:grid-cols-1
            md:gap-8 sm:gap-y-8 ss:gap-y-8 px-4 sm:pt-4 md:mt-0 ss:pt-4 text-black"
          >
            <div className="col-span-2">
              <div>
                {processedData.map((document) => (
                  <React.Fragment key={document.id}>
                    <Text
                      size="lg"
                      fw={500}
                      className="font-bold text-2xl md:text-xl sm:text-lg ss:text-md my-1 px-10"
                    >
                      {document.attributes.Title}
                    </Text>
                    <div
                      className="markdown line-break text-justify px-10"
                      dangerouslySetInnerHTML={{
                        __html: document.processedDocument ?? "",
                      }}
                    />
                  </React.Fragment>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Documents;
