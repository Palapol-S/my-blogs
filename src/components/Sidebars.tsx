import { Component } from "react";
import { Link } from "react-router-dom";
import "../styles/sidebar.css";
import { IconArrowRight } from "@tabler/icons-react";

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
  selectedItemId: number | null;
}

class SidebarItem extends Component<SidebarItemProps, SidebarItemState> {
  state: SidebarItemState = {
    open: false,
    selectedItemId: null,
  };

  toggleOpen = () => {
    this.setState((prevState) => ({
      open: !prevState.open,
    }));
  };

  handleItemClick = (itemId: number) => {
    this.setState({
      selectedItemId: itemId,
    });
  };

  render() {
    const { items } = this.props;
    const { open, selectedItemId } = this.state;
    const isSubmenu = items[0].attributes.Submenu;

    return (
      <div
        className={
          isSubmenu
            ? open
              ? "sidebar-item open"
              : "sidebar-item"
            : "sidebar-item"
        }
      >
        {isSubmenu ? (
          <div className="sidebar-title" onClick={this.toggleOpen}>
            <span
              onClick={() => this.handleItemClick(items[0].id)}
              className={selectedItemId === items[0].id ? "selected" : ""}
            >
              {items[0].attributes.Tags}
            </span>
            {isSubmenu && <IconArrowRight className="toggle-btn" />}
          </div>
        ) : (
          <Link
            to={`/document/${items[0].id}`}
            className={`sidebar-title ${selectedItemId === items[0].id ? "selected" : ""}`}
            onClick={() => this.handleItemClick(items[0].id)}
          >
            {items[0].attributes.Tags}
          </Link>
        )}
        {isSubmenu && open && (
          <div className="sidebar-content">
            {items.map((item, index) => (
              <Link
                key={index}
                to={`/document/${item.id}`}
                className={`sidebar-link ${selectedItemId === item.id ? "selected" : ""}`}
                onClick={() => this.handleItemClick(item.id)}
              >
                {item.attributes.SubTag}
              </Link>
            ))}
          </div>
        )}
      </div>
    );
  }
}

class Sidebar extends Component<SidebarProps> {
  render() {
    const { documents } = this.props;
    console.log(this.props);
    const groupedData: { [tag: string]: Document[] } = {};

    documents?.data.forEach((document) => {
      const tag = document.attributes.Tags;
      if (groupedData[tag]) {
        groupedData[tag].push(document);
      } else {
        groupedData[tag] = [document];
      }
    });

    return (
      <div className="sidebar">
        {Object.keys(groupedData).map((tag, index) => (
          <SidebarItem key={index} items={groupedData[tag]} />
        ))}
      </div>
    );
  }
}

export default Sidebar;
