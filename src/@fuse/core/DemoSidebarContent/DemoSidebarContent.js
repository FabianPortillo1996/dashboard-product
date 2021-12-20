import _ from '@lodash';
import { cloneElement, memo } from 'react';
import { FormControlLabel, Radio, RadioGroup } from '@material-ui/core';
import FormControl from '@material-ui/core/FormControl';

function DemoSidebarContent() {
  function generate(element) {
    return _(5).times((value) =>
      cloneElement(element, {
        key: value,
      })
    );
  }

  return (
    <div>
      <FormControl component="fieldset">
        {/* <FormLabel component="legend">Gender</FormLabel> */}
        <RadioGroup aria-label="gender" defaultValue="female" name="radio-buttons-group">
          <FormControlLabel value="female" control={<Radio />} label="Female" />
          <FormControlLabel value="male" control={<Radio />} label="Male" />
          <FormControlLabel value="other" control={<Radio />} label="Other" />
        </RadioGroup>
      </FormControl>
      {/* <List dense> */}
      {/*  {generate( */}
      {/*    <ListItem */}
      {/*      button */}
      {/*      onClick={(event) => { */}
      {/*        console.log(event); */}
      {/*      }} */}
      {/*    > */}
      {/*      <ListItemText primary="Single-line item" secondary="holamundo" /> */}
      {/*    </ListItem> */}
      {/*  )} */}
      {/* </List> */}
    </div>
  );
}

export default memo(DemoSidebarContent);
