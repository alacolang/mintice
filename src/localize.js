import * as React from "react";
import {I18nManager} from "react-native";
import "intl";
import {IntlProvider, addLocaleData} from "react-intl";
import * as faLocaleData from "react-intl/locale-data/fa";
import messages from "./fa";
addLocaleData(faLocaleData);

I18nManager.forceRTL(true);

export default (App, {textComponent}) => {
  return class extends React.Component {
    render() {
      return (
        <IntlProvider
          textComponent={textComponent}
          // locale="fa-IR-u-ca-persian"
          locale="en"
          messages={messages}
        >
          <App {...this.props} />
        </IntlProvider>
      );
    }
  };
};
