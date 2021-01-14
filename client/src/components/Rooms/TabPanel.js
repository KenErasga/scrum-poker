import React from 'react';
import { Container } from '@material-ui/core';

const TabPanel = (props) => {
    const { children, value, index, classes, ...other } = props;
  
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`vertical-tabpanel-${index}`}
        aria-labelledby={`vertical-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Container maxWidth="xl">{children}</Container>
        )}
      </div>
    );
}

export default TabPanel;