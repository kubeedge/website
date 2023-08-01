import React from "react";
import Icon from "@ant-design/icons";
import CompanySvg from '@site/static/img/icon/company.svg';
import LocationSvg from '@site/static/img/icon/location.svg';

export const IconCompany = (props) => {
  return <Icon {...props} component={CompanySvg} />
};

export const IconLocation = (props) => {
  return <Icon {...props} component={LocationSvg} />
};
