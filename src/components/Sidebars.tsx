import { Component } from 'react';
import { Link } from 'react-router-dom';
import '../styles/sidebar.css'; // Import the CSS file

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

interface SidebarProps {
  documents?: {
    data: Document[];
  };
}

interface SidebarItemProps {
  items: Document[];
}

interface SidebarItemState {
  open: boolean;
}

class SidebarItem extends Component<SidebarItemProps, SidebarItemState> {
  state: SidebarItemState = {
    open: false,
  };

  toggleOpen = () => {
    this.setState((prevState) => ({
      open: !prevState.open,
    }));
  };

  render() {
    const { items } = this.props;
    const { open } = this.state;

    return (
      <div className={items[0].attributes.Submenu ? (open ? 'sidebar-item open' : 'sidebar-item') : 'sidebar-item'}>
        <div className="sidebar-title" onClick={items[0].attributes.Submenu ? this.toggleOpen : undefined}>
          <span>{items[0].attributes.Tags}</span>
          {items[0].attributes.Submenu && <i className="bi-chevron-down toggle-btn"></i>}
        </div>
        {items[0].attributes.Submenu && open && (
          <div className="sidebar-content">
            {items.map((item, index) => (
              <Link key={index} to={`/document/${item.id}`} className="sidebar-link">
                {item.attributes.SubTag}
              </Link>
            ))}
          </div>
        )}
        {!items[0].attributes.Submenu && (
          <Link to={`/document/${items[0].id}`} className="sidebar-link">
            {items[0].attributes.Tags}
          </Link>
        )}
      </div>
    );
  }
}

class Sidebar extends Component<SidebarProps> {
  render() {
    const { documents } = this.props;

    const groupedData: { [tag: string]: Document[] } = {};

    documents?.data.forEach((document) => {
      const tag = document.attributes.Tags;
      if (groupedData[tag]) {
        groupedData[tag].push(document);
      } else {
        groupedData[tag] = [document];
      }
    });

    const groupedDocuments: Document[] = Object.values(groupedData).flatMap((group) => group);

    return (
      <div className="sidebar">
        {groupedDocuments.map((document, index) => (
          <SidebarItem key={index} items={groupedData[document.attributes.Tags]} />
        ))}
      </div>
    );
  }
}

export default Sidebar;
