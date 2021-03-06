/**
 * Created by youhan on 2017/9/27.
 */
import React from 'react';
import {ImageBackground as BaseImage, View, StyleSheet, Text, ActivityIndicator} from 'react-native';

class ImageBackground extends React.PureComponent {
  constructor(props) {
    super(props);
    
    this.state = {
      loading: false,
      error: false
    };
    
    this.onError = this.onError.bind(this);
    this.onLoad = this.onLoad.bind(this);
    this.onLoadStart = this.onLoadStart.bind(this);
    this.onLoadEnd = this.onLoadEnd.bind(this);
  }
  
  onError() {
    this.setState({
      error: true,
      loading: false
    });
  }
  
  onLoad() {
    this.setState({
      loading: false,
      error: false
    })
  }
  
  onLoadStart() {
    this.setState({
      loading: true,
      error: false
    });
  }
  
  onLoadEnd() {
    this.setState({
      loading: false
    });
  }
  
  render() {
    const {source, style, resizeMode, ...others} = this.props;
    if (!source || (typeof source === 'object' && (!source.uri))) {
      return <View style={style} />;
    }
    const {error, loading} = this.state;
    
    return (
      <View style={[styles.image, style]}>
        <BaseImage
          {...others}
          source={source}
          style={[styles.image, style]}
          resizeMode={resizeMode || 'cover' || 'contain'}
          onError={this.onError}
          onLoad={this.onLoad}
          onLoadStart={this.onLoadStart}
          onLoadEnd={this.onLoadEnd}
        >
          {this.props.children}
        </BaseImage>
        {(error || loading) ?
          <View style={[styles.image, styles.view, style]}>
            {error ? <Text>加载失败</Text> : null}
            {loading ?
              <ActivityIndicator
                animating={true}
                size={'small'}
              />
              : null
            }
          </View> : null
        }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  image: {
  
  },
  view: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    width: 100,
    height: 100
  }
});

export default ImageBackground;
