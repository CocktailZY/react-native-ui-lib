import React, {PropTypes} from 'react';
import {StyleSheet} from 'react-native';
import {BlurView} from 'react-native-blur';
import {BaseComponent} from '../../commons';
import {Constants} from '../../helpers';
import View from '../view';

export default class CardSection extends BaseComponent {

  static displayName = 'Card Section';

  static propTypes = {
    ...View.propTypes,
    /**
     * enable blur view
     */
    enableBlur: PropTypes.bool,
    /**
     * blur options
     */
    blurOptions: PropTypes.object,
    /**
     * style as a body, apply inner padding
     */
    body: PropTypes.bool,
    /**
     * style as a footer, remove bottom spacing
     */
    footer: PropTypes.bool,
    testId: PropTypes.string,
  };

  generateStyles() {
    this.styles = createStyles(this.props);
  }

  render() {
    const {enableBlur, blurOptions, style, ...others} = this.props;
    const Container = (Constants.isIOS && enableBlur) ? BlurView : View;
    const {paddings} = this.state;
    return (
      <Container {...blurOptions} style={[this.styles.container, paddings, style]} {...others}>
        {this.props.children}
      </Container>
    );
  }
}

function createStyles({body, footer}) {
  return StyleSheet.create({
    container: {
      flexDirection: body ? undefined : 'row',
      justifyContent: body ? undefined : 'space-between',
      alignItems: body ? undefined : 'center',
      marginBottom: (footer || body) ? undefined : 10,
      padding: body ? 21 : undefined,
      flex: 1,
    },
  });
}
