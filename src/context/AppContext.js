import React from "react";

const { Provider, Consumer } = React.createContext("App");

export const connect = mapStateToProps => WrrappedComponent => {
  return class ConnectedComponent extends React.Component {
    render() {
      return (
        <Consumer>
          {value => {
            const injectedProps = mapStateToProps
              ? mapStateToProps(value)
              : value;
            return <WrrappedComponent {...injectedProps} {...this.props} />;
          }}
        </Consumer>
      );
    }
  };
};

export class AppProvider extends React.Component {
  state = {
    photos: []
  };
  updatePhotos = photos => {
    this.setState({ photos });
  };
  toggleLike = index => {
    const { photos } = this.state;
    const { liked } = photos[index];
    photos[index].liked = !liked;
    this.setState({ photos });
  };

  render() {
    const value = {
      photos: this.state.photos,
      updatePhotos: this.updatePhotos,
      toggleLike: this.toggleLike
    };
    return <Provider value={value}>{this.props.children}</Provider>;
  }
}

export { Consumer };
