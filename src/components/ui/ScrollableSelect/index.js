import React from 'react';
import { withStyle } from 'baseui';
import { Label2 } from 'baseui/typography';
import { StyledList } from 'baseui/menu';
// import { StyledList, StyledEmptyState } from 'baseui/menu';
import { Select, StyledDropdownListItem } from 'baseui/select';
import { FixedSizeList } from 'react-window';

const LIST_ITEM_HEIGHT = 36;
// const EMPTY_LIST_HEIGHT = 72;
const MAX_LIST_HEIGHT = 200;

const ListItem = withStyle(StyledDropdownListItem, {
  paddingTop: 0,
  paddingBottom: 0,
  display: 'flex',
  alignItems: 'center',
});

const FixedSizeListItem = ({ data, index, style }) => {
  const { item, overrides, ...restChildProps } = data[index].props;

  if (!item) {
    return (
      <ListItem
        key={restChildProps.children}
        style={{
          boxSizing: 'border-box',
          ...style,
        }}
        {...restChildProps}
      >
        <Label2>{restChildProps.children}</Label2>
      </ListItem>
    );
  }

  return (
    <ListItem
      key={item.name}
      style={{
        boxSizing: 'border-box',
        ...style,
      }}
      {...restChildProps}
    >
      {item.name}
    </ListItem>
  );
};

const VirtualDropdown = React.forwardRef((props, ref) => {
  const children = React.Children.toArray(props.children);

  // if (!children[0] || !children[0].props.item) {
  //   return (
  //     <StyledList $style={{ height: EMPTY_LIST_HEIGHT + 'px' }} ref={ref}>
  //       <StyledEmptyState {...children[0].props} />
  //     </StyledList>
  //   );
  // }

  const height = Math.min(MAX_LIST_HEIGHT, children.length * LIST_ITEM_HEIGHT);

  return (
    <StyledList $style={{ height: height + 'px' }} ref={ref}>
      <FixedSizeList
        width="100%"
        height={height}
        itemCount={children.length}
        itemData={children}
        itemKey={(index, data) => {
          if (!data[index].props.item) return data[index].props.children;
          return data[index].props.item.name;
        }}
        itemSize={LIST_ITEM_HEIGHT}
      >
        {FixedSizeListItem}
      </FixedSizeList>
    </StyledList>
  );
});

const ScrollableSelect = (props) => {
  return <Select {...props} overrides={{ Dropdown: VirtualDropdown }} />;
};

export default ScrollableSelect;
